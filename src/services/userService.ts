import prisma from '../lib/prisma';
import { Prisma } from '../generated/prisma'; // Import Prisma namespace for types
import { PaginationParams, PaginatedResult } from '../utils/paginationUtils';
import { calculateDistance } from '../utils/geoUtils';

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

/**
 * Get recommended users for discovery feed
 * @param userId The ID of the user to find recommendations for
 * @returns Array of recommended users with basic profile information
 */
export async function getRecommendedUsers(userId: number) {
  // Verify user exists and get their preferences
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      gender: true,
      looking_for_gender: true,
      city: true,
      latitude: true,
      longitude: true,
      preferred_age_min: true,
      preferred_age_max: true,
      preferred_distance_km: true,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Calculate min and max birth dates based on preferred age range
  const today = new Date();
  const minYear = today.getFullYear() - user.preferred_age_max;
  const maxYear = today.getFullYear() - user.preferred_age_min;
  
  const minDate = new Date(minYear, today.getMonth(), today.getDate()); // Oldest allowed
  const maxDate = new Date(maxYear, today.getMonth(), today.getDate()); // Youngest allowed

  // Get all users that meet the following criteria:
  // - Not the current user
  // - Gender matches the user's preferences
  // - Age within the preferred range
  // - Not blocked or reported by the user
  // - Not already liked or disliked by the user
  const recommendedUsers = await prisma.user.findMany({
    where: {
      id: { not: userId }, // Exclude self
      
      // Match gender preferences if specified
      gender: user.looking_for_gender?.length > 0 
        ? { in: user.looking_for_gender } 
        : undefined,
      
      // Match age preferences
      birth_date: {
        lte: maxDate, // Younger than or equal to max age
        gte: minDate, // Older than or equal to min age
      },
      
      // Must be active
      is_active: true,
      
      // Exclude users with an existing like/dislike relationship
      NOT: {
        OR: [
          // Users the current user has already liked/disliked
          { likes_to: { some: { from_user_id: userId } } },
          
          // Users who have already liked/disliked the current user
          { likes_from: { some: { to_user_id: userId } } },
          
          // Users the current user has blocked
          { blocks_made: { some: { blocker_id: userId } } },
          
          // Users who have blocked the current user
          { blocks_received: { some: { blocked_id: userId } } },
          
          // Users the current user has reported
          { reports_received: { some: { reporter_id: userId } } },
          
          // Users who have reported the current user
          { reports_made: { some: { reported_user_id: userId } } },
        ]
      }
    },
    select: {
      id: true,
      display_name: true,
      gender: true,
      city: true,
      bio: true,
      profile_image_url: true,
      birth_date: true,
      status_message: true,
      latitude: true,
      longitude: true,
    },
    // Take more users so we can sort by distance later
    take: 100,
    // Base ordering before we apply our custom distance sorting
    orderBy: [
      // Default sort
      { id: 'asc' }
    ]
  });
  
  // Calculate age and distance for each user
  const usersWithDetails = recommendedUsers.map(u => {
    // Calculate age
    const birthDate = new Date(u.birth_date);
    const age = today.getFullYear() - birthDate.getFullYear() - 
                (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
    
    // Calculate distance if both user and candidate have coordinates
    let distance: number | null = null;
    if (user.latitude != null && user.longitude != null && u.latitude != null && u.longitude != null) {
      distance = calculateDistance(user.latitude, user.longitude, u.latitude, u.longitude);
    }
    
    return {
      ...u,
      age,
      distance_km: distance,
      latitude: undefined,  // Remove raw coordinates from response
      longitude: undefined, // Remove raw coordinates from response
      birth_date: undefined // Remove birth_date from response
    };
  });
  
  // Sort users by:
  // 1. First, those with distance (meaning they have coordinates) sorted by closest
  // 2. Then, those without distance (no coordinates)
  const sortedUsers = usersWithDetails.sort((a, b) => {
    // If both have distance, sort by closest
    if (a.distance_km !== null && b.distance_km !== null) {
      return a.distance_km - b.distance_km;
    }
    
    // If only a has distance, a comes first
    if (a.distance_km !== null && b.distance_km === null) {
      return -1;
    }
    
    // If only b has distance, b comes first
    if (a.distance_km === null && b.distance_km !== null) {
      return 1;
    }
    
    // If neither has distance, sort by ID
    return a.id - b.id;
  });
  
  // Filter for distance if needed and user has coordinates
  let filteredUsers = sortedUsers;
  if (user.latitude != null && user.longitude != null && user.preferred_distance_km > 0) {
    filteredUsers = sortedUsers.filter(u => {
      // Keep users with no distance info
      if (u.distance_km === null) return true;
      
      // Filter by preferred distance
      return u.distance_km <= user.preferred_distance_km;
    });
  }
  
  // Return only the top 20 matches
  return filteredUsers.slice(0, 20);
}
