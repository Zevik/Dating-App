import express from 'express';
import { register, loginUserController } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUserController);

export default router;
