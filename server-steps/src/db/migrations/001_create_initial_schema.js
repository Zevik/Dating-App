const { query } = require('../../services/database');

/**
 * Create initial database schema
 * @returns {Promise<void>}
 */
async function up() {
  try {
    console.log('Running migration: 001_create_initial_schema - up');
    
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        display_name TEXT NOT NULL CHECK (length(display_name) > 0 AND length(display_name) <= 50),
        birth_date DATE NOT NULL,
        gender TEXT CHECK (gender IN ('male', 'female', 'other')),
        looking_for_gender TEXT[],
        bio TEXT CHECK (length(bio) <= 500),
        profile_image_url TEXT,
        additional_photos JSONB DEFAULT '[]'::jsonb,
        preferred_age_min INTEGER DEFAULT 18 CHECK (preferred_age_min >= 18),
        preferred_age_max INTEGER DEFAULT 99 CHECK (preferred_age_max >= preferred_age_min),
        preferred_distance_km INTEGER DEFAULT 50 CHECK (preferred_distance_km > 0),
        is_active BOOLEAN DEFAULT true,
        is_paid BOOLEAN DEFAULT false,
        paid_until TIMESTAMPTZ,
        verified_email BOOLEAN DEFAULT false,
        consents JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_active_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_last_active_at ON users(last_active_at);
    `);
    
    // Create likes table
    await query(`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        is_like BOOLEAN NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE (from_user_id, to_user_id)
      );
      
      CREATE INDEX IF NOT EXISTS idx_likes_combo ON likes(to_user_id, from_user_id, is_like);
    `);
    
    // Create matches table
    await query(`
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        matched_at TIMESTAMPTZ DEFAULT NOW(),
        is_active BOOLEAN DEFAULT true,
        closed_at TIMESTAMPTZ,
        close_reason TEXT CHECK (close_reason IN ('user1_ended', 'user2_ended', 'timeout', 'blocked', 'admin_closed')),
        default_voice_call_duration_sec INTEGER NOT NULL DEFAULT 300 CHECK (default_voice_call_duration_sec > 0),
        default_video_call_duration_sec INTEGER NOT NULL DEFAULT 300 CHECK (default_video_call_duration_sec > 0),
        last_interaction_at TIMESTAMPTZ DEFAULT NOW(),
        match_inactivity_timeout_interval INTERVAL NOT NULL DEFAULT '14 days',
        CHECK (user1_id < user2_id)
      );
      
      CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id, is_active);
      CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id, is_active);
      CREATE INDEX IF NOT EXISTS idx_matches_timeout ON matches(is_active, last_interaction_at);
    `);
    
    // Create calls table
    await query(`
      CREATE TABLE IF NOT EXISTS calls (
        id SERIAL PRIMARY KEY,
        match_id INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
        call_segment_uuid UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
        previous_call_segment_uuid UUID REFERENCES calls(call_segment_uuid) ON DELETE SET NULL,
        initiator_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        receiver_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        call_type TEXT NOT NULL CHECK (call_type IN ('voice', 'video')),
        status TEXT NOT NULL CHECK (status IN ('initiated', 'answered', 'unanswered', 'declined', 'ended', 'error')),
        start_time TIMESTAMPTZ,
        end_time TIMESTAMPTZ,
        duration_seconds INTEGER CHECK (duration_seconds >= 0),
        end_reason TEXT CHECK (end_reason IN (
          'initiator_ended', 'receiver_ended', 'timeout_reached', 'extended', 
          'upgraded_to_video', 'match_closed', 'connection_error', 'blocked', 
          'receiver_busy', 'system_ended'
        )),
        initiated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_calls_match ON calls(match_id, initiated_at DESC);
      CREATE INDEX IF NOT EXISTS idx_calls_initiator ON calls(initiator_user_id);
      CREATE INDEX IF NOT EXISTS idx_calls_receiver ON calls(receiver_user_id);
      CREATE INDEX IF NOT EXISTS idx_calls_prev_segment ON calls(previous_call_segment_uuid);
    `);
    
    // Create blocks table
    await query(`
      CREATE TABLE IF NOT EXISTS blocks (
        id SERIAL PRIMARY KEY,
        blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE (blocker_id, blocked_id)
      );
      
      CREATE INDEX IF NOT EXISTS idx_blocks_blocked ON blocks(blocked_id);
    `);
    
    // Create reports table
    await query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
        reported_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        match_id INTEGER REFERENCES matches(id) ON DELETE SET NULL,
        call_segment_uuid UUID REFERENCES calls(call_segment_uuid) ON DELETE SET NULL,
        reason TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Investigating', 'Closed-ActionTaken', 'Closed-NoAction', 'Closed-FalseReport')),
        admin_notes TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_reports_reported ON reports(reported_id);
      CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
      CREATE INDEX IF NOT EXISTS idx_reports_created ON reports(created_at);
    `);
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

/**
 * Revert the migration
 * @returns {Promise<void>}
 */
async function down() {
  try {
    console.log('Running migration: 001_create_initial_schema - down');
    
    // Drop tables in the correct order to respect foreign key constraints
    await query('DROP TABLE IF EXISTS reports CASCADE');
    await query('DROP TABLE IF EXISTS blocks CASCADE');
    await query('DROP TABLE IF EXISTS calls CASCADE');
    await query('DROP TABLE IF EXISTS matches CASCADE');
    await query('DROP TABLE IF EXISTS likes CASCADE');
    await query('DROP TABLE IF EXISTS users CASCADE');
    
    console.log('Migration rollback completed successfully');
  } catch (error) {
    console.error('Migration rollback failed:', error);
    throw error;
  }
}

module.exports = {
  up,
  down
}; 