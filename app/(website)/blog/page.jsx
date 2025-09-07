"use client";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaClock, FaSearch, FaUser } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"] });

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/blog?published=true", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load blogs");
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    blogs.forEach((b) => b?.category && set.add(b.category));
    return Array.from(set);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title?.toLowerCase().includes(term) ||
        blog.description?.toLowerCase().includes(term) ||
        blog.content?.toLowerCase().includes(term);
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32">
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 animate-pulse"
                >
                  {/* Image Skeleton */}
                  <div className="h-64 bg-gray-700 relative">
                    <div className="absolute top-4 left-4">
                      <div className="w-20 h-6 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content Skeleton */}
                  <div className="p-6 space-y-4">
                    {/* Date and read time */}
                    <div className="flex items-center justify-between">
                      <div className="w-24 h-4 bg-gray-600 rounded"></div>
                      <div className="w-16 h-4 bg-gray-600 rounded"></div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <div className="w-full h-6 bg-gray-600 rounded"></div>
                      <div className="w-3/4 h-6 bg-gray-600 rounded"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-600 rounded"></div>
                      <div className="w-full h-4 bg-gray-600 rounded"></div>
                      <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
                    </div>

                    {/* Author and read more */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="w-20 h-4 bg-gray-600 rounded"></div>
                      <div className="w-24 h-4 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((blog, index) => (
                  <motion.div
                    key={blog._id || blog.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group h-full"
                  >
                    <Link href={`/blog/${blog.slug}`} className="block h-full">
                      <div className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 border border-white/10 group-hover:border-primary/30 h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative overflow-hidden h-64 flex-shrink-0">
                          <Image
                            src={
                              blog.featureImage ||
                              "/assets/portfolio-item/epharma-web.png"
                            }
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                              {blog.category || "General"}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                            <span>
                              {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString()
                                : ""}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="w-4 h-4" />5 min read
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                            {blog.title}
                          </h3>

                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                            {blog.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <FaUser className="w-4 h-4" />
                              {blog.author || "AR Sahak"}
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
