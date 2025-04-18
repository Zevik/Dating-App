import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import adminRouter from '../src/routes/admin';

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';

// Mock the prisma client
jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      count: jest.fn().mockResolvedValue(10),
    },
    match: {
      count: jest.fn().mockResolvedValue(5),
    },
    report: {
      count: jest.fn().mockResolvedValue(3),
      groupBy: jest.fn().mockResolvedValue([
        { status: 'pending', _count: 2 },
        { status: 'resolved', _count: 1 }
      ]),
    },
  },
}));

// Mock authentication middleware
jest.mock('../src/middleware/authMiddleware', () => ({
  authenticate: jest.fn((req, res, next) => {
    req.user = { userId: 1 };
    next();
  }),
}));

// Mock admin middleware
jest.mock('../src/middleware/adminMiddleware', () => ({
  requireAdmin: jest.fn((req, res, next) => {
    next();
  }),
}));

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/v1/admin', adminRouter);

describe('GET /admin/stats', () => {
  it('returns 200 with stats', async () => {
    const res = await request(app)
      .get('/api/v1/admin/stats')
      .set('Authorization', 'Bearer test-token');
    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toBeDefined();
    expect(res.body.stats).toHaveProperty('total_users');
  });
}); 