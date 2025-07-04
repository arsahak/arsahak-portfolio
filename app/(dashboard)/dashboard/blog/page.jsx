"use client";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title:
      "How Can Small Businesses Create High-Converting Blog Content Consistently?",
    metaDescription:
      "How Small Businesses Can Create High-Converting Blogs. Discover how to create high-converting blog content consistently for your small business. Learn proven strategies from Bayshore Communication.",
    status: "Publish",
    createdAt: "2024-01-15",
    views: 1234,
    category: "Business",
  },
  {
    id: 2,
    title: "Is It Even Worth Doing Long-form Content as a New Channel in 2025?",
    metaDescription:
      "Is It Even Worth Doing Long-form Content as a New Channel in 2025? Is it even worth doing long-form content in 2025? Explore how this format works as a new channel and why it continues to support strong results for brands.",
    status: "Publish",
    createdAt: "2024-01-12",
    views: 987,
    category: "Content Marketing",
  },
  {
    id: 3,
    title:
      "What are the Best Strategies for Repurposing Blog Content for Social Media Marketing?",
    metaDescription:
      "Want more from your blog? Discover smart strategies to repurpose blog content into engaging social media posts that boost reach and achieve results.",
    status: "Publish",
    createdAt: "2024-01-10",
    views: 756,
    category: "Social Media",
  },
  {
    id: 4,
    title:
      "Should Businesses Focus on Creating High-Quality Long Form Videos or Multiple Short Form Videos?",
    metaDescription:
      "Should Businesses Focus on Creating High-Quality Long Form Videos or Multiple Short Form Videos?Discover the difference between long-form and short-form video marketing. Learn what works best for your brand with expert insights from Bayshore Communications.",
    status: "Publish",
    createdAt: "2024-01-08",
    views: 645,
    category: "Video Marketing",
  },
  {
    id: 5,
    title:
      "What is the Best Email Marketing Strategy for Small Businesses in 2025?",
    metaDescription:
      "What is the Best Email Marketing Strategy for Small Businesses in 2025?. Explore refined email marketing strategies for small businesses in 2025 to boost engagement, build trust, and drive consistent growth through every campaign.",
    status: "Publish",
    createdAt: "2024-01-05",
    views: 532,
    category: "Email Marketing",
  },
  {
    id: 6,
    title: "Enhancing Business Agility with Flexible Software Solutions",
    metaDescription:
      "Enhancing Business Agility with Flexible Software Solutions. Discover how flexible software systems can enhance your business agility. Explore how they reduce risk and help you stay ahead in a rapidly changing market.",
    status: "Draft",
    createdAt: "2024-01-03",
    views: 0,
    category: "Technology",
  },
  {
    id: 7,
    title: "The Evolution of Offshore Support in the Digital Age",
    metaDescription:
      "The Evolution of Offshore Support in the Digital Age. Discover how offshore support has evolved in this digital age from basic tasks to strategic, tech-driven partnerships to grow your business.",
    status: "Draft",
    createdAt: "2024-01-01",
    views: 0,
    category: "Business",
  },
  {
    id: 8,
    title: "How Emerging Technologies Are Transforming Business Operations",
    metaDescription:
      "Discover how emerging technologies & transforming business operations with automation, AI, cloud computing, and more. Learn how Bayshore Communication helps you lead with innovation. How Emerging Technologies Are Transforming Business Operations.",
    status: "Publish",
    createdAt: "2023-12-28",
    views: 423,
    category: "Technology",
  },
  {
    id: 9,
    title:
      "How to Get Started with Digital Marketing for Your Business: A Beginner's Guide",
    metaDescription:
      "How to Get Started with Digital Marketing for Your Business: A Beginner's Guide. Get started with digital marketing for your business. This beginner's guide features essential strategies, tips, and insights to help you grow and succeed online.",
    status: "Publish",
    createdAt: "2023-12-25",
    views: 678,
    category: "Digital Marketing",
  },
  {
    id: 10,
    title:
      "Creating Impactful Visual Content Best Practices for Digital Success",
    metaDescription:
      "Creating Impactful Visual Content: Best Practices for Digital Success. Learn to create impactful visual content with 2025's best practices.",
    status: "Draft",
    createdAt: "2023-12-22",
    views: 0,
    category: "Design",
  },
];

const ITEMS_PER_PAGE = 8;

const BlogManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [posts, setPosts] = useState(blogPosts);

  // Filter posts based on search and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle status change
  const handleStatusChange = (postId, newStatus) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, status: newStatus } : post
      )
    );
  };

  // Handle delete
  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "publish":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#2a1454] via-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent">
            Blog Management
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your blog posts, drafts, and published content.
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/dashboard/create-post")}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8750f7] to-[#6c3fc5]  text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <FaPlus /> New Post
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                Total Posts
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent mt-2">
                {posts.length}
              </p>
              <p className="text-xs text-gray-400 mt-1">All blog content</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#8750f7] to-[#6c3fc5] text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaEdit className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                Published
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mt-2">
                {posts.filter((p) => p.status === "Publish").length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Live content</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaEdit className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                Drafts
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent mt-2">
                {posts.filter((p) => p.status === "Draft").length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Work in progress</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaEdit className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                Total Views
              </p>
              <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mt-2">
                {posts
                  .reduce((sum, post) => sum + post.views, 0)
                  .toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">All time views</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaEdit className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 focus:border-[#8750f7] transition-all duration-300 bg-gray-50/50 hover:bg-white"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 focus:border-[#8750f7] transition-all duration-300 bg-gray-50/50 hover:bg-white font-medium text-gray-700"
            >
              <option value="All">All Status</option>
              <option value="Publish">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80 backdrop-blur-sm">
              <tr className="border-b border-gray-100">
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Meta Description
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80">
              {currentPosts.map((post, index) => (
                <tr
                  key={post.id}
                  className="hover:bg-gradient-to-r hover:from-[#8750f7]/5 hover:to-[#6c3fc5]/5 transition-all duration-300 group"
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8750f7]/10 to-[#6c3fc5]/10 flex items-center justify-center text-sm font-bold text-gray-700 group-hover:from-[#8750f7]/20 group-hover:to-[#6c3fc5]/20 transition-all duration-300">
                      {startIndex + index + 1}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="max-w-sm">
                      <div className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-[#8750f7] transition-colors duration-300 cursor-pointer leading-relaxed">
                        {post.title}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#8750f7]/10 text-[#8750f7]">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {post.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="max-w-lg">
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {post.metaDescription}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="relative">
                      <select
                        value={post.status}
                        onChange={(e) =>
                          handleStatusChange(post.id, e.target.value)
                        }
                        className={`appearance-none px-4 py-2.5 pr-10 rounded-xl text-sm font-bold border-2 transition-all duration-300 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 ${getStatusColor(post.status)}`}
                      >
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none opacity-60" />
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          (window.location.href = `/dashboard/blog/${post.id}`)
                        }
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn"
                      >
                        <FaEdit className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn"
                      >
                        <FaTrash className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50 px-8 py-6 border-t border-gray-100/50 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-gray-600">
              Showing{" "}
              <span className="font-bold text-gray-900">{startIndex + 1}</span>{" "}
              to{" "}
              <span className="font-bold text-gray-900">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredPosts.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#8750f7]">
                {filteredPosts.length}
              </span>{" "}
              entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 text-sm font-bold rounded-xl transition-all duration-300 ${
                        isCurrentPage
                          ? "bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] text-white shadow-lg scale-110"
                          : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md"
              >
                Next
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
