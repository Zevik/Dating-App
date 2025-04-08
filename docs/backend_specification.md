# Backend Specification - Dating App

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [API Endpoints](#api-endpoints)
4. [WebSocket Events](#websocket-events)
5. [Database Schema](#database-schema)
6. [Authentication & Authorization](#authentication--authorization)
7. [WebRTC Implementation](#webrtc-implementation)
8. [Security Measures](#security-measures)
9. [Performance Considerations](#performance-considerations)
10. [Error Handling](#error-handling)
11. [Deployment & Scaling](#deployment--scaling)
12. [Testing Strategy](#testing-strategy)

## Architecture Overview

### System Components
- REST API Server (Node.js/Express)
- WebSocket Server (Socket.IO)
- WebRTC Signaling Server
- TURN/STUN Servers
- PostgreSQL Database
- Redis Cache
- S3-compatible Storage (for media)

### High-Level Architecture
```
[Client Apps] 
    ↕️ HTTPS/WSS
[Load Balancer]
    ↕️
[API Gateway]
    ↕️
[Services]
- Auth Service
- User Service
- Match Service
- Media Service
- WebRTC Service
    ↕️
[Data Layer]
- PostgreSQL
- Redis Cache
- S3 Storage
```

## Technology Stack

### Core Technologies
- **Runtime**: Node.js 20.x LTS
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL 16.x
- **Cache**: Redis 7.x
- **WebSocket**: Socket.IO 4.x
- **WebRTC**: mediasoup/node-webrtc
- **Storage**: AWS S3/MinIO
- **Queue**: Bull (Redis-based)

### Key Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.x",
    "socket.io": "^4.7.x",
    "pg": "^8.11.x",
    "redis": "^4.6.x",
    "ioredis": "^5.3.x",
    "jsonwebtoken": "^9.0.x",
    "bcrypt": "^5.1.x",
    "mediasoup": "^3.12.x",
    "aws-sdk": "^2.1.x",
    "bull": "^4.11.x",
    "zod": "^3.22.x",
    "winston": "^3.11.x"
  }
}
```

## API Endpoints

### Authentication
```typescript
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
POST /api/v1/auth/logout
POST /api/v1/auth/verify-email
POST /api/v1/auth/resend-verification
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

### User Management
```typescript
GET    /api/v1/users/me
PUT    /api/v1/users/me
PATCH  /api/v1/users/me/preferences
POST   /api/v1/users/me/photos
DELETE /api/v1/users/me/photos/:photoId
GET    /api/v1/users/discovery
POST   /api/v1/users/report/:userId
POST   /api/v1/users/block/:userId
```

### Match Management
```typescript
POST   /api/v1/matches/like/:userId
POST   /api/v1/matches/dislike/:userId
GET    /api/v1/matches/active
POST   /api/v1/matches/:matchId/end
GET    /api/v1/matches/history
```

### Call Management
```typescript
POST   /api/v1/calls/initiate/:matchId
POST   /api/v1/calls/:callId/answer
POST   /api/v1/calls/:callId/reject
POST   /api/v1/calls/:callId/end
POST   /api/v1/calls/:callId/extend
POST   /api/v1/calls/:callId/upgrade
```

### Admin API
```typescript
GET    /api/v1/admin/users
GET    /api/v1/admin/users/:userId
PATCH  /api/v1/admin/users/:userId/status
GET    /api/v1/admin/reports
PATCH  /api/v1/admin/reports/:reportId
GET    /api/v1/admin/stats
```

## WebSocket Events

### Connection Events
```typescript
// Client -> Server
connect
disconnect
error

// Server -> Client
connect_error
disconnect
```

### Match Events
```typescript
// Client -> Server
match:accept
match:decline
match:end

// Server -> Client
match:created
match:ended
match:timeout_warning
```

### Call Events
```typescript
// Client -> Server
call:initiate
call:answer
call:reject
call:ice_candidate
call:sdp_offer
call:sdp_answer
call:end
call:extend_request
call:upgrade_request

// Server -> Client
call:incoming
call:answered
call:rejected
call:ice_candidate
call:sdp_offer
call:sdp_answer
call:ended
call:extend_requested
call:upgrade_requested
call:timeout_warning
```

## WebRTC Implementation

### Signaling Flow
1. Caller initiates call via REST API
2. Server creates call record and emits WebSocket event
3. Callee receives event and joins signaling room
4. WebRTC negotiation starts:
   - Exchange of SDP offers/answers
   - ICE candidate trickle
   - Connection establishment
5. Media stream begins
6. Periodic connection quality monitoring
7. Timeout/extension handling
8. Graceful termination

### TURN/STUN Configuration
```typescript
const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  {
    urls: 'turn:turn.dating-app.com:3478',
    username: 'dynamic_username',
    credential: 'dynamic_password'
  }
];
```

## Security Measures

### Authentication
- JWT-based authentication
- Refresh token rotation
- Rate limiting
- Device fingerprinting

### Data Protection
- End-to-end encryption for WebRTC streams
- At-rest encryption for sensitive data
- HTTPS/WSS only
- SQL injection prevention
- XSS protection
- CSRF protection

### Rate Limiting
```typescript
const rateLimits = {
  login: { windowMs: 15 * 60 * 1000, max: 5 },
  api: { windowMs: 15 * 60 * 1000, max: 100 },
  websocket: { windowMs: 60 * 1000, max: 60 }
};
```

## Error Handling

### HTTP Error Codes
```typescript
const ErrorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};
```

### Error Response Format
```typescript
interface ErrorResponse {
  status: number;
  code: string;
  message: string;
  details?: Record<string, any>;
  requestId?: string;
}
```

## Performance Considerations

### Caching Strategy
```typescript
const cacheConfig = {
  user: { ttl: 3600, invalidateOn: ['profile_update'] },
  discovery: { ttl: 300, invalidateOn: ['location_update'] },
  matches: { ttl: 60, invalidateOn: ['match_update'] }
};
```

### Database Optimization
- Connection pooling
- Prepared statements
- Indexed queries
- Partitioning for large tables
- Regular VACUUM

### WebSocket Optimization
- Sticky sessions
- Heartbeat mechanism
- Reconnection strategy
- Message queuing

## Deployment & Scaling

### Container Configuration
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "src/index.js"]
```

### Environment Variables
```env
NODE_ENV=production
PORT=3000
DB_URL=postgresql://user:pass@host:5432/dbname
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET=your-bucket
TURN_SECRET=your-turn-secret
```

### Health Checks
```typescript
GET /health/liveness
GET /health/readiness
```

### Monitoring
- Prometheus metrics
- ELK Stack logging
- APM integration
- Alert configuration

### Scaling Rules
```typescript
const scalingRules = {
  api: {
    cpu: { target: 70, scaleUp: 2, scaleDown: 1 },
    memory: { target: 80, scaleUp: 2, scaleDown: 1 }
  },
  websocket: {
    connections: { target: 5000, scaleUp: 1, scaleDown: 1 }
  }
};
```

## Implementation Guidelines

### Code Structure
```
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── websocket/
└── index.ts
```

### Coding Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Jest test coverage > 80%
- Swagger/OpenAPI documentation

### Development Workflow
1. Feature branch from develop
2. PR review (2 approvals)
3. CI/CD pipeline
4. Staging deployment
5. Production deployment

### Monitoring & Logging
```typescript
const loggingConfig = {
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
};
```

## Testing Strategy

### Test Levels

#### 1. Unit Tests
```typescript
// Example User Service Test
describe('UserService', () => {
  describe('updatePreferences', () => {
    it('should update user preferences', async () => {
      const result = await userService.updatePreferences(userId, newPrefs);
      expect(result).toMatchObject(newPrefs);
    });

    it('should validate age range', async () => {
      await expect(
        userService.updatePreferences(userId, { minAge: 30, maxAge: 25 })
      ).rejects.toThrow('Invalid age range');
    });
  });
});
```

- Coverage target: 80%+ על כל שירות
- מיקוד בלוגיקה עסקית
- שימוש ב-Jest + ts-jest
- Mocking של שירותים חיצוניים
- Snapshot testing לאובייקטים מורכבים

#### 2. Integration Tests
```typescript
// Example Match Flow Test
describe('Match Flow', () => {
  it('should create match when both users like each other', async () => {
    await matchService.like(user1Id, user2Id);
    await matchService.like(user2Id, user1Id);
    
    const match = await matchService.getMatch(user1Id, user2Id);
    expect(match.status).toBe('active');
    expect(socket1).toReceiveEvent('match:created');
    expect(socket2).toReceiveEvent('match:created');
  });
});
```

- בדיקת זרימה מלאה בין שירותים
- שימוש ב-TestContainers לתלויות (DB, Redis)
- בדיקות WebSocket events
- סימולציית תרחישי מירוץ (race conditions)

#### 3. API Tests
```typescript
// Example API Test
describe('POST /api/v1/matches/like/:userId', () => {
  it('should handle like request', async () => {
    const response = await request(app)
      .post(`/api/v1/matches/like/${targetUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchSchema(likeResponseSchema);
  });
});
```

- כיסוי מלא של כל ה-endpoints
- בדיקות סכמה (Zod/JSON Schema)
- בדיקות אבטחה (Auth, Rate Limiting)
- בדיקות שגיאות וקודי HTTP
- Performance benchmarks

#### 4. E2E Tests
```typescript
// Example E2E Test
describe('Video Call Flow', () => {
  it('should establish WebRTC connection', async () => {
    // Setup two browser instances
    const [caller, callee] = await setupBrowsers();
    
    // Initiate call
    await caller.click('#call-button');
    await callee.waitForEvent('call:incoming');
    await callee.click('#accept-call');
    
    // Verify media connection
    const callerStats = await caller.evaluate(() => getRTCStats());
    const calleeStats = await callee.evaluate(() => getRTCStats());
    
    expect(callerStats.connectionState).toBe('connected');
    expect(calleeStats.connectionState).toBe('connected');
  });
});
```

- שימוש ב-Playwright
- בדיקת זרימות מלאות
- בדיקות WebRTC
- בדיקות דפדפנים מרובים
- בדיקות תאימות

### Test Environments

#### 1. Development
- Local Docker Compose
- Mocked שירותים חיצוניים
- Test DB עם נתוני טסט קבועים
- STUN/TURN servers מקומיים

#### 2. Staging
- תצורת K8s מלאה
- שירותים חיצוניים בסביבת sandbox
- נתוני טסט מציאותיים
- ניטור ביצועים

#### 3. Production
- Smoke tests אחרי דיפלוי
- Synthetic monitoring
- A/B testing
- Canary deployments

### Test Automation

#### CI Pipeline
```yaml
test-pipeline:
  stages:
    - lint:
        run: npm run lint
    - unit:
        run: npm run test:unit
        coverage: true
    - integration:
        run: npm run test:integration
        services: [postgres, redis]
    - api:
        run: npm run test:api
        environment: staging
    - e2e:
        run: npm run test:e2e
        browsers: [chrome, firefox, safari]
```

#### Test Data Management
```typescript
interface TestData {
  users: {
    regular: User[];
    premium: User[];
    banned: User[];
  };
  matches: {
    active: Match[];
    expired: Match[];
    rejected: Match[];
  };
  media: {
    photos: string[];
    videos: string[];
  };
}
```

### Load Testing

#### JMeter/k6 Scripts
```typescript
// Example k6 Test
export default function() {
  const USERS = 1000;
  const DURATION = '30m';
  
  group('Match Discovery', () => {
    // Simulate user browsing
    http.get('/api/v1/users/discovery');
    sleep(random(1, 5));
    
    // Simulate match actions
    http.post('/api/v1/matches/like/${targetId}');
    sleep(random(2, 8));
  });
}
```

#### Performance Metrics
```typescript
const performanceTargets = {
  api: {
    p95_latency_ms: 200,
    p99_latency_ms: 500,
    error_rate: 0.001
  },
  websocket: {
    message_delivery_ms: 100,
    connection_success: 0.999
  },
  webrtc: {
    connection_time_ms: 1000,
    video_quality_score: 4.5
  }
};
```

### Security Testing

#### 1. Static Analysis
- SonarQube
- npm audit
- Snyk
- ESLint security rules

#### 2. Dynamic Analysis
- OWASP ZAP
- Penetration testing
- Fuzzing
- Rate limit testing

#### 3. Compliance Tests
- GDPR compliance
- Data retention
- Access controls
- Audit logging

### Monitoring & Alerts

#### Test Metrics
```typescript
const testMetrics = {
  coverage: {
    unit: 80,
    integration: 70,
    e2e: 50
  },
  performance: {
    api_latency_ms: 200,
    ws_latency_ms: 100
  },
  reliability: {
    test_success_rate: 0.99,
    flaky_test_rate: 0.01
  }
};
```

#### Alert Rules
```typescript
const alertRules = {
  test_failures: {
    threshold: 3,
    window: '24h',
    channel: 'slack-testing'
  },
  coverage_drop: {
    threshold: 5,
    window: '1h',
    channel: 'slack-urgent'
  }
};
```

This specification serves as a comprehensive guide for implementing the backend services of the dating app. It should be reviewed and updated as the project evolves and new requirements emerge. 