import { z } from 'zod';

// Enum for gender to ensure consistency
const genderEnum = z.enum(['male', 'female', 'other']);

export const updateProfileSchema = z.object({
  display_name: z.string().min(1, 'Display name is required').max(50, 'Display name too long').optional(),
  // Use coerce.date() for automatic conversion and validation, but API receives string
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format YYYY-MM-DD').optional()
    .refine((dateStr) => {
      if (!dateStr) return true; // Allow optional
      const birth = new Date(dateStr);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 18;
    }, { message: "Must be at least 18 years old" }).optional(),
  gender: genderEnum.optional(),
  looking_for_gender: z.array(genderEnum).optional(), // Array of valid genders
  relationship_type: z.array(z.string()).optional(), // Array of strings
  city: z.string().max(100, 'City name too long').optional(),
  bio: z.string().max(500, 'Bio too long').optional(),
  profile_image_url: z.string().url('Invalid URL').optional().or(z.literal('')).optional(), // Allow empty string or valid URL
  additional_photos: z.array(z.string().url('Invalid URL in additional photos')).optional(),
  preferred_age_min: z.number().int().min(18, 'Minimum preferred age is 18').optional(),
  preferred_age_max: z.number().int().optional(), // Max age validation depends on min age
  preferred_distance_km: z.number().int().positive('Distance must be positive').optional(),
}).partial() // Mark all fields as optional explicitly
.refine(data => {
    // Validate that max age is >= min age if both are provided
    if (data.preferred_age_min !== undefined && data.preferred_age_max !== undefined) {
        return data.preferred_age_max >= data.preferred_age_min;
    }
    return true; // Pass if one or both are missing
}, { message: "Maximum preferred age must be greater than or equal to minimum preferred age", path: ['preferred_age_max'] }); // Specify path for error message

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>; 