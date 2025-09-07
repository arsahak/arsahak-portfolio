import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'dashboard-blogs';
    const maxResults = parseInt(searchParams.get('max_results')) || 50;
    const search = searchParams.get('search') || '';

    console.log('Fetching media from database - folder:', folder, 'maxResults:', maxResults, 'search:', search);

    // Build the query filter
    let whereClause = {
      folder: folder,
    };

    // Add search functionality if search term provided
    if (search.trim()) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { publicId: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch images from database
    const [images, total] = await Promise.all([
      prisma.media.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: maxResults,
        select: {
          id: true,
          title: true,
          alt: true,
          url: true,
          publicId: true,
          folder: true,
          format: true,
          width: true,
          height: true,
          bytes: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.media.count({ where: whereClause }),
    ]);

    console.log('Database query result:', {
      total_count: total,
      images_count: images.length,
    });

    // Transform the results to match expected frontend format
    const transformedImages = images.map((image) => ({
      id: image.id,
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    console.log('Deleting media with publicId:', publicId);

    // Find the media record in database first
    const mediaRecord = await prisma.media.findUnique({
      where: { publicId: publicId },
    });

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
    await prisma.media.delete({
      where: { publicId: publicId },
    });

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully from both Cloudinary and database',
      cloudinaryResult: cloudinaryResult.result,
    });
  } catch (error) {
    console.error('Delete media error:', error);
    
    // If it's a Prisma "Record not found" error, handle gracefully
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Media record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST function to create/save media metadata when images are uploaded
export async function POST(request) {
  try {
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
    const existingMedia = await prisma.media.findUnique({
      where: { publicId: mediaData.publicId },
    });

    if (existingMedia) {
      return NextResponse.json(
        { error: 'Media with this public ID already exists' },
        { status: 409 }
      );
    }

    // Create new media record
    const newMedia = await prisma.media.create({
      data: {
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
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Media metadata saved successfully',
      data: {
        id: newMedia.id,
        publicId: newMedia.publicId,
        url: newMedia.url,
        title: newMedia.title,
        alt: newMedia.alt,
      },
    });
  } catch (error) {
    console.error('Save media metadata error:', error);
    
    // Handle duplicate key error
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Media with this public ID already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to save media metadata' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
