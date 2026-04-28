const express = require('express');
const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const usersRoutes = require('./users.routes');
const shopsRoutes = require('./shops.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/users', usersRoutes);
router.use('/shops', shopsRoutes);

module.exports = router;
