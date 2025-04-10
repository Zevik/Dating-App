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
