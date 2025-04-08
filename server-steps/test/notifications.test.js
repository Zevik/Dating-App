const notificationsService = require('../src/services/notifications');

// מוק למודול Firebase Admin SDK
jest.mock('firebase-admin', () => {
  return {
    initializeApp: jest.fn().mockReturnThis(),
    credential: {
      cert: jest.fn().mockReturnThis()
    },
    messaging: jest.fn().mockReturnValue({
      sendMulticast: jest.fn().mockImplementation((message) => {
        // נניח שההודעה נשלחה בהצלחה לכל המכשירים
        return Promise.resolve({
          successCount: message.tokens.length,
          failureCount: 0,
          responses: message.tokens.map(() => ({ success: true }))
        });
      })
    })
  };
});

describe('Notifications Service', () => {
  let userTokensMap;
  
  beforeEach(() => {
    // איפוס מצב מסד הנתונים לפני כל בדיקה
    userTokensMap = {};
    
    // איפוס המודול
    jest.clearAllMocks();
  });
  
  describe('Token Management', () => {
    test('Should save FCM token for a user', () => {
      const userId = 1;
      const token = 'test-token-123';
      const deviceId = 'test-device';
      
      const result = notificationsService.saveUserToken(userId, token, userTokensMap, deviceId);
      
      expect(result).toBe(true);
      expect(userTokensMap[userId]).toBeDefined();
      expect(userTokensMap[userId][deviceId]).toBe(token);
    });
    
    test('Should handle saving token without deviceId', () => {
      const userId = 1;
      const token = 'test-token-123';
      
      const result = notificationsService.saveUserToken(userId, token, userTokensMap);
      
      expect(result).toBe(true);
      expect(userTokensMap[userId]).toBeDefined();
      expect(userTokensMap[userId]['default']).toBe(token);
    });
    
    test('Should return false when saving token without userId', () => {
      const token = 'test-token-123';
      
      const result = notificationsService.saveUserToken(null, token, userTokensMap);
      
      expect(result).toBe(false);
      expect(userTokensMap).toEqual({});
    });
    
    test('Should remove a specific token for a user', () => {
      // First save a token
      const userId = 1;
      const token = 'test-token-123';
      const deviceId = 'test-device';
      notificationsService.saveUserToken(userId, token, userTokensMap, deviceId);
      
      // Then remove it
      const result = notificationsService.removeUserToken(userId, userTokensMap, deviceId);
      
      expect(result).toBe(true);
      expect(userTokensMap[userId][deviceId]).toBeUndefined();
    });
    
    test('Should remove all tokens for a user', () => {
      // Save multiple tokens for a user
      const userId = 1;
      notificationsService.saveUserToken(userId, 'token1', userTokensMap, 'device1');
      notificationsService.saveUserToken(userId, 'token2', userTokensMap, 'device2');
      
      // Remove all of them
      const result = notificationsService.removeUserToken(userId, userTokensMap, 'all');
      
      expect(result).toBe(true);
      expect(userTokensMap[userId]).toBeUndefined();
    });
    
    test('Should get all tokens for a user', () => {
      // Save multiple tokens for a user
      const userId = 1;
      notificationsService.saveUserToken(userId, 'token1', userTokensMap, 'device1');
      notificationsService.saveUserToken(userId, 'token2', userTokensMap, 'device2');
      
      // Get all tokens
      const tokens = notificationsService.getUserTokens(userId, userTokensMap);
      
      expect(tokens).toHaveLength(2);
      expect(tokens).toContain('token1');
      expect(tokens).toContain('token2');
    });
    
    test('Should return empty array for nonexistent user', () => {
      const tokens = notificationsService.getUserTokens(999, userTokensMap);
      
      expect(tokens).toEqual([]);
    });
  });
  
  describe('Notification Sending', () => {
    beforeEach(() => {
      // Initialize Firebase for the tests
      notificationsService.initialize({ some: 'credentials' });
    });
    
    test('Should send notification to a single user', async () => {
      // Setup
      const userId = 1;
      notificationsService.saveUserToken(userId, 'token1', userTokensMap);
      
      const notification = {
        title: 'Test Notification',
        body: 'This is a test notification'
      };
      
      // Act
      const result = await notificationsService.sendToUser(
        userId, 
        userTokensMap, 
        notification
      );
      
      // Assert
      expect(result.success).toBe(1);
      expect(result.failure).toBe(0);
      expect(result.tokensCount).toBe(1);
    });
    
    test('Should handle sending to user with no tokens', async () => {
      const result = await notificationsService.sendToUser(
        999, 
        userTokensMap, 
        { title: 'Test', body: 'Test' }
      );
      
      expect(result.success).toBe(0);
      expect(result.failure).toBe(0);
      expect(result.tokensCount).toBe(0);
    });
    
    test('Should send notification to multiple users', async () => {
      // Setup
      notificationsService.saveUserToken(1, 'token1', userTokensMap);
      notificationsService.saveUserToken(2, 'token2', userTokensMap);
      
      // Act
      const result = await notificationsService.sendToUsers(
        [1, 2], 
        userTokensMap, 
        { title: 'Test', body: 'Test' }
      );
      
      // Assert
      expect(result.success).toBe(2);
      expect(result.failure).toBe(0);
      expect(result.tokensCount).toBe(2);
    });
    
    test('Should send new match notification', async () => {
      // Setup
      const userId = 1;
      notificationsService.saveUserToken(userId, 'token1', userTokensMap);
      
      // Act
      const result = await notificationsService.sendNewMatchNotification(
        userId,
        userTokensMap,
        {
          matchId: 123,
          otherUserId: 2,
          otherUserName: 'Test User'
        }
      );
      
      // Assert
      expect(result.success).toBe(1);
      expect(result.failure).toBe(0);
    });
    
    test('Should send new message notification', async () => {
      // Setup
      const userId = 1;
      notificationsService.saveUserToken(userId, 'token1', userTokensMap);
      
      // Act
      const result = await notificationsService.sendNewMessageNotification(
        userId,
        userTokensMap,
        {
          matchId: 123,
          senderId: 2,
          senderName: 'Test User',
          messageId: 456,
          preview: 'Hello there!'
        }
      );
      
      // Assert
      expect(result.success).toBe(1);
      expect(result.failure).toBe(0);
    });
    
    test('Should send incoming call notification', async () => {
      // Setup
      const userId = 1;
      notificationsService.saveUserToken(userId, 'token1', userTokensMap);
      
      // Act
      const result = await notificationsService.sendIncomingCallNotification(
        userId,
        userTokensMap,
        {
          callId: 123,
          matchId: 456,
          callerId: 2,
          callerName: 'Test User',
          callType: 'video'
        }
      );
      
      // Assert
      expect(result.success).toBe(1);
      expect(result.failure).toBe(0);
    });
  });
}); 