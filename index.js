const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const app = express();

// Logging middleware
app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(express.json());

let urlDB = {};
let clicks = [];

app.post('/shorten', (req, res) => {
    let { originalUrl, validity, customCode } = req.body;
    originalUrl = originalUrl.trim();

    // Basic URL validation
    if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const expiry = Date.now() + (validity || 30) * 60000;

    let code = customCode || shortid.generate();
    if (urlDB[code]) return res.status(409).json({ error: 'Shortcode already exists' });

    urlDB[code] = { originalUrl, expiry, clicks: [] };
    res.json({ shortUrl: `http://localhost:5000/${code}`, expiry });
});

app.get('/:code', (req, res) => {
    const { code } = req.params;
    const entry = urlDB[code];

    if (!entry || Date.now() > entry.expiry) {
        return res.status(404).send('URL not found or expired');
    }

    const click = {
        timestamp: new Date().toISOString(),
        source: req.get('User-Agent'),
        location: req.ip,
    };
    entry.clicks.push(click);

    res.redirect(entry.originalUrl);
});

app.get('/stats', (req, res) => {
    const data = Object.entries(urlDB).map(([code, { originalUrl, expiry, clicks }]) => ({
        code,
        shortUrl: `http://localhost:5000/${code}`,
        originalUrl,
        expiry,
        clickCount: clicks.length,
        clicks,
    }));
    res.json(data);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
