import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load environment variables from .env.local
dotenvExpand.expand(dotenv.config({ path: '.env.local' }));

import { endTimeoutCalls } from '../services/callService';

async function main() {
  try {
    const maxCallDurationMinutes = process.env.MAX_CALL_DURATION_MINUTES 
      ? parseInt(process.env.MAX_CALL_DURATION_MINUTES, 10) 
      : 60; // Default to 60 minutes
    
    console.log(`Looking for calls that exceed ${maxCallDurationMinutes} minutes...`);
    
    const endedCallsCount = await endTimeoutCalls(maxCallDurationMinutes);
    
    if (endedCallsCount > 0) {
      console.log(`Successfully ended ${endedCallsCount} timed-out calls`);
    } else {
      console.log('No timed-out calls found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error ending timed-out calls:', error);
    process.exit(1);
  }
}

// Run the script
main(); 