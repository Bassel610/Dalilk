const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config');
const logger = require('./utils/logger');
const { requestLogger } = require('./middleware/request-logger');
const { errorHandler } = require('./middleware/error-handler');
const { apiLimiter } = require('./middleware/rate-limit');
const apiRoutes = require('./routes');

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict origins via .env
const allowAll = config.corsOrigins.length === 1 && config.corsOrigins[0] === '*';
app.use(
  cors({
    origin: allowAll ? true : config.corsOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// Health check
app.get('/health', (_req, res) => res.json({ ok: true, env: config.env }));

// Versioned API
app.use('/api/v1', apiLimiter, apiRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', code: 'NOT_FOUND', path: req.path });
});

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(
    { port: config.port, env: config.env },
    `Server running on http://localhost:${config.port}`,
  );
});
