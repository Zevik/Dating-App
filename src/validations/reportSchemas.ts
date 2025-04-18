import { z } from 'zod';

// Schema for creating a report
export const createReportSchema = z.object({
  reported_user_id: z.number().int().positive('User ID must be a positive integer'),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason too long')
});

// Schema for updating a report status
export const updateReportStatusSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'resolved', 'rejected'], {
    errorMap: () => ({ message: 'Status must be one of: pending, reviewed, resolved, rejected' })
  })
});

// Schema for updating a report's admin note
export const updateReportNoteSchema = z.object({
  note: z.string().max(1000, 'Note too long').optional()
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportStatusInput = z.infer<typeof updateReportStatusSchema>;
export type UpdateReportNoteInput = z.infer<typeof updateReportNoteSchema>; 