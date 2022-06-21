import winston from 'winston';
import { Console, File } from 'winston/lib/winston/transports';

export interface Options {
  name?: string;
  debug?: boolean;
  level?: string;
  stdout?: boolean;
  silent?: boolean;
  logFile?: string;
}

const defaultName = 'default';
const defaultLevel = 'info';
const defaultSTDOUT = true;
const defaultSilence = false;
const isDev = process.env.NODE_ENV === 'development';

export const createLogger = (options?: Options) => {
  const {
    name = defaultName,
    debug = isDev,
    level = defaultLevel,
    stdout = defaultSTDOUT,
    silent = defaultSilence,
    logFile = undefined,
  } = options || {};

  if (winston.loggers.has(name)) {
    throw new Error(`Logger with the name ${name} already exists!`);
  }

  let formatter = winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json(),
  );

  if (debug) {
    formatter = winston.format.combine(
      formatter,
      winston.format.colorize(),
      winston.format.simple(),
    );
  }

  const logger = winston.loggers.add(name, {
    silent,
    format: formatter,
    transports: [
      ...(stdout ? [new Console()] : []),
      ...(logFile ? [new File({ filename: logFile })] : []),
    ],
  });

  logger.level = level;

  return logger;
};

export const getLogger = (name: string = defaultName) => {
  if (winston.loggers.has(name)) {
    return winston.loggers.get(name);
  }
};
