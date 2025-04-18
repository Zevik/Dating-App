import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.report.count();
  console.log(`Number of reports in database: ${count}`);
  
  if (count > 0) {
    const reports = await prisma.report.findMany({
      include: {
        reporter: {
          select: { id: true, display_name: true, email: true }
        },
        reported: {
          select: { id: true, display_name: true, email: true }
        }
      }
    });
    
    console.log('Reports:');
    reports.forEach(report => {
      console.log(`ID: ${report.id}`);
      console.log(`Reason: ${report.reason}`);
      console.log(`Status: ${report.status}`);
      console.log(`Reporter: ${report.reporter?.display_name || 'Unknown'}`);
      console.log(`Reported User: ${report.reported?.display_name || 'Unknown'}`);
      console.log('---');
    });
  }
}

main()
  .catch(e => {
    console.error('Error checking reports:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 