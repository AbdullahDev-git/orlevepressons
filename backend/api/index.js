let app;
try {
  app = require('../src/app');
} catch (err) {
  console.error('Failed to initialize Express app:', err);
  throw err;
}

module.exports = app;
