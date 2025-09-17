const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Create a new note
export const createNote = async (noteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create note');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Create note error:', error);
    throw error;
  }
};

// Get all notes
export const getAllNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/note`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch notes');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get notes error:', error);
    throw error;
  }
};

// Get a single note by ID
export const getNoteById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note?id=${id}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch note');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get note error:', error);
    throw error;
  }
};

// Update a note
export const updateNote = async (id, noteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...noteData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update note');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Update note error:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete note');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Delete note error:', error);
    throw error;
  }
};

// Toggle pin status
export const togglePinNote = async (id, isPinned) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, isPinned: !isPinned }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to toggle pin status');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Toggle pin error:', error);
    throw error;
  }
};

// Archive/Unarchive a note
export const toggleArchiveNote = async (id, isArchived) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, isArchived: !isArchived }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to toggle archive status');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Toggle archive error:', error);
    throw error;
  }
};
