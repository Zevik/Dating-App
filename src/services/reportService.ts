import prisma from '../lib/prisma';
import { BadRequestError, NotFoundError, ConflictError } from '../errors/AppError';
import { CreateReportInput, UpdateReportStatusInput } from '../validations/reportSchemas';

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

/**
 * Get all reports created by a user
 * @param userId ID of the user whose reports to retrieve
 * @returns Array of reports with basic information about reported users
 */
export async function getUserReports(userId: number) {
  return prisma.report.findMany({
    where: {
      reporter_id: userId
    },
    select: {
      id: true,
      reason: true,
      created_at: true,
      reported_user_id: true,
      reported: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });
}

/**
 * Check if either user has reported the other
 * @param userId1 First user ID
 * @param userId2 Second user ID
 * @returns Boolean indicating if either user has reported the other
 */
export async function hasReportBetweenUsers(userId1: number, userId2: number): Promise<boolean> {
  if (!userId1 || !userId2) {
    return false;
  }

  // Check if either user has reported the other
  const reportCount = await prisma.report.count({
    where: {
      OR: [
        { reporter_id: userId1, reported_user_id: userId2 },
        { reporter_id: userId2, reported_user_id: userId1 }
      ]
    }
  });

  return reportCount > 0;
}

/**
 * Get all reports for admin review
 * @returns Array of all reports with user details
 */
export async function getAllReports() {
  return prisma.report.findMany({
    select: {
      id: true,
      reason: true,
      status: true,
      created_at: true,
      reporter: {
        select: {
          id: true,
          display_name: true,
          email: true,
          profile_image_url: true
        }
      },
      reported: {
        select: {
          id: true,
          display_name: true,
          email: true,
          profile_image_url: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });
}

/**
 * Update a report status
 * @param reportId ID of the report to update
 * @param data New status data
 * @returns Updated report
 */
export async function updateReportStatus(reportId: number, data: UpdateReportStatusInput) {
  // Check if report exists
  const report = await prisma.report.findUnique({
    where: { id: reportId }
  });

  if (!report) {
    throw new NotFoundError('Report not found');
  }

  // Update report status
  return prisma.report.update({
    where: { id: reportId },
    data: {
      status: data.status
    },
    select: {
      id: true,
      reason: true,
      status: true,
      created_at: true,
      reporter: {
        select: {
          id: true,
          display_name: true
        }
      },
      reported: {
        select: {
          id: true,
          display_name: true
        }
      }
    }
  });
} 