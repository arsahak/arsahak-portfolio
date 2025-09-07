/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://arsahak.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/dashboard/*',
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  additionalPaths: async (config) => {
    const result = [];
    
    // Add dynamic portfolio pages
    try {
      const portfolioResponse = await fetch(`${config.siteUrl}/api/portfolio?published=true`);
      if (portfolioResponse.ok) {
        const portfolios = await portfolioResponse.json();
        portfolios.forEach((portfolio) => {
          result.push({
            loc: `/portfolio/${portfolio.slug}`,
            lastmod: new Date(portfolio.updatedAt || portfolio.createdAt).toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
          });
        });
      }
    } catch (error) {
      console.warn('Failed to fetch portfolios for sitemap:', error);
    }

    // Add dynamic blog pages
    try {
      const blogResponse = await fetch(`${config.siteUrl}/api/blog`);
      if (blogResponse.ok) {
        const blogs = await blogResponse.json();
        blogs.forEach((blog) => {
          result.push({
            loc: `/blog/${blog.slug}`,
            lastmod: new Date(blog.updatedAt || blog.createdAt).toISOString(),
            changefreq: 'weekly',
            priority: 0.7,
          });
        });
      }
    } catch (error) {
      console.warn('Failed to fetch blogs for sitemap:', error);
    }

    return result;
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/about': { priority: 0.9, changefreq: 'monthly' },
      '/portfolio': { priority: 0.9, changefreq: 'weekly' },
      '/blog': { priority: 0.8, changefreq: 'weekly' },
      '/contact': { priority: 0.8, changefreq: 'monthly' },
      '/faq': { priority: 0.7, changefreq: 'monthly' },
    };

    const pageConfig = customConfig[path] || { priority: 0.5, changefreq: 'monthly' };

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: pageConfig.changefreq,
      priority: pageConfig.priority,
    };
  },
};
