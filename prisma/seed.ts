import { PrismaClient } from '../src/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('123456', saltRounds);
  
  // Clear existing data
  await prisma.user.deleteMany();
  
  // Create 3 users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        display_name: 'John Doe',
        birth_date: new Date('1990-01-15'),
        gender: 'MALE',
        bio: 'I love hiking and photography',
        profile_image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
        verified_email: true,
        is_active: true,
        password_hash: hashedPassword,
        latitude: 32.0853,
        longitude: 34.7818, // Tel Aviv coordinates
        looking_for_gender: ["FEMALE"],
        relationship_type: ["DATING"],
      }
    }),
    
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        display_name: 'Jane Smith',
        birth_date: new Date('1992-05-20'),
        gender: 'FEMALE',
        bio: 'Art lover and coffee enthusiast',
        profile_image_url: 'https://randomuser.me/api/portraits/women/2.jpg',
        verified_email: true,
        is_active: true,
        password_hash: hashedPassword,
        latitude: 31.7683,
        longitude: 35.2137, // Jerusalem coordinates
        looking_for_gender: ["MALE"],
        relationship_type: ["DATING", "FRIENDSHIP"],
      }
    }),
    
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        display_name: 'Admin User',
        birth_date: new Date('1985-11-10'),
        gender: 'OTHER',
        bio: 'System administrator',
        profile_image_url: 'https://randomuser.me/api/portraits/lego/1.jpg',
        verified_email: true,
        is_active: true,
        password_hash: hashedPassword,
        is_admin: true,
        latitude: 32.7940,
        longitude: 34.9896, // Haifa coordinates
        looking_for_gender: ["MALE", "FEMALE", "OTHER"],
        relationship_type: ["FRIENDSHIP"],
      }
    })
  ]);
  
  console.log('Seeded Users:');
  users.forEach(user => {
    console.log(`- ${user.display_name} (${user.email})`);
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 