import { createLogger } from 'logpaint';

// ─── App Logger ─────────────────────────────────────────────────
// Configured once, imported wherever needed.
// Custom levels: "http" for request logs, "db" for database logs.

type CustomLevels = 'http' | 'db';

export const log = createLogger<CustomLevels>({
  timestamp: true,
  levels: {
    http: { color: 'brightBlue', prefix: 'HTTP', priority: 1 },
    db: { color: 'brightMagenta', prefix: 'DATABASE', priority: 1 },
  },
});
