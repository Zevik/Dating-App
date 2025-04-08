// Script to check all constraints on the users table
require('dotenv').config();
const db = require('./services/database');

async function checkConstraints() {
  try {
    console.log('Connecting to database...');
    await db.createDatabaseIfNotExists();
    
    // Check all constraints on the users table with detailed information
    const checkConstraintsQuery = `
      SELECT con.conname as constraint_name,
             con.contype as constraint_type,
             pg_get_constraintdef(con.oid) as definition,
             conrelid::regclass as table_name
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      WHERE rel.relname = 'users';
    `;
    
    const result = await db.query(checkConstraintsQuery);
    console.log('All constraints on users table:');
    console.table(result.rows);
    
    // Get more details about the gender_check constraint
    const checkGenderConstraintQuery = `
      SELECT attname, atttypid::regtype AS data_type
      FROM pg_attribute
      JOIN pg_class ON pg_attribute.attrelid = pg_class.oid
      JOIN pg_constraint ON pg_constraint.conrelid = pg_class.oid
      WHERE pg_class.relname = 'users'
      AND pg_constraint.conname = 'users_gender_check'
      AND attnum > 0
      AND pg_attribute.attnum = ANY(pg_constraint.conkey);
    `;
    
    const genderConstraintResult = await db.query(checkGenderConstraintQuery);
    console.log('\nColumns involved in gender constraint:');
    console.table(genderConstraintResult.rows);
    
    // Direct query to get gender constraints
    const directQuery = `
      SELECT column_name, check_clause
      FROM information_schema.check_constraints
      JOIN information_schema.constraint_column_usage
      ON constraint_name = constraint_name
      WHERE table_name = 'users'
      AND column_name = 'gender';
    `;
    
    const directResult = await db.query(directQuery);
    console.log('\nGender constraint details:');
    console.table(directResult.rows);
    
  } catch (error) {
    console.error('Error checking constraints:', error);
  } finally {
    await db.close();
  }
}

checkConstraints(); 