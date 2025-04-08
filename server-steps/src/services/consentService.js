/**
 * Consent service for managing call permissions
 */

// In-memory store for consent records
// In a real app, this would be in a database
const consentRecords = [];

/**
 * Add a consent record
 * @param {number} userId - User ID who gave consent
 * @param {string} consentType - Type of consent (e.g., 'video', 'audio')
 * @param {number} matchId - ID of the match for which consent is given
 * @param {Date} expiresAt - When this consent expires
 * @returns {Object} The created consent record
 */
function addConsent(userId, consentType, matchId, expiresAt = null) {
  // Default expiration to 24 hours from now if not specified
  if (!expiresAt) {
    expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
  }

  const consentRecord = {
    id: consentRecords.length + 1,
    userId,
    consentType,
    matchId,
    createdAt: new Date(),
    expiresAt,
    isRevoked: false
  };

  consentRecords.push(consentRecord);
  return consentRecord;
}

/**
 * Check if a user has given consent for a specific type and match
 * @param {number} userId - User ID to check
 * @param {string} consentType - Type of consent to check
 * @param {number} matchId - Match ID to check against
 * @returns {boolean} Whether user has valid consent
 */
function hasConsent(userId, consentType, matchId) {
  const now = new Date();
  
  return consentRecords.some(record => 
    record.userId === userId &&
    record.consentType === consentType &&
    record.matchId === matchId &&
    !record.isRevoked &&
    record.expiresAt > now
  );
}

/**
 * Revoke a specific consent
 * @param {number} userId - User ID whose consent to revoke
 * @param {string} consentType - Type of consent to revoke
 * @param {number} matchId - Match ID for which to revoke consent
 * @returns {boolean} Whether any consent was revoked
 */
function revokeConsent(userId, consentType, matchId) {
  let revokedAny = false;
  
  consentRecords.forEach(record => {
    if (record.userId === userId && 
        record.consentType === consentType && 
        record.matchId === matchId &&
        !record.isRevoked) {
      record.isRevoked = true;
      revokedAny = true;
    }
  });
  
  return revokedAny;
}

/**
 * Get all consent records for a specific user
 * @param {number} userId - User ID to lookup
 * @returns {Array} Array of consent records
 */
function getUserConsents(userId) {
  return consentRecords.filter(record => record.userId === userId);
}

module.exports = {
  addConsent,
  hasConsent,
  revokeConsent,
  getUserConsents
}; 