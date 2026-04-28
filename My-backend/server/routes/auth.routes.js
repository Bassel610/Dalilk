const express = require('express');
const { asyncHandler } = require('../utils/async-handler');
const { verifyToken } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rate-limit');
const { registerSchema } = require('../validators/user.schema');
const authService = require('../services/auth.service');

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.json(result);
  }),
);

router.get(
  '/me',
  verifyToken,
  asyncHandler(async (req, res) => {
    const result = await authService.me(req.user.uid, req.user.email);
    res.json(result);
  }),
);

router.post(
  '/sync',
  verifyToken,
  asyncHandler(async (req, res) => {
    const result = await authService.sync(req.user);
    res.json(result);
  }),
);

module.exports = router;
