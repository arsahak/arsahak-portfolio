const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Cache for portfolio data
const portfolioCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
const getCachedData = (key) => {
  const cached = portfolioCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key, data) => {
  portfolioCache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Helper function to invalidate cache
const invalidateCache = (pattern = null) => {
  if (pattern) {
    // Invalidate specific pattern
    for (const key of portfolioCache.keys()) {
      if (key.includes(pattern)) {
        portfolioCache.delete(key);
      }
    }
  } else {
    // Clear all cache
    portfolioCache.clear();
  }
};

// Get all portfolios for dashboard
export const getAllPortfolios = async (useCache = true) => {
  const cacheKey = 'all-portfolios';
  
  // Check cache first
  if (useCache) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch portfolios';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    const portfolios = result || [];
    
    // Cache the result
    setCachedData(cacheKey, portfolios);
    
    return portfolios;
  } catch (error) {
    console.error('Get portfolios error:', error);
    // Return cached data if available, otherwise empty array
    const cached = getCachedData(cacheKey);
    return cached || [];
  }
};

// Get a single portfolio by ID
export const getPortfolioById = async (id, useCache = true) => {
  if (!id) {
    throw new Error('Portfolio ID is required');
  }

  const cacheKey = `portfolio-${id}`;
  
  // Check cache first
  if (useCache) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/portfolio?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch portfolio';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    // Cache the result
    setCachedData(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Get portfolio error:', error);
    // Return cached data if available
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }
    throw error;
  }
};

// Create a new portfolio
export const createPortfolio = async (portfolioData) => {
  try {
    if (!portfolioData) {
      throw new Error('Portfolio data is required');
    }

    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(portfolioData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create portfolio';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    // Invalidate cache after successful creation
    invalidateCache();
    
    return result;
  } catch (error) {
    console.error('Create portfolio error:', error);
    throw error;
  }
};

// Update a portfolio
export const updatePortfolio = async (id, portfolioData) => {
  try {
    if (!id) {
      throw new Error('Portfolio ID is required');
    }
    if (!portfolioData) {
      throw new Error('Portfolio data is required');
    }

    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...portfolioData }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update portfolio';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    // Invalidate cache after successful update
    invalidateCache();
    
    return result;
  } catch (error) {
    console.error('Update portfolio error:', error);
    throw error;
  }
};

// Delete a portfolio
export const deletePortfolio = async (id) => {
  try {
    if (!id) {
      throw new Error('Portfolio ID is required');
    }

    const response = await fetch(`${API_BASE_URL}/portfolio?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete portfolio';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    // Invalidate cache after successful deletion
    invalidateCache();
    
    return result;
  } catch (error) {
    console.error('Delete portfolio error:', error);
    throw error;
  }
};