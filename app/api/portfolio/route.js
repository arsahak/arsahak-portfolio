import connectDB, { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const generateSlug = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export async function GET(request) {
  try {
    await connectDB(); // Ensure connection is established
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');

    if (id) {
      // Fetch single portfolio by ID
      const portfolio = await prisma.portfolio.findUnique({
        where: { id }
      });
      if (!portfolio) {
        return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
      }
      return NextResponse.json(portfolio, { status: 200 });
    }

    if (slug) {
      // Fetch single portfolio by slug
      const portfolio = await prisma.portfolio.findUnique({
        where: { slug }
      });
      if (!portfolio) {
        return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
      }
      return NextResponse.json(portfolio, { status: 200 });
    }

    // Fetch all portfolios
    const where = {};
    if (published === 'true') where.published = true;
    if (published === 'false') where.published = false;

    const portfolios = await prisma.portfolio.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(portfolios, { status: 200 });
  } catch (error) {
    console.error('Portfolio GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB(); // Ensure connection is established
    const body = await request.json();
    
    // Process incoming portfolio data

    // Normalize/Map incoming payload to Prisma schema fields
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

    const portfolio = await prisma.portfolio.create({
      data: mapped
    });
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error('Portfolio POST error:', error);
    const status = error?.code === 'P2002' ? 409 : 400; // Prisma unique constraint error
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PUT(request) {
  try {
    await connectDB(); // Ensure connection is established
    const body = await request.json();
    const { id, ...update } = body;
    
    // Process portfolio update data
    
    if (!id) {
      return NextResponse.json({ error: 'No portfolio ID provided' }, { status: 400 });
    }

    // Map fields to Prisma schema
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

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: mappedUpdate
    });
    
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error('Portfolio PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB(); // Ensure connection is established
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'No portfolio ID provided' }, { status: 400 });
    }
    
    await prisma.portfolio.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Portfolio DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}