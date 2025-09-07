import { PrismaClient } from '@prisma/client';

const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.prisma;

if (!cached) {
  cached = global.prisma = { client: null };
}

async function connectDB() {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.client) {
    cached.client = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }

  try {
    await cached.client.$connect();
  } catch (e) {
    cached.client = null;
    throw e;
  }

  return cached.client;
}

export default connectDB;
