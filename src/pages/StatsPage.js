import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Divider, Paper
} from '@mui/material';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stats').then(res => setStats(res.data));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        Shortened URL Stats
      </Typography>
      {stats.map(url => (
        <Paper key={url.code} elevation={8} sx={{
          p: 4,
          mb: 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5)',
          color: 'white',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 15px 40px rgba(118, 75, 162, 0.7)',
          }
        }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            Short URL: <a href={url.shortUrl} style={{ color: '#ffd700' }}>{url.shortUrl}</a>
          </Typography>
          <Typography sx={{ mb: 1 }}>Original URL: {url.originalUrl}</Typography>
          <Typography sx={{ mb: 1 }}>Expires: {new Date(url.expiry).toLocaleString()}</Typography>
          <Typography sx={{ mb: 2 }}>Clicks: {url.clickCount}</Typography>
          {url.clicks.map((click, index) => (
            <Box key={index} ml={2} sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                - {click.timestamp} | {click.source} | {click.location}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
        </Paper>
      ))}
    </Container>
  );
};

export default StatsPage;
