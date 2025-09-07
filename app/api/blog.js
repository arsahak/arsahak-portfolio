import prisma from '../../lib/prisma';

// Helper function to generate slug
const generateSlug = (text = '') => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default async function handler(req, res) {
  // CREATE - POST
  if (req.method === 'POST') {
    try {
      const provided = req.body || {};
      
      // Generate slug if not provided
      const normalizedSlug = provided.slug
        ? generateSlug(provided.slug)
        : generateSlug(provided.title || '');

      // Check if slug already exists
      const existingBlog = await prisma.blog.findUnique({
        where: { slug: normalizedSlug }
      });
      
      if (existingBlog) {
        return res.status(409).json({ 
          error: 'Blog with this slug already exists' 
        });
      }

      const blog = await prisma.blog.create({
        data: {
          title: provided.title,
          body: provided.body,
          slug: normalizedSlug,
          author: provided.author,
          category: provided.category || [],
          metaDescription: provided.metaDescription,
          featuredImage: provided.featuredImage,
          bodyImage: provided.bodyImage || [],
          published: provided.published === true || provided.published === 'true',
          userId: provided.userId || null,
        },
        include: {
          user: true
        }
      });

      return res.status(201).json({
        success: true,
        data: blog,
        message: 'Blog created successfully'
      });
    } catch (err) {
      console.error('Blog creation error:', err);
      return res.status(400).json({ 
        error: err.message || 'Failed to create blog' 
      });
    }
  }

  // READ - GET
  if (req.method === 'GET') {
    try {
      const { id, slug, page = 1, limit = 10, published } = req.query;
      
      // If ID is provided, fetch specific blog
      if (id) {
        const blog = await prisma.blog.findUnique({
          where: { id },
          include: { user: true }
        });
        
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        
        return res.status(200).json({
          success: true,
          data: blog
        });
      }
      
      // If slug is provided, fetch by slug
      if (slug) {
        const blog = await prisma.blog.findUnique({
          where: { slug },
          include: { user: true }
        });
        
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        
        return res.status(200).json({
          success: true,
          data: blog
        });
      }
      
      // Build where clause for filtering
      const where = {};
      if (published !== undefined) {
        where.published = published === 'true';
      }
      
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);
      
      // Fetch blogs with pagination
      const [blogs, total] = await Promise.all([
        prisma.blog.findMany({
          where,
          include: { user: true },
          orderBy: { createdAt: 'desc' },
          skip,
          take
        }),
        prisma.blog.count({ where })
      ]);
      
      return res.status(200).json({
        success: true,
        data: blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (err) {
      console.error('Blog fetch error:', err);
      return res.status(500).json({ 
        error: err.message || 'Failed to fetch blogs' 
      });
    }
  }

  // UPDATE - PUT
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const provided = req.body || {};
      
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }
      
      // Check if blog exists
      const existingBlog = await prisma.blog.findUnique({
        where: { id }
      });
      
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      
      // Generate new slug if title is updated and no slug provided
      let normalizedSlug = existingBlog.slug;
      if (provided.title && !provided.slug) {
        normalizedSlug = generateSlug(provided.title);
        
        // Check if new slug already exists (excluding current blog)
        const slugExists = await prisma.blog.findFirst({
          where: {
            slug: normalizedSlug,
            id: { not: id }
          }
        });
        
        if (slugExists) {
          normalizedSlug = `${normalizedSlug}-${Date.now()}`;
        }
      } else if (provided.slug) {
        normalizedSlug = generateSlug(provided.slug);
      }
      
      const updatedBlog = await prisma.blog.update({
        where: { id },
        data: {
          title: provided.title,
          body: provided.body,
          slug: normalizedSlug,
          author: provided.author,
          category: provided.category,
          metaDescription: provided.metaDescription,
          featuredImage: provided.featuredImage,
          bodyImage: provided.bodyImage,
          published: provided.published,
          userId: provided.userId,
        },
        include: { user: true }
      });
      
      return res.status(200).json({
        success: true,
        data: updatedBlog,
        message: 'Blog updated successfully'
      });
    } catch (err) {
      console.error('Blog update error:', err);
      return res.status(400).json({ 
        error: err.message || 'Failed to update blog' 
      });
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }
      
      // Check if blog exists
      const existingBlog = await prisma.blog.findUnique({
        where: { id }
      });
      
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      
      await prisma.blog.delete({
        where: { id }
      });
      
      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
      });
    } catch (err) {
      console.error('Blog deletion error:', err);
      return res.status(500).json({ 
        error: err.message || 'Failed to delete blog' 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
} 