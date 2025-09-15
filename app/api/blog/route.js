import connectDB, { prisma } from '@/lib/prisma';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

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
    await connectDB(); // Ensure connection is established
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (slug) {
      try {
        // Use direct MongoDB connection for single blog query too
        const client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        
        const db = client.db();
        const collection = db.collection('blogs');
        
        const blog = await collection.findOne({ slug });
        await client.close();
        
        if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        
        // Transform single blog to match expected format
        const transformedBlog = {
          _id: blog._id.toString(),
          id: blog._id.toString(),
          title: blog.title || '',
          body: blog.body || '',
          content: blog.body || '',
          description: blog.metaDescription || (blog.body ? blog.body.substring(0, 150) + '...' : '') || '',
          slug: blog.slug || '',
          author: blog.author || 'AR Sahak',
          metaDescription: blog.metaDescription || '',
          published: blog.published || false,
          featuredImage: blog.featuredImage || null,
          featureImage: blog.featuredImage || null,
          bodyImage: blog.bodyImage || [],
          category: Array.isArray(blog.category) ? 
            (Array.isArray(blog.category[0]) ? blog.category[0][0] || 'General' : blog.category[0] || 'General') : 
            (blog.category || 'General'),
          categories: Array.isArray(blog.category) ? 
            (Array.isArray(blog.category[0]) ? blog.category[0] : blog.category) : 
            (blog.category ? [blog.category] : ['General']),
          userId: blog.userId || null,
          createdAt: blog.createdAt || new Date(),
          updatedAt: blog.updatedAt || new Date(),
          user: blog.userId ? { name: blog.author || 'AR Sahak', email: null } : null
        };
        
        return NextResponse.json(transformedBlog, { status: 200 });
      } catch (mongoError) {
        console.error('MongoDB single blog query error:', mongoError.message);
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
      }
    }

    // For list queries, use direct MongoDB connection to bypass Prisma category issues
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      
      const db = client.db();
      const collection = db.collection('blogs');
      
      // Build MongoDB filter
      const filter = {};
      if (published === 'true') filter.published = true;
      if (published === 'false') filter.published = false;
      
      // Get total count for pagination
      const total = await collection.countDocuments(filter);
      
      // Get blogs with pagination
      const blogs = await collection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
      
      await client.close();
      
      // Transform MongoDB documents to match expected format
      const transformedBlogs = blogs.map(blog => ({
        _id: blog._id.toString(),
        id: blog._id.toString(),
        title: blog.title || '',
        body: blog.body || '',
        content: blog.body || '', // Map body to content for frontend
        description: blog.metaDescription || (blog.body ? blog.body.substring(0, 150) + '...' : '') || '', // Map metaDescription to description
        slug: blog.slug || '',
        author: blog.author || 'AR Sahak',
        metaDescription: blog.metaDescription || '',
        published: blog.published || false,
        featuredImage: blog.featuredImage || null,
        featureImage: blog.featuredImage || null, // Alternative field name
        bodyImage: blog.bodyImage || [],
        category: Array.isArray(blog.category) ? 
          (Array.isArray(blog.category[0]) ? blog.category[0][0] || 'General' : blog.category[0] || 'General') : 
          (blog.category || 'General'), // Return single category string for frontend
        categories: Array.isArray(blog.category) ? 
          (Array.isArray(blog.category[0]) ? blog.category[0] : blog.category) : 
          (blog.category ? [blog.category] : ['General']), // Keep array version too
        userId: blog.userId || null,
        createdAt: blog.createdAt || new Date(),
        updatedAt: blog.updatedAt || new Date(),
        user: blog.userId ? { name: blog.author || 'AR Sahak', email: null } : null
      }));

      // Return just the blogs array for the frontend (matching current expectation)
      return NextResponse.json(transformedBlogs, { status: 200 });

    } catch (mongoError) {
      console.error('MongoDB direct query error:', mongoError.message);
      
      // Fallback to empty response
      return NextResponse.json({
        blogs: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }, { status: 200 });
    }

  } catch (err) {
    console.error('GET /api/blog error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB(); // Ensure connection is established
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
    await connectDB(); // Ensure connection is established
    const body = await request.json();
    const { id, ...update } = body;
    if (!id) return NextResponse.json({ error: 'No blog ID provided' }, { status: 400 });

    // Use direct MongoDB connection to avoid Prisma category issues
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('blogs');
    
    // Map fields for MongoDB
    const mappedUpdate = { ...update };
    if (update.slug) mappedUpdate.slug = generateSlug(update.slug);
    if (update.category) {
      mappedUpdate.category = Array.isArray(update.category) ? update.category : [update.category];
    }
    if (update.content) mappedUpdate.body = update.content; // Map content to body
    mappedUpdate.updatedAt = new Date();
    
    // Remove the id field from update data
    delete mappedUpdate.id;

    const result = await collection.updateOne(
      { _id: new (await import('mongodb')).ObjectId(id) },
      { $set: mappedUpdate }
    );
    
    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Get the updated blog
    const updatedBlog = await collection.findOne({ _id: new (await import('mongodb')).ObjectId(id) });
    await client.close();
    
    // Transform the response
    const transformedBlog = {
      _id: updatedBlog._id.toString(),
      id: updatedBlog._id.toString(),
      title: updatedBlog.title || '',
      body: updatedBlog.body || '',
      content: updatedBlog.body || '',
      description: updatedBlog.metaDescription || (updatedBlog.body ? updatedBlog.body.substring(0, 150) + '...' : '') || '',
      slug: updatedBlog.slug || '',
      author: updatedBlog.author || 'AR Sahak',
      metaDescription: updatedBlog.metaDescription || '',
      published: updatedBlog.published || false,
      featuredImage: updatedBlog.featuredImage || null,
      featureImage: updatedBlog.featuredImage || null,
      bodyImage: updatedBlog.bodyImage || [],
      category: Array.isArray(updatedBlog.category) ? 
        (Array.isArray(updatedBlog.category[0]) ? updatedBlog.category[0][0] || 'General' : updatedBlog.category[0] || 'General') : 
        (updatedBlog.category || 'General'),
      categories: Array.isArray(updatedBlog.category) ? 
        (Array.isArray(updatedBlog.category[0]) ? updatedBlog.category[0] : updatedBlog.category) : 
        (updatedBlog.category ? [updatedBlog.category] : ['General']),
      userId: updatedBlog.userId || null,
      createdAt: updatedBlog.createdAt || new Date(),
      updatedAt: updatedBlog.updatedAt || new Date(),
      user: updatedBlog.userId ? { name: updatedBlog.author || 'AR Sahak', email: null } : null
    };
    
    return NextResponse.json(transformedBlog, { status: 200 });
  } catch (err) {
    console.error('PUT /api/blog error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB(); // Ensure connection is established
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


