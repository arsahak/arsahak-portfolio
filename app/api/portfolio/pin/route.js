import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(request) {
  let client;
  try {
    const body = await request.json();
    const { id, pinned } = body;
    
    console.log('Pin API received:', { id, pinned, type: typeof pinned });
    
    if (!id) {
      return NextResponse.json({ error: 'No portfolio ID provided' }, { status: 400 });
    }

    // Convert string boolean to actual boolean
    const pinnedValue = pinned === true || pinned === 'true';
    console.log('Setting pinned to:', pinnedValue);

    // Connect to MongoDB
    client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db();
    const collection = db.collection('portfolios');

    // If pinning, first check if we need to unpin others (max 5 pinned)
    if (pinnedValue) {
      const pinnedCount = await collection.countDocuments({ 
        $or: [
          { pinned: true },
          { pinned: 'true' }
        ]
      });
      
      if (pinnedCount >= 5) {
        // Unpin the oldest pinned portfolio
        const oldestPinned = await collection.findOne(
          { 
            $or: [
              { pinned: true },
              { pinned: 'true' }
            ]
          },
          { sort: { updatedAt: 1 } }
        );
        
        if (oldestPinned) {
          await collection.updateOne(
            { _id: oldestPinned._id },
            { $set: { pinned: false, updatedAt: new Date() } }
          );
        }
      }
    }

    // Update the portfolio
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { pinned: pinnedValue, updatedAt: new Date() } }
    );

    console.log('Portfolio update result:', result);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Get the updated portfolio
    const updatedPortfolio = await collection.findOne({ _id: new ObjectId(id) });
    console.log('Updated portfolio:', updatedPortfolio);

    return NextResponse.json({ 
      success: true, 
      message: `Portfolio ${pinnedValue ? 'pinned' : 'unpinned'} successfully`,
      portfolio: updatedPortfolio
    }, { status: 200 });
  } catch (error) {
    console.error('Portfolio pin/unpin error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
