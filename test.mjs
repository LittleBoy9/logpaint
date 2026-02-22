import { createLogger } from './dist/index.mjs';

// ─── 1. Default logger (zero config) ────────────────────────────

console.log('\n=== Default Logger ===\n');

const log = createLogger();

log.debug('This is a debug message');
log.info('Server started on port 3000');
log.success('Database connected successfully');
log.warn('Deprecated API endpoint used');
log.error('Failed to read configuration file');

// ─── 2. With timestamps ─────────────────────────────────────────

console.log('\n=== With Timestamps ===\n');

const logTs = createLogger({ timestamp: true });

logTs.info('Request received');
logTs.success('Response sent in 42ms');
logTs.error('Connection timeout');

// ─── 3. Log level filtering ─────────────────────────────────────

console.log('\n=== minLevel: warn (debug & info hidden) ===\n');

const logFiltered = createLogger({ minLevel: 'warn' });

logFiltered.debug('You should NOT see this');
logFiltered.info('You should NOT see this');
logFiltered.warn('You SHOULD see this warning');
logFiltered.error('You SHOULD see this error');

// ─── 4. Custom levels ───────────────────────────────────────────

console.log('\n=== Custom Levels ===\n');

const logCustom = createLogger({
  timestamp: true,
  levels: {
    http: { color: 'brightBlue' },
    db: { color: 'brightMagenta', prefix: 'DATABASE' },
  },
});

logCustom.http('GET /api/users 200 OK');
logCustom.db('Query executed in 12ms');
logCustom.info('Default levels still work');

// ─── 5. Runtime level change with setLevel ───────────────────────

console.log('\n=== setLevel (change at runtime) ===\n');

const logRuntime = createLogger({ timestamp: true });

logRuntime.info('This info message is visible');
logRuntime.debug('This debug message is visible');

logRuntime.setLevel('error');
console.log('  (setLevel changed to "error")');

logRuntime.info('This info message is HIDDEN');
logRuntime.debug('This debug message is HIDDEN');
logRuntime.error('Only this error is visible now');

console.log('\n=== All tests passed! ===\n');
