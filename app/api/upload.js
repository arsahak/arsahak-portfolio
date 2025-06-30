import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { file } = req.body; // file should be a base64 string
    if (!file) return res.status(400).json({ error: 'No file provided' });
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: 'dashboard-blogs',
    });
    return res.status(200).json({ url: uploadRes.secure_url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
} 