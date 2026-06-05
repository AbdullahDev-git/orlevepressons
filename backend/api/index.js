let app;
try {
  app = require('../src/app');
} catch (err) {
  console.error('App init error:', err);
  const express = require('express');
  app = express();
  app.all('*', (req, res) => {
    res.status(500).json({
      success: false,
      error: 'Server initialization failed',
      message: err.message,
    });
  });
}

module.exports = app;
