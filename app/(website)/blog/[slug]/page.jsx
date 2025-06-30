"use client";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaClock, FaUser } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"] });

// Mock blog data - in a real app, this would come from your CMS or API
const blogData = [
  {
    id: 1,
    title: "Modern Web Development Trends 2024",
    excerpt:
      "Exploring the latest trends in web development including AI integration, performance optimization, and modern frameworks.",
    content: `
      <h2 class="text-white text-3xl font-bold mb-6">The Future of Web Development</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Web development is evolving at an unprecedented pace. In 2024, we're seeing remarkable shifts in how we build, deploy, and maintain web applications. This comprehensive guide explores the most significant trends shaping the industry.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">1. AI-Powered Development Tools</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Artificial Intelligence is revolutionizing how developers write code. From intelligent code completion to automated testing and debugging, AI tools are becoming indispensable in modern development workflows.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">2. Performance Optimization</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">With Core Web Vitals becoming crucial for SEO and user experience, performance optimization has taken center stage. Developers are focusing on techniques like code splitting, lazy loading, and advanced caching strategies.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">3. Modern Frameworks and Libraries</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">React 18, Vue 3, and Next.js 13+ are leading the charge with new features like concurrent rendering, improved server-side rendering, and enhanced developer experience.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">4. Micro-Frontends Architecture</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Large applications are increasingly adopting micro-frontends to improve maintainability and enable team autonomy. This architecture allows different teams to work on different parts of the application independently.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">5. WebAssembly (WASM)</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">WebAssembly is enabling high-performance applications to run in the browser, opening new possibilities for web applications that were previously only possible with native applications.</p>
      
      <h2 class="text-white text-3xl font-bold mb-6 mt-12">Conclusion</h2>
      <p class="text-gray-300 text-lg leading-relaxed">Staying ahead in web development requires continuous learning and adaptation. By embracing these trends, developers can build more efficient, scalable, and user-friendly applications that meet the demands of modern users.</p>
    `,
    img: "/assets/portfolio-item/epharma-web.png",
    category: "Web Development",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "AR Sahak",
    slug: "modern-web-development-trends-2024",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "Learn how to design and implement robust, scalable APIs using Node.js and Express with best practices.",
    content: `
      <h2 class="text-white text-3xl font-bold mb-6">Introduction to Scalable API Design</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Building scalable APIs is crucial for modern applications. This guide covers essential patterns and practices for creating robust, maintainable APIs using Node.js and Express.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">1. RESTful Design Principles</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Understanding REST principles is fundamental to building good APIs. We'll explore resource naming, HTTP methods, status codes, and proper URL structure.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">2. Authentication and Authorization</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Implementing secure authentication using JWT tokens, OAuth 2.0, and role-based access control to protect your API endpoints.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">3. Error Handling and Validation</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Proper error handling and input validation are essential for API reliability. We'll cover middleware patterns and validation libraries.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">4. Database Design and Optimization</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Choosing the right database, designing schemas, and implementing efficient queries for optimal performance.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">5. Caching Strategies</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Implementing Redis caching, CDN integration, and browser caching to improve API response times and reduce server load.</p>
    `,
    img: "/assets/portfolio-item/butterfly-app.png",
    category: "Backend Development",
    date: "December 12, 2024",
    readTime: "8 min read",
    author: "AR Sahak",
    slug: "building-scalable-apis-nodejs",
  },
  {
    id: 3,
    title: "React Performance Optimization Techniques",
    excerpt:
      "Discover advanced techniques to optimize React applications for better performance and user experience.",
    content: `
      <h2 class="text-white text-3xl font-bold mb-6">Optimizing React Applications</h2>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Performance optimization in React is crucial for delivering smooth user experiences. This guide covers advanced techniques to make your React applications faster and more efficient.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">1. Component Optimization</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Using React.memo, useMemo, and useCallback to prevent unnecessary re-renders and optimize component performance.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">2. Code Splitting and Lazy Loading</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Implementing dynamic imports and React.lazy to reduce initial bundle size and improve loading times.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">3. Virtual Scrolling</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Handling large lists efficiently with virtual scrolling techniques to maintain smooth performance with thousands of items.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">4. Bundle Analysis and Optimization</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Using tools like webpack-bundle-analyzer to identify and eliminate unnecessary dependencies and reduce bundle size.</p>
      
      <h3 class="text-white text-2xl font-bold mb-4 mt-8">5. Server-Side Rendering (SSR)</h3>
      <p class="text-gray-300 text-lg leading-relaxed mb-6">Implementing SSR with Next.js to improve initial page load times and SEO performance.</p>
    `,
    img: "/assets/portfolio-item/epharma-web.png",
    category: "Frontend Development",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "AR Sahak",
    slug: "react-performance-optimization-techniques",
  },
];

const BlogDetailsPage = ({ params }) => {
  const blog = blogData.find((b) => b.slug === params.slug);
  const relatedBlogs = blogData.filter((b) => b.id !== blog?.id).slice(0, 3);

  if (!blog) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl text-white mb-4">Blog Post Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={blog.img}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
              <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs">
                {blog.category}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendar className="w-4 h-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="w-4 h-4" />
                {blog.readTime}
              </span>
              <span className="flex items-center gap-1">
                <FaUser className="w-4 h-4" />
                {blog.author}
              </span>
            </div>

            <h1
              className={`text-3xl md:text-5xl text-white font-bold leading-tight ${orbitron.className}`}
            >
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-32"
              >
                <div className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl p-6 border border-white/10 h-fit">
                  <h3
                    className={`text-2xl font-bold text-white mb-6 ${orbitron.className}`}
                  >
                    Related Posts
                  </h3>

                  <div className="space-y-6">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        href={`/blog/${relatedBlog.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedBlog.img}
                              alt={relatedBlog.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-gray-400 text-xs mt-1">
                              {relatedBlog.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
