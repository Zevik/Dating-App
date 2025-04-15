import { z } from 'zod';

// Schema for creating a new report
export const createReportSchema = z.object({
  reported_user_id: z.number().int().positive(), // Must be a positive integer
  reason: z.string().max(300, 'Reason cannot exceed 300 characters')
});

export type CreateReportInput = z.infer<typeof createReportSchema>; 