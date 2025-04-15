import { Request, Response, NextFunction } from 'express';
import { registerUser, registerSchema, loginUser, loginSchema } from '../services/authService';
import { ZodError } from 'zod';

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { user, token } = await registerUser(validatedData);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    if (error instanceof Error && error.message.includes('already exists')) {
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { user, token } = await loginUser(validatedData);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    if (error instanceof Error && error.message === 'Invalid email or password') {
      return res.status(401).json({ message: error.message });
    }
    next(error);
  }
};
