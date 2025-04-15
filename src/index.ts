import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load environment variables from .env.local first
// Use dotenv-expand to handle variable expansion if needed
dotenvExpand.expand(dotenv.config({ path: '.env.local' }));

import express from 'express';
import env from 'env-var';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import matchesRouter from './routes/matches';
import callsRouter from './routes/calls';

// Load environment variables
// We already check required vars in check-env.ts
// Now we read them after dotenv has loaded .env.local
const PORT = env.get('PORT').default('3000').asPortNumber();

const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/matches', matchesRouter);
app.use('/api/v1/calls', callsRouter);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Global Error Handler - Must be defined AFTER all other app.use() and routes calls
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err.stack || err);

  // Check if headers were already sent (e.g., by middleware)
  if (res.headersSent) {
    return next(err);
  }

  // Default to 500 Internal Server Error
  // You could add more specific error handling here based on error type (e.g., instanceof Prisma.PrismaClientKnownRequestError)
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 