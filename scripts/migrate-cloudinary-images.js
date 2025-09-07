/**
 * Migration script to import existing Cloudinary images into the database
 * Run this script once to migrate your existing images
 * 
 * Usage: node scripts/migrate-cloudinary-images.js
 */

import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrateCloudinaryImages() {
  try {
    console.log('🚀 Starting Cloudinary to Database migration...');
    
    // Fetch all images from Cloudinary dashboard-blogs folder
    const result = await cloudinary.search
      .expression('folder:dashboard-blogs')
      .sort_by([['created_at', 'desc']])
      .max_results(500) // Adjust as needed
      .execute();

    console.log(`📸 Found ${result.resources.length} images in Cloudinary`);

    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (const resource of result.resources) {
      try {
        // Check if image already exists in database
        const existing = await prisma.media.findUnique({
          where: { publicId: resource.public_id }
        });

        if (existing) {
          console.log(`⏭️  Skipping ${resource.public_id} - already exists in database`);
          skipped++;
          continue;
        }

        // Create media record
        const mediaRecord = await prisma.media.create({
          data: {
            title: resource.public_id.split('/').pop().replace(/\.[^/.]+$/, ''),
            alt: resource.context?.alt || resource.public_id.split('/').pop().replace(/\.[^/.]+$/, ''),
            url: resource.secure_url,
            publicId: resource.public_id,
            folder: 'dashboard-blogs',
            format: resource.format,
            width: resource.width,
            height: resource.height,
            bytes: resource.bytes,
            resourceType: resource.resource_type || 'image',
            tags: resource.tags || [],
            createdAt: new Date(resource.created_at),
          },
        });

        console.log(`✅ Migrated: ${resource.public_id}`);
        migrated++;

      } catch (error) {
        console.error(`❌ Error migrating ${resource.public_id}:`, error.message);
        errors++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully migrated: ${migrated} images`);
    console.log(`⏭️  Skipped (already exists): ${skipped} images`);
    console.log(`❌ Errors: ${errors} images`);
    console.log('🎉 Migration completed!');

  } catch (error) {
    console.error('💥 Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateCloudinaryImages();
