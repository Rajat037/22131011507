import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, Button, TextField, Grid, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import '../logging-middleware/logger.js';


const logEvent = (type, message) => {
  window.__CUSTOM_LOGGER__?.log(type, message);
};

const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const generateShortCode = () => uuidv4().slice(0, 6);

const defaultValidity = 30; 

const App = () => {
  const [shortLinks, setShortLinks] = useState([]);

  const handleCreateShortLinks = (links) => {
    const newLinks = links.map(({ url, validity, customCode }) => {
      if (!validateURL(url)) {
        throw new Error("Invalid URL");
      }
      const code = customCode || generateShortCode();
      const now = new Date();
      const expiry = new Date(now.getTime() + (validity || defaultValidity) * 60000);
      return {
        original: url,
        code,
        createdAt: now,
        expiry,
        clicks: []
      };
    });
    window.__CUSTOM_LOGGER__?.log("info", `Shortened ${newLinks.length} URL(s)`);

    setShortLinks([...shortLinks, ...newLinks]);
  };

  const handleClickLink = (code, source) => {
    const linkIndex = shortLinks.findIndex((l) => l.code === code);
    if (linkIndex === -1) return;
    const updated = [...shortLinks];
    updated[linkIndex].clicks.push({
      timestamp: new Date(),
      source,
      location: "IN"
    });
    setShortLinks(updated);
    window.location.href = updated[linkIndex].original;
  };

  return (
    <Router>
      <Container maxWidth="md" className="centered-container">
        <Typography className="app-title">React URL Shortener</Typography>
        <Routes>
          <Route path="/" element={<ShortenerPage onCreate={handleCreateShortLinks} links={shortLinks} />} />
          <Route path="/stats" element={<StatisticsPage links={shortLinks} />} />
          <Route path="/:code" element={<RedirectHandler links={shortLinks} onRedirect={handleClickLink} />} />
        </Routes>
      </Container>
    </Router>
  );
};

const ShortenerPage = ({ onCreate, links }) => {
  const [entries, setEntries] = useState([{ url: "", validity: "", customCode: "" }]);

  const handleChange = (i, field, value) => {
    const newEntries = [...entries];
    newEntries[i][field] = value;
    setEntries(newEntries);
  };

  const handleAdd = () => {
    if (entries.length >= 5) return;
    setEntries([...entries, { url: "", validity: "", customCode: "" }]);
  };

  const handleShorten = () => {
    try {
      const input = entries.map(({ url, validity, customCode }) => ({
        url,
        validity: validity ? parseInt(validity, 10) : undefined,
        customCode
      }));
      onCreate(input);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box className="form-section">
      <Typography variant="h5">Shorten URLs</Typography>
      {entries.map((entry, i) => (
        <Grid container columns={12} columnSpacing={2} rowSpacing={2} key={i} mt={2}>
          <Grid span={6}>
            <TextField
              fullWidth
              label="Original URL"
              value={entry.url}
              onChange={(e) => handleChange(i, "url", e.target.value)}
            />
          </Grid>
          <Grid span={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              type="number"
              value={entry.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
            />
          </Grid>
          <Grid span={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={entry.customCode}
              onChange={(e) => handleChange(i, "customCode", e.target.value)}
            />
          </Grid>
        </Grid>

      ))}
      <Box className="url-form-buttons">
        <Button variant="outlined" onClick={handleAdd}>Add URL</Button>
        <Button variant="contained" onClick={handleShorten} sx={{ ml: 2 }}>Shorten</Button>
      </Box>
      <Box mt={4}>
        {links.slice(-5).map((link, i) => (
          <Paper key={i} className="stats-card">
            <Typography>Original: {link.original}</Typography>
            <Typography>Short URL: http://localhost:3000/{link.code}</Typography>
            <Typography>Expires at: {link.expiry.toString()}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const StatisticsPage = ({ links }) => (
  <Box mt={4}>
    <Typography variant="h5">Statistics</Typography>
    {links.map((link, i) => (
      <Paper key={i} sx={{ p: 2, mb: 2 }}>
        <Typography>Short URL: http://localhost:3000/{link.code}</Typography>
        <Typography>Original URL: {link.original}</Typography>
        <Typography>Created At: {link.createdAt.toString()}</Typography>
        <Typography>Expires At: {link.expiry.toString()}</Typography>
        <Typography>Total Clicks: {link.clicks.length}</Typography>
        {link.clicks.map((click, idx) => (
          <Box key={idx} pl={2} mt={1}>
            <Typography variant="body2">{click.timestamp.toString()} - Source: {click.source} - Location: {click.location}</Typography>
          </Box>
        ))}
      </Paper>
    ))}
  </Box>
);

const RedirectHandler = ({ links, onRedirect }) => {
  const { code } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const source = document.referrer || "Direct";
    onRedirect(code, source);
    setTimeout(() => navigate("/"), 3000);
  }, [code]);

  return <Typography className="redirect-message">Redirecting to original URL...</Typography>;

};

export default App;
