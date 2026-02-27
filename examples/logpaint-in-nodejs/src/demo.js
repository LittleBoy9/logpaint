/**
 * logpaint Feature Demo
 * ─────────────────────────────────────────────────────────────────
 * This script demonstrates ALL features of logpaint:
 * 1. Default log levels (debug, info, success, warn, error)
 * 2. Timestamps
 * 3. All 16 ANSI colors (8 basic + 8 bright)
 * 4. Custom levels with custom prefixes and priorities
 * 5. minLevel filtering
 * 6. setLevel runtime switching
 * 7. Shorthand color syntax
 */

const { log, colorShowcase, filteredLog, simpleLog } = require('./logger');

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║             logpaint - Full Feature Demo                       ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// ─── 1. Default Levels ──────────────────────────────────────────

console.log('━━━ 1. Default Log Levels ━━━\n');

log.debug('Debug level - for development details (priority: 0)');
log.info('Info level - general information (priority: 1)');
log.success('Success level - operation completed (priority: 1)');
log.warn('Warn level - potential issues (priority: 2)');
log.error('Error level - something went wrong (priority: 3)');

// ─── 2. Custom Levels ───────────────────────────────────────────

console.log('\n━━━ 2. Custom Levels (http, db) ━━━\n');

log.http('GET /api/users 200 OK');
log.db('Query executed in 12ms');

// ─── 3. All 16 Colors ───────────────────────────────────────────

console.log('\n━━━ 3. All 16 ANSI Colors ━━━\n');

console.log('Basic Colors:');
colorShowcase.black('This is black text');
colorShowcase.red('This is red text');
colorShowcase.green('This is green text');
colorShowcase.yellow('This is yellow text');
colorShowcase.blue('This is blue text');
colorShowcase.magenta('This is magenta text');
colorShowcase.cyan('This is cyan text');
colorShowcase.white('This is white text');

console.log('\nBright Colors:');
colorShowcase.brightBlack('This is brightBlack (dim gray)');
colorShowcase.brightRed('This is brightRed');
colorShowcase.brightGreen('This is brightGreen');
colorShowcase.brightYellow('This is brightYellow');
colorShowcase.brightBlue('This is brightBlue');
colorShowcase.brightMagenta('This is brightMagenta');
colorShowcase.brightCyan('This is brightCyan');
colorShowcase.brightWhite('This is brightWhite');

// ─── 4. minLevel Filtering ──────────────────────────────────────

console.log('\n━━━ 4. minLevel Filtering (only warn and error shown) ━━━\n');

filteredLog.debug('This debug is HIDDEN (priority 0 < minLevel warn)');
filteredLog.info('This info is HIDDEN (priority 1 < minLevel warn)');
filteredLog.success('This success is HIDDEN (priority 1 < minLevel warn)');
filteredLog.warn('This warning IS visible (priority 2 >= minLevel)');
filteredLog.error('This error IS visible (priority 3 >= minLevel)');

// ─── 5. setLevel Runtime Switching ──────────────────────────────

console.log('\n━━━ 5. setLevel - Runtime Level Switching ━━━\n');

console.log('Initial state (all levels visible):');
log.debug('Debug visible');
log.info('Info visible');

console.log('\nAfter setLevel("error"):');
log.setLevel('error');
log.debug('Debug HIDDEN');
log.info('Info HIDDEN');
log.warn('Warn HIDDEN');
log.error('Only error is visible now');

console.log('\nAfter setLevel("debug") - restored:');
log.setLevel('debug');
log.debug('Debug visible again');
log.info('Info visible again');

// ─── 6. Shorthand Color Syntax ──────────────────────────────────

console.log('\n━━━ 6. Shorthand Color Syntax ━━━\n');

simpleLog.trace('Using shorthand: levels: { trace: "brightBlack" }');
simpleLog.http('Using shorthand: levels: { http: "brightBlue" }');
simpleLog.db('Using shorthand: levels: { db: "brightMagenta" }');

// ─── 7. Multiple Arguments ──────────────────────────────────────

console.log('\n━━━ 7. Multiple Arguments ━━━\n');

log.info('User:', 'Alice', 'Age:', 25, 'Active:', true);
log.debug('Payload:', JSON.stringify({ id: 1, name: 'Bob' }));

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║                     Demo Complete!                             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');
