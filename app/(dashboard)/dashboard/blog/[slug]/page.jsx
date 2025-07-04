"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaEye,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaRocket,
  FaSave,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

const BlogEditor = ({ initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "",
    categories: [],
    featuredImage: null,
    metaDescription: "",
    slug: "",
  });

  const [isPreview, setIsPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Available categories
  const availableCategories = [
    "Job Post",
    "Lead Generation",
    "video Content",
    "Infographics in Marketing",
    "Video Revolution",
    "Content",
    "Digital Marketing",
    "Google Maps",
    "SEO Service",
  ];

  // Initialize form data if editing
  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        title: initialData.title || "",
        body: initialData.body || "",
        author: initialData.author || "",
        categories: initialData.categories || [],
        featuredImage: initialData.featuredImage || null,
        metaDescription: initialData.metaDescription || "",
        slug: initialData.slug || "",
      });

      if (initialData.featuredImage) {
        setImagePreview(initialData.featuredImage);
      }

      if (initialData.body && editorRef.current) {
        editorRef.current.innerHTML = initialData.body;
      }
    }
  }, [initialData, isEditing]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category],
    }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Text editor commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Handle editor content change
  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData((prev) => ({
        ...prev,
        body: editorRef.current.innerHTML,
      }));
    }
  };

  // Save as draft
  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      console.log("Saving as draft:", formData);
      // Implement save draft logic here
      // await saveBlogPost({ ...formData, status: 'draft' });

      // Show success message
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Error saving draft. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Publish post
  const handlePublish = async () => {
    setIsLoading(true);
    try {
      console.log("Publishing post:", formData);
      // Implement publish logic here
      // await saveBlogPost({ ...formData, status: 'published' });

      // Show success message and redirect
      alert("Post published successfully!");
      router.push("/dashboard/blog");
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Error publishing post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-[#2a1454] via-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent">
              {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              {isEditing
                ? "Update your blog content"
                : "Create engaging content for your audience"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              <FaEye className="w-4 h-4" />
              {isPreview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 text-[#FF6B35] bg-white border-2 border-[#FF6B35] rounded-xl font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save as Draft"}
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaRocket className="w-4 h-4" />
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title Input */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Title:
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 focus:border-[#8750f7] transition-all duration-300 text-lg font-medium"
              />
            </div>

            {/* Rich Text Editor */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Body:
              </label>

              {/* Editor Toolbar */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Text Formatting */}
                    <div className="flex items-center gap-1">
                      <select
                        onChange={(e) =>
                          execCommand("formatBlock", e.target.value)
                        }
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="div">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                      </select>
                    </div>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Basic Formatting */}
                    <button
                      onClick={() => execCommand("bold")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Bold"
                    >
                      <FaBold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("italic")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Italic"
                    >
                      <FaItalic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("underline")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Underline"
                    >
                      <FaUnderline className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Alignment */}
                    <button
                      onClick={() => execCommand("justifyLeft")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Align Left"
                    >
                      <FaAlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("justifyCenter")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Align Center"
                    >
                      <FaAlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("justifyRight")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Align Right"
                    >
                      <FaAlignRight className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Lists */}
                    <button
                      onClick={() => execCommand("insertUnorderedList")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Bullet List"
                    >
                      <FaListUl className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("insertOrderedList")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Numbered List"
                    >
                      <FaListOl className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Links and Quotes */}
                    <button
                      onClick={() => {
                        const url = prompt("Enter URL:");
                        if (url) execCommand("createLink", url);
                      }}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Insert Link"
                    >
                      <FaLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("formatBlock", "blockquote")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Quote"
                    >
                      <FaQuoteLeft className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Undo/Redo */}
                    <button
                      onClick={() => execCommand("undo")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Undo"
                    >
                      <FaUndo className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => execCommand("redo")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      title="Redo"
                    >
                      <FaRedo className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Editor Content */}
                <div
                  ref={editorRef}
                  contentEditable={!isPreview}
                  onInput={handleEditorChange}
                  className={`min-h-96 p-4 outline-none ${
                    isPreview ? "bg-gray-50" : "bg-white"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: isPreview ? formData.body : "",
                  }}
                  style={{
                    minHeight: "400px",
                  }}
                >
                  {!isPreview && !formData.body && (
                    <p className="text-gray-400">
                      Start writing your blog content here...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Author:
              </label>
              <input
                type="text"
                placeholder="Type author name"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 focus:border-[#8750f7] transition-all duration-300"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Category:
              </label>
              <div className="space-y-3">
                {availableCategories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-[#8750f7] border-2 border-gray-300 rounded focus:ring-[#8750f7]/20"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#8750f7] transition-colors duration-200">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Featured Image:
              </label>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, featuredImage: null }));
                      fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#8750f7] hover:bg-[#8750f7]/5 transition-all duration-300 group"
                >
                  <FaImage className="w-8 h-8 text-gray-400 group-hover:text-[#8750f7] transition-colors duration-300" />
                  <p className="text-gray-500 group-hover:text-[#8750f7] font-medium mt-2 transition-colors duration-300">
                    Add featured image
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                SEO:
              </label>
              <textarea
                placeholder="Meta Description (70-160 char. including white space)"
                value={formData.metaDescription}
                onChange={(e) =>
                  handleInputChange("metaDescription", e.target.value)
                }
                rows={4}
                maxLength={160}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 focus:border-[#8750f7] transition-all duration-300 resize-none"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.metaDescription.length}/160 characters
              </div>
            </div>

            {/* Slug */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Slug:
              </label>
              <input
                type="text"
                placeholder="Enter the name to get slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8750f7]/20 focus:border-[#8750f7] transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page component that handles the dynamic route
export default function BlogPostPage({ params }) {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Check if this is a new post (slug === "new")
        if (params.slug === "new") {
          setIsEditing(false);
          setIsLoading(false);
          return;
        }

        // Fetch existing blog post data
        // Replace this with your actual API call
        // const response = await fetch(`/api/blog/${params.slug}`);
        // const data = await response.json();

        // For now, we'll simulate the data
        const mockData = {
          title: "Sample Blog Post",
          body: "<p>This is a sample blog post content.</p>",
          author: "AR Sahak",
          categories: ["Digital Marketing", "Content"],
          featuredImage: null,
          metaDescription:
            "This is a sample blog post description for SEO purposes.",
          slug: params.slug,
        };

        setBlogData(mockData);
        setIsEditing(true);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // If error, treat as new post
        setIsEditing(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8750f7] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <BlogEditor initialData={blogData} isEditing={isEditing} />;
}
