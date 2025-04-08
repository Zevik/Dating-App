import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import * as callController from '../controllers/callController';
import * as callSchema from '../models/schemas/callSchema';

const router = Router();

/**
 * @route POST /api/v1/calls/initiate/:matchId
 * @desc Initiate a call with a match
 */
router.post(
  '/initiate/:matchId',
  validateRequest(callSchema.initiateCallSchema),
  callController.initiateCall
);

/**
 * @route POST /api/v1/calls/:callId/answer
 * @desc Answer an incoming call
 */
router.post(
  '/:callId/answer',
  validateRequest(callSchema.answerCallSchema),
  callController.answerCall
);

/**
 * @route POST /api/v1/calls/:callId/reject
 * @desc Reject an incoming call
 */
router.post(
  '/:callId/reject',
  validateRequest(callSchema.rejectCallSchema),
  callController.rejectCall
);

/**
 * @route POST /api/v1/calls/:callId/end
 * @desc End an ongoing call
 */
router.post(
  '/:callId/end',
  validateRequest(callSchema.endCallSchema),
  callController.endCall
);

/**
 * @route POST /api/v1/calls/:callId/extend
 * @desc Extend an ongoing call
 */
router.post(
  '/:callId/extend',
  validateRequest(callSchema.extendCallSchema),
  callController.extendCall
);

/**
 * @route POST /api/v1/calls/:callId/upgrade
 * @desc Upgrade call (e.g., audio to video)
 */
router.post(
  '/:callId/upgrade',
  validateRequest(callSchema.upgradeCallSchema),
  callController.upgradeCall
);

export default router; 