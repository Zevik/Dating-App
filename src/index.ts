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
import blocksRouter from './routes/blocks';
import reportsRouter from './routes/reports';
import adminRouter from './routes/admin';
import { errorHandler } from './middleware/errorMiddleware';

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
app.use('/api/v1/blocks', blocksRouter);
app.use('/api/v1/reports', reportsRouter);
app.use('/api/v1/admin', adminRouter);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Global Error Handler - Must be defined AFTER all other app.use() and routes calls
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 