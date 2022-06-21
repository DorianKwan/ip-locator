import Koa from 'koa';
import { Logger } from 'winston';

export const createServer = async (app: Koa, port: number, logger: Logger) => {
  const server = app.listen(port, () => {
    logger.info(`Listening for HTTP on port ${port}`);
  });

  Object.entries({ SIGINT: 0, SIGTERM: 0 }).forEach(([signal, exitCode]) => {
    process.on(signal, () => {
      logger.warn(
        `Received '${signal}' signal. Gracefully shutting down server`,
      );
      server.close(() => process.exit(exitCode));
    });
  });

  process.on('unhandledRejection', error =>
    logger.error(error || 'unhandled promise rejection'),
  );

  return server;
};
