import { z } from 'zod';

/**
 * Schema for validating message creation
 */
export const createMessageSchema = z.object({
  content: z.string().min(1, { message: 'Message content is required' }).max(500),
});

/**
 * Schema for updating read status of messages
 */
export const updateReadStatusSchema = z.object({
  message_ids: z.array(z.number()),
});

// Type definitions inferred from schemas
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type UpdateReadStatusInput = z.infer<typeof updateReadStatusSchema>; 