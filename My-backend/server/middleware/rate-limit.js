const rateLimit = require('express-rate-limit');

const standardOpts = {
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, slow down.', code: 'RATE_LIMITED' },
};

const authLimiter = rateLimit({
  ...standardOpts,
  windowMs: 15 * 60 * 1000,
  limit: 20,
});

const apiLimiter = rateLimit({
  ...standardOpts,
  windowMs: 60 * 1000,
  limit: 200,
});

module.exports = { authLimiter, apiLimiter };
