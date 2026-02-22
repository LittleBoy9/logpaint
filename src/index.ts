// ─── ANSI Color Map ──────────────────────────────────────────────

const COLORS: Record<string, string> = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

// ─── Types ───────────────────────────────────────────────────────

export type ANSIColor =
  | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'
  | 'brightBlack' | 'brightRed' | 'brightGreen' | 'brightYellow'
  | 'brightBlue' | 'brightMagenta' | 'brightCyan' | 'brightWhite';

export interface LevelConfig {
  color: ANSIColor;
  prefix?: string;
  priority?: number;
}

type DefaultLevel = 'debug' | 'info' | 'success' | 'warn' | 'error';

export interface LoggerConfig<T extends string = never> {
  timestamp?: boolean;
  minLevel?: DefaultLevel | T;
  levels?: Record<T, ANSIColor | LevelConfig>;
}

export type LogFunction = (...args: unknown[]) => void;

export type Logger<T extends string = never> = Record<DefaultLevel | T, LogFunction> & {
  setLevel: (level: DefaultLevel | T) => void;
};

// ─── Default Levels ──────────────────────────────────────────────

interface ResolvedLevel {
  color: ANSIColor;
  prefix: string;
  priority: number;
}

const DEFAULT_LEVELS: Record<DefaultLevel, ResolvedLevel> = {
  debug:   { color: 'magenta', prefix: 'DEBUG',   priority: 0 },
  info:    { color: 'cyan',    prefix: 'INFO',    priority: 1 },
  success: { color: 'green',   prefix: 'SUCCESS', priority: 1 },
  warn:    { color: 'yellow',  prefix: 'WARN',    priority: 2 },
  error:   { color: 'red',     prefix: 'ERROR',   priority: 3 },
};

// ─── Helpers ─────────────────────────────────────────────────────

function formatTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function resolveLevel(name: string, value: ANSIColor | LevelConfig): ResolvedLevel {
  if (typeof value === 'string') {
    return { color: value, prefix: name.toUpperCase(), priority: 1 };
  }
  return {
    color: value.color,
    prefix: value.prefix ?? name.toUpperCase(),
    priority: value.priority ?? 1,
  };
}

// ─── createLogger ────────────────────────────────────────────────

export function createLogger<T extends string = never>(
  config?: LoggerConfig<T>
): Logger<T> {
  const { timestamp = false, minLevel, levels: userLevels } = config ?? {};

  const allLevels: Record<string, ResolvedLevel> = { ...DEFAULT_LEVELS };

  if (userLevels) {
    for (const [name, value] of Object.entries<ANSIColor | LevelConfig>(userLevels)) {
      allLevels[name] = resolveLevel(name, value);
    }
  }

  let currentMinPriority = minLevel ? (allLevels[minLevel]?.priority ?? 0) : -1;

  const logger = {} as Logger<T>;

  for (const [name, level] of Object.entries(allLevels)) {
    (logger as Record<string, LogFunction>)[name] = (...args: unknown[]) => {
      if (level.priority < currentMinPriority) return;

      const colorCode = COLORS[level.color] ?? '';
      const reset = COLORS.reset;
      const dim = COLORS.brightBlack;

      const parts: string[] = [];

      if (timestamp) {
        parts.push(`${dim}${formatTimestamp()}${reset}`);
      }

      parts.push(`${colorCode}[${level.prefix}]${reset}`);
      parts.push(args.map(String).join(' '));

      console.log(parts.join(' '));
    };
  }

  logger.setLevel = (level: DefaultLevel | T) => {
    currentMinPriority = allLevels[level as string]?.priority ?? 0;
  };

  return logger;
}
