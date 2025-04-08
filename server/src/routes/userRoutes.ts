import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import * as userController from '../controllers/userController';
import * as userSchema from '../models/schemas/userSchema';

const router = Router();

/**
 * @route GET /api/v1/users/me
 * @desc Get current user profile
 */
router.get('/me', userController.getCurrentUser);

/**
 * @route PUT /api/v1/users/me
 * @desc Update current user profile
 */
router.put(
  '/me',
  validateRequest(userSchema.updateUserSchema),
  userController.updateCurrentUser
);

/**
 * @route PATCH /api/v1/users/me/preferences
 * @desc Update user preferences
 */
router.patch(
  '/me/preferences',
  validateRequest(userSchema.updatePreferencesSchema),
  userController.updatePreferences
);

/**
 * @route POST /api/v1/users/me/photos
 * @desc Upload a user photo
 */
router.post(
  '/me/photos',
  validateRequest(userSchema.uploadPhotoSchema),
  userController.uploadPhoto
);

/**
 * @route DELETE /api/v1/users/me/photos/:photoId
 * @desc Delete a user photo
 */
router.delete(
  '/me/photos/:photoId',
  validateRequest(userSchema.deletePhotoSchema),
  userController.deletePhoto
);

/**
 * @route GET /api/v1/users/discovery
 * @desc Get discovery feed of potential matches
 */
router.get(
  '/discovery',
  validateRequest(userSchema.discoveryQuerySchema),
  userController.getDiscovery
);

/**
 * @route POST /api/v1/users/report/:userId
 * @desc Report a user
 */
router.post(
  '/report/:userId',
  validateRequest(userSchema.reportUserSchema),
  userController.reportUser
);

/**
 * @route POST /api/v1/users/block/:userId
 * @desc Block a user
 */
router.post(
  '/block/:userId',
  validateRequest(userSchema.blockUserSchema),
  userController.blockUser
);

export default router; 