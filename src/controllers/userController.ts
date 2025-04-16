import { Request, Response, NextFunction } from 'express';
import { getUserProfile, updateUserProfile, getDiscoveryCandidate, getOnlineUsers, updateUserStatus, getRecommendedUsers, deleteUser } from '../services/userService';
import { updateProfileSchema } from '../validations/userSchemas'; // Import validation schema
import { ZodError } from 'zod';
import { z } from 'zod';

// Schema for validating status message
const statusSchema = z.object({
  status_message: z.string().max(100)
});

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

/**
 * Get all users who are currently online (active in the last 30 seconds)
 * GET /api/v1/users/online
 */
export async function getOnlineUsersController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Get all online users except the current user
    const onlineUsers = await getOnlineUsers(userId);
    
    return res.status(200).json({
      success: true,
      count: onlineUsers.length,
      users: onlineUsers
    });
  } catch (error) {
    console.error('Error fetching online users:', error);
    next(error);
  }
}

/**
 * Update user status message
 * PUT /api/v1/users/status
 */
export async function updateUserStatusController(req: Request, res: Response, next: NextFunction) {
  try {
    // Get user ID from authenticated user
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Validate request body
    const validationResult = statusSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: 'Invalid request body',
        errors: validationResult.error.errors
      });
    }

    // Update user status
    const updatedUser = await updateUserStatus(userId, validationResult.data.status_message);

    // Return the updated user with new status
    return res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    next(error);
  }
}

/**
 * Get recommended users for discovery
 * GET /api/v1/users/discover
 */
export async function getRecommendedUsersController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Get recommended users
    const recommendedUsers = await getRecommendedUsers(userId);
    
    return res.status(200).json({
      success: true,
      count: recommendedUsers.length,
      users: recommendedUsers
    });
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    next(error);
  }
}

/**
 * Delete user account
 * DELETE /api/v1/users/me
 */
export async function deleteMyAccountController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    await deleteUser(userId);
    
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user account:', error);
    next(error);
  }
} 