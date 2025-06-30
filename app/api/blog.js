import { connect, connection, model, models, Schema } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (connection.readyState >= 1) return;
  await connect(MONGODB_URI);
}

const BlogSchema = new Schema({
  title: String,
  slug: String,
  author: String,
  category: String,
  featureImage: String,
  description: String,
  content: String,
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const blog = await Blog.create({
        ...req.body,
        published: req.body.published === true || req.body.published === 'true',
      });
      return res.status(201).json(blog);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  if (req.method === 'GET') {
    let blogs;
    if (req.query.published === 'true') {
      blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    } else if (req.query.published === 'false') {
      blogs = await Blog.find({ published: false }).sort({ createdAt: -1 });
    } else {
      blogs = await Blog.find().sort({ createdAt: -1 });
    }
    return res.status(200).json(blogs);
  }
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id || req.body.id;
      if (!id) return res.status(400).json({ error: 'No blog ID provided' });
      await Blog.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  if (req.method === 'PUT') {
    try {
      const { id, ...update } = req.body;
      if (!id) return res.status(400).json({ error: 'No blog ID provided' });
      const blog = await Blog.findByIdAndUpdate(id, update, { new: true });
      return res.status(200).json(blog);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 