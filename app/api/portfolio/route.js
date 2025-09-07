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

const PortfolioSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  content: { type: String, default: '' },
  featureImage: { type: String, default: '' },
  category: { type: String, default: '' },
  projectDuration: {
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' }
  },
  projectBudget: { type: Number, default: 0 },
  clientName: { type: String, default: '' },
  clientWebsite: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  technologies: [{ type: String }],
  images: [{ 
    title: { type: String, default: '' },
    alt: { type: String, default: '' },
    url: { type: String, required: true },
    publicId: { type: String, default: '' }
  }],
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Portfolio = models.Portfolio || model('Portfolio', PortfolioSchema);

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
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');

    if (id) {
      // Fetch single portfolio by ID
      const portfolio = await Portfolio.findById(id);
      if (!portfolio) {
        return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
      }
      return NextResponse.json(portfolio, { status: 200 });
    }

    if (slug) {
      // Fetch single portfolio by slug
      const portfolio = await Portfolio.findOne({ slug });
      if (!portfolio) {
        return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
      }
      return NextResponse.json(portfolio, { status: 200 });
    }

    // Fetch all portfolios
    const filter = {};
    if (published === 'true') filter.published = true;
    if (published === 'false') filter.published = false;

    const portfolios = await Portfolio.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(portfolios, { status: 200 });
  } catch (error) {
    console.error('Portfolio GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Debug: Log the incoming data structure
    console.log('Portfolio POST - Incoming data:', JSON.stringify(body, null, 2));

    // Normalize/Map incoming payload to schema fields
    const normalizedSlug = body.slug ? generateSlug(body.slug) : generateSlug(body.title || '');
    
    // Extract feature image URL from various possible structures
    let featureImageUrl = '';
    if (body.featureImage) {
      if (typeof body.featureImage === 'string') {
        featureImageUrl = body.featureImage;
      } else if (body.featureImage.image?.url) {
        featureImageUrl = body.featureImage.image.url;
      } else if (body.featureImage.url) {
        featureImageUrl = body.featureImage.url;
      }
    }
    
    const mapped = {
      title: (body.title || '').trim(),
      slug: normalizedSlug,
      description: (body.description || '').trim(),
      content: body.content || body.body || '',
      featureImage: featureImageUrl,
      category: (body.category || '').trim(),
      projectDuration: {
        startDate: body.projectDuration?.startDate || body.startDate || '',
        endDate: body.projectDuration?.endDate || body.endDate || ''
      },
      projectBudget: parseFloat(body.projectBudget) || 0,
      clientName: (body.clientName || '').trim(),
      clientWebsite: (body.clientWebsite || '').trim(),
      liveUrl: (body.liveUrl || '').trim(),
      githubUrl: (body.githubUrl || '').trim(),
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      images: Array.isArray(body.images) ? body.images : [],
      published: body.published === true || body.published === 'true',
      featured: body.featured === true || body.featured === 'true',
    };

    // Validate required fields
    const missing = [];
    if (!mapped.title) missing.push('title');
    if (!mapped.slug) missing.push('slug');
    if (!mapped.description) missing.push('description');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Required field(s) missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const portfolio = await Portfolio.create(mapped);
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    const status = error?.code === 11000 ? 409 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, ...update } = body;
    
    // Debug: Log the incoming data structure
    console.log('Portfolio PUT - Incoming data:', JSON.stringify(body, null, 2));
    
    if (!id) {
      return NextResponse.json({ error: 'No portfolio ID provided' }, { status: 400 });
    }

    // If client sends new-style fields, map selectively
    const mappedUpdate = { ...update };
    if (update.slug) mappedUpdate.slug = generateSlug(update.slug);
    
    // Handle feature image extraction for updates
    if (update.featureImage) {
      if (typeof update.featureImage === 'string') {
        mappedUpdate.featureImage = update.featureImage;
      } else if (update.featureImage.image?.url) {
        mappedUpdate.featureImage = update.featureImage.image.url;
      } else if (update.featureImage.url) {
        mappedUpdate.featureImage = update.featureImage.url;
      }
    }
    
    if (update.projectDuration) {
      mappedUpdate.projectDuration = {
        startDate: update.projectDuration.startDate || update.startDate || '',
        endDate: update.projectDuration.endDate || update.endDate || ''
      };
    }
    if (update.projectBudget) mappedUpdate.projectBudget = parseFloat(update.projectBudget) || 0;
    if (Array.isArray(update.technologies)) mappedUpdate.technologies = update.technologies;
    if (Array.isArray(update.images)) mappedUpdate.images = update.images;
    
    mappedUpdate.updatedAt = new Date();

    const portfolio = await Portfolio.findByIdAndUpdate(id, mappedUpdate, { new: true });
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error('Portfolio PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'No portfolio ID provided' }, { status: 400 });
    }
    
    const result = await Portfolio.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Portfolio DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}