const express = require('express');
const { asyncHandler } = require('../utils/async-handler');
const { verifyToken } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { profileSchema } = require('../validators/user.schema');
const profileService = require('../services/profile.service');

const router = express.Router();

router.get(
  '/',
  verifyToken,
  asyncHandler(async (req, res) => {
    const profile = await profileService.get(req.user.uid);
    res.json(profile);
  }),
);

router.put(
  '/',
  verifyToken,
  validate(profileSchema),
  asyncHandler(async (req, res) => {
    const profile = await profileService.update(req.user.uid, req.body);
    res.json(profile);
  }),
);

module.exports = router;
