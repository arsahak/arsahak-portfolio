import { PrismaClient } from '@prisma/client';

// Get database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  throw new Error('Please define DATABASE_URL or MONGODB_URI in your .env.local file');
}

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Connection function with proper error handling
async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully via Prisma');
    return prisma;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default connectDB;
export { prisma };
