import prisma from '../lib/prisma';
import { Prisma } from '../generated/prisma'; // Import Prisma namespace for types

// Define the select object once to reuse it
const userProfileSelectFields = {
  id: true,
  email: true,
  display_name: true,
  birth_date: true,
  gender: true,
  looking_for_gender: true,
  relationship_type: true,
  city: true,
  bio: true,
  profile_image_url: true,
  additional_photos: true,
  preferred_age_min: true,
  preferred_age_max: true,
  preferred_distance_km: true,
  status_message: true,
};

export async function getUserProfile(userId: number) {
  if (!userId || typeof userId !== 'number') {
    console.error('getUserProfile called with invalid userId:', userId);
    return null;
  }

  return prisma.user.findUnique({
    where: { id: userId },
    select: userProfileSelectFields,
  });
}

// New function to update user profile
export async function updateUserProfile(userId: number, data: Prisma.UserUpdateInput) {
  if (!userId || typeof userId !== 'number') {
    console.error("updateUserProfile called with invalid userId:", userId);
    throw new Error('Invalid user ID for update'); 
  }
  
  // Convert birth_date string back to Date object if provided
  let updateData = { ...data };
  if (typeof data.birth_date === 'string') {
    updateData.birth_date = new Date(data.birth_date);
  } else {
    // Ensure birth_date is not passed as undefined if not in data
    delete updateData.birth_date;
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: userProfileSelectFields, // Reuse the same select fields
  });
}

// Function to get a potential match for discovery
export async function getDiscoveryCandidate(userId: number) {
  if (!userId || typeof userId !== 'number') {
    console.error('getDiscoveryCandidate called with invalid userId:', userId);
    throw new Error('Invalid user ID');
  }

  // First, get the current user to check their preferences
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      looking_for_gender: true,
      preferred_age_min: true,
      preferred_age_max: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Calculate min and max birth dates based on preferred age range
  const today = new Date();
  const minYear = today.getFullYear() - user.preferred_age_max;
  const maxYear = today.getFullYear() - user.preferred_age_min;
  
  const minDate = new Date(minYear, today.getMonth(), today.getDate()); // Oldest allowed (minimum birth date)
  const maxDate = new Date(maxYear, today.getMonth(), today.getDate()); // Youngest allowed (maximum birth date)

  // Get potential matches based on user preferences
  const candidates = await prisma.user.findMany({
    where: {
      id: { not: userId }, // Skip self
      gender: user.looking_for_gender.length > 0 ? { in: user.looking_for_gender } : undefined, // Match gender preferences
      birth_date: {
        lte: maxDate, // Younger than or equal to max age
        gte: minDate, // Older than or equal to min age
      },
      is_active: true, // Only active users
      // Skip users that already have a like or dislike relationship
      NOT: {
        OR: [
          { likes_from: { some: { to_user_id: userId } } },  // Skip users who already received like/dislike from current user
          { likes_to: { some: { from_user_id: userId } } },  // Skip users who already sent like/dislike to current user
        ],
      },
    },
    select: {
      id: true,
      display_name: true,
      birth_date: true,
      gender: true,
      relationship_type: true,
      city: true, 
      bio: true,
      profile_image_url: true,
      additional_photos: true,
    },
    take: 1,
    // In PostgreSQL, you can use a random order with:
    orderBy: {
      id: 'asc', // Simple ordering for now
      // For random ordering in PostgreSQL, you'd use raw SQL or an extension
    },
  });

  // Return the candidate or null if none found
  return candidates.length > 0 ? candidates[0] : null;
}

/**
 * Get all online users (users who have been seen within the last 30 seconds)
 * @param excludeUserId Optional user ID to exclude from results (e.g., current user)
 * @returns Array of basic user information for online users
 */
export async function getOnlineUsers(excludeUserId?: number) {
  const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
  
  return prisma.user.findMany({
    where: {
      last_seen_at: {
        gte: thirtySecondsAgo
      },
      ...(excludeUserId ? { id: { not: excludeUserId } } : {})
    },
    select: {
      id: true,
      display_name: true,
      profile_image_url: true,
      status_message: true,
      last_seen_at: true
    },
    orderBy: {
      last_seen_at: 'desc'
    }
  });
}

/**
 * Check if a user is currently online (seen within the last 30 seconds)
 * @param userId The ID of the user to check
 * @returns Boolean indicating if the user is online
 */
export async function isUserOnline(userId: number): Promise<boolean> {
  const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
  
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      last_seen_at: {
        gte: thirtySecondsAgo
      }
    },
    select: {
      id: true
    }
  });
  
  return !!user;
}

/**
 * Update user status message
 * @param userId The ID of the user to update status
 * @param statusMessage The new status message to set
 * @returns The updated user with the new status message
 */
export async function updateUserStatus(userId: number, statusMessage: string) {
  if (!userId || typeof userId !== 'number') {
    console.error("updateUserStatus called with invalid userId:", userId);
    throw new Error('Invalid user ID for status update');
  }
  
  return prisma.user.update({
    where: { id: userId },
    data: { 
      status_message: statusMessage,
      // Also update last_seen_at to show the user is active
      last_seen_at: new Date()
    },
    select: {
      id: true,
      display_name: true,
      status_message: true,
      last_seen_at: true
    }
  });
}
