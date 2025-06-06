import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

export {}; // Ensure it's treated as a module 