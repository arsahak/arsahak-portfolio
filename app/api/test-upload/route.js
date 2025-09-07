import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    console.log('Testing Cloudinary configuration...');
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set');
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');
    
    const { file } = await request.json();
    
    if (!file) {
      return Response.json({
        success: false,
        message: 'No file provided'
      }, { status: 400 });
    }

    // Test upload with a simple base64 image
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const uploadResult = await cloudinary.uploader.upload(testImage, {
      folder: 'test-uploads',
      resource_type: 'auto'
    });

    console.log('Upload test successful:', uploadResult.public_id);
    
    return Response.json({
      success: true,
      message: 'Cloudinary upload test successful',
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url
    });
    
  } catch (error) {
    console.error('Cloudinary test error:', error);
    return Response.json({
      success: false,
      message: 'Cloudinary upload test failed',
      error: error.message
    }, { status: 500 });
  }
}
