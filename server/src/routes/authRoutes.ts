import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import * as authController from '../controllers/authController';
import * as authSchema from '../models/schemas/authSchema';

const router = Router();

/**
 * @route POST /api/v1/auth/register
 * @desc Register a new user
 */
router.post(
  '/register',
  validateRequest(authSchema.registerSchema),
  authController.register
);

/**
 * @route POST /api/v1/auth/login
 * @desc Login a user
 */
router.post(
  '/login',
  validateRequest(authSchema.loginSchema),
  authController.login
);

/**
 * @route POST /api/v1/auth/refresh-token
 * @desc Refresh access token
 */
router.post(
  '/refresh-token',
  validateRequest(authSchema.refreshTokenSchema),
  authController.refreshToken
);

/**
 * @route POST /api/v1/auth/logout
 * @desc Logout a user
 */
router.post(
  '/logout',
  validateRequest(authSchema.logoutSchema),
  authController.logout
);

/**
 * @route POST /api/v1/auth/verify-email
 * @desc Verify user email
 */
router.post(
  '/verify-email',
  validateRequest(authSchema.verifyEmailSchema),
  authController.verifyEmail
);

/**
 * @route POST /api/v1/auth/resend-verification
 * @desc Resend verification email
 */
router.post(
  '/resend-verification',
  validateRequest(authSchema.resendVerificationSchema),
  authController.resendVerification
);

/**
 * @route POST /api/v1/auth/forgot-password
 * @desc Request password reset
 */
router.post(
  '/forgot-password',
  validateRequest(authSchema.forgotPasswordSchema),
  authController.forgotPassword
);

/**
 * @route POST /api/v1/auth/reset-password
 * @desc Reset password with token
 */
router.post(
  '/reset-password',
  validateRequest(authSchema.resetPasswordSchema),
  authController.resetPassword
);

export default router; 