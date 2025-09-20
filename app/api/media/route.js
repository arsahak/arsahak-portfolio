import connectDB from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    await connectDB(); // Ensure connection is established
    
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'dashboard-media';
    const maxResults = parseInt(searchParams.get('max_results')) || 50;
    const search = searchParams.get('search') || '';

    // Fetching media from database

    // Use direct MongoDB connection like in blog route
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('media');
    
    // Build the query filter
    let query = { folder: folder };
    console.log('Media query filter:', query);

    // Add search functionality if search term provided
    if (search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { publicId: { $regex: search, $options: 'i' } },
      ];
      console.log('Search query applied:', query);
    }

    // Fetch images from database
    const [images, total] = await Promise.all([
      collection
        .find(query)
        .sort({ createdAt: -1 })
        .limit(maxResults)
        .toArray(),
      collection.countDocuments(query),
    ]);

    await client.close();

    // Database query completed
    console.log(`Found ${images.length} images in folder '${folder}'`);

    // Transform the results to match expected frontend format
    const transformedImages = images.map((image) => ({
      id: image._id.toString(),
      url: image.url,
      title: image.title,
      alt: image.alt,
      uploadedAt: image.createdAt ? new Date(image.createdAt).toISOString() : new Date().toISOString(),
      format: image.format,
      width: image.width,
      height: image.height,
      bytes: image.bytes,
      public_id: image.publicId,
      tags: image.tags || [],
      folder: image.folder,
    }));

    return NextResponse.json({
      success: true,
      data: transformedImages,
      total: total,
    });
  } catch (error) {
    console.error('Fetch media error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch media',
        details: error.message || error.toString(),
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB(); // Ensure connection is established
    
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Deleting media

    // Use direct MongoDB connection
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('media');

    // Find the media record in database first
    const mediaRecord = await collection.findOne({ publicId: publicId });

    if (!mediaRecord) {
      await client.close();
      return NextResponse.json(
        { error: 'Media record not found in database' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary first
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
    // Cloudinary deletion completed

    // Delete from database regardless of Cloudinary result
    // (in case the image was already deleted from Cloudinary but still in DB)
    await collection.deleteOne({ publicId: publicId });
    await client.close();

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully from both Cloudinary and database',
      cloudinaryResult: cloudinaryResult.result,
    });
  } catch (error) {
    console.error('Delete media error:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}

// POST function to create/save media metadata when images are uploaded
export async function POST(request) {
  try {
    await connectDB(); // Ensure connection is established
    
    const mediaData = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'alt', 'url', 'publicId', 'format', 'width', 'height', 'bytes'];
    const missingFields = requiredFields.filter(field => !mediaData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Saving media metadata to database

    // Use direct MongoDB connection
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('media');

    // Check if media already exists
    const existingMedia = await collection.findOne({ publicId: mediaData.publicId });

    if (existingMedia) {
      await client.close();
      return NextResponse.json(
        { error: 'Media with this public ID already exists' },
        { status: 409 }
      );
    }

    // Create new media record
    const newMediaDoc = {
      title: mediaData.title,
      alt: mediaData.alt,
      url: mediaData.url,
      publicId: mediaData.publicId,
      folder: mediaData.folder || 'dashboard-blogs',
      format: mediaData.format,
      width: parseInt(mediaData.width),
      height: parseInt(mediaData.height),
      bytes: parseInt(mediaData.bytes),
      resourceType: mediaData.resourceType || 'image',
      tags: mediaData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newMediaDoc);
    await client.close();

    return NextResponse.json({
      success: true,
      message: 'Media metadata saved successfully',
      data: {
        id: result.insertedId.toString(),
        publicId: newMediaDoc.publicId,
        url: newMediaDoc.url,
        title: newMediaDoc.title,
        alt: newMediaDoc.alt,
      },
    });
  } catch (error) {
    console.error('Save media metadata error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Media with this public ID already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to save media metadata' },
      { status: 500 }
    );
  }
}
