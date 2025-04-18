const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Checking for existing match between admin (id: 4) and john (id: 5)...');
    
    // Check if a match already exists between these users
    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { user1_id: 4, user2_id: 5 },
          { user1_id: 5, user2_id: 4 }
        ]
      },
      include: {
        user1: true,
        user2: true
      }
    });
    
    if (existingMatch) {
      console.log('✅ Match already exists:');
      console.log(`Match ID: ${existingMatch.id}`);
      console.log(`User 1: ${existingMatch.user1.name} (ID: ${existingMatch.user1.id})`);
      console.log(`User 2: ${existingMatch.user2.name} (ID: ${existingMatch.user2.id})`);
      console.log(`Started at: ${existingMatch.started_at}`);
      console.log(`Status: ${existingMatch.active ? 'Active' : 'Inactive'}`);
      
      // If it exists but is not active, make it active
      if (!existingMatch.active) {
        const updatedMatch = await prisma.match.update({
          where: { id: existingMatch.id },
          data: { active: true }
        });
        console.log('🔄 Match activated successfully.');
      }
      
      return existingMatch;
    }
    
    // Create a new match
    console.log('🆕 Creating new match...');
    const newMatch = await prisma.match.create({
      data: {
        user1_id: 4,
        user2_id: 5,
        started_at: new Date(),
        active: true
      },
      include: {
        user1: true,
        user2: true
      }
    });
    
    console.log('✅ Match created successfully:');
    console.log(`Match ID: ${newMatch.id}`);
    console.log(`User 1: ${newMatch.user1.name} (ID: ${newMatch.user1.id})`);
    console.log(`User 2: ${newMatch.user2.name} (ID: ${newMatch.user2.id})`);
    console.log(`Started at: ${newMatch.started_at}`);
    console.log(`Status: ${newMatch.active ? 'Active' : 'Inactive'}`);
    
    return newMatch;
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 