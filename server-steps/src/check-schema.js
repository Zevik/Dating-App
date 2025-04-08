// Script to check the schema of the users table and the gender enum
require('dotenv').config();
const db = require('./services/database');

async function checkSchema() {
  try {
    console.log('Connecting to database...');
    await db.createDatabaseIfNotExists();
    
    // Check if users table exists
    const checkTableQuery = `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `;
    
    const tableResult = await db.query(checkTableQuery);
    console.log('Users table schema:');
    console.table(tableResult.rows);
    
    // Try to check the enum values
    try {
      const checkEnumQuery = `
        SELECT n.nspname as schema,
               t.typname as type_name,
               e.enumlabel as enum_value
        FROM pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
        JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'gender'
        ORDER BY e.enumsortorder;
      `;
      
      const enumResult = await db.query(checkEnumQuery);
      console.log('\nGender enum values:');
      console.table(enumResult.rows);
    } catch (error) {
      console.error('Error checking enum values:', error);
    }
    
    // Check the constraints
    const checkConstraintQuery = `
      SELECT con.conname as constraint_name,
             con.contype as constraint_type,
             pg_get_constraintdef(con.oid) as definition
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
      WHERE rel.relname = 'users'
      AND nsp.nspname = 'public';
    `;
    
    const constraintResult = await db.query(checkConstraintQuery);
    console.log('\nConstraints on users table:');
    console.table(constraintResult.rows);
    
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    await db.close();
  }
}

checkSchema(); 