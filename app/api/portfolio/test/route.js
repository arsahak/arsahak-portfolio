import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Portfolio API is working!',
    timestamp: new Date().toISOString(),
    status: 'ok'
  });
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({
        error: 'Content-Type must be application/json',
        receivedContentType: contentType
      }, { status: 400 });
    }

    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json({
        error: 'Invalid JSON in request body',
        jsonError: jsonError.message
      }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Test POST successful',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Unexpected error',
      message: error.message
    }, { status: 500 });
  }
}
