import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed test reports...');
  
  // Check if we have existing users
  const usersCount = await prisma.user.count();
  if (usersCount === 0) {
    console.log('No users found in the database. Please run main seed first.');
    return;
  }

  // Create test users for reporting if they don't exist
  const reporter = await prisma.user.upsert({
    where: { email: "reporter@example.com" },
    update: {},
    create: {
      email: "reporter@example.com",
      display_name: "Avi Reporter",
      password_hash: "$2b$10$dJmOZZY5Q2LVyCRPJLBaju8MlqcS18CxZdXJSOhk8YDsIL3bfRiKq", // 123456
      birth_date: new Date('1990-01-15'),
      gender: "MALE",
      looking_for_gender: ["FEMALE"],
      relationship_type: ["DATING"],
      is_active: true,
    },
  });

  const reported = await prisma.user.upsert({
    where: { email: "target@example.com" },
    update: {},
    create: {
      email: "target@example.com",
      display_name: "Dana Target",
      password_hash: "$2b$10$dJmOZZY5Q2LVyCRPJLBaju8MlqcS18CxZdXJSOhk8YDsIL3bfRiKq", // 123456
      birth_date: new Date('1992-05-20'),
      gender: "FEMALE",
      looking_for_gender: ["MALE"],
      relationship_type: ["DATING"],
      is_active: true,
    },
  });

  console.log(`Test users created or found: ${reporter.display_name} and ${reported.display_name}`);

  // Create multiple reports with different statuses
  const reports = await Promise.all([
    prisma.report.create({
      data: {
        reason: "הטרדה בשיחה",
        status: "pending",
        reporter_id: reporter.id,
        reported_user_id: reported.id,
      },
    }),
    
    prisma.report.create({
      data: {
        reason: "שימוש בשפה פוגענית",
        status: "reviewed",
        reporter_id: reporter.id,
        reported_user_id: reported.id,
      },
    }),
    
    prisma.report.create({
      data: {
        reason: "התחזות לאדם אחר",
        status: "resolved",
        reporter_id: reporter.id,
        reported_user_id: reported.id,
      },
    }),
    
    prisma.report.create({
      data: {
        reason: "הפרת תנאי השימוש",
        status: "rejected",
        reporter_id: reporter.id,
        reported_user_id: reported.id,
      },
    }),
  ]);

  console.log(`🌱 ${reports.length} test reports added successfully.`);
}

main()
  .catch(e => {
    console.error('Error seeding test reports:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 