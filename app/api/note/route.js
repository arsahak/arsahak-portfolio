import connectDB from '@/lib/prisma';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB(); // Ensure connection is established
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Use direct MongoDB connection like blog route
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('notes');

    if (id) {
      try {
        const note = await collection.findOne({ _id: new (await import('mongodb')).ObjectId(id) });
        await client.close();
        
        if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        
        // Transform note to match expected format
        const transformedNote = {
          _id: note._id.toString(),
          id: note._id.toString(),
          title: note.title || '',
          content: note.content || '',
          category: note.category || 'General',
          tags: Array.isArray(note.tags) ? note.tags : [],
          isPinned: note.isPinned || false,
          isArchived: note.isArchived || false,
          createdAt: note.createdAt || new Date(),
          updatedAt: note.updatedAt || new Date()
        };
        
        return NextResponse.json(transformedNote, { status: 200 });
      } catch (error) {
        await client.close();
        return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
      }
    }

    // Get all notes
    try {
      const notes = await collection
        .find({ $or: [{ isArchived: false }, { isArchived: { $exists: false } }] })
        .sort({ isPinned: -1, updatedAt: -1 })
        .toArray();
      
      await client.close();

      // Transform notes to match expected format
      const transformedNotes = notes.map(note => ({
        _id: note._id.toString(),
        id: note._id.toString(),
        title: note.title || '',
        content: note.content || '',
        category: note.category || 'General',
        tags: Array.isArray(note.tags) ? note.tags : [],
        isPinned: note.isPinned || false,
        isArchived: note.isArchived || false,
        createdAt: note.createdAt || new Date(),
        updatedAt: note.updatedAt || new Date()
      }));

      return NextResponse.json(transformedNotes, { status: 200 });
    } catch (error) {
      await client.close();
      return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
  } catch (err) {
    console.error('GET /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB(); // Ensure connection is established
    
    const body = await request.json();

    // Validate required fields
    const missing = [];
    if (!body.title?.trim()) missing.push('title');
    if (!body.content?.trim()) missing.push('content');

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
    const collection = db.collection('notes');

    const noteData = {
      title: body.title.trim(),
      content: body.content.trim(),
      category: body.category?.trim() || 'General',
      tags: Array.isArray(body.tags) ? body.tags : [],
      isPinned: body.isPinned || false,
      isArchived: body.isArchived || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(noteData);
    await client.close();

    // Transform response
    const transformedNote = {
      _id: result.insertedId.toString(),
      id: result.insertedId.toString(),
      title: noteData.title,
      content: noteData.content,
      category: noteData.category,
      tags: noteData.tags,
      isPinned: noteData.isPinned,
      isArchived: noteData.isArchived,
      createdAt: noteData.createdAt,
      updatedAt: noteData.updatedAt
    };

    return NextResponse.json(transformedNote, { status: 201 });
  } catch (err) {
    console.error('POST /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    await connectDB(); // Ensure connection is established
    
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    // Validate required fields
    const missing = [];
    if (!updateData.title?.trim()) missing.push('title');
    if (!updateData.content?.trim()) missing.push('content');

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
    const collection = db.collection('notes');

    const noteData = {
      title: updateData.title.trim(),
      content: updateData.content.trim(),
      category: updateData.category?.trim() || 'General',
      tags: Array.isArray(updateData.tags) ? updateData.tags : [],
      isPinned: updateData.isPinned || false,
      isArchived: updateData.isArchived || false,
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { _id: new (await import('mongodb')).ObjectId(id) },
      { $set: noteData }
    );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // Get the updated note
    const updatedNote = await collection.findOne({ _id: new (await import('mongodb')).ObjectId(id) });
    await client.close();

    // Transform response
    const transformedNote = {
      _id: updatedNote._id.toString(),
      id: updatedNote._id.toString(),
      title: updatedNote.title || '',
      content: updatedNote.content || '',
      category: updatedNote.category || 'General',
      tags: Array.isArray(updatedNote.tags) ? updatedNote.tags : [],
      isPinned: updatedNote.isPinned || false,
      isArchived: updatedNote.isArchived || false,
      createdAt: updatedNote.createdAt || new Date(),
      updatedAt: updatedNote.updatedAt || new Date()
    };

    return NextResponse.json(transformedNote, { status: 200 });
  } catch (err) {
    console.error('PUT /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB(); // Ensure connection is established
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    // Use direct MongoDB connection
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('notes');

    const result = await collection.deleteOne({ _id: new (await import('mongodb')).ObjectId(id) });
    await client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note deleted successfully', success: true }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
