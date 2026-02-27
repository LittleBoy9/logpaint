<div align="center">

# logpaint

**Configure once, log everywhere.**

A lightweight, zero-dependency colored logger for Node.js with full TypeScript support.
Custom log levels, timestamps, level filtering, and runtime switching — all in one tiny package.

[![npm version](https://img.shields.io/npm/v/logpaint.svg?style=flat-square)](https://www.npmjs.com/package/logpaint)
[![npm downloads](https://img.shields.io/npm/dm/logpaint.svg?style=flat-square)](https://www.npmjs.com/package/logpaint)
[![license](https://img.shields.io/npm/l/logpaint.svg?style=flat-square)](./LICENSE)
[![node](https://img.shields.io/node/v/logpaint.svg?style=flat-square)](https://www.npmjs.com/package/logpaint)

[Website](https://littleboy9.github.io/logpaint/) · [npm](https://www.npmjs.com/package/logpaint) · [Report a Bug](https://github.com/LittleBoy9/logpaint/issues)

</div>

---

## Table of Contents

- [Why logpaint?](#why-logpaint)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [With Timestamps](#with-timestamps)
- [Log Level Filtering](#log-level-filtering)
- [Custom Levels](#custom-levels)
- [Runtime Level Switching](#runtime-level-switching)
- [CommonJS Usage](#commonjs-usage)
- [Available Colors](#available-colors)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Why logpaint?

Most logging libraries are designed for production-grade infrastructure — they're heavy, complex, and need configuration files, transports, and plugins just to get colored output.

**logpaint** does one thing well: it gives your Node.js app beautiful, colored console logs with a single function call. No config files. No transports. No dependencies. Just install, call `createLogger()`, and your terminal comes to life.

| Feature | logpaint | chalk | winston | pino |
|---|---|---|---|---|
| Zero dependencies | ✅ | ✅ | ❌ | ❌ |
| Built-in log levels | ✅ | ❌ | ✅ | ✅ |
| Custom levels (typed) | ✅ | ❌ | ✅ | ❌ |
| Level filtering | ✅ | ❌ | ✅ | ✅ |
| Runtime level switching | ✅ | ❌ | ✅ | ❌ |
| ESM + CJS | ✅ | ✅ | ✅ | ✅ |
| TypeScript generics | ✅ | ✅ | ❌ | ✅ |

---

## Features

- **Zero runtime dependencies** — pure Node.js, nothing to audit or update
- **5 built-in levels** — `debug`, `info`, `success`, `warn`, `error` — ready out of the box
- **Custom log levels** — add `http`, `db`, `query`, or anything else, fully typed in TypeScript
- **Timestamps** — enable with a single flag (`YYYY-MM-DD HH:MM:SS` format)
- **Level filtering** — set `minLevel` to suppress noise in production
- **Runtime switching** — change log level on the fly with `setLevel()`, no restart needed
- **TypeScript generics** — custom level methods get full IntelliSense autocomplete
- **Dual CJS + ESM** — works with `import` and `require()` out of the box

---

## Installation

```bash
# npm
npm install logpaint

# yarn
yarn add logpaint

# pnpm
pnpm add logpaint
```

**Requirements:** Node.js ≥ 14

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

Output (colors rendered in your terminal):

```
[INFO]    Server started on port 3000
[SUCCESS] Database connected
[WARN]    Deprecated API endpoint used
[ERROR]   Failed to read config file
[DEBUG]   Request payload: { id: 42 }
```

---

## With Timestamps

Pass `timestamp: true` to prepend a `YYYY-MM-DD HH:MM:SS` timestamp to every log line.

```ts
import { createLogger } from 'logpaint';

const log = createLogger({ timestamp: true });

log.info('Request received');
log.success('Response sent in 42ms');
log.error('Connection timeout');
```

```
2026-02-22 10:30:45 [INFO]    Request received
2026-02-22 10:30:45 [SUCCESS] Response sent in 42ms
2026-02-22 10:30:45 [ERROR]   Connection timeout
```

---

## Log Level Filtering

Set `minLevel` to suppress all logs below a certain priority. Useful for silencing debug/info noise in production.

```ts
import { createLogger } from 'logpaint';

const log = createLogger({ minLevel: 'warn' });

log.debug('Hidden');   // suppressed — priority 0 < 2
log.info('Hidden');    // suppressed — priority 1 < 2
log.warn('Visible');   // shown — priority 2 ≥ 2
log.error('Visible');  // shown — priority 3 ≥ 2
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

Add your own log levels with custom colors, prefixes, and priorities. They're fully typed — TypeScript will give you autocomplete on `log.http()`, `log.db()`, etc.

```ts
import { createLogger } from 'logpaint';

const log = createLogger({
  timestamp: true,
  levels: {
    http: { color: 'brightBlue' },
    db:   { color: 'brightMagenta', prefix: 'DATABASE' },
  },
});

log.http('GET /api/users 200 OK');
log.db('Query executed in 12ms');
log.info('Default levels still work');
```

```
2026-02-22 10:30:45 [HTTP]     GET /api/users 200 OK
2026-02-22 10:30:45 [DATABASE] Query executed in 12ms
2026-02-22 10:30:45 [INFO]     Default levels still work
```

You can also pass a color name directly as a shorthand:

```ts
import { createLogger } from 'logpaint';

const log = createLogger({
  levels: {
    http: 'brightBlue',
    db:   'brightMagenta',
  },
});
```

---

## Runtime Level Switching

Change the minimum log level at any point during execution using `setLevel()`. No process restart needed — useful for toggling verbose output in long-running servers.

```ts
import { createLogger } from 'logpaint';

const log = createLogger();

log.info('Visible');        // shown

log.setLevel('error');      // from now on, only show errors

log.info('Hidden');         // suppressed
log.error('Visible');       // shown
```

---

## CommonJS Usage

logpaint ships both ESM and CJS builds. Use `require()` if you're not using ES modules.

```js
const { createLogger } = require('logpaint');

const log = createLogger({ timestamp: true });

log.info('Works with require() too');
log.success('CJS + ESM — your choice');
```

---

## Available Colors

Use any of these color names in `color` fields for built-in or custom levels.

| Basic        | Bright              |
|--------------|---------------------|
| `black`      | `brightBlack`       |
| `red`        | `brightRed`         |
| `green`      | `brightGreen`       |
| `yellow`     | `brightYellow`      |
| `blue`       | `brightBlue`        |
| `magenta`    | `brightMagenta`     |
| `cyan`       | `brightCyan`        |
| `white`      | `brightWhite`       |

---

## API Reference

### `createLogger(config?)`

Creates and returns a logger instance. All built-in level methods and any custom level methods are available on the returned object.

#### Config Options

| Option      | Type                                       | Default     | Description                              |
|-------------|--------------------------------------------|-------------|------------------------------------------|
| `timestamp` | `boolean`                                  | `false`     | Prepend `YYYY-MM-DD HH:MM:SS` to each log |
| `minLevel`  | `string`                                   | `undefined` | Minimum priority level to display        |
| `levels`    | `Record<string, ANSIColor \| LevelConfig>` | `undefined` | Custom levels to add alongside built-ins |

#### LevelConfig

| Field      | Type        | Default                | Description                          |
|------------|-------------|------------------------|--------------------------------------|
| `color`    | `ANSIColor` | required               | ANSI color name for this level       |
| `prefix`   | `string`    | level name (uppercase) | Label shown in brackets, e.g. `[DB]` |
| `priority` | `number`    | `1`                    | Priority used for `minLevel` filtering |

#### Logger Methods

| Method                | Description                              |
|-----------------------|------------------------------------------|
| `log.debug(...args)`  | Log at debug level (priority 0)          |
| `log.info(...args)`   | Log at info level (priority 1)           |
| `log.success(...args)`| Log at success level (priority 1)        |
| `log.warn(...args)`   | Log at warn level (priority 2)           |
| `log.error(...args)`  | Log at error level (priority 3)          |
| `log.setLevel(level)` | Change minimum log level at runtime      |

---

## Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Make your changes and run `npm test`
4. Open a pull request

Please open an [issue](https://github.com/LittleBoy9/logpaint/issues) first for large changes so we can discuss the approach.

---

## License

MIT © [Sounak Das](https://github.com/LittleBoy9)
