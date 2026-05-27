const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin
  const existingAdmin = await prisma.admin.findUnique({ where: { email: 'admin@orleve.com' } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('orlevesoleha2726', 10);
    await prisma.admin.create({
      data: {
        email: 'admin@orleve.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    });
    console.log('✅ Default admin created: admin@orleve.com / orlevesoleha2726');
  } else {
    console.log('ℹ️  Admin already exists, skipping.');
  }

  // Skipping product seeding — fresh empty database for launch
  console.log('ℹ️  Product seeding skipped — admin will add products after launch.');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
