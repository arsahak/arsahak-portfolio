"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FiSave, FiSend, FiUpload } from "react-icons/fi";

const CreatePostPage = () => {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    metaDescription: "",
    slug: "",
    featuredImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: generateSlug(value) }),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
      }));
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      const content = editorRef.current.getContent();
      // Here you would save as draft
      toast.success("Post saved as draft!");
    } catch (error) {
      toast.error("Failed to save draft");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const content = editorRef.current.getContent();
      // Here you would publish the post
      toast.success("Post published successfully!");
    } catch (error) {
      toast.error("Failed to publish post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Add New Blog
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium"
            >
              <FiSave className="text-lg" />
              Save as Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-sm"
            >
              <FiSend className="text-lg" />
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
              />
            </div>

            {/* Body/Content Editor */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Body:
              </label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <Editor
                  apiKey="your-tinymce-api-key" // You'll need to get this from TinyMCE
                  onInit={(evt, editor) => (editorRef.current = editor)}
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
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Author:
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Type author name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
              />
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700 bg-white"
              >
                <option value="">Select category</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="technology">Technology</option>
                <option value="tutorials">Tutorials</option>
                <option value="news">News</option>
              </select>
              {!formData.category && (
                <p className="text-sm text-gray-500 mt-2">
                  No categories found
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Featured Image:
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-300">
                <input
                  type="file"
                  id="featuredImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="featuredImage"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiUpload className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Add featured image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>
              {formData.featuredImage && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {formData.featuredImage.name}
                </p>
              )}
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                SEO:
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                placeholder="Meta Description (70-160 char. including white space)"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.metaDescription.length}/160 characters
              </p>
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Slug:
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Enter the name to get slug"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
              />
              {formData.slug && (
                <p className="text-xs text-gray-500 mt-2">
                  URL: /blog/{formData.slug}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
