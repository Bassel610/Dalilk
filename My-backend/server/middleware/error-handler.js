const { ZodError } = require('zod');
const logger = require('../utils/logger');

function errorHandler(err, req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: err.errors,
    });
  }
  const status = err.status || 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : `E${status}`);
  if (status >= 500) {
    logger.error(
      { reqId: req.id, method: req.method, path: req.path, err: err.message, stack: err.stack },
      'unhandled error',
    );
  }
  res.status(status).json({
    error: err.message || 'Internal server error',
    code,
  });
}

module.exports = { errorHandler };
