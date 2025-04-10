import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT_SECRET should be loaded via dotenv in index.ts
const JWT_SECRET = process.env.JWT_SECRET;

// Type for the JWT payload
interface JwtPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    // Don't expose internal errors directly in production
    return res.status(500).json({ message: 'Server configuration error' }); 
  }

  try {
    // Verify the token and cast to our expected payload type
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Attach user info (userId and email) to the request object
    // Ensure the property name matches the type definition (userId)
    req.user = { userId: payload.userId, email: payload.email }; 
    
    // Add console log here for verification
    console.log('auth ok - User ID:', req.user.userId);

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Unauthorized: Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
        // Catches invalid signature, malformed token, etc.
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      // Catch any other unexpected errors during verification
      console.error("Unexpected token verification error:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
