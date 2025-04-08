const jwt = require('jsonwebtoken');

// Secret key for JWT - this should be in environment variables
const JWT_SECRET = 'your_jwt_secret_key_should_be_complex_and_in_env_vars';

/**
 * Generate a JWT token for the given user
 * @param {Object} user - User object without sensitive data
 * @returns {string} JWT token
 */
const generateJwt = (user) => {
  // Ensure we're not including sensitive data like password in the token
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  const options = {
    expiresIn: '7d' // Token expires in 7 days
  };
  
  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * Middleware to verify JWT token
 * @param {Object} req - Express request object 
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add the user data to the request
    req.user = decoded;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = {
  generateJwt,
  verifyToken,
  JWT_SECRET
}; 