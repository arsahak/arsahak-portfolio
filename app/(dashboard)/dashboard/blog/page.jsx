"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

  useEffect(() => {
    // Fetch blogs
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
      });

    // Fetch categories
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [success]);

  // Filter and search blogs
  useEffect(() => {
    let result = [...blogs];
    
    if (searchTerm) {
      result = result.filter(
        blog => 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(blog => blog.category === selectedCategory);
    }
    
    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, blogs]);

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setSuccess("Blog deleted!");
    } else {
      setError(data.error || "Delete failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        <Link href="/dashboard/blog/add">
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow transition">
            <FaPlus /> New Post
          </button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <IoFilterSharp /> Filters
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 z-10">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-left">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Meta Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog, idx) => (
                <tr
                  key={blog._id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{indexOfFirstBlog + idx + 1}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{blog.title}</td>
                  <td className="py-3 px-4 max-w-md truncate">
                    {blog.description}
                  </td>
                  <td className="py-3 px-4">
                    {categories.find(c => c._id === blog.category)?.name || '-'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <Link href={`/dashboard/blog/edit/${blog._id}`}>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        onClick={() => handleDelete(blog._id)}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentBlogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
            <div className="flex items-center text-sm text-gray-500">
              Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page
                      ? "bg-orange-500 text-white border-orange-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <div className="text-red-500 font-semibold mt-4">{error}</div>}
      {success && (
        <div className="text-green-600 font-semibold mt-4">{success}</div>
      )}
    </div>
  );
}
