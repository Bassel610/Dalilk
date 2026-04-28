const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 chars'),
  displayName: z.string().optional(),
});

const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).optional().default('user'),
});

const profileSchema = z.object({
  name: z.string().trim().max(80).optional().default(''),
  phone: z.string().trim().max(30).optional().default(''),
  street: z.string().trim().max(200).optional().default(''),
  building: z.string().trim().max(50).optional().default(''),
  area: z.string().trim().max(80).optional().default(''),
  conservative: z.string().trim().max(80).optional().default(''),
  locationUrl: z.string().trim().max(500).optional().default(''),
  notes: z.string().trim().max(500).optional().default(''),
});

module.exports = { registerSchema, userCreateSchema, profileSchema };
