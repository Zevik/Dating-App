import { PrismaClient } from '../src/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Generate new hashed password
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Find admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });
    
    if (!adminUser) {
      console.log('Admin user not found!');
      return;
    }
    
    console.log('Admin user found:', adminUser.email);
    
    // Update admin password
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { password_hash: hashedPassword }
    });
    
    console.log('Password updated for:', updatedUser.email);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 