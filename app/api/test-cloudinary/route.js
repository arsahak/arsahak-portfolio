import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    };

    if (!envCheck.cloud_name || !envCheck.api_key || !envCheck.api_secret) {
      return NextResponse.json({
        success: false,
        error: 'Missing Cloudinary environment variables',
        envCheck,
        message: 'Please check your .env file and ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.'
      });
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Test Cloudinary connection
    const result = await cloudinary.api.ping();
    
    return NextResponse.json({
      success: true,
      message: 'Cloudinary connection successful',
      envCheck,
      ping: result,
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.toString(),
    }, { status: 500 });
  }
}
