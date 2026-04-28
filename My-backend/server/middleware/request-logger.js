const crypto = require('crypto');
const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    const fields = {
      reqId: requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      ms,
    };
    if (res.statusCode >= 500) logger.error(fields, 'request');
    else if (res.statusCode >= 400) logger.warn(fields, 'request');
    else logger.info(fields, 'request');
  });
  next();
}

module.exports = { requestLogger };
