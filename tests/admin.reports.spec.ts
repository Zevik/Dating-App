import request from 'supertest';
import express from 'express';
import adminRouter from '../src/routes/admin';

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';

// Mock the prisma client
jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  default: {
    report: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          reason: 'Inappropriate behavior',
          status: 'pending',
          created_at: new Date().toISOString(),
          reporter: {
            id: 101,
            display_name: 'Test Reporter',
            email: 'reporter@example.com',
            profile_image_url: null
          },
          reported: {
            id: 102,
            display_name: 'Test Reported User',
            email: 'reported@example.com',
            profile_image_url: null
          }
        }
      ]),
      update: jest.fn().mockImplementation((args) => {
        return Promise.resolve({
          id: Number(args.where.id),
          status: args.data.status,
          reason: 'Inappropriate behavior',
          created_at: new Date().toISOString(),
          reporter: {
            id: 101,
            display_name: 'Test Reporter'
          },
          reported: {
            id: 102,
            display_name: 'Test Reported User'
          }
        });
      }),
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        status: 'pending'
      })
    }
  }
}));

// Mock authentication middleware
jest.mock('../src/middleware/authMiddleware', () => ({
  authenticate: jest.fn((req, res, next) => {
    req.user = { userId: 1 };
    next();
  })
}));

// Mock admin middleware
jest.mock('../src/middleware/adminMiddleware', () => ({
  requireAdmin: jest.fn((req, res, next) => {
    next();
  })
}));

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/v1/admin', adminRouter);

describe('Admin Reports API', () => {
  describe('GET /admin/reports', () => {
    it('returns 200 with reports list', async () => {
      const res = await request(app)
        .get('/api/v1/admin/reports')
        .set('Authorization', 'Bearer test-token');
      
      expect(res.status).toBe(200);
      expect(res.body.reports).toBeDefined();
      expect(Array.isArray(res.body.reports)).toBe(true);
    });
  });

  describe('POST /admin/reports/:id/status', () => {
    it('updates report status', async () => {
      const res = await request(app)
        .post('/api/v1/admin/reports/1/status')
        .set('Authorization', 'Bearer test-token')
        .send({ status: 'resolved' });
      
      expect(res.status).toBe(200);
      expect(res.body.report).toBeDefined();
      expect(res.body.report.status).toBe('resolved');
    });

    it('rejects invalid status values', async () => {
      const res = await request(app)
        .post('/api/v1/admin/reports/1/status')
        .set('Authorization', 'Bearer test-token')
        .send({ status: 'invalid-status' });
      
      expect(res.status).toBe(400);
    });
  });
}); 