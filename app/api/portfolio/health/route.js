import { connect, connection } from 'mongoose';
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('DATABASE_URL or MONGODB_URI is not configured');
  }
  if (connection.readyState >= 1) return;
  await connect(MONGODB_URI);
}

export async function GET() {
  try {
    // Test database connection
    await dbConnect();
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Portfolio API is working correctly',
      database: {
        status: 'connected',
        readyState: connection.readyState,
        host: connection.host,
        name: connection.name
      },
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasMongoDbUri: !!process.env.MONGODB_URI
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      message: 'Portfolio API has issues',
      error: error.message,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasMongoDbUri: !!process.env.MONGODB_URI
      }
    }, { status: 500 });
  }
}
