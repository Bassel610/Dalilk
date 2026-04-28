const express = require('express');
const { asyncHandler } = require('../utils/async-handler');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const { validate, validateQuery } = require('../middleware/validate');
const {
  shopCreateSchema,
  shopUpdateSchema,
  shopListQuerySchema,
} = require('../validators/shop.schema');
const shopsService = require('../services/shops.service');
const filtersService = require('../services/filters.service');

const router = express.Router();

router.get(
  '/',
  validateQuery(shopListQuerySchema),
  asyncHandler(async (req, res) => {
    const { limit, offset, ...filters } = req.query;
    const result = await shopsService.list(filters, { limit, offset });
    res.json(result);
  }),
);

router.get(
  '/filter-options',
  asyncHandler(async (_req, res) => {
    res.json(await filtersService.getOptions());
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    res.json(await shopsService.findById(req.params.id));
  }),
);

router.post(
  '/',
  verifyToken,
  requireAdmin,
  validate(shopCreateSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await shopsService.create(req.body));
  }),
);

router.put(
  '/:id',
  verifyToken,
  requireAdmin,
  validate(shopUpdateSchema),
  asyncHandler(async (req, res) => {
    res.json(await shopsService.update(req.params.id, req.body));
  }),
);

router.delete(
  '/:id',
  verifyToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await shopsService.delete(req.params.id);
    res.json({ message: 'Shop deleted' });
  }),
);

module.exports = router;
