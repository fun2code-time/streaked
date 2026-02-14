import { z } from 'zod';

// Schema for goal creation/update payload validation.
export const goalSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  duration_days: z.number().int().min(1).max(3650),
  start_date: z.string().date(),
  is_public: z.boolean().default(true)
});

// Schema for daily update creation/update payload validation.
export const updateSchema = z.object({
  content: z.string().min(2).max(1500),
  update_date: z.string().date().optional()
});
