import connectDB from '@/lib/prisma';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

    // Use direct MongoDB connection like blog route
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('portfolios');

    if (id) {
      try {
        const portfolio = await collection.findOne({ _id: new (await import('mongodb')).ObjectId(id) });
        await client.close();
        
        if (!portfolio) {
          return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
        }
        
        // Transform portfolio to match expected format
        const transformedPortfolio = {
          _id: portfolio._id.toString(),
          id: portfolio._id.toString(),
          title: portfolio.title || '',
          slug: portfolio.slug || '',
          description: portfolio.description || '',
          content: portfolio.content || '',
          featureImage: portfolio.featureImage || null,
          category: portfolio.category || '',
          projectDuration: portfolio.projectDuration || {},
          projectBudget: portfolio.projectBudget || 0,
          clientName: portfolio.clientName || '',
          clientWebsite: portfolio.clientWebsite || '',
          liveUrl: portfolio.liveUrl || '',
          githubUrl: portfolio.githubUrl || '',
          technologies: Array.isArray(portfolio.technologies) ? portfolio.technologies : [],
          images: Array.isArray(portfolio.images) ? portfolio.images : [],
          published: portfolio.published || false,
          featured: portfolio.featured || false,
          createdAt: portfolio.createdAt || new Date(),
          updatedAt: portfolio.updatedAt || new Date()
        };
        
        return NextResponse.json(transformedPortfolio, { status: 200 });
      } catch (error) {
        await client.close();
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
      }
    }

    if (slug) {
      try {
        const portfolio = await collection.findOne({ slug });
        await client.close();
        
        if (!portfolio) {
          return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
        }
        
        // Transform portfolio to match expected format
        const transformedPortfolio = {
          _id: portfolio._id.toString(),
          id: portfolio._id.toString(),
          title: portfolio.title || '',
          slug: portfolio.slug || '',
          description: portfolio.description || '',
          content: portfolio.content || '',
          featureImage: portfolio.featureImage || null,
          category: portfolio.category || '',
          projectDuration: portfolio.projectDuration || {},
          projectBudget: portfolio.projectBudget || 0,
          clientName: portfolio.clientName || '',
          clientWebsite: portfolio.clientWebsite || '',
          liveUrl: portfolio.liveUrl || '',
          githubUrl: portfolio.githubUrl || '',
          technologies: Array.isArray(portfolio.technologies) ? portfolio.technologies : [],
          images: Array.isArray(portfolio.images) ? portfolio.images : [],
          published: portfolio.published || false,
          featured: portfolio.featured || false,
          createdAt: portfolio.createdAt || new Date(),
          updatedAt: portfolio.updatedAt || new Date()
        };
        
        return NextResponse.json(transformedPortfolio, { status: 200 });
      } catch (error) {
        await client.close();
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
      }
    }

    // Fetch all portfolios
    try {
      const filter = {};
      if (published === 'true') filter.published = true;
      if (published === 'false') filter.published = false;

      const portfolios = await collection
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();
      
      await client.close();

      // Transform portfolios to match expected format
      const transformedPortfolios = portfolios.map(portfolio => ({
        _id: portfolio._id.toString(),
        id: portfolio._id.toString(),
        title: portfolio.title || '',
        slug: portfolio.slug || '',
        description: portfolio.description || '',
        content: portfolio.content || '',
        featureImage: portfolio.featureImage || null,
        category: portfolio.category || '',
        projectDuration: portfolio.projectDuration || {},
        projectBudget: portfolio.projectBudget || 0,
        clientName: portfolio.clientName || '',
        clientWebsite: portfolio.clientWebsite || '',
        liveUrl: portfolio.liveUrl || '',
        githubUrl: portfolio.githubUrl || '',
        technologies: Array.isArray(portfolio.technologies) ? portfolio.technologies : [],
        images: Array.isArray(portfolio.images) ? portfolio.images : [],
        published: portfolio.published || false,
        featured: portfolio.featured || false,
        createdAt: portfolio.createdAt || new Date(),
        updatedAt: portfolio.updatedAt || new Date()
      }));

      return NextResponse.json(transformedPortfolios, { status: 200 });
    } catch (error) {
      await client.close();
      return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
    }
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

    // Use direct MongoDB connection
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('portfolios');

    // Add timestamps
    mapped.createdAt = new Date();
    mapped.updatedAt = new Date();

    const result = await collection.insertOne(mapped);
    await client.close();

    // Transform response
    const transformedPortfolio = {
      _id: result.insertedId.toString(),
      id: result.insertedId.toString(),
      ...mapped
    };

    return NextResponse.json(transformedPortfolio, { status: 201 });
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

    // Use direct MongoDB connection
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('portfolios');

    // Add updated timestamp
    mappedUpdate.updatedAt = new Date();

    const result = await collection.updateOne(
      { _id: new (await import('mongodb')).ObjectId(id) },
      { $set: mappedUpdate }
    );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Get the updated portfolio
    const updatedPortfolio = await collection.findOne({ _id: new (await import('mongodb')).ObjectId(id) });
    await client.close();

    // Transform response
    const transformedPortfolio = {
      _id: updatedPortfolio._id.toString(),
      id: updatedPortfolio._id.toString(),
      title: updatedPortfolio.title || '',
      slug: updatedPortfolio.slug || '',
      description: updatedPortfolio.description || '',
      content: updatedPortfolio.content || '',
      featureImage: updatedPortfolio.featureImage || null,
      category: updatedPortfolio.category || '',
      projectDuration: updatedPortfolio.projectDuration || {},
      projectBudget: updatedPortfolio.projectBudget || 0,
      clientName: updatedPortfolio.clientName || '',
      clientWebsite: updatedPortfolio.clientWebsite || '',
      liveUrl: updatedPortfolio.liveUrl || '',
      githubUrl: updatedPortfolio.githubUrl || '',
      technologies: Array.isArray(updatedPortfolio.technologies) ? updatedPortfolio.technologies : [],
      images: Array.isArray(updatedPortfolio.images) ? updatedPortfolio.images : [],
      published: updatedPortfolio.published || false,
      featured: updatedPortfolio.featured || false,
      createdAt: updatedPortfolio.createdAt || new Date(),
      updatedAt: updatedPortfolio.updatedAt || new Date()
    };
    
    return NextResponse.json(transformedPortfolio, { status: 200 });
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
    
    // Use direct MongoDB connection
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('portfolios');

    const result = await collection.deleteOne({ _id: new (await import('mongodb')).ObjectId(id) });
    await client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Portfolio deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Portfolio DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}