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

// ─── All Colors Logger ──────────────────────────────────────────
// Showcases ALL 16 ANSI colors supported by logpaint

const colorShowcase = createLogger({
  timestamp: true,
  levels: {
    // Basic colors
    black: { color: 'black', prefix: 'BLACK', priority: 1 },
    red: { color: 'red', prefix: 'RED', priority: 1 },
    green: { color: 'green', prefix: 'GREEN', priority: 1 },
    yellow: { color: 'yellow', prefix: 'YELLOW', priority: 1 },
    blue: { color: 'blue', prefix: 'BLUE', priority: 1 },
    magenta: { color: 'magenta', prefix: 'MAGENTA', priority: 1 },
    cyan: { color: 'cyan', prefix: 'CYAN', priority: 1 },
    white: { color: 'white', prefix: 'WHITE', priority: 1 },
    // Bright colors
    brightBlack: { color: 'brightBlack', prefix: 'BRIGHT_BLACK', priority: 1 },
    brightRed: { color: 'brightRed', prefix: 'BRIGHT_RED', priority: 1 },
    brightGreen: { color: 'brightGreen', prefix: 'BRIGHT_GREEN', priority: 1 },
    brightYellow: { color: 'brightYellow', prefix: 'BRIGHT_YELLOW', priority: 1 },
    brightBlue: { color: 'brightBlue', prefix: 'BRIGHT_BLUE', priority: 1 },
    brightMagenta: { color: 'brightMagenta', prefix: 'BRIGHT_MAGENTA', priority: 1 },
    brightCyan: { color: 'brightCyan', prefix: 'BRIGHT_CYAN', priority: 1 },
    brightWhite: { color: 'brightWhite', prefix: 'BRIGHT_WHITE', priority: 1 },
  },
});

// ─── Priority Logger ────────────────────────────────────────────
// Demonstrates minLevel filtering

const filteredLog = createLogger({
  timestamp: true,
  minLevel: 'warn', // Only warn (priority 2) and error (priority 3) will show
});

// ─── Simple Logger (shorthand color syntax) ─────────────────────
// You can pass just a color string instead of full config

const simpleLog = createLogger({
  levels: {
    trace: 'brightBlack',  // shorthand syntax
    http: 'brightBlue',
    db: 'brightMagenta',
  },
});

module.exports = { log, colorShowcase, filteredLog, simpleLog };
