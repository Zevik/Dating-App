const db = require('../services/database');
const migrationRunner = require('./migrationRunner');
const fs = require('fs');
const path = require('path');

/**
 * Create the database if it doesn't exist
 * @returns {Promise<boolean>} Success status
 */
async function createDatabase() {
  try {
    console.log('Checking if database needs to be created...');
    return await db.createDatabaseIfNotExists();
  } catch (error) {
    console.error('Error creating database:', error.message);
    return false;
  }
}

/**
 * Check if PostgreSQL server is available and we can connect
 * @returns {Promise<boolean>} Connection status
 */
async function checkDatabaseConnection() {
  try {
    console.log('Checking database connection...');
    
    // Try a simple query to check connection
    const connected = await db.healthCheck();
    
    if (connected) {
      console.log('✅ Successfully connected to the database');
      return true;
    } else {
      console.error('❌ Failed to connect to the database');
      return false;
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
}

/**
 * Ensure migrations directory exists
 * @returns {Promise<boolean>} Success status
 */
async function ensureMigrationsDirectory() {
  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    
    if (!fs.existsSync(migrationsDir)) {
      console.log('Creating migrations directory...');
      fs.mkdirSync(migrationsDir, { recursive: true });
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring migrations directory:', error.message);
    return false;
  }
}

/**
 * Apply all pending migrations
 * @returns {Promise<boolean>} Success status
 */
async function runMigrations() {
  try {
    console.log('Running database migrations...');
    await migrationRunner.applyMigrations();
    return true;
  } catch (error) {
    console.error('Error running migrations:', error.message);
    return false;
  }
}

/**
 * Set up the database (check connection, run migrations)
 * @returns {Promise<boolean>} Success status
 */
async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Create database if it doesn't exist
    const dbCreated = await createDatabase();
    if (!dbCreated) {
      console.error('Failed to create database. Please check your database configuration.');
      return false;
    }
    
    // Check connection
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      console.error('Failed to connect to the database. Please check your database configuration.');
      return false;
    }
    
    // Ensure migrations directory exists
    await ensureMigrationsDirectory();
    
    // Run migrations
    const migrationsSuccess = await runMigrations();
    if (!migrationsSuccess) {
      console.error('Failed to run migrations.');
      return false;
    }
    
    console.log('✅ Database setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error.message);
    return false;
  }
}

// Only run setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(success => {
      if (success) {
        console.log('Database setup completed successfully.');
        process.exit(0);
      } else {
        console.error('Database setup failed.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Database setup error:', error);
      process.exit(1);
    });
}

module.exports = {
  setupDatabase,
  checkDatabaseConnection,
  runMigrations,
  createDatabase
}; 