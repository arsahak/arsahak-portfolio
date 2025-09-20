
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Function to save media metadata to database
const saveMediaMetadata = async (uploadResult, imageTitle, altText, folder) => {
  try {
    const mediaData = {
      title: imageTitle || uploadResult.public_id.split('/').pop().replace(/\.[^/.]+$/, ''),
      alt: altText || imageTitle || uploadResult.public_id.split('/').pop().replace(/\.[^/.]+$/, ''),
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      folder: folder,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      resourceType: uploadResult.resource_type || 'image',
    };

    // Use direct database connection instead of internal API call
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('media');

    // Check if media already exists
    const existingMedia = await collection.findOne({ publicId: mediaData.publicId });

    if (existingMedia) {
      await client.close();
      console.log('Media with this public ID already exists');
      return;
    }

    // Create new media record
    const newMediaDoc = {
      title: mediaData.title,
      alt: mediaData.alt,
      url: mediaData.url,
      publicId: mediaData.publicId,
      folder: mediaData.folder,
      format: mediaData.format,
      width: parseInt(mediaData.width),
      height: parseInt(mediaData.height),
      bytes: parseInt(mediaData.bytes),
      resourceType: mediaData.resourceType || 'image',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newMediaDoc);
    await client.close();
    console.log('Media metadata saved successfully to database');
  } catch (error) {
    console.error('Error saving media metadata to database:', error);
    // Don't throw error - upload was successful, just metadata saving failed
  }
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { file, folder = 'dashboard-media', imageTitle = '', altText = '' } = body || {};

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('Uploading image to Cloudinary...', { folder, imageTitle, altText });

    // Upload to Cloudinary with basic optimization
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        { width: 1200, height: 800, crop: 'limit' },
      ],
      eager: [
        { width: 800, height: 600, crop: 'limit' },
        { width: 400, height: 300, crop: 'limit' },
      ],
    });

    console.log('Cloudinary upload successful:', uploadRes.public_id);

    // Save metadata to database (non-blocking)
    await saveMediaMetadata(uploadRes, imageTitle, altText, folder);

    const imageData = {
      imageTitle: imageTitle || uploadRes.public_id.split('/').pop().replace(/\.[^/.]+$/, ''),
      altText: altText || imageTitle || uploadRes.public_id.split('/').pop().replace(/\.[^/.]+$/, ''),
      image: {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: imageData,
        message: 'Image uploaded successfully and metadata saved',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


