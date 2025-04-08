const request = require('supertest');
const app = require('../src/index');

describe('Server tests', () => {
  // Store a token for authenticated tests
  let authToken;
  let testUserId;
  
  // Get authentication token before running protected tests
  beforeAll(async () => {
    // Login as John (user with ID 1)
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123'
      })
      .set('Content-Type', 'application/json');
    
    authToken = loginResponse.body.token;
    testUserId = loginResponse.body.user.id;
  });
  
  test('Health check returns 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.timestamp).toBeDefined();
  });

  test('CORS headers are present in response', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:3000');
    
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  test('Security headers are present in response', async () => {
    const response = await request(app).get('/health');
    
    expect(response.headers['x-xss-protection']).toBe('1; mode=block');
    expect(response.headers['x-frame-options']).toBe('DENY');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });

  test('Non-existent route returns 404 with JSON response', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Not Found');
  });

  describe('Authentication endpoints', () => {
    test('Registration works correctly', async () => {
      const newUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        age: 25,
        gender: 'female'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(newUser)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'testuser@example.com');
      expect(response.body.user).not.toHaveProperty('password');
    });

    test('Registration fails with duplicate email', async () => {
      const duplicateUser = {
        name: 'Duplicate User',
        email: 'john@example.com', // Already exists
        password: 'password123',
        age: 30,
        gender: 'male'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(duplicateUser)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error', 'Email already in use');
    });

    test('Login works correctly with valid credentials', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(credentials)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'john@example.com');
      expect(response.body.user).not.toHaveProperty('password');
    });

    test('Login fails with invalid credentials', async () => {
      const invalidCredentials = {
        email: 'john@example.com',
        password: 'wrongpassword'
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(invalidCredentials)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid email or password');
    });

    test('Get current user with valid token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', testUserId);
      expect(response.body).toHaveProperty('email');
      expect(response.body).not.toHaveProperty('password');
    });

    test('Get current user fails with invalid token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalidtoken');
        
      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty('error', 'Invalid token.');
    });
    
    test('Change password with valid credentials', async () => {
      const passwordData = {
        currentPassword: 'password123',
        newPassword: 'newpassword123'
      };
      
      const response = await request(app)
        .put('/auth/password')
        .send(passwordData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Password updated successfully');
      
      // Verify we can login with the new password
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'newpassword123'
        })
        .set('Content-Type', 'application/json');
      
      expect(loginResponse.statusCode).toBe(200);
      
      // Update the token for subsequent tests
      authToken = loginResponse.body.token;
    });
  });

  describe('User endpoints', () => {
    test('Users endpoint returns list of users without passwords', async () => {
      const response = await request(app).get('/users');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('age');
      expect(response.body[0]).toHaveProperty('gender');
      expect(response.body[0]).not.toHaveProperty('password');
      expect(response.headers['x-total-count']).toBeDefined();
    });

    test('Users can be filtered by name', async () => {
      const response = await request(app).get('/users?name=joh');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.every(user => user.name.toLowerCase().includes('joh'))).toBe(true);
      expect(response.body[0]).not.toHaveProperty('password');
    });

    test('Users can be filtered by age range', async () => {
      const response = await request(app).get('/users?minAge=25&maxAge=35');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.every(user => user.age >= 25 && user.age <= 35)).toBe(true);
      expect(response.body[0]).not.toHaveProperty('password');
    });

    test('Users can be filtered by gender', async () => {
      const response = await request(app).get('/users?gender=female');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.every(user => user.gender === 'female')).toBe(true);
      expect(response.body[0]).not.toHaveProperty('password');
    });

    test('Users can be sorted by age', async () => {
      const response = await request(app).get('/users?sortBy=age&order=asc');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      // Check if sorted correctly
      for (let i = 1; i < response.body.length; i++) {
        expect(response.body[i].age).toBeGreaterThanOrEqual(response.body[i-1].age);
      }
      
      expect(response.body[0]).not.toHaveProperty('password');
    });

    test('Search endpoint requires a query parameter', async () => {
      const response = await request(app).get('/users/search');
      
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Search endpoint returns matching users without passwords', async () => {
      const response = await request(app).get('/users/search?query=john');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.some(user => user.name.toLowerCase().includes('john'))).toBe(true);
      expect(response.body[0]).not.toHaveProperty('password');
    });

    test('Get user by ID returns correct user without password', async () => {
      const response = await request(app).get('/users/1');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('age');
      expect(response.body).toHaveProperty('gender');
      expect(response.body).not.toHaveProperty('password');
    });

    test('Get user with non-existent ID returns 404', async () => {
      const response = await request(app).get('/users/999');
      
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('Create user requires authentication', async () => {
      const newUser = {
        name: 'TestUser',
        age: 30,
        gender: 'female',
        email: 'newtest@example.com',
        password: 'password123'
      };
      
      // Try without token
      const failedResponse = await request(app)
        .post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .post('/users')
        .send(newUser)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(201);
      expect(successResponse.body).toHaveProperty('id');
      expect(successResponse.body).toHaveProperty('name', 'TestUser');
      expect(successResponse.body).not.toHaveProperty('password');
    });

    test('Update user requires authentication and can only update own profile', async () => {
      const updatedUserData = {
        name: 'John Updated',
        age: 29,
        gender: 'male',
        email: 'john@example.com'
      };
      
      // Try without token
      const failedResponse = await request(app)
        .put(`/users/${testUserId}`)
        .send(updatedUserData)
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token but different user ID
      const unauthorizedResponse = await request(app)
        .put('/users/2') // Not the logged in user
        .send({
          name: 'Not My Profile',
          age: 25,
          gender: 'female',
          email: 'notmy@example.com'
        })
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(unauthorizedResponse.statusCode).toBe(403);
      
      // Update own profile
      const successResponse = await request(app)
        .put(`/users/${testUserId}`)
        .send(updatedUserData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(200);
      expect(successResponse.body).toHaveProperty('id', testUserId);
      expect(successResponse.body).toHaveProperty('name', 'John Updated');
      expect(successResponse.body).not.toHaveProperty('password');
    });

    test('Delete user requires authentication and can only delete own profile', async () => {
      // Create a test user to delete
      const registerResponse = await request(app)
        .post('/auth/register')
        .send({
          name: 'Delete Test',
          email: 'deletetest@example.com',
          password: 'password123',
          age: 30,
          gender: 'male'
        })
        .set('Content-Type', 'application/json');
      
      const deleteUserId = registerResponse.body.user.id;
      const deleteToken = registerResponse.body.token;
      
      // Try without token
      const failedResponse = await request(app)
        .delete(`/users/${deleteUserId}`);
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token but different user ID
      const unauthorizedResponse = await request(app)
        .delete(`/users/${deleteUserId}`)
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(unauthorizedResponse.statusCode).toBe(403);
      
      // Delete own profile
      const successResponse = await request(app)
        .delete(`/users/${deleteUserId}`)
        .set('Authorization', `Bearer ${deleteToken}`);
        
      expect(successResponse.statusCode).toBe(200);
      expect(successResponse.body).toHaveProperty('message', 'User deleted successfully');
      expect(successResponse.body).toHaveProperty('user');
      expect(successResponse.body.user).toHaveProperty('id', deleteUserId);
      expect(successResponse.body.user).not.toHaveProperty('password');
      
      // Verify the user is actually deleted
      const verifyResponse = await request(app)
        .get(`/users/${deleteUserId}`);
        
      expect(verifyResponse.statusCode).toBe(404);
    });
  });

  describe('Like endpoints', () => {
    test('Create like requires authentication', async () => {
      // Try without token
      const failedResponse = await request(app)
        .post('/likes')
        .send({ toUserId: 4 }) // Changed to user 4 to avoid conflict
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .post('/likes')
        .send({ toUserId: 4 }) // Changed to user 4 to avoid conflict
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(201);
      expect(successResponse.body).toHaveProperty('like');
      expect(successResponse.body.like).toHaveProperty('fromUserId', testUserId);
      expect(successResponse.body.like).toHaveProperty('toUserId', 4);
    });

    test('Cannot like yourself', async () => {
      const likeData = {
        toUserId: testUserId // Same as authenticated user
      };
      
      const response = await request(app)
        .post('/likes')
        .send(likeData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'You cannot like yourself');
    });

    test('Creating duplicate like returns 409 conflict', async () => {
      // Create a test like
      const likeData = {
        toUserId: 5
      };
      
      // First like
      await request(app)
        .post('/likes')
        .send(likeData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
      
      // Try to create the same like again
      const duplicateResponse = await request(app)
        .post('/likes')
        .send(likeData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(duplicateResponse.statusCode).toBe(409);
      expect(duplicateResponse.body).toHaveProperty('error', 'Like already exists');
    });

    test('Get likes sent requires authentication and only shows own likes', async () => {
      // Try without token
      const failedResponse = await request(app)
        .get(`/users/${testUserId}/likes/sent`);
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with other user's ID
      const unauthorizedResponse = await request(app)
        .get('/users/2/likes/sent')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(unauthorizedResponse.statusCode).toBe(403);
      
      // Get own likes
      const successResponse = await request(app)
        .get(`/users/${testUserId}/likes/sent`)
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(successResponse.statusCode).toBe(200);
      expect(Array.isArray(successResponse.body)).toBe(true);
      
      // Assuming likes were created in previous tests
      expect(successResponse.body.length).toBeGreaterThan(0);
      expect(successResponse.body.every(like => like.fromUserId === testUserId)).toBe(true);
    });

    test('Get likes received requires authentication and only shows own likes', async () => {
      // Try without token
      const failedResponse = await request(app)
        .get(`/users/${testUserId}/likes/received`);
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with other user's ID
      const unauthorizedResponse = await request(app)
        .get('/users/2/likes/received')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(unauthorizedResponse.statusCode).toBe(403);
      
      // Create a like to the test user
      await request(app)
        .post('/auth/login')
        .send({
          email: 'jane@example.com',
          password: 'password123'
        })
        .then(loginRes => {
          return request(app)
            .post('/likes')
            .send({ toUserId: testUserId })
            .set('Authorization', `Bearer ${loginRes.body.token}`)
            .set('Content-Type', 'application/json');
        });
      
      // Get own received likes
      const successResponse = await request(app)
        .get(`/users/${testUserId}/likes/received`)
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(successResponse.statusCode).toBe(200);
      expect(Array.isArray(successResponse.body)).toBe(true);
      expect(successResponse.body.length).toBeGreaterThan(0);
      expect(successResponse.body.some(like => like.toUserId === testUserId)).toBe(true);
    });
  });

  describe('Match endpoints', () => {
    test('Get matches requires authentication', async () => {
      // Try without token
      const failedResponse = await request(app)
        .get('/matches');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Get with token
      const successResponse = await request(app)
        .get('/matches')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(successResponse.statusCode).toBe(200);
      expect(Array.isArray(successResponse.body)).toBe(true);
    });

    test('Get matches for a specific user requires authentication and only shows own matches', async () => {
      // Create a match between users with ID 1 and 2
      // First login as Jane
      const janeLoginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'jane@example.com',
          password: 'password123'
        });
      
      const janeToken = janeLoginResponse.body.token;
      const janeId = janeLoginResponse.body.user.id;
      
      // Make sure John likes Jane
      await request(app)
        .post('/likes')
        .send({ toUserId: janeId })
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
      
      // Jane likes John (who just created a like to Jane)
      await request(app)
        .post('/likes')
        .send({ toUserId: testUserId })
        .set('Authorization', `Bearer ${janeToken}`)
        .set('Content-Type', 'application/json');
      
      // Try without token
      const failedResponse = await request(app)
        .get(`/users/${testUserId}/matches`);
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with other user's ID
      const unauthorizedResponse = await request(app)
        .get('/users/3/matches')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(unauthorizedResponse.statusCode).toBe(403);
      
      // Get own matches
      const successResponse = await request(app)
        .get(`/users/${testUserId}/matches`)
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(successResponse.statusCode).toBe(200);
      expect(Array.isArray(successResponse.body)).toBe(true);
      
      // We should have at least one match now
      expect(successResponse.body.length).toBeGreaterThan(0);
      
      // Check that the match includes Jane
      const match = successResponse.body.find(m => 
        m.user1Id === Math.min(testUserId, janeId) && 
        m.user2Id === Math.max(testUserId, janeId)
      );
      
      expect(match).toBeDefined();
      expect(match).toHaveProperty('otherUser');
      expect(match.otherUser).toHaveProperty('id', janeId);
      expect(match.otherUser).not.toHaveProperty('password');
    });

    test('Match inactive timeout mechanism can be triggered manually', async () => {
      // First, update a match to be old enough for timeout
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 15); // 15 days ago
      
      // Make a request to update match's last interaction time for testing
      // This is a test-only operation that wouldn't exist in production
      await request(app)
        .put('/matches/1')
        .send({ lastInteractionAt: yesterday.toISOString() })
        .set('Authorization', `Bearer ${authToken}`);
      
      // Trigger the inactive match check
      const response = await request(app)
        .post('/admin/check-inactive-matches')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('closedCount');
      expect(response.body.closedCount).toBeGreaterThan(0);
      
      // Check that the match is now inactive
      const matchResponse = await request(app)
        .get('/matches')
        .set('Authorization', `Bearer ${authToken}`);
      
      const match = matchResponse.body.find(m => m.id === 1);
      expect(match).toBeDefined();
      expect(match.isActive).toBe(false);
      expect(match.closeReason).toBe('timeout');
    });
  });

  describe('Call endpoints', () => {
    let matchId;
    let callId;
    
    // Create a match before testing calls
    beforeAll(async () => {
      // First, check if already have matches
      const existingMatchesResponse = await request(app)
        .get('/users/1/matches')
        .set('Authorization', `Bearer ${authToken}`);
      
      if (existingMatchesResponse.body.length > 0) {
        // We already have a match, use it
        matchId = existingMatchesResponse.body[0].id;
      } else {
        // Create a like from user 1 to user 3
        await request(app)
          .post('/likes')
          .send({ toUserId: 3 })
          .set('Authorization', `Bearer ${authToken}`)
          .set('Content-Type', 'application/json');
        
        // Login as user 3
        const loginResponse = await request(app)
          .post('/auth/login')
          .send({
            email: 'alex@example.com',
            password: 'password123'
          })
          .set('Content-Type', 'application/json');
        
        const user3Token = loginResponse.body.token;
        
        // Create a like from user 3 to user 1 (creates a match)
        await request(app)
          .post('/likes')
          .send({ toUserId: 1 })
          .set('Authorization', `Bearer ${user3Token}`)
          .set('Content-Type', 'application/json');
        
        // Get matches for user 1
        const matchesResponse = await request(app)
          .get('/users/1/matches')
          .set('Authorization', `Bearer ${authToken}`);
        
        if (matchesResponse.body.length > 0) {
          matchId = matchesResponse.body[0].id;
        } else {
          console.error('Failed to create a match for testing');
        }
      }
      
      // Log the matchId for debugging
      console.log(`Using matchId: ${matchId} for call tests`);
    });
    
    test('Start a new call requires authentication', async () => {
      // Try without token
      const failedResponse = await request(app)
        .post(`/matches/${matchId}/calls`)
        .send({ callType: 'voice' })
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .post(`/matches/${matchId}/calls`)
        .send({ callType: 'voice' })
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(201);
      expect(successResponse.body).toHaveProperty('id');
      expect(successResponse.body).toHaveProperty('callType', 'voice');
      expect(successResponse.body).toHaveProperty('status', 'initiated');
      expect(successResponse.body).toHaveProperty('maxDuration', 300); // 5 minutes
      
      callId = successResponse.body.id;
      
      // Log the callId for debugging
      console.log(`Created callId: ${callId} for testing`);
    });
    
    test('Starting a duplicate call fails', async () => {
      const response = await request(app)
        .post(`/matches/${matchId}/calls`)
        .send({ callType: 'voice' })
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('activeCall');
    });
    
    test('Answer a call requires authentication and correct permissions', async () => {
      // Try without token
      const failedResponse = await request(app)
        .put(`/calls/${callId}/answer`)
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Login as user 3 (call receiver)
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'alex@example.com',
          password: 'password123'
        })
        .set('Content-Type', 'application/json');
      
      const user3Token = loginResponse.body.token;
      
      // Try as the correct receiver
      const successResponse = await request(app)
        .put(`/calls/${callId}/answer`)
        .set('Authorization', `Bearer ${user3Token}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(200);
      expect(successResponse.body).toHaveProperty('status', 'active');
      expect(successResponse.body).toHaveProperty('startTime');
    });
    
    test('Call extension requires authentication and correct permissions', async () => {
      // Try without token
      const failedResponse = await request(app)
        .put(`/calls/${callId}/extend`)
        .send({ additionalSeconds: 300 })
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .put(`/calls/${callId}/extend`)
        .send({ additionalSeconds: 300 })
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(200);
      expect(successResponse.body).toHaveProperty('maxDuration', 600); // 5 + 5 minutes
    });
    
    test('Upgrade call from voice to video', async () => {
      const response = await request(app)
        .put(`/calls/${callId}/upgrade`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('callType', 'video');
      expect(response.body).toHaveProperty('maxDuration', 600); // 10 minutes
    });
    
    test('End a call requires authentication and correct permissions', async () => {
      // Try without token
      const failedResponse = await request(app)
        .put(`/calls/${callId}/end`)
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .put(`/calls/${callId}/end`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(200);
      expect(successResponse.body).toHaveProperty('status', 'ended');
      expect(successResponse.body).toHaveProperty('endTime');
      expect(successResponse.body).toHaveProperty('duration');
    });
    
    test('Get call history for a match', async () => {
      const response = await request(app)
        .get(`/matches/${matchId}/calls`)
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('matchId', matchId);
    });
  });

  describe('Report endpoints', () => {
    let reportId;
    
    test('Creating a report requires authentication', async () => {
      const reportData = {
        reportedUserId: 2,
        reason: 'inappropriate_behavior',
        details: 'User was rude in conversation'
      };
      
      // Try without token
      const failedResponse = await request(app)
        .post('/reports')
        .send(reportData)
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .post('/reports')
        .send(reportData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(201);
      expect(successResponse.body).toHaveProperty('id');
      expect(successResponse.body).toHaveProperty('reporterId', testUserId);
      expect(successResponse.body).toHaveProperty('reportedId', 2);
      expect(successResponse.body).toHaveProperty('reason', 'inappropriate_behavior');
      expect(successResponse.body).toHaveProperty('status', 'open');
      
      reportId = successResponse.body.id;
    });
    
    test('User cannot report themselves', async () => {
      const reportData = {
        reportedUserId: testUserId, // Same as the authenticated user
        reason: 'inappropriate_behavior'
      };
      
      const response = await request(app)
        .post('/reports')
        .send(reportData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'You cannot report yourself');
    });
    
    test('User can view their sent reports', async () => {
      const response = await request(app)
        .get('/reports/sent')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some(report => report.id === reportId)).toBe(true);
    });
    
    test('Admin can view all reports', async () => {
      const response = await request(app)
        .get('/admin/reports')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.headers['x-total-count']).toBeDefined();
    });
    
    test('Admin can update report status', async () => {
      const updateData = {
        status: 'investigating',
        adminNotes: 'Looking into this issue'
      };
      
      const response = await request(app)
        .put(`/admin/reports/${reportId}`)
        .send(updateData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', reportId);
      expect(response.body).toHaveProperty('status', 'investigating');
      expect(response.body).toHaveProperty('adminNotes', 'Looking into this issue');
    });
  });
  
  describe('Block endpoints', () => {
    let blockId;
    
    test('Blocking a user requires authentication', async () => {
      const blockData = {
        blockedUserId: 2
      };
      
      // Try without token
      const failedResponse = await request(app)
        .post('/blocks')
        .send(blockData)
        .set('Content-Type', 'application/json');
        
      expect(failedResponse.statusCode).toBe(401);
      
      // Try with token
      const successResponse = await request(app)
        .post('/blocks')
        .send(blockData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(successResponse.statusCode).toBe(201);
      expect(successResponse.body).toHaveProperty('id');
      expect(successResponse.body).toHaveProperty('blockerId', testUserId);
      expect(successResponse.body).toHaveProperty('blockedId', 2);
      
      blockId = successResponse.body.id;
    });
    
    test('User cannot block themselves', async () => {
      const blockData = {
        blockedUserId: testUserId // Same as the authenticated user
      };
      
      const response = await request(app)
        .post('/blocks')
        .send(blockData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'You cannot block yourself');
    });
    
    test('User cannot block the same user twice', async () => {
      const blockData = {
        blockedUserId: 2 // Already blocked in previous test
      };
      
      const response = await request(app)
        .post('/blocks')
        .send(blockData)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json');
        
      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error', 'Block already exists');
    });
    
    test('User can view their blocks with blocked user details', async () => {
      const response = await request(app)
        .get('/blocks')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some(block => block.id === blockId)).toBe(true);
      
      // Find the block we created
      const block = response.body.find(b => b.id === blockId);
      expect(block).toHaveProperty('blockedUser');
      expect(block.blockedUser).toHaveProperty('id', 2);
      expect(block.blockedUser).toHaveProperty('name');
      expect(block.blockedUser).not.toHaveProperty('password');
    });
    
    test('User can check if they have blocked someone', async () => {
      const response = await request(app)
        .get('/blocks/check/2') // Check the user we blocked
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('isBlocked', true);
      expect(response.body).toHaveProperty('isBlockedBy', false);
      expect(response.body).toHaveProperty('blockDetails');
      expect(response.body.blockDetails).toHaveProperty('id', blockId);
    });
    
    test('Blocked users are filtered out from user listings', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      // User with ID 2 should not be in the results since we blocked them
      expect(response.body.some(user => user.id === 2)).toBe(false);
    });
    
    test('User can unblock someone they blocked', async () => {
      const response = await request(app)
        .delete(`/blocks/${blockId}`)
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'User unblocked successfully');
      expect(response.body).toHaveProperty('block');
      expect(response.body.block).toHaveProperty('id', blockId);
      
      // Confirm the block is gone
      const checkResponse = await request(app)
        .get('/blocks/check/2')
        .set('Authorization', `Bearer ${authToken}`);
        
      expect(checkResponse.body).toHaveProperty('isBlocked', false);
    });
  });
}); 