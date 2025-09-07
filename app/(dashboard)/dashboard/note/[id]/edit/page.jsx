"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiLoader,
  FiPlus,
  FiSend,
  FiTag,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { getNoteById, updateNote } from "../../../../../../lib/noteService";

const EditNotePage = () => {
  const router = useRouter();
  const params = useParams();
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    tags: [],
    isPinned: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [newTag, setNewTag] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [loadingNote, setLoadingNote] = useState(true);

  const categories = [
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

  useEffect(() => {
    if (params.id) {
      fetchNoteData();
    }
  }, [params.id]);

  // Cleanup TinyMCE editor on unmount
  useEffect(() => {
    return () => {
      if (
        editorRef.current &&
        editorRef.current.destroy &&
        typeof editorRef.current.destroy === "function"
      ) {
        const editorContainer = editorRef.current.getContainer();
        if (editorContainer && editorContainer.parentNode) {
          setTimeout(() => {
            try {
              editorRef.current?.destroy();
            } catch (destroyError) {
              console.warn(
                "Error during delayed editor destroy:",
                destroyError
              );
            }
          }, 0);
        }
      }
    };
  }, []);

  const fetchNoteData = async () => {
    try {
      setLoadingNote(true);
      const note = await getNoteById(params.id);

      if (note) {
        setNoteId(note._id);
        setFormData({
          title: note.title || "",
          content: note.content || "",
          category: note.category || "General",
          tags: note.tags || [],
          isPinned: note.isPinned || false,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch note: " + error.message);
      router.push("/dashboard/note");
    } finally {
      setLoadingNote(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return false;
    }
    return true;
  };

  const handlePublish = async () => {
    if (!validateForm() || !noteId) return;

    setIsLoading(true);
    try {
      const noteData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags,
        isPinned: formData.isPinned,
      };

      console.log("Publishing note with data:", noteData);
      await updateNote(noteId, noteData);
      toast.success("Note published successfully!");
      router.push("/dashboard/note");
    } catch (error) {
      toast.error("Failed to publish note: " + error.message);
      console.error("Publish error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingNote) {
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
                Edit Note
              </h1>
              <p className="text-gray-600 mt-1">
                Update your note content and settings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <FiSend className="text-lg" />
              )}
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Note Title: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter note title..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                required
              />
            </div>

            {/* Content with TinyMCE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Note Content: <span className="text-red-500">*</span>
              </label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                onInit={(evt, editor) => {
                  try {
                    editorRef.current = editor;
                  } catch (error) {
                    console.warn("Error initializing TinyMCE editor:", error);
                  }
                }}
                value={formData.content}
                onEditorChange={handleEditorChange}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  placeholder: "Start writing your note...",
                  branding: false,
                  elementpath: false,
                  statusbar: false,
                  resize: false,
                  setup: (editor) => {
                    editor.on("remove", () => {
                      try {
                        if (editorRef.current && editorRef.current.destroy) {
                          editorRef.current.destroy();
                        }
                      } catch (error) {
                        console.warn("Error destroying editor:", error);
                      }
                    });
                  },
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FiTag className="inline mr-2 text-purple-500" />
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tags:
              </label>
              <div className="space-y-3">
                {/* Add New Tag */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>

                {/* Selected Tags */}
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-600 transition-colors duration-200"
                      >
                        <FiX className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>

                {formData.tags.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    No tags added yet
                  </p>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Note Options:
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPinned"
                    checked={formData.isPinned}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700">Pin this note</span>
                </label>
                <p className="text-xs text-gray-500">
                  Pinned notes appear at the top of your notes list
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Quick Actions:
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push(`/dashboard/note/${noteId}`)}
                  className="w-full px-3 py-2 text-sm border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                  View Note
                </button>
                <button
                  onClick={() => router.push("/dashboard/note")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNotePage;
