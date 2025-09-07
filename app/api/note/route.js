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

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Note = models.Note || model('Note', NoteSchema);

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const note = await Note.findById(id);
      if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });
      return NextResponse.json(note, { status: 200 });
    }

    const notes = await Note.find({ isArchived: false }).sort({ isPinned: -1, updatedAt: -1 });
    return NextResponse.json(notes, { status: 200 });
  } catch (err) {
    console.error('GET /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body. Please check your request format.' },
        { status: 400 }
      );
    }

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

    const noteData = {
      title: body.title.trim(),
      content: body.content.trim(),
      category: body.category?.trim() || 'General',
      tags: Array.isArray(body.tags) ? body.tags : [],
      isPinned: body.isPinned || false,
      isArchived: body.isArchived || false
    };

    const note = await Note.create(noteData);
    return NextResponse.json(note, { status: 201 });
  } catch (err) {
    console.error('POST /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    // Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body. Please check your request format.' },
        { status: 400 }
      );
    }

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

    const noteData = {
      title: updateData.title.trim(),
      content: updateData.content.trim(),
      category: updateData.category?.trim() || 'General',
      tags: Array.isArray(updateData.tags) ? updateData.tags : [],
      isPinned: updateData.isPinned || false,
      isArchived: updateData.isArchived || false,
      updatedAt: new Date()
    };

    const note = await Note.findByIdAndUpdate(id, noteData, { new: true });
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (err) {
    console.error('PUT /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/note error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
