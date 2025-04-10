import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import env from 'env-var';
const { required } = require('../env-validator.config');


dotenvExpand.expand(dotenv.config()); //

let hasError = false;

for (const key of required) {
  const value = env.get(key).asString();
  if (!value) {
    console.error(`❌ Missing: ${key}`);
    hasError = true;
  } else {
    console.log(`✅ ${key} found`);
  }
}

if (hasError) {
  console.error('\n❌ Missing environment variables. Exiting.\n');
  process.exit(1);
}
