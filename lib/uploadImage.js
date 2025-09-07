/**
 * Utility function to upload image to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} folder - The folder to upload to (default: 'dashboard-blogs')
 * @param {string} imageTitle - Optional title for the image
 * @param {string} altText - Optional alt text for the image
 * @returns {Promise<Object>} - Returns the uploaded image data
 */
export const uploadImageToCloudinary = async (file, folder = 'dashboard-blogs', imageTitle = '', altText = '') => {
  try {
    // Client-side file size validation (1MB = 1024 * 1024 bytes)
    const maxSize = 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size must be less than 1MB');
    }

    // Client-side file type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPEG, PNG, GIF, and WebP images are allowed');
    }

    // Convert file to base64
    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const base64File = await toBase64(file);

    // Upload to Cloudinary via our API
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64File,
        folder,
        imageTitle,
        altText,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
};

/**
 * Utility function to delete image from Cloudinary
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<boolean>} - Returns true if deleted successfully
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await fetch('/api/upload/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete image');
    }

    return true;
  } catch (error) {
    console.error('Image deletion error:', error);
    throw new Error(error.message || 'Failed to delete image');
  }
};

/**
 * Utility function to format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
