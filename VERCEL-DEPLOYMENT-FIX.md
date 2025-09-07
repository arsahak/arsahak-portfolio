# Vercel Deployment Fix Guide

## Issues Fixed

### 1. Database Connection Issues

- **Problem**: Mixed Mongoose and Prisma usage causing connection failures
- **Solution**: Unified to use Prisma with proper connection pooling

### 2. Environment Variables

- **Problem**: Inconsistent environment variable names
- **Solution**: Standardized to use `DATABASE_URL` with fallback to `MONGODB_URI`

### 3. API Response Format

- **Problem**: Inconsistent API response structure
- **Solution**: Standardized response format with proper pagination

## Required Environment Variables in Vercel

Add these environment variables in your Vercel dashboard:

```bash
# Primary database connection
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority"

# Alternative (for backward compatibility)
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority"

# Cloudinary (if using image uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Next.js
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="https://www.arsahak.com"

# Environment
NODE_ENV="production"
```

## Steps to Deploy

1. **Update Environment Variables in Vercel**:

   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all required environment variables
   - Make sure `DATABASE_URL` points to your MongoDB Atlas cluster

2. **Redeploy Your Application**:

   ```bash
   git add .
   git commit -m "Fix database connection and API issues"
   git push origin main
   ```

3. **Verify Database Connection**:
   - Check Vercel function logs for any connection errors
   - Test API endpoints: `https://your-domain.vercel.app/api/blog`

## API Changes Made

### Blog API (`/api/blog`)

- ✅ Converted from Mongoose to Prisma
- ✅ Added proper pagination support
- ✅ Improved error handling
- ✅ Standardized response format

### Response Format

```json
{
  "blogs": [...],
  "total": 10,
  "page": 1,
  "totalPages": 2,
  "hasNext": true,
  "hasPrev": false
}
```

## Testing Your Deployment

1. **Test API Endpoints**:

   ```bash
   # Get all blogs
   curl https://your-domain.vercel.app/api/blog

   # Get published blogs
   curl https://your-domain.vercel.app/api/blog?published=true

   # Get blog by slug
   curl https://your-domain.vercel.app/api/blog?slug=your-blog-slug
   ```

2. **Check Dashboard**:
   - Visit: `https://your-domain.vercel.app/dashboard/blog`
   - Verify blogs are loading correctly
   - Test pagination and filtering

## Common Issues & Solutions

### Issue: "Database connection failed"

**Solution**: Check your `DATABASE_URL` in Vercel environment variables

### Issue: "Blogs not loading"

**Solution**: Verify your MongoDB Atlas cluster allows connections from Vercel IPs

### Issue: "API returns 500 error"

**Solution**: Check Vercel function logs for detailed error messages

## Database Schema Requirements

Make sure your MongoDB database has the following collections:

- `blogs` - for blog posts
- `portfolios` - for portfolio items
- `notes` - for personal notes
- `media` - for uploaded images

## Next Steps

1. Deploy the changes
2. Test all functionality
3. Monitor Vercel function logs
4. Update any remaining API routes to use Prisma
