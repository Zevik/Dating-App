/**
 * Consent Management Service
 * Handles user consents for privacy regulations like GDPR and CCPA
 */

// Consent types
const CONSENT_TYPES = {
  DATA_PROCESSING: 'data_processing',  // Basic data processing (required)
  MARKETING: 'marketing',              // Marketing emails and communications
  THIRD_PARTY: 'third_party',          // Sharing data with third parties
  LOCATION: 'location',                // Location tracking
  ANALYTICS: 'analytics',              // Analytics and usage tracking
  PUSH_NOTIFICATIONS: 'push_notifications', // Push notifications
  PERSONALIZATION: 'personalization',  // Content personalization
};

// Consent actions
const CONSENT_ACTIONS = {
  GRANTED: 'granted',
  DECLINED: 'declined',
  WITHDRAWN: 'withdrawn',
};

/**
 * Record a consent action for a user
 * @param {Object} consentStore - Storage for consent records
 * @param {number} userId - User ID
 * @param {string} consentType - Type of consent from CONSENT_TYPES
 * @param {string} action - Action from CONSENT_ACTIONS
 * @param {Object} metadata - Additional consent metadata
 * @returns {Object} - The created consent record
 */
const recordConsent = (consentStore, userId, consentType, action, metadata = {}) => {
  if (!userId || !consentType || !action) {
    throw new Error('Missing required parameters: userId, consentType, or action');
  }
  
  // Validate consent type
  if (!Object.values(CONSENT_TYPES).includes(consentType)) {
    throw new Error(`Invalid consent type: ${consentType}`);
  }
  
  // Validate action
  if (!Object.values(CONSENT_ACTIONS).includes(action)) {
    throw new Error(`Invalid consent action: ${action}`);
  }
  
  // Create consent record
  const timestamp = new Date().toISOString();
  const consentRecord = {
    userId,
    consentType,
    action,
    timestamp,
    ipAddress: metadata.ipAddress || null,
    userAgent: metadata.userAgent || null,
    version: metadata.version || '1.0',
    additionalInfo: metadata.additionalInfo || {},
  };
  
  // Initialize user's consent records if needed
  if (!consentStore[userId]) {
    consentStore[userId] = [];
  }
  
  // Add new consent record
  consentStore[userId].push(consentRecord);
  
  return consentRecord;
};

/**
 * Get all consent records for a user
 * @param {Object} consentStore - Storage for consent records
 * @param {number} userId - User ID
 * @returns {Array} - Array of consent records
 */
const getUserConsents = (consentStore, userId) => {
  if (!userId) {
    throw new Error('Missing required parameter: userId');
  }
  
  return consentStore[userId] || [];
};

/**
 * Get latest consent record for a specific type
 * @param {Object} consentStore - Storage for consent records
 * @param {number} userId - User ID
 * @param {string} consentType - Type of consent from CONSENT_TYPES
 * @returns {Object|null} - Latest consent record or null if not found
 */
const getLatestConsent = (consentStore, userId, consentType) => {
  if (!userId || !consentType) {
    throw new Error('Missing required parameters: userId or consentType');
  }
  
  const userConsents = getUserConsents(consentStore, userId);
  
  // Filter by type and sort by timestamp (newest first)
  const typeConsents = userConsents
    .filter(consent => consent.consentType === consentType)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return typeConsents.length > 0 ? typeConsents[0] : null;
};

/**
 * Check if user has given consent for a specific type
 * @param {Object} consentStore - Storage for consent records
 * @param {number} userId - User ID
 * @param {string} consentType - Type of consent from CONSENT_TYPES
 * @returns {boolean} - Whether user has given consent
 */
const hasConsent = (consentStore, userId, consentType) => {
  if (!userId || !consentType) {
    return false;
  }
  
  const latestConsent = getLatestConsent(consentStore, userId, consentType);
  
  // User has consent if the latest action was GRANTED
  return latestConsent && latestConsent.action === CONSENT_ACTIONS.GRANTED;
};

/**
 * Generate data export for a user's data (GDPR/CCPA right to access)
 * @param {Object} consentStore - Storage for consent records
 * @param {number} userId - User ID
 * @param {Object} userData - User data from various sources
 * @returns {Object} - Formatted user data export
 */
const generateDataExport = (consentStore, userId, userData) => {
  if (!userId) {
    throw new Error('Missing required parameter: userId');
  }
  
  // Get all user consents
  const consents = getUserConsents(consentStore, userId);
  
  // Format consents for export
  const consentExport = consents.map(consent => ({
    type: consent.consentType,
    status: consent.action,
    timestamp: consent.timestamp,
    version: consent.version
  }));
  
  // Compile the complete data export
  return {
    userId,
    exportDate: new Date().toISOString(),
    personalData: userData.personal || {},
    accountData: userData.account || {},
    activityData: userData.activity || {},
    consents: consentExport
  };
};

/**
 * Create a request to delete user data (GDPR/CCPA right to be forgotten)
 * @param {Array} deletionRequests - Storage for deletion requests
 * @param {number} userId - User ID
 * @param {Object} metadata - Additional request metadata
 * @returns {Object} - The created deletion request
 */
const requestDataDeletion = (deletionRequests, userId, metadata = {}) => {
  if (!userId) {
    throw new Error('Missing required parameter: userId');
  }
  
  // Create deletion request
  const requestId = Date.now().toString();
  const timestamp = new Date().toISOString();
  
  const deletionRequest = {
    id: requestId,
    userId,
    status: 'pending', // pending, processing, completed, rejected
    timestamp,
    ipAddress: metadata.ipAddress || null,
    userAgent: metadata.userAgent || null,
    reason: metadata.reason || 'user_request',
    adminNotes: '',
  };
  
  // Add to deletion requests
  deletionRequests.push(deletionRequest);
  
  return deletionRequest;
};

module.exports = {
  CONSENT_TYPES,
  CONSENT_ACTIONS,
  recordConsent,
  getUserConsents,
  getLatestConsent,
  hasConsent,
  generateDataExport,
  requestDataDeletion
}; 