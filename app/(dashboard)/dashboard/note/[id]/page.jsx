"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArchive,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiEdit,
  FiLoader,
  FiTag,
  FiTrash2,
} from "react-icons/fi";
import { TfiPinAlt } from "react-icons/tfi";
import { toast } from "react-toastify";
import SafeHTML from "../../../../../components/shared/SafeHTML";
import {
  deleteNote,
  getNoteById,
  toggleArchiveNote,
  togglePinNote,
} from "../../../../../lib/noteService";

const ViewNotePage = () => {
  const router = useRouter();
  const params = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchNoteData();
    }
  }, [params.id, fetchNoteData]);

  const fetchNoteData = async () => {
    try {
      setLoading(true);
      const data = await getNoteById(params.id);
      setNote(data);
    } catch (error) {
      toast.error("Failed to fetch note: " + error.message);
      router.push("/dashboard/note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      setDeleting(true);
      await deleteNote(params.id);
      toast.success("Note deleted successfully!");
      router.push("/dashboard/note");
    } catch (error) {
      toast.error("Failed to delete note: " + error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePin = async () => {
    try {
      await togglePinNote(note._id, note.isPinned);
      toast.success(note.isPinned ? "Note unpinned" : "Note pinned");
      fetchNoteData(); // Refresh the note data
    } catch (error) {
      toast.error("Failed to toggle pin status: " + error.message);
    }
  };

  const handleToggleArchive = async () => {
    try {
      await toggleArchiveNote(note._id, note.isArchived);
      toast.success(note.isArchived ? "Note unarchived" : "Note archived");
      fetchNoteData(); // Refresh the note data
    } catch (error) {
      toast.error("Failed to toggle archive status: " + error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FiLoader className="text-4xl text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading note...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full mx-auto">
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Note not found
            </h3>
            <p className="text-gray-600 mb-6">
              The note you&apos;re looking for doesn&apos;t exist
            </p>
            <button
              onClick={() => router.push("/dashboard/note")}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Back to Notes
            </button>
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/note")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <FiArrowLeft className="text-lg" />
              Back to Notes
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {note.title}
              </h1>
              <p className="text-gray-600 mt-1">Note Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/dashboard/note/${params.id}/edit`)}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-300 font-medium"
            >
              <FiEdit className="text-lg" />
              Edit Note
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-300 font-medium disabled:opacity-50"
            >
              {deleting ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <FiTrash2 className="text-lg" />
              )}
              {deleting ? "Deleting..." : "Delete Note"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Note Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <div className="prose prose-purple max-w-none">
                <SafeHTML
                  content={note.content}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Note Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Note Information
              </h3>
              <div className="space-y-4">
                {/* Category */}
                {note.category && (
                  <div className="flex items-center gap-3">
                    <FiTag className="text-purple-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">
                        {note.category}
                      </p>
                    </div>
                  </div>
                )}

                {/* Created Date */}
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-purple-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Updated Date */}
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <div className="flex items-center gap-3">
                    <FiClock className="text-purple-500 text-lg" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(note.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {note.tags && note.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Note Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleTogglePin}
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                    note.isPinned
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  <TfiPinAlt className="text-lg" />
                  {note.isPinned ? "Unpin Note" : "Pin Note"}
                </button>

                <button
                  onClick={handleToggleArchive}
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                    note.isArchived
                      ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  <FiArchive className="text-lg" />
                  {note.isArchived ? "Unarchive Note" : "Archive Note"}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Quick Actions:
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    router.push(`/dashboard/note/${params.id}/edit`)
                  }
                  className="w-full px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium"
                >
                  <FiEdit className="inline mr-2" />
                  Edit Note
                </button>
                <button
                  onClick={() => router.push("/dashboard/note")}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Back to Notes
                </button>
              </div>
            </div>

            {/* Note Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Note Status:
              </h3>
              <div className="space-y-2">
                {note.isPinned && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <TfiPinAlt className="text-yellow-600" />
                    <span className="text-sm text-yellow-700 font-medium">
                      Pinned Note
                    </span>
                  </div>
                )}
                {note.isArchived && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <FiArchive className="text-gray-600" />
                    <span className="text-sm text-gray-700 font-medium">
                      Archived Note
                    </span>
                  </div>
                )}
                {!note.isPinned && !note.isArchived && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <FiTag className="text-green-600" />
                    <span className="text-sm text-green-700 font-medium">
                      Active Note
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNotePage;
