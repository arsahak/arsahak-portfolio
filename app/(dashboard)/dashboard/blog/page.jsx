"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiEye,
  FiLoader,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { deleteBlog, getBlogs } from "../../../../lib/blogService";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 10;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log("Fetching blogs for page:", currentPage);
      const result = await getBlogs({
        page: currentPage,
        limit: blogsPerPage,
      });
      console.log("Blogs fetched:", result);

      // Handle both possible response structures and normalize category data
      const blogsData = result.data || result.blogs || result || [];
      const total = result.total || result.count || blogsData.length;

      const normalizedBlogs = Array.isArray(blogsData)
        ? blogsData.map((blog) => ({
            ...blog,
            // Normalize category to always be an array
            category: blog.category
              ? Array.isArray(blog.category)
                ? blog.category
                : blog.category
                    .split(",")
                    .map((cat) => cat.trim())
                    .filter((cat) => cat)
              : [],
          }))
        : [];

      setBlogs(normalizedBlogs);
      setTotalBlogs(total);
      setTotalPages(Math.ceil(total / blogsPerPage));
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs: " + error.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      setDeletingId(id);
      console.log("Deleting blog with ID:", id);
      await deleteBlog(id);
      toast.success("Blog deleted successfully!");

      // If we're on a page that might be empty after deletion, go to previous page
      if (blogs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchBlogs(); // Refresh the current page
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FiLoader className="text-4xl text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Blog Management
            </h1>
            <p className="text-gray-600 mt-2">Manage your blog posts</p>
          </div>
          <Link
            href="/dashboard/create-post"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-sm"
          >
            <FiPlus className="text-lg" />
            Create New Blog
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiPlus className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900">{totalBlogs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiEye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.filter((blog) => blog.published).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiEdit className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.filter((blog) => !blog.published).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiLoader className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Current Page
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
          {blogs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPlus className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No blogs yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first blog post to get started
              </p>
              <Link
                href="/dashboard/create-post"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <FiPlus />
                Create Your First Blog
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Blog
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {blog.featuredImage?.image?.url && (
                            <img
                              src={blog.featuredImage.image.url}
                              alt={
                                blog.featuredImage.imageTitle ||
                                blog.title ||
                                "Blog image"
                              }
                              className="w-12 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                // Hide broken images
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                          <div>
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                              {blog.title || "Untitled"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              /blog/{blog.slug || "no-slug"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-base font-medium text-gray-900">
                          {blog.author || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(blog.category) &&
                          blog.category.length > 0 ? (
                            <>
                              {blog.category.slice(0, 2).map((cat, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                >
                                  {cat}
                                </span>
                              ))}
                              {blog.category.length > 2 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{blog.category.length - 2}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">
                              No categories
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(blog.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                            title="View blog"
                          >
                            <FiEye className="w-4 h-4 text-green-400" />
                          </Link>
                          <Link
                            href={`/dashboard/blog/${blog.slug}`}
                            className="p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                            title="Edit blog"
                          >
                            <FiEdit className="w-4 h-4 text-purple-400" />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            disabled={deletingId === blog._id}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
                            title="Delete blog"
                          >
                            {deletingId === blog._id ? (
                              <FiLoader className="w-4 h-4 animate-spin" />
                            ) : (
                              <FiTrash2 className="w-4 h-4 text-red-400" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-purple-100 p-6">
            <div className="flex items-center justify-between">
              {/* Pagination Info */}
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {Math.min((currentPage - 1) * blogsPerPage + 1, totalBlogs)}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * blogsPerPage, totalBlogs)}
                </span>{" "}
                of <span className="font-medium">{totalBlogs}</span> results
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <FiChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        currentPage === pageNum
                          ? "bg-purple-600 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                  <FiChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
