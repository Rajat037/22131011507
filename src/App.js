// src/App.js

import React, { useState } from 'react';
import './App.css';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = () => {
    // Dummy shortener logic — replace with your backend call
    if (longUrl.trim() === '') return;
    const hash = Math.random().toString(36).substring(2, 7);
    setShortUrl(`https://short.ly/${hash}`);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          URL Shortener
        </Typography>
        <TextField
          label="Enter Long URL"
          variant="outlined"
          fullWidth
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleShorten}
        >
          Shorten URL
        </Button>

        {shortUrl && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="subtitle1">Short URL:</Typography>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
