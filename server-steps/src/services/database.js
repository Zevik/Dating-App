const { Pool } = require('pg');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: 'postgres', // Connect to postgres db initially to create our db
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Dating2616',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000', 10),
};

// Create initial connection pool to postgres database
const initialPool = new Pool(dbConfig);

// Application database name
const appDbName = process.env.DB_NAME || 'dating_app';

/**
 * Create application database if it doesn't exist
 * @returns {Promise<boolean>} Success status
 */
async function createDatabaseIfNotExists() {
  try {
    // Check if database exists
    const checkDbQuery = `
      SELECT 1 FROM pg_database WHERE datname = $1
    `;
    
    const result = await initialPool.query(checkDbQuery, [appDbName]);
    
    if (result.rowCount === 0) {
      console.log(`Database ${appDbName} does not exist. Creating it now...`);
      
      // Create database
      const createDbQuery = `CREATE DATABASE ${appDbName}`;
      await initialPool.query(createDbQuery);
      
      console.log(`Database ${appDbName} created successfully.`);
    } else {
      console.log(`Database ${appDbName} already exists.`);
    }
    
    // Close initial pool
    await initialPool.end();
    
    return true;
  } catch (error) {
    console.error('Error creating database:', error);
    return false;
  }
}

// Create application database connection pool
const appDbConfig = {
  ...dbConfig,
  database: appDbName,
};

// This pool will be used after the database is created
const pool = new Pool(appDbConfig);

// Listen for errors on the pool
pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

/**
 * Execute a database query
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise<QueryResult>} Query result
 */
async function query(text, params = []) {
  try {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // Log query performance for slow queries
    if (duration > 100) {
      console.log('Slow query:', { text, duration, rows: result.rowCount });
    }
    
    return result;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
}

/**
 * Execute a transaction with multiple queries
 * @param {Function} callback - Callback function that receives a client and executes queries
 * @returns {Promise<any>} Result of the transaction
 */
async function transaction(callback) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const result = await callback(client);
    
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get a direct client connection from the pool
 * Useful for multiple operations where connection pooling is beneficial
 * @returns {Promise<PoolClient>} Database client
 */
async function getClient() {
  return await pool.connect();
}

/**
 * Check database connection
 * @returns {Promise<boolean>} Connection status
 */
async function healthCheck() {
  try {
    const result = await query('SELECT 1');
    return result.rowCount === 1;
  } catch (error) {
    console.error('Database health check failed:', error.message);
    return false;
  }
}

/**
 * Close the database pool - useful for graceful shutdowns
 * @returns {Promise<void>}
 */
async function close() {
  await pool.end();
  console.log('Database pool closed');
}

module.exports = {
  query,
  transaction,
  getClient,
  healthCheck,
  close,
  pool, // Exposed for direct access if needed
  createDatabaseIfNotExists
}; 