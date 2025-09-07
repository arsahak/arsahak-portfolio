export async function GET() {
  try {
    return Response.json({
      success: true,
      message: 'API is working correctly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'API health check failed',
      error: error.message
    }, { status: 500 });
  }
}
