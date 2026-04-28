const express = require('express');
const { asyncHandler } = require('../utils/async-handler');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { userCreateSchema } = require('../validators/user.schema');
const usersService = require('../services/users.service');

const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.json(await usersService.list());
  }),
);

router.post(
  '/',
  validate(userCreateSchema),
  asyncHandler(async (req, res) => {
    res.json(await usersService.create(req.body));
  }),
);

router.delete(
  '/:uid',
  asyncHandler(async (req, res) => {
    await usersService.delete(req.params.uid, req.user.uid);
    res.json({ message: 'User deleted' });
  }),
);

module.exports = router;
