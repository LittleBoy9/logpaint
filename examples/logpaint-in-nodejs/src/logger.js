const { createLogger } = require('logpaint');

// ─── App Logger ─────────────────────────────────────────────────
// Configured once, used everywhere across the app.
// Custom levels: "http" for request logs, "db" for database logs.

const log = createLogger({
  timestamp: true,
  levels: {
    http: { color: 'brightBlue', prefix: 'HTTP', priority: 1 },
    db: { color: 'brightMagenta', prefix: 'DATABASE', priority: 1 },
  },
});

module.exports = { log };
