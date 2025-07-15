const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const app = express();

const { log } = require('./logger');

app.use(cors());
app.use(express.json());

// Logging middleware using the reusable log function
app.use(async (req, res, next) => {
    const now = new Date().toISOString();
    try {
        await log('backend', 'info', 'middleware', `[${now}] ${req.method} ${req.path}`);
    } catch (error) {
        console.error('Logging middleware error:', error.message);
    }
    next();
});

let urlDB = {};
let clicks = [];

app.post('/shorten', async (req, res) => {
    let { originalUrl, validity, customCode } = req.body;
    originalUrl = originalUrl.trim();

    // Basic URL validation
    if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
        await log('backend', 'error', 'shorten', 'Invalid URL');
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const expiry = Date.now() + (validity || 30) * 60000;

    let code = customCode || shortid.generate();
    if (urlDB[code]) {
        await log('backend', 'error', 'shorten', 'Shortcode already exists');
        return res.status(409).json({ error: 'Shortcode already exists' });
    }

    urlDB[code] = { originalUrl, expiry, clicks: [] };
    await log('backend', 'info', 'shorten', `Short URL created: ${code}`);
    res.json({ shortUrl: `http://localhost:5000/${code}`, expiry });
});

app.get('/:code', async (req, res) => {
    const { code } = req.params;
    const entry = urlDB[code];

    if (!entry || Date.now() > entry.expiry) {
        await log('backend', 'error', 'redirect', 'URL not found or expired');
        return res.status(404).send('URL not found or expired');
    }

    const click = {
        timestamp: new Date().toISOString(),
        source: req.get('User-Agent'),
        location: req.ip,
    };
    entry.clicks.push(click);

    await log('backend', 'info', 'redirect', `Redirecting to ${entry.originalUrl}`);
    res.redirect(entry.originalUrl);
});

app.get('/stats', async (req, res) => {
    const data = Object.entries(urlDB).map(([code, { originalUrl, expiry, clicks }]) => ({
        code,
        shortUrl: `http://localhost:5000/${code}`,
        originalUrl,
        expiry,
        clickCount: clicks.length,
        clicks,
    }));
    await log('backend', 'info', 'stats', 'Stats data requested');
    res.json(data);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
