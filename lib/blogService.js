/**
 * Blog Service - Handles all blog-related API operations
 */

const API_BASE = '/api/blog';

/**
 * Safely extract data from API response which may be raw or wrapped in { data }
 */
const unwrap = (json) => (json && json.data !== undefined ? json.data : json);

/**
 * Create a new blog post
 * @param {Object} blogData - Blog data
 * @returns {Promise<Object>} Created blog
 */
export const createBlog = async (blogData) => {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to create blog');
    }

    const result = await response.json();
    return unwrap(result);
  } catch (error) {
    console.error('Create blog error:', error);
    throw error;
  }
};

/**
 * Get blogs with pagination and filtering
 * @param {Object} options - Query options
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {boolean} options.published - Filter by published status
 * @returns {Promise<Object>} Blogs with pagination
 */
export const getBlogs = async (options = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.published !== undefined) params.append('published', options.published);

    const response = await fetch(`${API_BASE}?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to fetch blogs');
    }

    const result = await response.json();
    return unwrap(result);
  } catch (error) {
    console.error('Get blogs error:', error);
    throw error;
  }
};

/**
 * Get blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<Object>} Blog data
 */
export const getBlogBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE}?slug=${encodeURIComponent(slug)}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to fetch blog');
    }

    const result = await response.json();
    return unwrap(result);
  } catch (error) {
    console.error('Get blog by slug error:', error);
    throw error;
  }
};

/**
 * Get blog by ID
 * @param {string} id - Blog ID
 * @returns {Promise<Object>} Blog data
 */
export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}?id=${encodeURIComponent(id)}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to fetch blog');
    }

    const result = await response.json();
    return unwrap(result);
  } catch (error) {
    console.error('Get blog by ID error:', error);
    throw error;
  }
};

/**
 * Update blog
 * @param {string} id - Blog ID
 * @param {Object} blogData - Updated blog data
 * @returns {Promise<Object>} Updated blog
 */
export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(API_BASE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...blogData }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to update blog');
    }

    const result = await response.json();
    return unwrap(result);
  } catch (error) {
    console.error('Update blog error:', error);
    throw error;
  }
};

/**
 * Delete blog
 * @param {string} id - Blog ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE}?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to delete blog');
    }

    return true;
  } catch (error) {
    console.error('Delete blog error:', error);
    throw error;
  }
};

/**
 * Get published blogs
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Published blogs
 */
export const getPublishedBlogs = async (options = {}) => {
  return getBlogs({ ...options, published: true });
};

/**
 * Get draft blogs
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Draft blogs
 */
export const getDraftBlogs = async (options = {}) => {
  return getBlogs({ ...options, published: false });
};
