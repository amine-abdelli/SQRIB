import pino from 'pino';

const baseLogger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
);
const logWrapper = {
  info: (msg: string, obj: Record<string, string> = {}) => baseLogger.info(obj, msg),
  error: (msg: string, obj: Record<string, string> = {}) => baseLogger.error(obj, msg),
  warn: (msg: string, obj: Record<string, string> = {}) => baseLogger.warn(obj, msg),
  debug: (msg: string, obj: Record<string, string> = {}) => baseLogger.debug(obj, msg),
  fatal: (msg: string, obj: Record<string, string> = {}) => baseLogger.fatal(obj, msg),
  trace: (msg: string, obj: Record<string, string> = {}) => baseLogger.trace(obj, msg),
};

export { logWrapper as log };
