const { z } = require('zod');

const addressDetailsSchema = z.object({
  Conservative: z.string().optional().default(''),
  Area: z.string().optional().default(''),
  Hay: z.string().optional().default(''),
});

const shopCreateSchema = z.object({
  Name: z.string().trim().min(1, 'Name is required'),
  LandMark: z.string().optional().default(''),
  rate: z.union([z.string(), z.number()]).optional().default(''),
  category: z.array(z.string()).optional().default([]),
  Address: z.array(z.string()).optional().default([]),
  location: z.array(z.string()).optional().default([]),
  AddressDetiles: addressDetailsSchema.optional().default({}),
});

const shopUpdateSchema = shopCreateSchema.partial();

const shopListQuerySchema = z.object({
  search: z.string().optional(),
  conservative: z.string().optional(),
  area: z.string().optional(),
  hay: z.string().optional(),
  category: z.string().optional(),
  rate: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

module.exports = { shopCreateSchema, shopUpdateSchema, shopListQuerySchema };
