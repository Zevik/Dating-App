const admin = require('firebase-admin');

// For safety, don't store service account key in code.
// In a real project we would use environment variables or secure file
// But for demo purposes, we'll assume service account access is defined at runtime

// Number of retries for sending notifications
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Check if Firebase is already initialized
let firebaseInitialized = false;

/**
 * Initialize Firebase Admin SDK
 * @param {Object} serviceAccount - Service account details from Firebase Console
 */
const initialize = (serviceAccount) => {
  if (firebaseInitialized) {
    console.log('Firebase already initialized');
    return;
  }

  try {
    // If service account details provided, use them
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // In development or if we want to use Google Application Default Credentials
      admin.initializeApp();
    }
    
    firebaseInitialized = true;
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    // Be careful: don't return full error details, may contain sensitive info
  }
};

/**
 * Save FCM registration token
 * @param {number} userId - User ID
 * @param {string} fcmToken - Device FCM token
 * @param {Object} userTokensMap - Our temporary database (local to this file)
 * @param {string} deviceId - Device ID (optional)
 * @returns {boolean} - Whether operation succeeded
 */
const saveUserToken = (userId, fcmToken, userTokensMap, deviceId = 'default') => {
  if (!userId || !fcmToken) {
    console.error('Missing required parameters: userId or fcmToken');
    return false;
  }

  try {
    if (!userTokensMap[userId]) {
      userTokensMap[userId] = {};
    }
    
    userTokensMap[userId][deviceId] = fcmToken;
    console.log(`FCM token saved for user ${userId}, device ${deviceId}`);
    return true;
  } catch (error) {
    console.error('Error saving FCM token:', error);
    return false;
  }
};

/**
 * Remove FCM registration token
 * @param {number} userId - User ID
 * @param {Object} userTokensMap - Our temporary database
 * @param {string} deviceId - Device ID (optional)
 * @returns {boolean} - Whether operation succeeded
 */
const removeUserToken = (userId, userTokensMap, deviceId = 'default') => {
  if (!userId) {
    console.error('Missing required parameter: userId');
    return false;
  }

  try {
    if (userTokensMap[userId]) {
      if (deviceId === 'all') {
        // Delete all user tokens
        delete userTokensMap[userId];
        console.log(`All FCM tokens removed for user ${userId}`);
      } else if (userTokensMap[userId][deviceId]) {
        // Delete only specific device token
        delete userTokensMap[userId][deviceId];
        console.log(`FCM token removed for user ${userId}, device ${deviceId}`);
      }
    }
    return true;
  } catch (error) {
    console.error('Error removing FCM token:', error);
    return false;
  }
};

/**
 * Get user's registration tokens
 * @param {number} userId - User ID
 * @param {Object} userTokensMap - Our temporary database
 * @returns {Array} - Array of FCM tokens
 */
const getUserTokens = (userId, userTokensMap) => {
  if (!userId) {
    console.error('Missing required parameter: userId');
    return [];
  }

  try {
    if (!userTokensMap[userId]) {
      return [];
    }
    
    // Return array of all tokens for this user
    return Object.values(userTokensMap[userId]);
  } catch (error) {
    console.error('Error getting user tokens:', error);
    return [];
  }
};

/**
 * Send notification to a list of FCM tokens
 * @param {Array} tokens - Array of FCM tokens
 * @param {Object} notification - Notification object
 * @param {Object} data - Additional data to send with notification
 * @returns {Promise} - Promise containing send results
 */
const sendToTokens = async (tokens, notification, data = {}) => {
  if (!firebaseInitialized) {
    console.error('Firebase not initialized. Call initialize() first.');
    return { success: 0, failure: tokens.length };
  }

  if (!tokens || !tokens.length) {
    console.error('No FCM tokens provided');
    return { success: 0, failure: 0 };
  }

  const message = {
    notification,
    data,
    tokens: tokens.slice(0, 500) // FCM limits to 500 tokens per request
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log(`${response.successCount} messages were sent successfully`);

    // Handle invalid tokens
    if (response.failureCount > 0) {
      console.log(`${response.failureCount} messages failed to send`);
      const failedTokens = [];
      
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push({ token: tokens[idx], error: resp.error });
          console.error('Error sending message:', resp.error);
        }
      });
      
      // Here we would delete invalid tokens from the database
    }

    return {
      success: response.successCount,
      failure: response.failureCount
    };
  } catch (error) {
    console.error('Error sending messages:', error);
    return { success: 0, failure: tokens.length };
  }
};

/**
 * Send notification to a specific user
 * @param {number} userId - User ID
 * @param {Object} userTokensMap - Our temporary database
 * @param {Object} notification - Notification object
 * @param {Object} data - Additional data to send with notification
 * @returns {Promise} - Promise containing send results
 */
const sendToUser = async (userId, userTokensMap, notification, data = {}) => {
  const tokens = getUserTokens(userId, userTokensMap);
  if (!tokens.length) {
    console.log(`No FCM tokens found for user ${userId}`);
    return { success: 0, failure: 0, tokensCount: 0 };
  }

  const result = await sendToTokens(tokens, notification, data);
  return { ...result, tokensCount: tokens.length };
};

/**
 * Send notification to multiple users
 * @param {Array} userIds - Array of user IDs
 * @param {Object} userTokensMap - Our temporary database
 * @param {Object} notification - Notification object
 * @param {Object} data - Additional data to send with notification
 * @returns {Promise} - Promise containing send results
 */
const sendToUsers = async (userIds, userTokensMap, notification, data = {}) => {
  if (!userIds || !userIds.length) {
    console.error('No user IDs provided');
    return { success: 0, failure: 0, tokensCount: 0 };
  }

  // Collect all tokens for all users
  let allTokens = [];
  userIds.forEach(userId => {
    const userTokens = getUserTokens(userId, userTokensMap);
    allTokens = [...allTokens, ...userTokens];
  });

  if (!allTokens.length) {
    console.log(`No FCM tokens found for users: ${userIds.join(', ')}`);
    return { success: 0, failure: 0, tokensCount: 0 };
  }

  const result = await sendToTokens(allTokens, notification, data);
  return { ...result, tokensCount: allTokens.length };
};

/**
 * Send "new match" notification to a user
 * @param {number} userId - User ID
 * @param {Object} userTokensMap - Our temporary database
 * @param {Object} matchData - Match information
 * @returns {Promise} - Promise containing send results
 */
const sendNewMatchNotification = async (userId, userTokensMap, matchData) => {
  const notification = {
    title: "New Match! 💖",
    body: `You have a new match with ${matchData.otherUserName}!`,
  };

  const data = {
    type: 'new_match',
    matchId: matchData.matchId.toString(),
    otherUserId: matchData.otherUserId.toString(),
    timestamp: new Date().toISOString()
  };

  return await sendToUser(userId, userTokensMap, notification, data);
};

/**
 * Send "new message" notification to a user
 * @param {number} userId - User ID
 * @param {Object} userTokensMap - Our temporary database
 * @param {Object} messageData - Message information
 * @returns {Promise} - Promise containing send results
 */
const sendNewMessageNotification = async (userId, userTokensMap, messageData) => {
  const notification = {
    title: `New message from ${messageData.senderName}`,
    body: messageData.preview || 'You received a new message',
  };

  const data = {
    type: 'new_message',
    matchId: messageData.matchId.toString(),
    senderId: messageData.senderId.toString(),
    messageId: messageData.messageId.toString(),
    timestamp: new Date().toISOString()
  };

  return await sendToUser(userId, userTokensMap, notification, data);
};

/**
 * Send "incoming call" notification to a user
 * @param {number} userId - User ID
 * @param {Object} userTokensMap - Our temporary database
 * @param {Object} callData - Call information
 * @returns {Promise} - Promise containing send results
 */
const sendIncomingCallNotification = async (userId, userTokensMap, callData) => {
  const callTypeText = callData.callType === 'voice' ? 'Voice call' : 'Video call';
  
  const notification = {
    title: `${callData.callerName} is calling you`,
    body: `Incoming call: ${callTypeText}`,
  };

  const data = {
    type: 'incoming_call',
    matchId: callData.matchId.toString(),
    callId: callData.callId.toString(),
    callerId: callData.callerId.toString(),
    callType: callData.callType,
    timestamp: new Date().toISOString()
  };

  // For incoming calls, set high priority and short TTL (30 seconds)
  const options = {
    priority: 'high',
    timeToLive: 30
  };

  return await sendToUser(userId, userTokensMap, notification, data, options);
};

module.exports = {
  initialize,
  saveUserToken,
  removeUserToken,
  getUserTokens,
  sendToTokens,
  sendToUser,
  sendToUsers,
  sendNewMatchNotification,
  sendNewMessageNotification,
  sendIncomingCallNotification
}; 