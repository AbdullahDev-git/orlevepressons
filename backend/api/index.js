let app;
try {
  app = require('../src/app');
} catch (err) {
  console.error('App init error:', err);
  // Return a fallback Express app that shows the error
  const express = require('express');
  app = express();
  app.all('*', (req, res) => {
    res.status(500).json({
      error: err.message,
      stack: err.stack?.split('\n').slice(0, 6).join('\n'),
    });
  });
}

module.exports = app;
