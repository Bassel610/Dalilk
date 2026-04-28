const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const env = (key, fallback) => process.env[key] ?? fallback;

const config = {
  env: env('NODE_ENV', 'development'),
  port: Number(env('PORT', 5000)),
  isProd: env('NODE_ENV') === 'production',
  corsOrigins: env('CORS_ORIGINS', '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  firebase: {
    serviceAccountPath: env(
      'FIREBASE_SERVICE_ACCOUNT',
      './firebase-service-account.json',
    ),
  },
  filterOptionsTtlMs: Number(env('FILTER_OPTIONS_TTL_MS', 30000)),
  logLevel: env('LOG_LEVEL', 'info'),
};

module.exports = config;
