import connectDB from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function dbConnect() {
  try {
    const prisma = await connectDB();
    return prisma;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// Remove Mongoose schema - using Prisma instead

const generateSlug = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export async function GET(request) {
  try {
    const prisma = await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (slug) {
      const blog = await prisma.blog.findUnique({ 
        where: { slug },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      return NextResponse.json(blog, { status: 200 });
    }

    // Build where clause
    const where = {};
    if (published === 'true') where.published = true;
    if (published === 'false') where.published = false;

    // Get total count for pagination
    const total = await prisma.blog.count({ where });

    // Get blogs with pagination
    const blogs = await prisma.blog.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }, { status: 200 });
  } catch (err) {
    console.error('GET /api/blog error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const prisma = await dbConnect();
    const body = await request.json();

    // Normalize/Map incoming payload to Prisma schema fields
    const normalizedSlug = body.slug ? generateSlug(body.slug) : generateSlug(body.title || '');
    const mapped = {
      title: (body.title || '').trim(),
      slug: normalizedSlug,
      author: (body.author || '').trim(),
      body: body.body || body.content || '',
      metaDescription: (body.metaDescription || body.description || '').trim(),
      published: body.published === true || body.published === 'true',
      category: Array.isArray(body.category) ? body.category : [body.category || ''],
      featuredImage: body?.featuredImage || null,
    };

    // Validate required fields
    const missing = [];
    if (!mapped.title) missing.push('title');
    if (!mapped.slug) missing.push('slug');
    if (!mapped.author) missing.push('author');
    if (!mapped.body) missing.push('body');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Required field(s) missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: mapped,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error('POST /api/blog error:', err);
    const status = err?.code === 'P2002' ? 409 : 400; // Prisma unique constraint error
    return NextResponse.json({ error: err.message }, { status });
  }
}

export async function PUT(request) {
  try {
    const prisma = await dbConnect();
    const body = await request.json();
    const { id, ...update } = body;
    if (!id) return NextResponse.json({ error: 'No blog ID provided' }, { status: 400 });

    // Map fields to Prisma schema
    const mappedUpdate = { ...update };
    if (update.slug) mappedUpdate.slug = generateSlug(update.slug);
    if (update.category) {
      mappedUpdate.category = Array.isArray(update.category) ? update.category : [update.category];
    }
    if (update.featuredImage) mappedUpdate.featuredImage = update.featuredImage;
    if (update.metaDescription) mappedUpdate.metaDescription = update.metaDescription;
    if (update.body) mappedUpdate.body = update.body;
    if (update.content) mappedUpdate.body = update.content; // Map content to body

    const blog = await prisma.blog.update({
      where: { id },
      data: mappedUpdate,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.error('PUT /api/blog error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const prisma = await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'No blog ID provided' }, { status: 400 });
    
    await prisma.blog.delete({
      where: { id }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/blog error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}


