import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return Response.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return Response.json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      return Response.json(
        { error: 'Failed to delete image from Cloudinary' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Delete image error:', error);
    return Response.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}
