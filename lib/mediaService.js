/**
 * Media Service - Handles all media-related API operations
 */

const API_BASE = '/api/media';

/**
 * Fetch all uploaded images from database
 * @param {Object} options - Query options
 * @param {string} options.folder - Folder to search in (default: 'dashboard-blogs')
 * @param {number} options.maxResults - Maximum number of results (default: 50)
 * @param {string} options.search - Search term to filter images
 * @returns {Promise<Object>} Media images with metadata
 */
export const getMediaImages = async (options = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (options.folder) params.append('folder', options.folder);
    if (options.maxResults) params.append('max_results', options.maxResults);
    if (options.search) params.append('search', options.search);

    console.log('Fetching media images from database:', `${API_BASE}?${params.toString()}`);

    const response = await fetch(`${API_BASE}?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Media API error response:', error);
      throw new Error(error.error || `Failed to fetch media images (${response.status})`);
    }

    const result = await response.json();
    console.log('Media API success response:', {
      total: result.total,
      images_count: result.data?.length || 0
    });
    return result.data || [];
  } catch (error) {
    console.error('Get media images error:', error);
    throw error;
  }
};

/**
 * Delete an image from both Cloudinary and database
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteMediaImage = async (publicId) => {
  try {
    console.log('Deleting media image:', publicId);
    
    const response = await fetch(API_BASE, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to delete image');
    }

    console.log('Media image deleted successfully');
    return true;
  } catch (error) {
    console.error('Delete media image error:', error);
    throw error;
  }
};

/**
 * Create/save media metadata to database
 * @param {Object} mediaData - Media metadata object
 * @returns {Promise<Object>} Created media record
 */
export const createMediaRecord = async (mediaData) => {
  try {
    console.log('Creating media record:', mediaData.publicId);
    
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mediaData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to create media record');
    }

    const result = await response.json();
    console.log('Media record created successfully');
    return result.data;
  } catch (error) {
    console.error('Create media record error:', error);
    throw error;
  }
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
