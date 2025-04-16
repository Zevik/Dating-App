import prisma from '../lib/prisma';
import { BadRequestError, NotFoundError, ForbiddenError } from '../errors/AppError';

/**
 * Get system statistics for admin dashboard
 * @returns Object with various system statistics
 */
export async function getAdminStats() {
  try {
    // Get date for "last 7 days" queries
    const date7daysAgo = new Date();
    date7daysAgo.setDate(date7daysAgo.getDate() - 7);

    // Execute all queries in parallel for better performance
    const [
      totalUsers,
      activeUsers,
      totalMatches,
      totalReports,
      reportsByStatus,
      newUsersLast7Days,
      newReportsLast7Days
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),
      
      // Active users count
      prisma.user.count({
        where: { is_active: true }
      }),
      
      // Total matches count
      prisma.match.count(),
      
      // Total reports count
      prisma.report.count(),
      
      // Reports grouped by status
      prisma.report.groupBy({
        by: ['status'],
        _count: true
      }),
      
      // New users in last 7 days
      prisma.user.count({
        where: {
          created_at: { gte: date7daysAgo }
        }
      }),
      
      // New reports in last 7 days
      prisma.report.count({
        where: {
          created_at: { gte: date7daysAgo }
        }
      })
    ]);

    // Format reports by status into object
    const reportsStatus = {
      pending: 0,
      reviewed: 0,
      resolved: 0,
      rejected: 0
    };
    
    reportsByStatus.forEach(group => {
      // Only include statuses that exist in our predefined object
      if (group.status in reportsStatus) {
        reportsStatus[group.status as keyof typeof reportsStatus] = group._count;
      }
    });

    // Aggregate all statistics
    return {
      total_users: totalUsers,
      active_users: activeUsers,
      total_matches: totalMatches,
      total_reports: totalReports,
      reports_by_status: reportsStatus,
      new_users_last_7_days: newUsersLast7Days,
      new_reports_last_7_days: newReportsLast7Days
    };
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    throw error;
  }
} 