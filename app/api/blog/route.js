import { connect, connection, model, models, Schema } from 'mongoose';
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('DATABASE_URL or MONGODB_URI is not configured. Please set it in .env.local');
  }
  if (connection.readyState >= 1) return;
  await connect(MONGODB_URI);
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  author: { type: String, default: '' },
  category: { type: String, default: '' },
  featureImage: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Blog = models.Blog || model('Blog', BlogSchema);

const generateSlug = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');

    if (slug) {
      const doc = await Blog.findOne({ slug });
      if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(doc, { status: 200 });
    }

    const filter = {};
    if (published === 'true') filter.published = true;
    if (published === 'false') filter.published = false;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Normalize/Map incoming payload to schema fields
    const normalizedSlug = body.slug ? generateSlug(body.slug) : generateSlug(body.title || '');
    const mapped = {
      title: (body.title || '').trim(),
      slug: normalizedSlug,
      author: (body.author || '').trim(),
      // Store category array as comma-separated string for current schema
      category: Array.isArray(body.category) ? body.category.join(', ') : (body.category || ''),
      featureImage: body?.featuredImage?.image?.url || body?.featureImage || '',
      description: (body.metaDescription || body.description || '').trim(),
      content: body.body || body.content || '',
      published: body.published === true || body.published === 'true',
    };

    // Validate required fields
    const missing = [];
    if (!mapped.title) missing.push('title');
    if (!mapped.slug) missing.push('slug');
    if (!mapped.author) missing.push('author');
    if (!mapped.content) missing.push('content');
    if (!mapped.category) missing.push('category');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Required field(s) missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const blog = await Blog.create(mapped);
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    const status = err?.code === 11000 ? 409 : 400;
    return NextResponse.json({ error: err.message }, { status });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, ...update } = body;
    if (!id) return NextResponse.json({ error: 'No blog ID provided' }, { status: 400 });

    // If client sends new-style fields, map selectively
    const mappedUpdate = { ...update };
    if (update.slug) mappedUpdate.slug = generateSlug(update.slug);
    if (Array.isArray(update.category)) mappedUpdate.category = update.category.join(', ');
    if (update.featuredImage?.image?.url) mappedUpdate.featureImage = update.featuredImage.image.url;
    if (update.metaDescription) mappedUpdate.description = update.metaDescription;
    if (update.body) mappedUpdate.content = update.body;

    const blog = await Blog.findByIdAndUpdate(id, mappedUpdate, { new: true });
    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'No blog ID provided' }, { status: 400 });
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}


