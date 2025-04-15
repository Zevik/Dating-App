import prisma from '../lib/prisma';
import { BadRequestError, NotFoundError, ConflictError } from '../errors/AppError';
import { CreateReportInput } from '../validations/reportSchemas';

/**
 * Create a new report about a user
 * @param reporterId ID of the user creating the report
 * @param data Report data containing reported user ID and reason
 * @returns The created report
 */
export async function createReport(reporterId: number, data: CreateReportInput) {
  const { reported_user_id, reason } = data;

  // Validate IDs
  if (!reporterId || !reported_user_id) {
    throw new BadRequestError('Both reporter and reported user IDs are required');
  }

  // Prevent self-reporting
  if (reporterId === reported_user_id) {
    throw new BadRequestError('Users cannot report themselves');
  }

  // Verify both users exist
  const [reporter, reported] = await Promise.all([
    prisma.user.findUnique({ where: { id: reporterId } }),
    prisma.user.findUnique({ where: { id: reported_user_id } })
  ]);

  if (!reporter) {
    throw new NotFoundError('Reporter user not found');
  }

  if (!reported) {
    throw new NotFoundError('Reported user not found');
  }

  // Check if this report already exists
  const existingReport = await prisma.report.findFirst({
    where: {
      reporter_id: reporterId,
      reported_user_id: reported_user_id
    }
  });

  if (existingReport) {
    throw new ConflictError('You have already reported this user');
  }

  // Create report record
  return prisma.report.create({
    data: {
      reporter_id: reporterId,
      reported_user_id: reported_user_id,
      reason: reason
    }
  });
} 