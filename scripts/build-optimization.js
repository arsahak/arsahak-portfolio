#!/usr/bin/env node

/**
 * Production Build Optimization Script
 * This script helps optimize the build for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build optimization...');

// 1. Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'MONGODB_URI',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

console.log('📋 Checking environment variables...');
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn('⚠️  Missing environment variables:', missingVars.join(', '));
  console.warn('Please ensure all required environment variables are set before building.');
} else {
  console.log('✅ All required environment variables are set');
}

// 2. Validate Next.js configuration
console.log('🔧 Validating Next.js configuration...');
const nextConfigPath = path.join(process.cwd(), 'next.config.js');

if (fs.existsSync(nextConfigPath)) {
  console.log('✅ next.config.js found');
} else {
  console.warn('⚠️  next.config.js not found');
}

// 3. Check for production-ready components
console.log('🧩 Checking production-ready components...');
const componentsToCheck = [
  'components/shared/ErrorBoundary.jsx',
  'components/shared/LoadingSpinner.jsx',
  'components/shared/SafeHTML.jsx',
  'app/not-found.js'
];

componentsToCheck.forEach(component => {
  const componentPath = path.join(process.cwd(), component);
  if (fs.existsSync(componentPath)) {
    console.log(`✅ ${component} found`);
  } else {
    console.warn(`⚠️  ${component} not found`);
  }
});

// 4. Validate SEO files
console.log('🔍 Validating SEO files...');
const seoFiles = [
  'public/robots.txt',
  'next-sitemap.config.js',
  'app/layout.js'
];

seoFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} found`);
  } else {
    console.warn(`⚠️  ${file} not found`);
  }
});

// 5. Check for security headers
console.log('🔒 Checking security configuration...');
const nextConfig = require(nextConfigPath);
if (nextConfig.headers) {
  console.log('✅ Security headers configured');
} else {
  console.warn('⚠️  Consider adding security headers to next.config.js');
}

// 6. Performance optimization tips
console.log('⚡ Performance optimization tips:');
console.log('   - Ensure images are optimized (WebP format recommended)');
console.log('   - Enable gzip compression on your server');
console.log('   - Use a CDN for static assets');
console.log('   - Monitor Core Web Vitals');
console.log('   - Enable caching headers for static assets');

// 7. SEO checklist
console.log('📈 SEO checklist:');
console.log('   - All pages have unique titles and descriptions');
console.log('   - Open Graph and Twitter Card meta tags are set');
console.log('   - Sitemap is generated and submitted to search engines');
console.log('   - robots.txt is properly configured');
console.log('   - Canonical URLs are set');
console.log('   - Schema markup is implemented (if needed)');

console.log('🎉 Build optimization check complete!');
console.log('💡 Run "npm run build" to create the production build');
console.log('🚀 Run "npm start" to start the production server');
