const pino = require('pino');
const config = require('../config');

const logger = pino({
  level: config.logLevel,
  ...(config.isProd
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss.l',
            ignore: 'pid,hostname',
            singleLine: true,
          },
        },
      }),
});

module.exports = logger;
