# logpaint

Configure once, log everywhere — a lightweight, zero-dependency colored logger for Node.js with full TypeScript support.

---

## Installation

```bash
npm i logpaint
```

---

## Features

- Zero runtime dependencies
- Configure log levels and colors once, use everywhere
- Built-in levels: `debug`, `info`, `success`, `warn`, `error`
- Custom levels with full TypeScript IntelliSense
- Timestamps and prefixes
- Log level filtering (`minLevel`) and runtime switching (`setLevel`)
- Dual CJS + ESM support

---

## Quick Start

```ts
import { createLogger } from 'logpaint';

const log = createLogger();

log.info('Server started on port 3000');
log.success('Database connected');
log.warn('Deprecated API endpoint used');
log.error('Failed to read config file');
log.debug('Request payload: { id: 42 }');
```

```
[INFO] Server started on port 3000
[SUCCESS] Database connected
[WARN] Deprecated API endpoint used
[ERROR] Failed to read config file
[DEBUG] Request payload: { id: 42 }
```

---

## With Timestamps

```ts
const log = createLogger({ timestamp: true });

log.info('Request received');
log.error('Connection timeout');
```

```
2026-02-22 10:30:45 [INFO] Request received
2026-02-22 10:30:45 [ERROR] Connection timeout
```

---

## Log Level Filtering

Set `minLevel` to hide lower-priority logs (e.g., hide `debug` in production).

```ts
const log = createLogger({ minLevel: 'warn' });

log.debug('Hidden');    // suppressed (priority 0)
log.info('Hidden');     // suppressed (priority 1)
log.warn('Visible');    // shown (priority 2)
log.error('Visible');   // shown (priority 3)
```

### Default Priority Table

| Level     | Color   | Priority |
|-----------|---------|----------|
| `debug`   | magenta | 0        |
| `info`    | cyan    | 1        |
| `success` | green   | 1        |
| `warn`    | yellow  | 2        |
| `error`   | red     | 3        |

---

## Custom Levels

Add your own levels — they're fully typed in TypeScript.

```ts
const log = createLogger({
  timestamp: true,
  levels: {
    http: { color: 'brightBlue' },
    db: { color: 'brightMagenta', prefix: 'DATABASE' },
  },
});

log.http('GET /api/users 200 OK');
log.db('Query executed in 12ms');
log.info('Default levels still work');
```

```
2026-02-22 10:30:45 [HTTP] GET /api/users 200 OK
2026-02-22 10:30:45 [DATABASE] Query executed in 12ms
2026-02-22 10:30:45 [INFO] Default levels still work
```

You can also pass a color string directly for simpler config:

```ts
const log = createLogger({
  levels: {
    http: 'brightBlue',
    db: 'brightMagenta',
  },
});
```

---

## Runtime Level Switching

Change the minimum log level at runtime with `setLevel`.

```ts
const log = createLogger();

log.info('Visible');

log.setLevel('error');   // now only errors are shown

log.info('Hidden');
log.error('Visible');
```

---

## CommonJS Usage

```js
const { createLogger } = require('logpaint');

const log = createLogger({ timestamp: true });

log.info('Works with require() too');
```

---

## Available Colors

| Basic Colors | Bright Colors     |
|-------------|-------------------|
| `black`     | `brightBlack`     |
| `red`       | `brightRed`       |
| `green`     | `brightGreen`     |
| `yellow`    | `brightYellow`    |
| `blue`      | `brightBlue`      |
| `magenta`   | `brightMagenta`   |
| `cyan`      | `brightCyan`      |
| `white`     | `brightWhite`     |

---

## API Reference

### `createLogger(config?)`

Returns a logger object with methods for each level.

#### Config Options

| Option      | Type                                    | Default     | Description                        |
|-------------|-----------------------------------------|-------------|------------------------------------|
| `timestamp` | `boolean`                               | `false`     | Prepend timestamp to each log      |
| `minLevel`  | `string`                                | `undefined` | Minimum priority level to display  |
| `levels`    | `Record<string, ANSIColor \| LevelConfig>` | `undefined` | Custom levels to add               |

#### LevelConfig

| Field      | Type        | Default                | Description           |
|------------|-------------|------------------------|-----------------------|
| `color`    | `ANSIColor` | required               | Color for this level  |
| `prefix`   | `string`    | level name (uppercase) | Label in brackets     |
| `priority` | `number`    | `1`                    | Priority for filtering|

#### Logger Methods

| Method              | Description                              |
|---------------------|------------------------------------------|
| `log.debug(...args)` | Log at debug level (priority 0)         |
| `log.info(...args)`  | Log at info level (priority 1)          |
| `log.success(...args)` | Log at success level (priority 1)    |
| `log.warn(...args)`  | Log at warn level (priority 2)          |
| `log.error(...args)` | Log at error level (priority 3)         |
| `log.setLevel(level)` | Change minimum level at runtime        |

---

## License

MIT © [Sounak Das](https://github.com/LittleBoy9)
