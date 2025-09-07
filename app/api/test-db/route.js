import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    console.log('Testing Prisma MongoDB connection...');
    
    // Test database connection by running a simple query
    const result = await prisma.$runCommandRaw({ ping: 1 });
    
    console.log('MongoDB connection successful');
    
    return Response.json({
      success: true,
      message: 'MongoDB connected successfully via Prisma',
      provider: 'Prisma + MongoDB',
      test: result
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return Response.json({
      success: false,
      message: 'MongoDB connection failed',
      error: error.message,
      provider: 'Prisma + MongoDB'
    }, { status: 500 });
  }
}
