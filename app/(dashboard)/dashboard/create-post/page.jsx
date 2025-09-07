"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiGrid,
  FiImage,
  FiLoader,
  FiSave,
  FiSearch,
  FiSend,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { createBlog } from "../../../../lib/blogService";
import {
  deleteMediaImage,
  formatDate,
  formatFileSize as formatMediaFileSize,
  getMediaImages,
} from "../../../../lib/mediaService";
import {
  formatFileSize,
  uploadImageToCloudinary,
} from "../../../../lib/uploadImage";

const CreatePostPage = () => {
  const router = useRouter();
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: [],
    metaDescription: "",
    slug: "",
    featuredImage: null,
    bodyImage: [],
    published: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Media library state
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaImages, setMediaImages] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [selectingImage, setSelectingImage] = useState(false);

  // Cleanup effect for TinyMCE editor and search timeout when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup TinyMCE editor
      if (editorRef.current) {
        try {
          // Check if editor is still mounted and has destroy method
          if (
            editorRef.current.destroy &&
            typeof editorRef.current.destroy === "function"
          ) {
            // Check if the editor container still exists in DOM
            const editorContainer = editorRef.current.getContainer();
            if (editorContainer && editorContainer.parentNode) {
              // Use a timeout to ensure DOM operations are complete
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
          editorRef.current = null;
        } catch (error) {
          console.warn("Error cleaning up TinyMCE editor:", error);
          // Force cleanup even if destroy fails
          editorRef.current = null;
        }
      }

      // Cleanup search timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Handle keyboard shortcuts for media library
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showMediaLibrary && e.key === "Escape") {
        setShowMediaLibrary(false);
      }
    };

    if (showMediaLibrary) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showMediaLibrary]);

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

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((cat) => cat !== category)
        : [...prev.category, category],
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (1MB)
      const maxSize = 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        toast.error(
          `File size must be less than 1MB. Current size: ${formatFileSize(file.size)}`
        );
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, GIF, and WebP images are allowed");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setImageUploading(true);

      // Upload to Cloudinary
      const imageData = await uploadImageToCloudinary(
        selectedFile,
        "dashboard-media",
        "Featured Image",
        "Blog featured image"
      );

      setFormData((prev) => ({
        ...prev,
        featuredImage: imageData,
      }));

      toast.success("Featured image uploaded successfully!");
      setSelectedFile(null);

      // Refresh media library if it's open
      if (showMediaLibrary) {
        fetchMediaLibrary();
      }
    } catch (error) {
      toast.error("Failed to upload image: " + error.message);
      setImagePreview(null);
      setSelectedFile(null);
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setFormData((prev) => ({ ...prev, featuredImage: null }));
  };

  // Fetch media library from database
  const fetchMediaLibrary = async () => {
    setLoadingMedia(true);
    try {
      const images = await getMediaImages({
        folder: "dashboard-media",
        maxResults: 100,
        search: searchQuery.trim(), // Server-side search
      });

      setMediaImages(images);

      if (images.length === 0 && searchQuery === "") {
        console.log("No images found in media library");
      }
    } catch (error) {
      console.error("Failed to load media library:", error);
      toast.error("Failed to load media library: " + error.message);
      setMediaImages([]);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Debounced search function
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    const newTimeout = setTimeout(() => {
      fetchMediaLibrary();
    }, 500); // 500ms delay

    setSearchTimeout(newTimeout);
  };

  const openMediaLibrary = () => {
    setShowMediaLibrary(true);
    setSearchQuery(""); // Reset search when opening
    fetchMediaLibrary();
  };

  const selectMediaImage = async (image) => {
    setSelectingImage(true);
    try {
      // Add a small delay for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      setFormData((prev) => ({
        ...prev,
        featuredImage: {
          imageTitle: image.title,
          altText: image.alt,
          image: {
            public_id: image.public_id,
            url: image.url,
          },
        },
      }));
      setImagePreview(image.url);
      setShowMediaLibrary(false);
      toast.success("Image selected from media library");
    } catch (error) {
      toast.error("Failed to select image");
    } finally {
      setSelectingImage(false);
    }
  };

  const handleDeleteMediaImage = async (imageId, publicId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this image? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeletingImageId(imageId);
    try {
      await deleteMediaImage(publicId);
      toast.success("Image deleted successfully");

      // Remove from local state
      setMediaImages((prev) => prev.filter((img) => img.id !== imageId));

      // If this was the selected image, clear it
      if (formData.featuredImage?.image?.public_id === publicId) {
        setFormData((prev) => ({ ...prev, featuredImage: null }));
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image: " + error.message);
    } finally {
      setDeletingImageId(null);
    }
  };

  const getEditorContent = () => {
    let content = "";
    if (editorRef.current && editorRef.current.getContent) {
      try {
        content = editorRef.current.getContent();
      } catch (error) {
        console.warn("Error getting editor content:", error);
        content = "";
      }
    }
    return content;
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (formData.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long");
      return false;
    }
    if (!formData.author.trim()) {
      toast.error("Author is required");
      return false;
    }
    if (!formData.slug.trim()) {
      toast.error("Slug is required");
      return false;
    }
    if (formData.slug.trim().length < 3) {
      toast.error("Slug must be at least 3 characters long");
      return false;
    }
    if (formData.category.length === 0) {
      toast.error("Please select at least one category");
      return false;
    }

    // Check if editor has content using safe function
    const content = getEditorContent();
    if (!content.trim()) {
      toast.error("Blog content is required");
      return false;
    }
    if (content.trim().length < 10) {
      toast.error("Blog content must be at least 10 characters long");
      return false;
    }

    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsLoadingDraft(true);
    try {
      // Get content using safe function
      const content = getEditorContent();

      const blogData = {
        title: formData.title.trim(),
        body: content,
        slug: formData.slug.trim(),
        author: formData.author.trim(),
        category: formData.category.join(", "), // Convert array to string for API
        metaDescription: formData.metaDescription.trim(),
        featuredImage: formData.featuredImage,
        bodyImage: formData.bodyImage,
        published: false,
      };

      console.log("Creating blog with data:", blogData);

      const result = await createBlog(blogData);
      console.log("Blog created successfully:", result);

      toast.success("Post saved as draft successfully!");

      // Navigate immediately after successful creation
      router.push("/dashboard/blog");
    } catch (error) {
      console.error("Save draft error:", error);
      const errorMessage = error.message || "An unexpected error occurred";
      toast.error("Failed to save draft: " + errorMessage);
    } finally {
      setIsLoadingDraft(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Get content using safe function
      const content = getEditorContent();

      const blogData = {
        title: formData.title.trim(),
        body: content,
        slug: formData.slug.trim(),
        author: formData.author.trim(),
        category: formData.category.join(", "), // Convert array to string for API
        metaDescription: formData.metaDescription.trim(),
        featuredImage: formData.featuredImage,
        bodyImage: formData.bodyImage,
        published: true,
      };

      console.log("Publishing blog with data:", blogData);

      const result = await createBlog(blogData);
      console.log("Blog published successfully:", result);

      toast.success("Post published successfully!");

      // Navigate immediately after successful publication
      router.push("/dashboard/blog");
    } catch (error) {
      console.error("Publish error:", error);
      const errorMessage = error.message || "An unexpected error occurred";
      toast.error("Failed to publish post: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const availableCategories = [
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Database",
    "DevOps",
    "Design",
    "Mobile Development",
    "AI/ML",
    "Cybersecurity",
    "Cloud Computing",
  ];

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
              disabled={isLoadingDraft}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium disabled:opacity-50"
            >
              {isLoadingDraft ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <FiSave className="text-lg" />
              )}
              Save as Draft
            </button>
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
                Title: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                required
              />
            </div>

            {/* Body/Content Editor */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Body: <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(evt, editor) => {
                    try {
                      editorRef.current = editor;
                    } catch (error) {
                      console.warn("Error initializing TinyMCE editor:", error);
                    }
                  }}
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
                    // Add cleanup settings to prevent removeChild errors
                    auto_focus: false,
                    setup: (editor) => {
                      editor.on("remove", () => {
                        try {
                          // Check if editor container still exists before destroying
                          const container = editor.getContainer();
                          if (container && container.parentNode) {
                            editor.destroy();
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Author: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Type author name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                required
              />
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Category: <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {availableCategories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.category.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500/20"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
              {formData.category.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  No categories selected
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Featured Image:
              </label>

              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    >
                      <FiX className="text-lg" />
                    </button>
                  </div>

                  {selectedFile && !formData.featuredImage && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        File: {selectedFile.name} (
                        {formatFileSize(selectedFile.size)})
                      </p>
                      <button
                        onClick={handleImageUpload}
                        disabled={imageUploading}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {imageUploading ? (
                          <>
                            <FiLoader className="animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <FiUpload />
                            Upload to Cloudinary
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {formData.featuredImage && (
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ Image uploaded successfully
                        </p>
                      </div>

                      {/* Change Image Options */}
                      <div className="flex gap-2">
                        <label
                          htmlFor="featuredImage"
                          className="flex-1 px-3 py-2 text-sm border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 cursor-pointer text-center"
                        >
                          <FiUpload className="inline mr-1" />
                          Upload New
                        </label>
                        <button
                          onClick={openMediaLibrary}
                          className="flex-1 px-3 py-2 text-sm border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                        >
                          <FiGrid className="inline mr-1" />
                          Media Library
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-300">
                    <input
                      type="file"
                      id="featuredImage"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={imageUploading}
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
                          PNG, JPG, GIF, WebP up to 1MB
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Media Library Button */}
                  <div className="text-center">
                    <span className="text-xs text-gray-500">or</span>
                  </div>

                  <button
                    onClick={openMediaLibrary}
                    className="w-full px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <FiGrid className="text-lg" />
                    Select from Media Library
                  </button>
                </div>
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
                maxLength={160}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700 resize-none"
              />
              <p
                className={`text-xs mt-2 ${formData.metaDescription.length > 160 ? "text-red-500" : "text-gray-500"}`}
              >
                {formData.metaDescription.length}/160 characters
              </p>
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Slug: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Enter the name to get slug"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                required
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

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Loading overlay for image selection */}
          {selectingImage && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
              <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                <FiLoader className="text-purple-600 animate-spin text-xl" />
                <span className="text-gray-700 font-medium">
                  Selecting image...
                </span>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Media Library
                </h3>
                <p className="text-sm text-gray-500">
                  Select an image from your uploaded media ({mediaImages.length}{" "}
                  images) • Press ESC to close
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchMediaLibrary}
                  disabled={loadingMedia}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                  title="Refresh media library"
                >
                  <FiLoader
                    className={`text-xl ${loadingMedia ? "animate-spin" : ""}`}
                  />
                </button>
                <button
                  onClick={() => setShowMediaLibrary(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images by title, alt text, or filename..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Media Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {loadingMedia ? (
                <div className="flex items-center justify-center h-32">
                  <FiLoader className="text-2xl text-purple-600 animate-spin" />
                  <span className="ml-2 text-gray-600">Loading media...</span>
                </div>
              ) : mediaImages.length === 0 ? (
                <div className="text-center py-8">
                  <FiImage className="text-4xl text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">
                    {searchQuery
                      ? "No images found matching your search"
                      : "No images found in media library"}
                  </p>
                  {!searchQuery && (
                    <p className="text-sm text-gray-400">
                      Upload some images first to see them here
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaImages.map((image) => {
                    const isSelected =
                      formData.featuredImage?.image?.public_id ===
                      image.public_id;
                    return (
                      <div
                        key={image.id}
                        className={`group relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-purple-500 ring-2 ring-purple-200"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div
                          className="aspect-video bg-gray-100 relative cursor-pointer"
                          onClick={() => selectMediaImage(image)}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-white rounded-full p-3 shadow-lg">
                                {isSelected ? (
                                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <FiGrid className="text-purple-600 w-5 h-5" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Selected indicator */}
                          {isSelected && (
                            <div className="absolute top-2 left-2">
                              <div className="bg-purple-600 text-white rounded-full p-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMediaImage(image.id, image.public_id);
                          }}
                          disabled={deletingImageId === image.id}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        >
                          {deletingImageId === image.id ? (
                            <FiLoader className="text-xs animate-spin" />
                          ) : (
                            <FiX className="text-xs" />
                          )}
                        </button>

                        <div className="p-3">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {image.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {image.alt}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-400">
                              {formatMediaFileSize(image.bytes)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(image.uploadedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {mediaImages.length > 0 && (
                    <span>
                      {searchQuery
                        ? `${mediaImages.length} results found`
                        : `${mediaImages.length} total images`}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {formData.featuredImage && (
                    <button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          featuredImage: null,
                        }));
                        setImagePreview(null);
                        toast.success("Image selection cleared");
                      }}
                      className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      Clear Selection
                    </button>
                  )}
                  <button
                    onClick={() => setShowMediaLibrary(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {formData.featuredImage ? "Done" : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostPage;
