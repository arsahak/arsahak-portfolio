import { v2 as cloudinary } from 'cloudinary';
import { Schema, model, models } from 'mongoose';
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/prisma';

// Define Media Schema
const MediaSchema = new Schema({
  title: { type: String, required: true },
  alt: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true, unique: true },
  folder: { type: String, default: 'dashboard-blogs' },
  format: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  bytes: { type: Number, required: true },
  resourceType: { type: String, default: 'image' },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Media = models.Media || model('Media', MediaSchema);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    // Skip DB access if MONGODB_URI is not available (e.g., during build)
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, message: 'Database not available during build' },
        { status: 503 }
      );
    }
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'dashboard-blogs';
    const maxResults = parseInt(searchParams.get('max_results')) || 50;
    const search = searchParams.get('search') || '';

    console.log('Fetching media from database - folder:', folder, 'maxResults:', maxResults, 'search:', search);

    // Build the query filter
    let query = { folder: folder };

    // Add search functionality if search term provided
    if (search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { publicId: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch images from database
    const [images, total] = await Promise.all([
      Media.find(query)
        .sort({ createdAt: -1 })
        .limit(maxResults)
        .select('_id title alt url publicId folder format width height bytes tags createdAt updatedAt'),
      Media.countDocuments(query),
    ]);

    console.log('Database query result:', {
      total_count: total,
      images_count: images.length,
    });

    // Transform the results to match expected frontend format
    const transformedImages = images.map((image) => ({
      id: image._id.toString(),
      url: image.url,
      title: image.title,
      alt: image.alt,
      uploadedAt: image.createdAt.toISOString(),
      format: image.format,
      width: image.width,
      height: image.height,
      bytes: image.bytes,
      public_id: image.publicId,
      tags: image.tags,
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
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, message: 'Database not available during build' },
        { status: 503 }
      );
    }
    await connectDB();
    
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    console.log('Deleting media with publicId:', publicId);

    // Find the media record in database first
    const mediaRecord = await Media.findOne({ publicId: publicId });

    if (!mediaRecord) {
      return NextResponse.json(
        { error: 'Media record not found in database' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary first
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary deletion result:', cloudinaryResult);

    // Delete from database regardless of Cloudinary result
    // (in case the image was already deleted from Cloudinary but still in DB)
    await Media.deleteOne({ publicId: publicId });

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
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, message: 'Database not available during build' },
        { status: 503 }
      );
    }
    await connectDB();
    
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

    console.log('Saving media metadata to database:', mediaData.publicId);

    // Check if media already exists
    const existingMedia = await Media.findOne({ publicId: mediaData.publicId });

    if (existingMedia) {
      return NextResponse.json(
        { error: 'Media with this public ID already exists' },
        { status: 409 }
      );
    }

    // Create new media record
    const newMedia = new Media({
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
    });

    await newMedia.save();

    return NextResponse.json({
      success: true,
      message: 'Media metadata saved successfully',
      data: {
        id: newMedia._id.toString(),
        publicId: newMedia.publicId,
        url: newMedia.url,
        title: newMedia.title,
        alt: newMedia.alt,
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
