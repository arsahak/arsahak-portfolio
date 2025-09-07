import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb', // Allow slightly more than 1MB for base64 encoding overhead
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { file, folder = 'dashboard-blogs', imageTitle, altText } = req.body;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No file provided' 
      });
    }

    // Validate file size (1MB limit)
    const fileSizeInBytes = Buffer.byteLength(file, 'base64');
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    
    if (fileSizeInMB > 1) {
      return res.status(400).json({ 
        error: 'File size must be less than 1MB' 
      });
    }

    // Validate file type
    const fileType = file.split(';')[0].split(':')[1];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({ 
        error: 'Only JPEG, PNG, GIF, and WebP images are allowed' 
      });
    }

    // Upload to Cloudinary with optimization
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        { width: 1200, height: 800, crop: 'limit' } // Limit max dimensions
      ],
      eager: [
        { width: 800, height: 600, crop: 'limit' },
        { width: 400, height: 300, crop: 'limit' }
      ]
    });

    // Return the structured response matching your schema
    const imageData = {
      imageTitle: imageTitle || '',
      altText: altText || '',
      image: {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      }
    };

    return res.status(200).json({
      success: true,
      data: imageData,
      message: 'Image uploaded successfully'
    });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ 
      error: err.message || 'Failed to upload image' 
    });
  }
} 