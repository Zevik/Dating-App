import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function createTestMatch() {
  try {
    const match = await prisma.match.create({
      data: {
        user1_id: 4,
        user2_id: 7,
        matched_at: new Date(),
        last_interaction_at: new Date(),
        is_active: true
      }
    });
    
    console.log("✅ Match created:", match);
    return match;
  } catch (err) {
    console.error("❌ Error creating match:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

createTestMatch(); 