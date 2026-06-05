const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || (() => {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString, max: 5 });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
})();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
