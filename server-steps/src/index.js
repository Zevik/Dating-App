const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const { Server } = require('socket.io');
const consentService = require('./services/consentService');
const notificationsService = require('./services/notifications');
const { createServer, generateDevCertificates } = require('./https-server');
const { generateJwt, verifyToken } = require('./auth');
const { CONSENT_TYPES, CONSENT_ACTIONS, recordConsent, 
  getUserConsents, hasConsent, generateDataExport, requestDataDeletion } = require('./services/consents');

// Secret key for JWT - in production this should be in environment variables
const JWT_SECRET = 'your_jwt_secret_key_should_be_complex_and_in_env_vars';

// Create the Express app
const app = express();

// Enable CORS - Configuration options
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://localhost:3000', 'https://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse JSON bodies

// Serve static files from the public directory
app.use(express.static('public'));

// Basic security headers
app.use((req, res, next) => {
  // Help protect against some XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Help prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Strict MIME type checking
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // HTTP Strict Transport Security (would be used in production with HTTPS)
  // res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Mock users data (in-memory database for now)
const users = [
  { id: 1, name: 'John', age: 28, gender: 'male', email: 'john@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 2, name: 'Jane', age: 24, gender: 'female', email: 'jane@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 3, name: 'Alex', age: 32, gender: 'non-binary', email: 'alex@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 4, name: 'Sarah', age: 30, gender: 'female', email: 'sarah@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 5, name: 'Michael', age: 35, gender: 'male', email: 'michael@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 6, name: 'Emma', age: 26, gender: 'female', email: 'emma@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 7, name: 'David', age: 42, gender: 'male', email: 'david@example.com', password: bcrypt.hashSync('password123', 10) },
  { id: 8, name: 'Olivia', age: 29, gender: 'female', email: 'olivia@example.com', password: bcrypt.hashSync('password123', 10) }
];

// Mock likes data (in-memory database)
const likes = [
  { id: 1, fromUserId: 1, toUserId: 3, createdAt: new Date().toISOString() },
  { id: 2, fromUserId: 3, toUserId: 1, createdAt: new Date().toISOString() }
];

// Mock matches data (in-memory database)
const matches = [
  { 
    id: 1, 
    user1Id: 1, 
    user2Id: 3, 
    isActive: true,
    matchedAt: new Date().toISOString(),
    lastInteractionAt: new Date().toISOString()
  }
];

// In-memory database for calls
const calls = [
  {
    id: 1,
    matchId: 1,
    callerId: 1,
    calledId: 2,
    startTime: '2023-11-01T10:00:00Z',
    endTime: null,
    status: 'active',
    callType: 'video' // Added call type
  }
];

// Mock reports data (in-memory database)
const reports = [];

// Mock blocks data (in-memory database)
const blocks = [];

// מסד נתונים זמני לשמירת מפתחות FCM של משתמשים
const userFcmTokens = {};

// בהפעלה ראשונית, יש לנסות לאתחל את Firebase
// בפרויקט אמיתי זה היה מגיע מתצורה או משתני סביבה
try {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  
  // רק אם יש לנו קובץ מפתח
  if (serviceAccountPath) {
    // אתחול Firebase עם קובץ חשבון השירות
    const serviceAccount = require(serviceAccountPath);
    notificationsService.initialize(serviceAccount);
  } else {
    // אתחול ללא חשבון שירות (רק לבדיקות/פיתוח)
    console.warn('Firebase initialized without service account. Push notifications will be simulated.');
    
    // יצירת אתחול דמה (מאפשר פיתוח ללא Firebase אמיתי)
    global.firebaseMock = {
      sendNotification: (token, notification, data) => {
        console.log('MOCK NOTIFICATION:', { token, notification, data });
        return { success: true };
      }
    };
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error.message);
}

// Helper function to get next ID
const getNextId = (collection) => {
  const maxId = collection.length > 0 ? Math.max(...collection.map(item => item.id)) : 0;
  return maxId + 1;
};

// Helper function to generate a token for a user
const generateToken = (user) => {
  // Create token payload - don't include password
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  
  // Sign the token with our secret key (expires in 24h)
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Register a new user
app.post('/auth/register', async (req, res) => {
  // Validate request body
  const { name, email, password, age, gender } = req.body;
  
  if (!name || !email || !password || !age || !gender) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, email, password, age, and gender are required'
    });
  }
  
  // Validate email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: getNextId(users),
      name,
      email,
      password: hashedPassword,
      age: Number(age),
      gender
    };
    
    // Add to our "database"
    users.push(newUser);
    
    // Generate JWT token
    const token = generateToken(newUser);
    
    // Return user data and token (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  // Validate request body
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  try {
    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return user data and token (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Check current user based on token
app.get('/auth/me', verifyToken, (req, res) => {
  // Find the user by ID from the token
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Return user data without password
  const { password, ...userWithoutPassword } = user;
  
  res.status(200).json(userWithoutPassword);
});

// Users endpoint - return all users with optional filtering
app.get('/users', (req, res) => {
  let filteredUsers = [...users];
  
  // Get the current user ID from token if available
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let currentUserId = null;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      currentUserId = decoded.id;
      
      // If user is authenticated, filter out users that have blocked the current user
      // or have been blocked by the current user
      if (currentUserId) {
        filteredUsers = filteredUsers.filter(user => {
          // Skip the current user
          if (user.id === currentUserId) return false;
          
          // Check if either user has blocked the other
          const isBlocked = blocks.some(block => 
            (block.blockerId === currentUserId && block.blockedId === user.id) ||
            (block.blockerId === user.id && block.blockedId === currentUserId)
          );
          
          return !isBlocked;
        });
      }
    } catch (error) {
      // Invalid token, continue without filtering
    }
  }
  
  // Parse query parameters
  const { name, minAge, maxAge, gender, sortBy, order } = req.query;
  
  // Filter by name (case-insensitive partial match)
  if (name) {
    filteredUsers = filteredUsers.filter(u => 
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  // Filter by minimum age
  if (minAge) {
    const min = parseInt(minAge);
    if (!isNaN(min)) {
      filteredUsers = filteredUsers.filter(u => u.age >= min);
    }
  }
  
  // Filter by maximum age
  if (maxAge) {
    const max = parseInt(maxAge);
    if (!isNaN(max)) {
      filteredUsers = filteredUsers.filter(u => u.age <= max);
    }
  }
  
  // Filter by gender
  if (gender) {
    filteredUsers = filteredUsers.filter(u => u.gender === gender);
  }
  
  // Apply sorting if requested
  if (sortBy && ['name', 'age', 'gender'].includes(sortBy)) {
    const direction = order === 'desc' ? -1 : 1;
    
    filteredUsers.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * direction;
      if (a[sortBy] > b[sortBy]) return 1 * direction;
      return 0;
    });
  }
  
  // Add pagination headers
  res.setHeader('X-Total-Count', filteredUsers.length.toString());
  
  // Remove password from response
  const usersWithoutPassword = filteredUsers.map(({ password, ...user }) => user);
  
  // Return filtered users
  res.status(200).json(usersWithoutPassword);
});

// Search users by query - IMPORTANT: must be defined BEFORE /users/:id
app.get('/users/search', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query parameter is required' });
  }
  
  const searchQuery = query.toLowerCase();
  
  // Search by name or partial match
  const searchResults = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery) || 
    u.gender.toLowerCase().includes(searchQuery)
  );
  
  // Remove passwords from results
  const resultsWithoutPassword = searchResults.map(({ password, ...user }) => user);
  
  res.status(200).json(resultsWithoutPassword);
});

// Get user by ID endpoint
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Remove password from response
  const { password, ...userWithoutPassword } = user;
  
  res.status(200).json(userWithoutPassword);
});

// Create new user endpoint (protected, requires token)
app.post('/users', verifyToken, (req, res) => {
  // Only admins should be able to create users directly (simplified here)
  
  // Validate request body
  const { name, age, gender, email, password } = req.body;
  
  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, age, gender, email, and password are required' 
    });
  }
  
  // Validate data types
  if (typeof name !== 'string' || typeof age !== 'number' || typeof gender !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid data types: name and gender must be strings, age must be a number' 
    });
  }
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  
  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Generate a new ID
  const newId = getNextId(users);
  
  // Create new user
  const newUser = {
    id: newId,
    name,
    age,
    gender,
    email,
    password: hashedPassword
  };
  
  // Add to our "database"
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  
  // Return the created user with 201 Created status
  res.status(201).json(userWithoutPassword);
});

// Update user endpoint (protected, requires token)
app.put('/users/:id', verifyToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Verify that the user is updating their own profile or is an admin
  if (req.user.id !== userId) {
    return res.status(403).json({ error: 'Unauthorized: You can only update your own profile' });
  }
  
  // Find user index
  const userIndex = users.findIndex(u => u.id === userId);
  
  // Check if user exists
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Get current user
  const currentUser = users[userIndex];
  
  // Validate request body
  const { name, age, gender, email } = req.body;
  
  if (!name || !age || !gender || !email) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, age, gender, and email are required' 
    });
  }
  
  // Validate data types
  if (typeof name !== 'string' || typeof age !== 'number' || typeof gender !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid data types: name and gender must be strings, age must be a number' 
    });
  }
  
  // Check if new email already exists (but ignore the user's own email)
  if (email !== currentUser.email && users.some(user => user.email === email)) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  
  // Update user
  const updatedUser = {
    ...currentUser,
    name,
    age,
    gender,
    email
  };
  
  // Replace user in the array
  users[userIndex] = updatedUser;
  
  // Return the updated user without password
  const { password, ...userWithoutPassword } = updatedUser;
  
  // Return the updated user
  res.status(200).json(userWithoutPassword);
});

// Update password endpoint (protected, requires token)
app.put('/auth/password', verifyToken, async (req, res) => {
  // Validate request body
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }
  
  // Find user
  const userIndex = users.findIndex(u => u.id === req.user.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  try {
    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, users[userIndex].password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    users[userIndex].password = hashedPassword;
    
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating password' });
  }
});

// Delete user endpoint (protected, requires token)
app.delete('/users/:id', verifyToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Verify that the user is deleting their own profile or is an admin
  if (req.user.id !== userId) {
    return res.status(403).json({ error: 'Unauthorized: You can only delete your own profile' });
  }
  
  // Find the user index
  const userIndex = users.findIndex(u => u.id === userId);
  
  // Check if user exists
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Remove user from array
  const deletedUser = users.splice(userIndex, 1)[0];
  
  // Remove password from response
  const { password, ...userWithoutPassword } = deletedUser;
  
  // Return success response with the deleted user
  res.status(200).json({ 
    message: 'User deleted successfully',
    user: userWithoutPassword
  });
});

// Define the inactivity timeout period (in days)
const MATCH_INACTIVITY_TIMEOUT_DAYS = 14; // 2 weeks

// Expose for testing
let INACTIVITY_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Helper function to check and close inactive matches
const checkAndCloseInactiveMatches = () => {
  const now = new Date();
  let closedCount = 0;
  
  matches.forEach(match => {
    if (!match.isActive) {
      return; // Skip already inactive matches
    }
    
    // Calculate last interaction time
    const lastInteractionTime = new Date(match.lastInteractionAt || match.matchedAt);
    const diffTime = now - lastInteractionTime;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // If more than MATCH_INACTIVITY_TIMEOUT_DAYS days with no activity, close the match
    if (diffDays > MATCH_INACTIVITY_TIMEOUT_DAYS) {
      match.isActive = false;
      match.closedAt = now.toISOString();
      match.closeReason = 'timeout';
      closedCount++;
      
      console.log(`Match ${match.id} closed due to inactivity (${diffDays.toFixed(2)} days).`);
      
      // Notify both users about the match closure via WebSocket if they're connected
      const user1Socket = [...io.sockets.sockets.values()].find(s => s.user?.id === match.user1Id);
      const user2Socket = [...io.sockets.sockets.values()].find(s => s.user?.id === match.user2Id);
      
      const notificationData = {
        matchId: match.id,
        reason: 'inactivity_timeout',
        message: `Your match has been closed due to ${MATCH_INACTIVITY_TIMEOUT_DAYS} days of inactivity.`,
        timestamp: now.toISOString()
      };
      
      if (user1Socket) {
        user1Socket.emit('match-closed', notificationData);
      }
      
      if (user2Socket) {
        user2Socket.emit('match-closed', notificationData);
      }
    }
  });
  
  return closedCount;
};

// Schedule the inactivity check to run at regular intervals
let inactivityCheckInterval = null;

const startInactivityCheck = () => {
  if (inactivityCheckInterval) {
    clearInterval(inactivityCheckInterval);
  }
  
  inactivityCheckInterval = setInterval(() => {
    console.log('Running scheduled check for inactive matches...');
    const closedCount = checkAndCloseInactiveMatches();
    console.log(`Closed ${closedCount} inactive matches.`);
  }, INACTIVITY_CHECK_INTERVAL);
  
  console.log(`Scheduled inactive match check to run every ${INACTIVITY_CHECK_INTERVAL / (60 * 60 * 1000)} hours`);
};

// Start the check in production (not in test mode)
if (process.env.NODE_ENV !== 'test') {
  startInactivityCheck();
}

// Also expose an API endpoint to manually trigger the check (for admin/testing)
app.post('/admin/check-inactive-matches', verifyToken, (req, res) => {
  // In a real app, you'd check if the user is an admin here
  const closedCount = checkAndCloseInactiveMatches();
  res.status(200).json({ 
    message: `Check completed. Closed ${closedCount} inactive matches.`,
    closedCount
  });
});

// For testing: update the check interval (admin only)
app.post('/admin/settings/match-timeout', verifyToken, (req, res) => {
  // In a real app, you'd check if the user is an admin here
  const { inactivityTimeoutDays, checkIntervalHours } = req.body;
  
  if (inactivityTimeoutDays) {
    if (inactivityTimeoutDays < 1 || inactivityTimeoutDays > 365) {
      return res.status(400).json({ error: 'Inactivity timeout must be between 1 and 365 days' });
    }
    
    // Update the timeout setting
    // In a real app, this would be stored in a database
    // MATCH_INACTIVITY_TIMEOUT_DAYS = inactivityTimeoutDays;
  }
  
  if (checkIntervalHours) {
    if (checkIntervalHours < 1 || checkIntervalHours > 168) { // Max 1 week
      return res.status(400).json({ error: 'Check interval must be between 1 and 168 hours' });
    }
    
    // Update the interval
    INACTIVITY_CHECK_INTERVAL = checkIntervalHours * 60 * 60 * 1000;
    
    // Restart the interval with new timing
    startInactivityCheck();
  }
  
  res.status(200).json({
    message: 'Settings updated',
    currentSettings: {
      inactivityTimeoutDays: MATCH_INACTIVITY_TIMEOUT_DAYS,
      checkIntervalHours: INACTIVITY_CHECK_INTERVAL / (60 * 60 * 1000)
    }
  });
});

// Create a like between users (protected, requires token)
app.post('/likes', verifyToken, (req, res) => {
  // Validate request body
  const { toUserId } = req.body;
  const fromUserId = req.user.id; // Get user ID from token
  
  if (!toUserId) {
    return res.status(400).json({ error: 'Missing required field: toUserId is required' });
  }
  
  // Parse to integers
  const from = parseInt(fromUserId);
  const to = parseInt(toUserId);
  
  // Validate IDs
  if (isNaN(from) || isNaN(to)) {
    return res.status(400).json({ error: 'Invalid user IDs: must be integers' });
  }
  
  // Can't like yourself
  if (from === to) {
    return res.status(400).json({ error: 'You cannot like yourself' });
  }
  
  // Make sure both users exist
  const fromUser = users.find(u => u.id === from);
  const toUser = users.find(u => u.id === to);
  
  if (!fromUser || !toUser) {
    return res.status(404).json({ error: 'One or both users not found' });
  }
  
  // Check if a like already exists
  const existingLike = likes.find(like => 
    like.fromUserId === from && like.toUserId === to
  );
  
  if (existingLike) {
    return res.status(409).json({ error: 'Like already exists', like: existingLike });
  }
  
  // Create new like
  const newLike = {
    id: getNextId(likes),
    fromUserId: from,
    toUserId: to,
    createdAt: new Date().toISOString()
  };
  
  // Add to our "database"
  likes.push(newLike);
  
  // Check if a mutual like exists (match)
  const mutualLike = likes.find(like => 
    like.fromUserId === to && like.toUserId === from
  );
  
  // If mutual like exists, create a match
  if (mutualLike) {
    const newMatch = {
      id: getNextId(matches),
      user1Id: Math.min(from, to), // Ensure consistent ordering
      user2Id: Math.max(from, to),
      isActive: true,
      matchedAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(), // Track last interaction time
      closedAt: null,
      closeReason: null
    };
    
    // Add to our "database"
    matches.push(newMatch);
    
    // Get user info for notification
    const otherUser = users.find(u => u.id === to);
    
    // Send push notification to the other user about the new match
    if (otherUser) {
      notificationsService.sendNewMatchNotification(
        to, 
        userFcmTokens,
        {
          matchId: newMatch.id,
          otherUserId: from,
          otherUserName: users.find(u => u.id === from)?.name || 'Someone'
        }
      ).catch(error => {
        console.error('Failed to send match notification:', error);
      });
    }
    
    // Return the like and match
    return res.status(201).json({ 
      like: newLike, 
      match: newMatch,
      isMatch: true 
    });
  }
  
  // Return just the like
  res.status(201).json({ 
    like: newLike,
    isMatch: false
  });
});

// Get likes for a user (protected, requires token)
app.get('/users/:id/likes/sent', verifyToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Verify that the user is accessing their own likes or is an admin
  if (req.user.id !== userId) {
    return res.status(403).json({ error: 'Unauthorized: You can only view your own likes' });
  }
  
  // Check if user exists
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Find likes sent by user
  const userLikes = likes.filter(like => like.fromUserId === userId);
  
  // Return likes
  res.status(200).json(userLikes);
});

// Get likes received by a user (protected, requires token)
app.get('/users/:id/likes/received', verifyToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Verify that the user is accessing their own likes or is an admin
  if (req.user.id !== userId) {
    return res.status(403).json({ error: 'Unauthorized: You can only view likes received by yourself' });
  }
  
  // Check if user exists
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Find likes received by user
  const userLikes = likes.filter(like => like.toUserId === userId);
  
  // Return likes
  res.status(200).json(userLikes);
});

// Get all matches (requires token)
app.get('/matches', verifyToken, (req, res) => {
  // Find matches for the current user
  const userMatches = matches.filter(match => 
    match.user1Id === req.user.id || match.user2Id === req.user.id
  );
  
  // Enhance match data with user info
  const enhancedMatches = userMatches.map(match => {
    // Get the other user in this match
    const otherUserId = match.user1Id === req.user.id ? match.user2Id : match.user1Id;
    const otherUser = users.find(u => u.id === otherUserId);
    
    if (!otherUser) {
      return null;
    }
    
    // Remove sensitive information from other user
    const { password, ...otherUserSafe } = otherUser;
    
    // Return enhanced match
    return {
      ...match,
      otherUser: otherUserSafe,
      // Make sure user1Id and user2Id are preserved
      user1Id: match.user1Id,
      user2Id: match.user2Id
    };
  }).filter(match => match !== null);
  
  // Set total count in header
  res.setHeader('X-Total-Count', enhancedMatches.length.toString());
  
  res.status(200).json(enhancedMatches);
});

// Get matches for a specific user
app.get('/users/:userId/matches', verifyToken, (req, res) => {
  const userId = parseInt(req.params.userId);
  
  // Verify the current user can only access their own matches
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'You can only view your own matches' });
  }
  
  // Find all matches for this user
  const userMatches = matches.filter(match => 
    (match.user1Id === userId || match.user2Id === userId)
  );
  
  // Enhance matches with other user details
  const enhancedMatches = userMatches.map(match => {
    // Find the other user in this match
    const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
    const otherUser = users.find(u => u.id === otherUserId);
    
    if (!otherUser) {
      return null;
    }
    
    // Remove sensitive information from other user
    const { password, ...otherUserSafe } = otherUser;
    
    // Return enhanced match
    return {
      ...match,
      otherUser: otherUserSafe,
      // Make sure user1Id and user2Id are preserved
      user1Id: match.user1Id,
      user2Id: match.user2Id
    };
  }).filter(match => match !== null);
  
  // Set total count in header
  res.setHeader('X-Total-Count', enhancedMatches.length.toString());
  
  res.status(200).json(enhancedMatches);
});

// Update a match (for testing purposes, in production would have more checks)
app.put('/matches/:id', verifyToken, (req, res) => {
  const matchId = parseInt(req.params.id);
  
  // Find the match
  const matchIndex = matches.findIndex(m => m.id === matchId);
  
  if (matchIndex === -1) {
    return res.status(404).json({ error: 'Match not found' });
  }
  
  // Verify user is part of this match
  const match = matches[matchIndex];
  if (match.user1Id !== req.user.id && match.user2Id !== req.user.id) {
    return res.status(403).json({ error: 'You do not have access to this match' });
  }
  
  // Validate and update allowed fields
  const { isActive, lastInteractionAt, closedAt, closeReason } = req.body;
  
  if (isActive !== undefined) {
    match.isActive = Boolean(isActive);
  }
  
  if (lastInteractionAt) {
    // Basic ISO date validation
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(lastInteractionAt)) {
      return res.status(400).json({ error: 'Invalid date format for lastInteractionAt' });
    }
    match.lastInteractionAt = lastInteractionAt;
  }
  
  if (closedAt) {
    // Basic ISO date validation
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(closedAt)) {
      return res.status(400).json({ error: 'Invalid date format for closedAt' });
    }
    match.closedAt = closedAt;
  }
  
  if (closeReason) {
    match.closeReason = closeReason;
  }
  
  // Save updated match
  matches[matchIndex] = match;
  
  res.status(200).json(match);
});

// Get active call for a match
app.get('/matches/:matchId/call', verifyToken, (req, res) => {
  const matchId = parseInt(req.params.matchId);
  
  // Find the match
  const match = matches.find(m => m.id === matchId);
  
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  
  // Verify user is part of this match
  if (match.user1Id !== req.user.id && match.user2Id !== req.user.id) {
    return res.status(403).json({ error: 'You do not have access to this match' });
  }
  
  // Find the most recent active call for this match
  const activeCall = calls
    .filter(c => c.matchId === matchId && c.status === 'active')
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))[0];
  
  if (!activeCall) {
    return res.status(404).json({ error: 'No active call found for this match' });
  }
  
  res.status(200).json(activeCall);
});

// Get call by ID
app.get('/calls/:callId', verifyToken, (req, res) => {
  const callId = parseInt(req.params.callId);
  
  // Find the call
  const call = calls.find(c => c.id === callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  // Verify user is part of this call
  if (call.initiatorId !== req.user.id && call.receiverId !== req.user.id) {
    return res.status(403).json({ error: 'You are not a participant in this call' });
  }
  
  res.status(200).json(call);
});

// Start a new call
app.post('/matches/:matchId/calls', verifyToken, (req, res) => {
  const matchId = parseInt(req.params.matchId);
  const { callType } = req.body;
  
  if (!callType || !['voice', 'video'].includes(callType)) {
    return res.status(400).json({ error: 'Valid callType (voice or video) is required' });
  }
  
  // Find the match
  const match = matches.find(m => m.id === matchId);
  
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  
  // Verify user is part of this match
  if (match.user1Id !== req.user.id && match.user2Id !== req.user.id) {
    return res.status(403).json({ error: 'You do not have access to this match' });
  }
  
  // Check if the match is active
  if (!match.isActive) {
    return res.status(400).json({ error: 'Cannot start a call in an inactive match' });
  }
  
  // Check if there's already an active call
  const existingActiveCall = calls.find(c => 
    c.matchId === matchId && (c.status === 'active' || c.status === 'initiated')
  );
  
  if (existingActiveCall) {
    return res.status(409).json({ 
      error: 'There is already an active call for this match',
      activeCall: existingActiveCall
    });
  }
  
  // Determine the other user
  const receiverId = match.user1Id === req.user.id ? match.user2Id : match.user1Id;
  
  // Create a new call
  const newCall = {
    id: getNextId(calls),
    matchId,
    initiatorId: req.user.id,
    receiverId,
    callType,
    status: 'initiated', // initiated, active, ended
    startTime: null,
    endTime: null,
    duration: null,
    // For voice calls, default to 5 minutes (300 seconds)
    maxDuration: callType === 'voice' ? 300 : 600, // 5 minutes for voice, 10 minutes for video
    createdAt: new Date().toISOString()
  };
  
  calls.push(newCall);
  
  // Update match last interaction timestamp
  match.lastInteractionAt = new Date().toISOString();
  
  res.status(201).json(newCall);
});

// Answer a call
app.put('/calls/:callId/answer', verifyToken, (req, res) => {
  const callId = parseInt(req.params.callId);
  
  // Find the call
  const call = calls.find(c => c.id === callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  // Verify user is the receiver of this call
  if (call.receiverId !== req.user.id) {
    return res.status(403).json({ error: 'Only the call receiver can answer the call' });
  }
  
  // Check if call is in the right state
  if (call.status !== 'initiated') {
    return res.status(400).json({ error: `Call cannot be answered because it is in '${call.status}' status` });
  }
  
  // Update call status
  call.status = 'active';
  call.startTime = new Date().toISOString();
  
  // Find and update the match
  const match = matches.find(m => m.id === call.matchId);
  if (match) {
    match.lastInteractionAt = new Date().toISOString();
  }
  
  res.status(200).json(call);
});

// End a call
app.put('/calls/:callId/end', verifyToken, (req, res) => {
  const callId = parseInt(req.params.callId);
  
  // Find the call
  const call = calls.find(c => c.id === callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  // Verify user is part of this call
  if (call.initiatorId !== req.user.id && call.receiverId !== req.user.id) {
    return res.status(403).json({ error: 'You are not a participant in this call' });
  }
  
  // Check if call is active
  if (call.status !== 'active') {
    return res.status(400).json({ error: `Call cannot be ended because it is in '${call.status}' status` });
  }
  
  // Update call status
  call.status = 'ended';
  call.endTime = new Date().toISOString();
  
  // Calculate duration
  const startTime = new Date(call.startTime);
  const endTime = new Date(call.endTime);
  call.duration = Math.round((endTime - startTime) / 1000); // duration in seconds
  
  // Find and update the match
  const match = matches.find(m => m.id === call.matchId);
  if (match) {
    match.lastInteractionAt = new Date().toISOString();
  }
  
  res.status(200).json(call);
});

// Extend call duration
app.put('/calls/:callId/extend', verifyToken, (req, res) => {
  const callId = parseInt(req.params.callId);
  const { additionalSeconds } = req.body;
  
  if (!additionalSeconds || !Number.isInteger(additionalSeconds) || additionalSeconds <= 0) {
    return res.status(400).json({ error: 'Valid additionalSeconds is required' });
  }
  
  // Find the call
  const call = calls.find(c => c.id === callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  // Verify user is part of this call
  if (call.initiatorId !== req.user.id && call.receiverId !== req.user.id) {
    return res.status(403).json({ error: 'You are not a participant in this call' });
  }
  
  // Check if call is active
  if (call.status !== 'active') {
    return res.status(400).json({ error: `Call cannot be extended because it is in '${call.status}' status` });
  }
  
  // Update max duration
  call.maxDuration += additionalSeconds;
  
  res.status(200).json(call);
});

// Upgrade call from voice to video
app.put('/calls/:callId/upgrade', verifyToken, (req, res) => {
  const callId = parseInt(req.params.callId);
  
  // Find the call
  const call = calls.find(c => c.id === callId);
  
  if (!call) {
    return res.status(404).json({ error: 'Call not found' });
  }
  
  // Verify user is part of this call
  if (call.initiatorId !== req.user.id && call.receiverId !== req.user.id) {
    return res.status(403).json({ error: 'You are not a participant in this call' });
  }
  
  // Check if call is active and voice
  if (call.status !== 'active') {
    return res.status(400).json({ error: `Call cannot be upgraded because it is in '${call.status}' status` });
  }
  
  if (call.callType !== 'voice') {
    return res.status(400).json({ error: 'Call is already a video call' });
  }
  
  // Update call type and extend max duration for video
  call.callType = 'video';
  call.maxDuration = 600; // Reset to 10 minutes for video
  
  res.status(200).json(call);
});

// Get call history for a match
app.get('/matches/:matchId/calls', verifyToken, (req, res) => {
  const matchId = parseInt(req.params.matchId);
  
  // Find the match
  const match = matches.find(m => m.id === matchId);
  
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  
  // Verify user is part of this match
  if (match.user1Id !== req.user.id && match.user2Id !== req.user.id) {
    return res.status(403).json({ error: 'You do not have access to this match' });
  }
  
  // Get call history for this match
  const matchCalls = calls
    .filter(c => c.matchId === matchId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.status(200).json(matchCalls);
});

// Helper function to get match by ID with enhanced user data
const getMatchWithUserDetails = (matchId, currentUserId) => {
  const match = matches.find(m => m.id === matchId);
  
  if (!match) {
    return null;
  }
  
  // Check if current user is part of this match
  if (match.user1Id !== currentUserId && match.user2Id !== currentUserId) {
    return null;
  }
  
  // Get the other user in this match
  const otherUserId = match.user1Id === currentUserId ? match.user2Id : match.user1Id;
  const otherUser = users.find(u => u.id === otherUserId);
  
  if (!otherUser) {
    return null;
  }
  
  // Remove sensitive information from other user
  const { password, ...otherUserSafe } = otherUser;
  
  // Return enhanced match
  return {
    ...match,
    otherUser: otherUserSafe,
    user1Id: match.user1Id,
    user2Id: match.user2Id
  };
};

// Create a report
app.post('/reports', verifyToken, (req, res) => {
  const { reportedUserId, reason, details, matchId, callId } = req.body;
  
  if (!reportedUserId || !reason) {
    return res.status(400).json({ error: 'Reported user ID and reason are required' });
  }
  
  // Parse to integers
  const reporterId = req.user.id;
  const reportedId = parseInt(reportedUserId);
  
  // Validate user IDs
  if (isNaN(reportedId)) {
    return res.status(400).json({ error: 'Invalid reported user ID' });
  }
  
  // Can't report yourself
  if (reporterId === reportedId) {
    return res.status(400).json({ error: 'You cannot report yourself' });
  }
  
  // Check if users exist
  const reporter = users.find(u => u.id === reporterId);
  const reportedUser = users.find(u => u.id === reportedId);
  
  if (!reporter || !reportedUser) {
    return res.status(404).json({ error: 'One or both users not found' });
  }
  
  // Create a new report
  const newReport = {
    id: getNextId(reports),
    reporterId,
    reportedId,
    reason,
    details: details || '',
    matchId: matchId ? parseInt(matchId) : null,
    callId: callId ? parseInt(callId) : null,
    status: 'open', // Initial status: open, investigating, closed-action, closed-noaction
    adminNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add to our "database"
  reports.push(newReport);
  
  res.status(201).json(newReport);
});

// Get reports for the current user
app.get('/reports/sent', verifyToken, (req, res) => {
  const userId = req.user.id;
  
  // Find reports created by this user
  const userReports = reports.filter(report => report.reporterId === userId);
  
  res.status(200).json(userReports);
});

// For admins: get all reports or filter by status
app.get('/admin/reports', verifyToken, (req, res) => {
  // In a real app, you'd check if the user is an admin here
  
  const { status } = req.query;
  let filteredReports = [...reports];
  
  // Filter by status if provided
  if (status) {
    filteredReports = filteredReports.filter(report => report.status === status);
  }
  
  // Sort by creation date, newest first
  filteredReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Set total count in header
  res.setHeader('X-Total-Count', filteredReports.length.toString());
  
  res.status(200).json(filteredReports);
});

// For admins: update report status
app.put('/admin/reports/:id', verifyToken, (req, res) => {
  // In a real app, you'd check if the user is an admin here
  
  const reportId = parseInt(req.params.id);
  const { status, adminNotes } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  // Validate status values
  const validStatuses = ['open', 'investigating', 'closed-action', 'closed-noaction'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
  }
  
  // Find the report
  const reportIndex = reports.findIndex(r => r.id === reportId);
  
  if (reportIndex === -1) {
    return res.status(404).json({ error: 'Report not found' });
  }
  
  // Update the report
  reports[reportIndex] = {
    ...reports[reportIndex],
    status,
    adminNotes: adminNotes || reports[reportIndex].adminNotes,
    updatedAt: new Date().toISOString()
  };
  
  res.status(200).json(reports[reportIndex]);
});

// Block a user
app.post('/blocks', verifyToken, (req, res) => {
  const { blockedUserId } = req.body;
  
  if (!blockedUserId) {
    return res.status(400).json({ error: 'Blocked user ID is required' });
  }
  
  // Parse to integers
  const blockerId = req.user.id;
  const blockedId = parseInt(blockedUserId);
  
  // Validate user IDs
  if (isNaN(blockedId)) {
    return res.status(400).json({ error: 'Invalid blocked user ID' });
  }
  
  // Can't block yourself
  if (blockerId === blockedId) {
    return res.status(400).json({ error: 'You cannot block yourself' });
  }
  
  // Check if users exist
  const blocker = users.find(u => u.id === blockerId);
  const blockedUser = users.find(u => u.id === blockedId);
  
  if (!blocker || !blockedUser) {
    return res.status(404).json({ error: 'One or both users not found' });
  }
  
  // Check if block already exists
  const existingBlock = blocks.find(block => 
    block.blockerId === blockerId && block.blockedId === blockedId
  );
  
  if (existingBlock) {
    return res.status(409).json({ error: 'Block already exists', block: existingBlock });
  }
  
  // Create a new block
  const newBlock = {
    id: getNextId(blocks),
    blockerId,
    blockedId,
    createdAt: new Date().toISOString()
  };
  
  // Add to our "database"
  blocks.push(newBlock);
  
  // Find and close any active match between these users
  const match = matches.find(m => 
    (m.user1Id === blockerId && m.user2Id === blockedId) || 
    (m.user1Id === blockedId && m.user2Id === blockerId)
  );
  
  if (match && match.isActive) {
    match.isActive = false;
    match.closedAt = new Date().toISOString();
    match.closeReason = 'blocked';
    
    // Notify the other user about the match closure
    const otherUserId = match.user1Id === blockerId ? match.user2Id : match.user1Id;
    const otherUserSocket = [...io.sockets.sockets.values()].find(s => s.user?.id === otherUserId);
    
    if (otherUserSocket) {
      otherUserSocket.emit('match-closed', {
        matchId: match.id,
        reason: 'blocked',
        message: 'This match has been closed because you have been blocked by the other user.',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // End any active calls between these users
  const activeCall = calls.find(call => 
    ((call.initiatorId === blockerId && call.receiverId === blockedId) || 
     (call.initiatorId === blockedId && call.receiverId === blockerId)) &&
    call.status === 'active'
  );
  
  if (activeCall) {
    activeCall.status = 'ended';
    activeCall.endTime = new Date().toISOString();
    activeCall.duration = activeCall.startTime ? 
      Math.round((new Date() - new Date(activeCall.startTime)) / 1000) : 0;
    
    // Notify the other user about the call ending
    const targetUserId = activeCall.initiatorId === blockerId ? activeCall.receiverId : activeCall.initiatorId;
    const targetSocket = [...io.sockets.sockets.values()].find(s => s.user?.id === targetUserId);
    
    if (targetSocket) {
      targetSocket.emit('call-ended', {
        callId: activeCall.id,
        matchId: activeCall.matchId,
        reason: 'disconnected',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  res.status(201).json(newBlock);
});

// Get blocks created by the current user
app.get('/blocks', verifyToken, (req, res) => {
  const userId = req.user.id;
  
  // Find blocks created by this user
  const userBlocks = blocks.filter(block => block.blockerId === userId);
  
  // Enhance with blocked user info
  const blocksWithUserInfo = userBlocks.map(block => {
    const blockedUser = users.find(u => u.id === block.blockedId);
    
    if (!blockedUser) {
      return block;
    }
    
    // Remove password from blocked user data
    const { password, ...blockedUserSafe } = blockedUser;
    
    return {
      ...block,
      blockedUser: blockedUserSafe
    };
  });
  
  res.status(200).json(blocksWithUserInfo);
});

// Unblock a user
app.delete('/blocks/:id', verifyToken, (req, res) => {
  const blockId = parseInt(req.params.id);
  const userId = req.user.id;
  
  // Find the block
  const blockIndex = blocks.findIndex(b => b.id === blockId && b.blockerId === userId);
  
  if (blockIndex === -1) {
    return res.status(404).json({ error: 'Block not found or you are not authorized to remove it' });
  }
  
  // Remove block from array
  const removedBlock = blocks.splice(blockIndex, 1)[0];
  
  res.status(200).json({ 
    message: 'User unblocked successfully',
    block: removedBlock
  });
});

// Check if a user is blocked
app.get('/blocks/check/:userId', verifyToken, (req, res) => {
  const currentUserId = req.user.id;
  const targetUserId = parseInt(req.params.userId);
  
  // Check if current user blocked the target user
  const outgoingBlock = blocks.find(block => 
    block.blockerId === currentUserId && block.blockedId === targetUserId
  );
  
  // Check if target user blocked the current user
  const incomingBlock = blocks.find(block => 
    block.blockerId === targetUserId && block.blockedId === currentUserId
  );
  
  res.status(200).json({
    isBlocked: !!outgoingBlock,
    isBlockedBy: !!incomingBlock,
    blockDetails: outgoingBlock || null
  });
});

// Add API routes for FCM token management

// Register FCM token for a user (for push notifications)
app.post('/users/me/fcm-token', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { token, deviceId } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'FCM token is required' });
  }
  
  const result = notificationsService.saveUserToken(
    userId, 
    token, 
    userFcmTokens, 
    deviceId || 'default'
  );
  
  if (result) {
    return res.status(200).json({ message: 'FCM token registered successfully' });
  } else {
    return res.status(500).json({ error: 'Failed to register FCM token' });
  }
});

// Remove FCM token for a user
app.delete('/users/me/fcm-token', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { deviceId } = req.body;
  
  const result = notificationsService.removeUserToken(
    userId, 
    userFcmTokens, 
    deviceId || 'all'
  );
  
  if (result) {
    return res.status(200).json({ message: 'FCM token(s) removed successfully' });
  } else {
    return res.status(500).json({ error: 'Failed to remove FCM token(s)' });
  }
});

// Testing route to send a push notification (for development)
app.post('/test/push-notification', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { title, body, data } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }
  
  try {
    const notification = { title, body };
    const result = await notificationsService.sendToUser(userId, userFcmTokens, notification, data || {});
    
    res.status(200).json({
      message: 'Notification sent',
      result
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({ error: 'Failed to send test notification' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.originalUrl} not found` });
});

// Adding socket.io server definitions 
let io;

/**
 * Start the server with Socket.IO support
 */
async function startServer() {
  try {
    // Create HTTP (or HTTPS in production) server with Socket.IO
    const serverConfig = createServer(app);
    const server = serverConfig.server;
    io = serverConfig.io;
    
    // Set up socket.io middleware and handlers
    setupSocketIO();
    
    // Start server
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      
      // Check for inactive matches periodically (once per day)
      const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      setInterval(() => {
        checkInactiveMatches();
      }, ONE_DAY);
      
      console.log('Scheduled inactive match check to run every 24 hours');
    });
    
    return { server, io };
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
}

/**
 * Check for inactive matches and close them
 */
function checkInactiveMatches() {
  const now = new Date();
  const INACTIVITY_THRESHOLD = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  
  console.log('Checking for inactive matches...');
  
  let inactiveCount = 0;
  
  matches.forEach(match => {
    if (!match.isActive) return; // Skip already inactive matches
    
    const lastActivity = new Date(match.lastInteractionAt);
    const timeDiff = now - lastActivity;
    
    if (timeDiff > INACTIVITY_THRESHOLD) {
      // Mark the match as inactive
      match.isActive = false;
      match.closedAt = new Date().toISOString();
      match.closeReason = 'inactivity';
      inactiveCount++;
    }
  });
  
  console.log(`Closed ${inactiveCount} inactive matches`);
}

/**
 * Set up Socket.IO middleware and handlers
 */
function setupSocketIO() {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  
  // Socket.IO middleware for JWT authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return next(new Error('Authentication required'));
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Add user data to socket
      socket.user = decoded;
      
      // Find user to make sure they exist
      const user = users.find(u => u.id === decoded.id);
      if (!user) {
        return next(new Error('User not found'));
      }
      
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  // Socket.IO connection handler
  io.on('connection', (socket) => {
    console.log('WebSocket connection established');
    
    // Helper to get user socket
    const getUserSocket = (userId) => {
      return [...io.sockets.sockets.values()].find(s => s.user?.id === userId);
    };

    // Authentication
    socket.on('authenticate', (token) => {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        socket.user = decoded;
        console.log(`WebSocket connection established for user: ${decoded.id}`);
      } catch (error) {
        socket.emit('auth_error', { message: 'Authentication failed' });
      }
    });

    // Join match room to receive signals for this match only
    socket.on('join-match-room', (matchId) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const match = matches.find(m => m.id === parseInt(matchId));
      
      if (!match) {
        return socket.emit('error', { message: 'Match not found' });
      }
      
      if (match.user1Id !== socket.user.id && match.user2Id !== socket.user.id) {
        return socket.emit('error', { message: 'Access denied' });
      }
      
      socket.join(`match_${matchId}`);
      console.log(`User ${socket.user.id} joined room: match_${matchId}`);
      
      // Update match's last interaction time
      match.lastInteractionAt = new Date().toISOString();
    });

    // Handle WebRTC signaling - Offer
    socket.on('offer', (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { matchId, sdp } = data;
      
      // Only broadcast to the match room
      socket.to(`match_${matchId}`).emit('offer', {
        initiatorId: socket.user.id,
        matchId,
        sdp
      });
      
      console.log(`User ${socket.user.id} sent offer for match ${matchId}`);
    });

    // Handle WebRTC signaling - Answer
    socket.on('answer', (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { matchId, sdp } = data;
      
      // Only broadcast to the match room
      socket.to(`match_${matchId}`).emit('answer', {
        responderId: socket.user.id,
        matchId,
        sdp
      });
      
      console.log(`User ${socket.user.id} sent answer for match ${matchId}`);
    });

    // Handle WebRTC signaling - ICE Candidate
    socket.on('ice-candidate', (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { matchId, candidate } = data;
      
      // Only broadcast to the match room
      socket.to(`match_${matchId}`).emit('ice-candidate', {
        senderId: socket.user.id,
        matchId,
        candidate
      });
      
      console.log(`User ${socket.user.id} sent ICE candidate for match ${matchId}`);
    });

    // Handle incoming call request
    socket.on('call-request', async (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { matchId, callType } = data;
      const initiatorId = socket.user.id;
      
      // Find the match
      const match = matches.find(m => m.id === parseInt(matchId));
      
      if (!match) {
        return socket.emit('error', { message: 'Match not found' });
      }
      
      if (match.user1Id !== initiatorId && match.user2Id !== initiatorId) {
        return socket.emit('error', { message: 'Access denied' });
      }
      
      if (!match.isActive) {
        return socket.emit('error', { message: 'Match is not active' });
      }
      
      // Find the other user in the match
      const receiverId = match.user1Id === initiatorId ? match.user2Id : match.user1Id;
      
      // Check if there's already an active call for this match
      const activeCall = calls.find(c => 
        c.matchId === parseInt(matchId) && 
        c.status === 'active'
      );
      
      if (activeCall) {
        return socket.emit('error', { message: 'There is already an active call for this match' });
      }
      
      // Check if the receiver has blocked the initiator
      const isBlocked = blocks.some(block => 
        (block.blockerId === receiverId && block.blockedId === initiatorId) ||
        (block.blockerId === initiatorId && block.blockedId === receiverId)
      );
      
      if (isBlocked) {
        return socket.emit('error', { message: 'Call cannot be initiated due to blocking' });
      }
      
      // Create a new call record
      const newCall = {
        id: getNextId(calls),
        matchId: parseInt(matchId),
        initiatorId,
        receiverId,
        callType: callType || 'video',
        status: 'ringing',
        startTime: null,
        endTime: null,
        duration: 0,
        createdAt: new Date().toISOString()
      };
      
      // Add to our "database"
      calls.push(newCall);
      
      // Create call data to send to the receiver
      const callData = {
        ...newCall,
        initiatorName: users.find(u => u.id === initiatorId)?.name
      };
      
      // Find the call receiver socket
      const receiverSocket = getUserSocket(receiverId);
      
      if (receiverSocket) {
        // Notify via WebSocket in real-time
        receiverSocket.emit('call-incoming', callData);
      }
      
      // Send push notification for incoming call
      try {
        // Get initiator info
        const caller = users.find(u => u.id === initiatorId);
        
        if (caller) {
          await notificationsService.sendIncomingCallNotification(
            receiverId,
            userFcmTokens,
            {
              callId: newCall.id,
              matchId: parseInt(matchId),
              callerId: initiatorId,
              callerName: caller.name,
              callType: callType || 'video'
            }
          );
        }
      } catch (error) {
        console.error('Failed to send call notification:', error);
      }
      
      // Emit back call initiated event with the call data
      socket.emit('call-initiated', newCall);
      
      // Update match's last interaction time
      match.lastInteractionAt = new Date().toISOString();
      
      console.log(`User ${initiatorId} initiated a call with user ${receiverId} in match ${matchId}`);
    });

    // Handle call answer
    socket.on('call-answer', (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { callId, accept } = data;
      const responderId = socket.user.id;
      
      // Find the call
      const call = calls.find(c => c.id === parseInt(callId));
      
      if (!call) {
        return socket.emit('error', { message: 'Call not found' });
      }
      
      if (call.receiverId !== responderId) {
        return socket.emit('error', { message: 'Access denied' });
      }
      
      if (call.status !== 'ringing') {
        return socket.emit('error', { message: `Call cannot be answered in ${call.status} state` });
      }
      
      // Find the match
      const match = matches.find(m => m.id === call.matchId);
      
      if (!match || !match.isActive) {
        return socket.emit('error', { message: 'Match is not active' });
      }
      
      // Update the call status based on the answer
      if (accept) {
        call.status = 'active';
        call.startTime = new Date().toISOString();
      } else {
        call.status = 'declined';
        call.endTime = new Date().toISOString();
      }
      
      // Find the call initiator socket
      const initiatorSocket = getUserSocket(call.initiatorId);
      
      if (initiatorSocket) {
        // Notify the initiator about the answer
        initiatorSocket.emit('call-answered', {
          callId: call.id,
          matchId: call.matchId,
          accepted: accept,
          responderId: responderId,
          responderName: users.find(u => u.id === responderId)?.name,
          timestamp: new Date().toISOString()
        });
      }
      
      // Emit back call answered event
      socket.emit('call-answer-confirmed', {
        callId: call.id,
        matchId: call.matchId,
        status: call.status
      });
      
      // Update match's last interaction time
      match.lastInteractionAt = new Date().toISOString();
      
      console.log(`User ${responderId} ${accept ? 'accepted' : 'declined'} call ${callId}`);
    });

    // Handle call ending
    socket.on('call-end', (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { callId } = data;
      const userId = socket.user.id;
      
      // Find the call
      const call = calls.find(c => c.id === parseInt(callId));
      
      if (!call) {
        return socket.emit('error', { message: 'Call not found' });
      }
      
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        return socket.emit('error', { message: 'Access denied' });
      }
      
      if (call.status !== 'active' && call.status !== 'ringing') {
        return socket.emit('error', { message: `Call cannot be ended in ${call.status} state` });
      }
      
      // Update the call
      call.status = 'ended';
      call.endTime = new Date().toISOString();
      
      // Calculate duration if the call was active
      if (call.startTime) {
        const startTime = new Date(call.startTime);
        const endTime = new Date(call.endTime);
        call.duration = Math.round((endTime - startTime) / 1000); // in seconds
      }
      
      // Find the match
      const match = matches.find(m => m.id === call.matchId);
      
      if (match) {
        // Update match's last interaction time
        match.lastInteractionAt = new Date().toISOString();
      }
      
      // Find the other user in the call
      const otherUserId = call.initiatorId === userId ? call.receiverId : call.initiatorId;
      const otherUserSocket = getUserSocket(otherUserId);
      
      if (otherUserSocket) {
        // Notify the other user about the call ending
        otherUserSocket.emit('call-ended', {
          callId: call.id,
          matchId: call.matchId,
          endedBy: userId,
          endedByName: users.find(u => u.id === userId)?.name,
          timestamp: new Date().toISOString()
        });
      }
      
      // Emit back call ended confirmation
      socket.emit('call-end-confirmed', {
        callId: call.id,
        matchId: call.matchId,
        duration: call.duration
      });
      
      console.log(`User ${userId} ended call ${callId}`);
    });

    // Handle user sending a message
    socket.on('send-message', async (data) => {
      if (!socket.user) {
        return socket.emit('error', { message: 'Authentication required' });
      }
      
      const { matchId, content } = data;
      const senderId = socket.user.id;
      
      if (!matchId || !content) {
        return socket.emit('error', { message: 'Match ID and message content are required' });
      }
      
      // Find the match
      const match = matches.find(m => m.id === parseInt(matchId));
      
      if (!match) {
        return socket.emit('error', { message: 'Match not found' });
      }
      
      if (match.user1Id !== senderId && match.user2Id !== senderId) {
        return socket.emit('error', { message: 'Access denied' });
      }
      
      if (!match.isActive) {
        return socket.emit('error', { message: 'Match is not active' });
      }
      
      // Find the recipient
      const recipientId = match.user1Id === senderId ? match.user2Id : match.user1Id;
      
      // Check if the recipient has blocked the sender
      const isBlocked = blocks.some(block => 
        (block.blockerId === recipientId && block.blockedId === senderId) ||
        (block.blockerId === senderId && block.blockedId === recipientId)
      );
      
      if (isBlocked) {
        return socket.emit('error', { message: 'Message cannot be sent due to blocking' });
      }
      
      // Create a new message
      const newMessage = {
        id: Date.now(), // Using timestamp as ID for simplicity
        matchId: parseInt(matchId),
        senderId,
        recipientId,
        content,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      // In a real app, we'd save this to a database
      // For this example, we'll just emit it via WebSocket
      
      // Find the recipient socket
      const recipientSocket = getUserSocket(recipientId);
      
      if (recipientSocket) {
        // Include sender name
        const sender = users.find(u => u.id === senderId);
        
        // Notify recipient via WebSocket in real-time
        recipientSocket.emit('new-message', {
          ...newMessage,
          senderName: sender ? sender.name : 'Unknown user'
        });
      }
      
      // Send push notification for the message
      try {
        const sender = users.find(u => u.id === senderId);
        
        if (sender) {
          // Create a preview of the message
          const preview = content.length > 50 
            ? content.substring(0, 47) + '...' 
            : content;
          
          await notificationsService.sendNewMessageNotification(
            recipientId,
            userFcmTokens,
            {
              matchId: parseInt(matchId),
              senderId,
              senderName: sender.name,
              messageId: newMessage.id,
              preview
            }
          );
        }
      } catch (error) {
        console.error('Failed to send message notification:', error);
      }
      
      // Emit back message sent confirmation
      socket.emit('message-sent', newMessage);
      
      // Update match's last interaction time
      match.lastInteractionAt = new Date().toISOString();
      
      console.log(`User ${senderId} sent message to ${recipientId} in match ${matchId}`);
    });

    // Disconnect
    socket.on('disconnect', () => {
      if (socket.user) {
        console.log(`User ${socket.user.id} disconnected`);
      } else {
        console.log('Unauthenticated connection disconnected');
      }
    });

    // WebRTC signaling
    socket.on('webrtc-signal', (data) => {
      // Check if the user is authenticated
      if (!socket.user) {
        return socket.emit('error', { message: 'You must be authenticated to use WebRTC' });
      }

      const senderId = socket.user.id;
      const { type, matchId } = data;
      
      if (!matchId) {
        return socket.emit('error', { message: 'Match ID is required' });
      }
      
      // Find the match
      const match = matches.find(m => m.id === matchId);
      
      if (!match) {
        return socket.emit('error', { message: 'Match not found' });
      }
      
      // Verify the user is part of this match
      if (match.user1Id !== senderId && match.user2Id !== senderId) {
        return socket.emit('error', { message: 'You are not part of this match' });
      }
      
      // Get the other user in the match
      const recipientId = match.user1Id === senderId ? match.user2Id : match.user1Id;
      
      // Find the recipient's socket
      const recipientSocket = getUserSocket(recipientId);
      
      if (!recipientSocket) {
        return socket.emit('error', { message: 'Other user is not online' });
      }
      
      // Process different signal types
      switch (type) {
        case 'offer':
          // Create new call record
          const newCall = {
            id: getNextId(calls),
            matchId,
            callerId: senderId,
            receiverId: recipientId,
            startTime: new Date().toISOString(),
            status: 'active',
            endTime: null,
            type: data.callType || 'video'
          };
          
          calls.push(newCall);
          
          // Forward offer to recipient
          recipientSocket.emit('webrtc-signal', {
            type: 'offer',
            matchId,
            offer: data.offer,
            callType: data.callType || 'video',
            callId: newCall.id
          });
          
          console.log(`WebRTC offer from ${senderId} to ${recipientId}, matchId: ${matchId}`);
          break;
          
        case 'answer':
          // Find active call
          const activeCall = calls.find(c => 
            c.matchId === matchId && 
            c.status === 'active' && 
            c.receiverId === senderId
          );
          
          if (!activeCall) {
            return socket.emit('error', { message: 'No active call found' });
          }
          
          // Forward answer to caller
          recipientSocket.emit('webrtc-signal', {
            type: 'answer',
            matchId,
            answer: data.answer
          });
          
          console.log(`WebRTC answer from ${senderId} to ${recipientId}, matchId: ${matchId}`);
          break;
          
        case 'ice-candidate':
          // Forward ICE candidate to the other user
          recipientSocket.emit('webrtc-signal', {
            type: 'ice-candidate',
            matchId,
            candidate: data.candidate
          });
          
          console.log(`WebRTC ICE candidate from ${senderId} to ${recipientId}, matchId: ${matchId}`);
          break;
          
        case 'call-ended':
          // Find active call and end it
          const callToEnd = calls.find(c => 
            c.matchId === matchId && 
            c.status === 'active' && 
            (c.callerId === senderId || c.receiverId === senderId)
          );
          
          if (callToEnd) {
            // Update call record
            callToEnd.status = 'ended';
            callToEnd.endTime = new Date().toISOString();
            
            // Notify the other user
            recipientSocket.emit('webrtc-signal', {
              type: 'call-ended',
              matchId,
              callId: callToEnd.id
            });
            
            console.log(`WebRTC call ended by ${senderId}, matchId: ${matchId}`);
          }
          break;
          
        default:
          console.log(`Unknown WebRTC signal type: ${type}`);
      }
    });
  });
}

// Start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

// Export for testing
module.exports = { app, startServer }; 