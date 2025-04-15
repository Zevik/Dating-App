import { Request, Response, NextFunction } from 'express';
import { getUserProfile, updateUserProfile, getDiscoveryCandidate } from '../services/userService';
import { updateProfileSchema } from '../validations/userSchemas'; // Import validation schema
import { ZodError } from 'zod';

export async function getMyProfileController(req: Request, res: Response, next: NextFunction) {
  try {
    // Use userId from the type definition
    const userId = req.user?.userId; 
    if (!userId) {
      // This case implies the token was invalid or middleware failed, 
      // but middleware should handle sending 401 already.
      // Adding a safeguard just in case.
      return res.status(401).json({ message: 'Unauthorized: User ID not found in token payload' });
    }

    const profile = await getUserProfile(userId);
    
    if (!profile) {
      // This means the user existed when the token was issued, but not anymore.
      return res.status(404).json({ message: 'User not found' }); 
    }

    res.json(profile);
  } catch (error) {
    // Pass database or other unexpected errors to the error handler
    next(error); 
  }
}

// New controller for updating profile
export async function updateMyProfileController(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body
    const validatedData = updateProfileSchema.parse(req.body);

    // Get userId from authenticated user
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Call the service to update the profile
    const updatedProfile = await updateUserProfile(userId, validatedData);

    // Return the updated profile
    res.status(200).json(updatedProfile);

  } catch (error) {
    if (error instanceof ZodError) {
      // Handle validation errors
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: error.flatten().fieldErrors // Use flatten for a structured error response
      });
    } 
    // Handle potential errors from service (like user not found during update, though less likely)
    // Or pass other errors to the global handler
    console.error("Error updating user profile:", error);
    next(error);
  }
}

// Controller for discovering potential matches
export async function getDiscoveryCandidateController(req: Request, res: Response, next: NextFunction) {
  try {
    // Get userId from authenticated user
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Call the service to get a potential match
    const candidate = await getDiscoveryCandidate(userId);

    // If no candidates are found
    if (!candidate) {
      return res.status(404).json({ message: 'No more candidates available' });
    }

    // Return the candidate
    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error getting discovery candidate:", error);
    next(error);
  }
} 