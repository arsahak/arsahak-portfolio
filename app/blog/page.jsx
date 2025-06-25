"use client";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaClock, FaSearch, FaUser } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"] });

const blogData = [
  {
    id: 1,
    title: "Modern Web Development Trends 2024",
    excerpt:
      "Exploring the latest trends in web development including AI integration, performance optimization, and modern frameworks.",
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
    img: "/assets/portfolio-item/epharma-web.png",
    category: "Frontend Development",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "AR Sahak",
    slug: "react-performance-optimization-techniques",
  },
  {
    id: 4,
    title: "Database Design Best Practices",
    excerpt:
      "Learn essential database design principles and best practices for building scalable applications.",
    img: "/assets/portfolio-item/butterfly-app.png",
    category: "Database",
    date: "December 8, 2024",
    readTime: "7 min read",
    author: "AR Sahak",
    slug: "database-design-best-practices",
  },
  {
    id: 5,
    title: "Cloud Deployment Strategies",
    excerpt:
      "Explore different cloud deployment strategies and learn how to choose the right approach for your application.",
    img: "/assets/portfolio-item/epharma-web.png",
    category: "DevOps",
    date: "December 5, 2024",
    readTime: "9 min read",
    author: "AR Sahak",
    slug: "cloud-deployment-strategies",
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    excerpt:
      "Master the fundamental principles of UI/UX design to create better user experiences.",
    img: "/assets/portfolio-item/butterfly-app.png",
    category: "Design",
    date: "December 3, 2024",
    readTime: "6 min read",
    author: "AR Sahak",
    slug: "ui-ux-design-principles",
  },
];

const categories = [
  "All",
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "Database",
  "DevOps",
  "Design",
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter blogs based on search and category
  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl md:text-6xl font-bold text-white mb-6 ${orbitron.className}`}
            >
              Blog & Insights
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Discover the latest insights in web development, design trends,
              and technology innovations. Stay ahead with practical tips and
              industry best practices.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-md mx-auto mb-8"
            >
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container">
          {currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group h-full"
                  >
                    <Link href={`/blog/${blog.slug}`} className="block h-full">
                      <div className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 group-hover:border-primary/30 h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative overflow-hidden h-64 flex-shrink-0">
                          <Image
                            src={blog.img}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                              {blog.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                            <span>{blog.date}</span>
                            <span className="flex items-center gap-1">
                              <FaClock className="w-4 h-4" />
                              {blog.readTime}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                            {blog.title}
                          </h3>

                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <FaUser className="w-4 h-4" />
                              {blog.author}
                            </span>
                            <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
                              Read More
                              <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex justify-center mt-12"
                >
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "bg-white/10 text-gray-300 hover:bg-white/20"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl text-white mb-4">No articles found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/80 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
