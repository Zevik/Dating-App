const fs = require('fs');
const path = require('path');
const db = require('../services/database');

/**
 * Create migrations table if it doesn't exist
 * @returns {Promise<void>}
 */
async function ensureMigrationsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
  } catch (error) {
    console.error('Error creating migrations table:', error);
    throw error;
  }
}

/**
 * Get list of already applied migrations
 * @returns {Promise<string[]>} Array of migration names
 */
async function getAppliedMigrations() {
  try {
    const result = await db.query(`
      SELECT name FROM migrations ORDER BY id
    `);
    return result.rows.map(row => row.name);
  } catch (error) {
    console.error('Error getting applied migrations:', error);
    throw error;
  }
}

/**
 * Get list of available migration files
 * @returns {Promise<string[]>} Array of migration names
 */
async function getAvailableMigrations() {
  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
      return [];
    }
    
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort(); // Sort alphabetically to ensure order
    
    return files.map(file => file.replace('.js', ''));
  } catch (error) {
    console.error('Error getting available migrations:', error);
    throw error;
  }
}

/**
 * Apply pending migrations
 * @returns {Promise<void>}
 */
async function applyMigrations() {
  try {
    // Ensure migrations table exists
    await ensureMigrationsTable();
    
    // Get applied and available migrations
    const appliedMigrations = await getAppliedMigrations();
    const availableMigrations = await getAvailableMigrations();
    
    console.log('Applied migrations:', appliedMigrations);
    console.log('Available migrations:', availableMigrations);
    
    // Determine pending migrations
    const pendingMigrations = availableMigrations.filter(
      name => !appliedMigrations.includes(name)
    );
    
    if (pendingMigrations.length === 0) {
      console.log('No pending migrations to apply.');
      return;
    }
    
    console.log(`Applying ${pendingMigrations.length} pending migrations...`);
    
    // Apply each pending migration in order
    for (const migrationName of pendingMigrations) {
      console.log(`Applying migration: ${migrationName}`);
      
      const migrationPath = path.join(__dirname, 'migrations', `${migrationName}.js`);
      const migration = require(migrationPath);
      
      console.log(`Running up function for ${migrationName}`);
      await migration.up();
      
      // Record migration as applied
      await db.query(`
        INSERT INTO migrations (name) VALUES ($1)
      `, [migrationName]);
      
      console.log(`Migration ${migrationName} applied successfully.`);
    }
    
    console.log('All migrations applied successfully.');
  } catch (error) {
    console.error('Error applying migrations:', error);
    throw error;
  }
}

/**
 * Rollback last migration
 * @returns {Promise<void>}
 */
async function rollbackLastMigration() {
  try {
    // Ensure migrations table exists
    await ensureMigrationsTable();
    
    // Get the last applied migration
    const result = await db.query(`
      SELECT name FROM migrations ORDER BY id DESC LIMIT 1
    `);
    
    if (result.rows.length === 0) {
      console.log('No migrations to rollback.');
      return;
    }
    
    const lastMigration = result.rows[0].name;
    console.log(`Rolling back migration: ${lastMigration}`);
    
    const migrationPath = path.join(__dirname, 'migrations', `${lastMigration}.js`);
    const migration = require(migrationPath);
    
    // Run the down function
    await migration.down();
    
    // Remove migration from the applied list
    await db.query(`
      DELETE FROM migrations WHERE name = $1
    `, [lastMigration]);
    
    console.log(`Migration ${lastMigration} rolled back successfully.`);
  } catch (error) {
    console.error('Error rolling back migration:', error);
    throw error;
  }
}

/**
 * Run migrations based on command
 * @param {string} command - 'up' or 'down'
 * @returns {Promise<void>}
 */
async function run(command = 'up') {
  try {
    console.log(`Running migrations with command: ${command}`);
    
    // Check database connection
    const isConnected = await db.healthCheck();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }
    
    if (command === 'up') {
      await applyMigrations();
    } else if (command === 'down') {
      await rollbackLastMigration();
    } else {
      throw new Error(`Invalid command: ${command}`);
    }
    
    console.log('Migration operation completed successfully.');
  } catch (error) {
    console.error('Migration operation failed:', error);
    throw error;
  } finally {
    // Don't close the pool here since it might be needed elsewhere
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  const command = process.argv[2] || 'up';
  run(command)
    .then(() => {
      console.log('Migration script finished.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = {
  run,
  applyMigrations,
  rollbackLastMigration
}; 