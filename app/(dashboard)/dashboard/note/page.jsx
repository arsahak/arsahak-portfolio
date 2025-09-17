"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FiArchive,
  FiCalendar,
  FiEdit,
  FiEye,
  FiFilter,
  FiLoader,
  FiPlus,
  FiSearch,
  FiTag,
  FiTrash2,
} from "react-icons/fi";
import { TfiPinAlt } from "react-icons/tfi";
import { toast } from "react-toastify";

import SafeHTML from "../../../../components/shared/SafeHTML";
import {
  deleteNote,
  getAllNotes,
  toggleArchiveNote,
  togglePinNote,
} from "../../../../lib/noteService";

const NotePage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "General",
    "Work",
    "Personal",
    "Ideas",
    "Tasks",
    "Meeting Notes",
    "Project",
    "Learning",
    "Other",
  ];

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch notes: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteNote(id);
      toast.success("Note deleted successfully!");
      fetchNotes(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete note: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePin = async (id, isPinned) => {
    try {
      await togglePinNote(id, isPinned);
      toast.success(isPinned ? "Note unpinned" : "Note pinned");
      fetchNotes(); // Refresh the list
    } catch (error) {
      toast.error("Failed to toggle pin status: " + error.message);
    }
  };

  const handleToggleArchive = async (id, isArchived) => {
    try {
      await toggleArchiveNote(id, isArchived);
      toast.success(isArchived ? "Note unarchived" : "Note archived");
      fetchNotes(); // Refresh the list
    } catch (error) {
      toast.error("Failed to toggle archive status: " + error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "Today";
      if (diffDays === 2) return "Yesterday";
      if (diffDays <= 7) return `${diffDays - 1} days ago`;
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-80"></div>
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-32"></div>
          </div>

          {/* Search and Filter Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-32"></div>
          </div>

          {/* Note Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden animate-pulse"
              >
                {/* Content Skeleton */}
                <div className="p-6">
                  {/* Header with Pin/Archive Icons Skeleton */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  {/* Category Badge Skeleton */}
                  <div className="mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>

                  {/* Content Preview Skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>

                  {/* Tags Skeleton */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <div className="h-5 bg-gray-200 rounded-full w-12"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-10"></div>
                  </div>

                  {/* Meta Info Skeleton */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>

                  {/* Action Buttons Skeleton */}
                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
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
              Personal Notes
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your personal notes and ideas
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/note/create")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-sm"
          >
            <FiPlus className="text-lg" />
            Add New Note
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 border-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  showFilters
                    ? "border-purple-500 bg-purple-50 text-purple-600"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <FiFilter className="text-lg" />
                Filters
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  Quick filters:
                </span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Work");
                  }}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  Work Notes
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Personal");
                  }}
                  className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200"
                >
                  Personal Notes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiPlus className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || selectedCategory !== "All"
                ? "No notes found"
                : "No notes yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search or filters"
                : "Start organizing your thoughts by adding your first note"}
            </p>
            {!searchQuery && selectedCategory === "All" && (
              <button
                onClick={() => router.push("/dashboard/note/create")}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Create Your First Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 ${
                  note.isPinned
                    ? "border-purple-300 ring-2 ring-purple-100"
                    : "border-purple-100"
                }`}
              >
                {/* Note Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                        {note.title}
                      </h3>

                      {/* Category and Tags */}
                      <div className="flex items-center gap-2 mb-3">
                        {note.category && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            <FiTag className="text-xs" />
                            {note.category}
                          </span>
                        )}
                        {note.isPinned && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            <TfiPinAlt className="text-xs" />
                            Pinned
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Menu */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePin(note._id, note.isPinned)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          note.isPinned
                            ? "text-yellow-600 hover:bg-yellow-50"
                            : "text-gray-400 hover:bg-gray-50 hover:text-yellow-600"
                        }`}
                        title={note.isPinned ? "Unpin note" : "Pin note"}
                      >
                        <TfiPinAlt className="text-sm" />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleArchive(note._id, note.isArchived)
                        }
                        className="p-2 text-gray-400 hover:bg-gray-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                        title={
                          note.isArchived ? "Unarchive note" : "Archive note"
                        }
                      >
                        <FiArchive className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="text-gray-600 text-sm line-clamp-3">
                    <SafeHTML
                      content={truncateText(
                        note.content.replace(/<[^>]*>/g, ""),
                        120
                      )}
                    />
                  </div>
                </div>

                {/* Note Footer */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-xs" />
                      {formatDate(note.updatedAt)}
                    </span>
                    {note.tags && note.tags.length > 0 && (
                      <span className="text-xs text-gray-400">
                        {note.tags.length} tag
                        {note.tags.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/note/${note._id}`)}
                      className="flex-1 px-3 py-2 text-sm border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiEye className="text-sm" />
                      View
                    </button>

                    <button
                      onClick={() =>
                        router.push(`/dashboard/note/${note._id}/edit`)
                      }
                      className="flex-1 px-3 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiEdit className="text-sm" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note._id)}
                      disabled={deletingId === note._id}
                      className="px-3 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-1 disabled:opacity-50"
                      title="Delete note"
                    >
                      {deletingId === note._id ? (
                        <FiLoader className="text-sm animate-spin" />
                      ) : (
                        <FiTrash2 className="text-sm" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {notes.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredNotes.length} of {notes.length} notes
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;
