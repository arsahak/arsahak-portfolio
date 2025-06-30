import { connect, connection, model, models, Schema } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (connection.readyState >= 1) return;
  await connect(MONGODB_URI);
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Category = models.Category || model('Category', CategorySchema);

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  if (req.method === 'GET') {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json(categories);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 