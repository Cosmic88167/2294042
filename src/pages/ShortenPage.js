import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';

const ShortenPage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!originalUrl) return setError('Original URL required');
    try {
      const res = await axios.post('http://localhost:5000/shorten', {
        originalUrl,
        validity: validity ? parseInt(validity) : undefined,
        customCode,
      });
      setShortUrl(res.data.shortUrl);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, px: { xs: 2, sm: 3 } }}>
      <Paper elevation={10} sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 5,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5)',
        color: 'white',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 15px 40px rgba(118, 75, 162, 0.7)',
        }
      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          URL Shortener
        </Typography>
        <TextField
          fullWidth
          label="Original URL"
          margin="normal"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 1,
            input: { color: 'white' },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            }
          }}
        />
        <TextField
          fullWidth
          label="Validity (minutes)"
          margin="normal"
          value={validity}
          onChange={e => setValidity(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 1,
            input: { color: 'white' },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            }
          }}
        />
        <TextField
          fullWidth
          label="Custom Shortcode (optional)"
          margin="normal"
          value={customCode}
          onChange={e => setCustomCode(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 1,
            input: { color: 'white' },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleShorten}
          fullWidth
          size="large"
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#ff6f61',
            '&:hover': {
              backgroundColor: '#ff3b2e',
              boxShadow: '0 0 15px #ff3b2e',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
            color: 'white',
            letterSpacing: '1.5px',
          }}
        >
          Shorten
        </Button>
        {shortUrl && (
          <Box mt={3} textAlign="center" sx={{ wordBreak: 'break-all' }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Short URL: <a href={shortUrl} style={{ color: '#ffd700' }}>{shortUrl}</a>
            </Typography>
          </Box>
        )}
        {error && (
          <Typography color="error" mt={2} align="center" sx={{ fontWeight: 'medium' }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ShortenPage;
