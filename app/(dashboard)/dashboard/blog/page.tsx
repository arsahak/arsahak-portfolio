"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let url = "/api/blog";
    if (filter === "published") url += "?published=true";
    if (filter === "draft") url += "?published=false";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [success, filter]);

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
    <div className="w-full max-w-[1800px] mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold whitespace-nowrap">All Blogs</h1>
        <Link href="/dashboard/blog/add">
          <button className="flex items-center gap-2 bg-[#8750f7] hover:bg-[#6a3fd9] text-white font-bold px-6 py-2 rounded-full shadow transition w-full md:w-auto justify-center">
            <FaPlus /> New Post
          </button>
        </Link>
      </div>
      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full font-semibold border-2 transition shadow-sm ${filter === f.value ? "bg-[#8750f7] text-white border-[#8750f7]" : "bg-white text-[#8750f7] border-[#8750f7] hover:bg-[#f3e8ff]"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <hr className="mb-6" />
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 font-semibold text-left">#</th>
              <th className="py-3 px-4 font-semibold text-left">Title</th>
              <th className="py-3 px-4 font-semibold text-left">
                Meta Description
              </th>
              <th className="py-3 px-4 font-semibold text-left">Status</th>
              <th className="py-3 px-4 font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((blog, idx) => (
              <tr
                key={blog._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 whitespace-nowrap">{idx + 1}</td>
                <td className="py-3 px-4 max-w-xs truncate">{blog.title}</td>
                <td className="py-3 px-4 max-w-md truncate">
                  {blog.description}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${blog.published ? "text-green-600" : "text-yellow-500"}`}
                >
                  {blog.published ? "Publish" : "Draft"}
                </td>
                <td className="py-3 px-4 flex gap-3 items-center">
                  <Link href={`/dashboard/blog/edit/${blog._id}`}>
                    <button
                      className="text-[#8750f7] hover:bg-[#f3e8ff] border-2 border-[#8750f7] rounded-full p-2 transition shadow font-bold"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:bg-red-50 border-2 border-red-400 rounded-full p-2 transition shadow font-bold"
                    title="Delete"
                    onClick={() => handleDelete(blog._id)}
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {error && <div className="text-red-500 font-semibold mt-4">{error}</div>}
      {success && (
        <div className="text-green-600 font-semibold mt-4">{success}</div>
      )}
    </div>
  );
}
