const express = require('express');
const { log } = require('./logger');

const app = express();
app.use(express.json());

// ─── Request Logging Middleware ─────────────────────────────────
// Uses the custom "http" level for every incoming request.

app.use((req, _res, next) => {
  log.http(`${req.method} ${req.url}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────────

app.get('/', (_req, res) => {
  log.info('Serving home page');
  res.json({ message: 'Welcome to logpaint Express example!' });
});

app.get('/users', (_req, res) => {
  log.db('Querying all users');
  log.success('Fetched 3 users from database');
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  log.db(`Querying user with id=${id}`);

  if (id === '999') {
    log.warn(`User id=${id} not found — returning 404`);
    return res.status(404).json({ error: 'User not found' });
  }

  log.success(`Fetched user id=${id}`);
  res.json({ id, name: 'Alice' });
});

app.post('/users', (req, res) => {
  log.db('Inserting new user');
  log.debug('Request body:', JSON.stringify(req.body));
  log.success('User created');
  res.status(201).json({ id: 1, ...req.body });
});

// ─── Error Simulation Route ─────────────────────────────────────

app.get('/error', (_req, _res, next) => {
  next(new Error('Something broke!'));
});

// ─── 404 Handler ────────────────────────────────────────────────

app.use((_req, res) => {
  log.warn('Route not found — 404');
  res.status(404).json({ error: 'Not found' });
});

// ─── Error Handler ──────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  log.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ───────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log.success(`Server running on http://localhost:${PORT}`);
  log.info('Available routes:');
  log.info('  GET  /');
  log.info('  GET  /users');
  log.info('  GET  /users/:id');
  log.info('  POST /users');
  log.info('  GET  /error');

  // ─── Showcase: Runtime Level Switching ──────────────────────
  log.debug('Debug mode is ON — you can see this message');
  log.setLevel('warn');
  log.info('This info message is HIDDEN after setLevel("warn")');
  log.warn('Only warn and error are visible now');
  log.setLevel('debug');
  log.debug('Debug mode restored — all levels visible again');
});
