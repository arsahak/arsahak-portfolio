"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiGithub,
  FiGlobe,
  FiGrid,
  FiImage,
  FiLoader,
  FiPlus,
  FiSave,
  FiSearch,
  FiSend,
  FiTag,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  deleteMediaImage,
  formatDate,
  formatFileSize as formatMediaFileSize,
  getMediaImages,
} from "../../../../../lib/mediaService";
import { createPortfolio } from "../../../../../lib/portfolioService";
import {
  formatFileSize,
  uploadImageToCloudinary,
} from "../../../../../lib/uploadImage";

const CreatePortfolioPage = () => {
  const router = useRouter();
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    projectDuration: {
      startDate: "",
      endDate: "",
    },
    projectBudget: "",
    featureImage: null,
    galleryImage: [],
    liveUrl: "",
    githubUrl: "",
    technologies: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newTechnology, setNewTechnology] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Media library state
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaImages, setMediaImages] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [selectingImage, setSelectingImage] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);
  const [selectedMediaImages, setSelectedMediaImages] = useState([]);
  const [mediaLibraryMode, setMediaLibraryMode] = useState("featured"); // "featured" or "gallery"

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

  // Available categories
  const availableCategories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Full Stack",
    "Frontend",
    "Backend",
    "E-commerce",
    "Blog/Content",
    "Portfolio",
    "Dashboard",
    "API Development",
    "Database Design",
    "Cloud Services",
    "DevOps",
    "Machine Learning",
    "Game Development",
    "Desktop Application",
    "Other",
  ];

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

  const openMediaLibrary = (mode = "featured") => {
    setMediaLibraryMode(mode);
    setShowMediaLibrary(true);
    setSearchQuery(""); // Reset search when opening
    setSelectedMediaImages([]); // Reset selection
    fetchMediaLibrary();
  };

  const selectMediaImage = async (image) => {
    setSelectingImage(true);
    try {
      // Add a small delay for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      setFormData((prev) => ({
        ...prev,
        featureImage: {
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
      toast.success("Featured image selected from media library");
    } catch (error) {
      console.error("Error selecting featured image:", error);
      toast.error("Failed to select featured image");
    } finally {
      setSelectingImage(false);
    }
  };

  const selectGalleryImages = async (images) => {
    setSelectingImage(true);
    try {
      // Add a small delay for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      const galleryImages = images.map((img) => ({
        imageTitle: img.title,
        altText: img.alt,
        image: {
          public_id: img.public_id,
          url: img.url,
        },
      }));

      setFormData((prev) => ({
        ...prev,
        galleryImage: [...prev.galleryImage, ...galleryImages],
      }));

      setShowMediaLibrary(false);
      toast.success(`${images.length} images added to gallery`);
    } catch (error) {
      console.error("Error selecting gallery images:", error);
      toast.error("Failed to select gallery images");
    } finally {
      setSelectingImage(false);
    }
  };

  const toggleImageSelection = (image) => {
    setSelectedMediaImages((prev) => {
      const isSelected = prev.some((img) => img.id === image.id);
      if (isSelected) {
        return prev.filter((img) => img.id !== image.id);
      } else {
        return [...prev, image];
      }
    });
  };

  const handleSelectImages = async () => {
    if (mediaLibraryMode === "gallery") {
      if (selectedMediaImages.length === 0) {
        toast.error("Please select at least one image");
        return;
      }
      await selectGalleryImages(selectedMediaImages);
    }
  };

  // Handle search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
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

  // Delete image from media library
  const handleDeleteImage = async (image) => {
    if (!window.confirm(`Are you sure you want to delete "${image.title}"?`)) {
      return;
    }

    setDeletingImageId(image.id);
    try {
      await deleteMediaImage(image.public_id);
      toast.success("Image deleted successfully");
      // Refresh media library
      fetchMediaLibrary();
    } catch (error) {
      toast.error("Failed to delete image: " + error.message);
    } finally {
      setDeletingImageId(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setFormData((prev) => ({
        ...prev,
        projectDuration: {
          ...prev.projectDuration,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const addCategory = () => {
    if (newCategory.trim() && !formData.category.includes(newCategory.trim())) {
      setFormData((prev) => ({
        ...prev,
        category: newCategory.trim(),
      }));
      setNewCategory("");
    }
  };

  const removeCategory = () => {
    setFormData((prev) => ({
      ...prev,
      category: "",
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        toast.error(
          `File size must be less than 1MB. Current size: ${formatFileSize(
            file.size
          )}`
        );
        return;
      }

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
      const imageData = await uploadImageToCloudinary(
        selectedFile,
        "dashboard-media",
        "Portfolio Image",
        "Portfolio featured image"
      );

      setFormData((prev) => ({
        ...prev,
        featureImage: imageData,
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
    setFormData((prev) => ({ ...prev, featureImage: null }));
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  // Gallery image functions
  const handleGalleryFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Validate files
      const maxSize = 1024 * 1024; // 1MB
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      const validFiles = files.filter((file) => {
        if (file.size > maxSize) {
          toast.error(`File ${file.name} is too large. Maximum size is 1MB.`);
          return false;
        }
        if (!allowedTypes.includes(file.type)) {
          toast.error(`File ${file.name} is not a supported image type.`);
          return false;
        }
        return true;
      });

      setSelectedGalleryFiles(validFiles);
    }
  };

  const uploadGalleryImages = async () => {
    if (selectedGalleryFiles.length === 0) {
      toast.error("Please select files first");
      return;
    }

    try {
      setGalleryUploading(true);
      const uploadPromises = selectedGalleryFiles.map((file) =>
        uploadImageToCloudinary(
          file,
          "dashboard-media",
          `Gallery Image ${file.name}`,
          "Portfolio gallery image"
        )
      );

      const uploadedImages = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        galleryImage: [...prev.galleryImage, ...uploadedImages],
      }));

      toast.success(`${uploadedImages.length} images uploaded successfully!`);
      setSelectedGalleryFiles([]);

      // Refresh media library if it's open
      if (showMediaLibrary) {
        fetchMediaLibrary();
      }
    } catch (error) {
      toast.error("Failed to upload gallery images: " + error.message);
    } finally {
      setGalleryUploading(false);
    }
  };

  const removeGalleryImage = (imageIndex) => {
    setFormData((prev) => ({
      ...prev,
      galleryImage: prev.galleryImage.filter(
        (_, index) => index !== imageIndex
      ),
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsLoadingDraft(true);
    try {
      const portfolioData = {
        ...formData,
        projectBudget: Number(formData.projectBudget) || 0,
        published: false, // Save as draft
      };

      console.log("Creating portfolio with data:", portfolioData);
      await createPortfolio(portfolioData);
      toast.success("Portfolio saved as draft successfully!");

      // Navigate immediately after successful creation
      router.push("/dashboard/portfolio");
    } catch (error) {
      toast.error("Failed to save portfolio: " + error.message);
      console.error("Save error:", error);
    } finally {
      setIsLoadingDraft(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const portfolioData = {
        ...formData,
        projectBudget: Number(formData.projectBudget) || 0,
        published: true, // Publish immediately
      };

      console.log("Publishing portfolio with data:", portfolioData);
      await createPortfolio(portfolioData);
      toast.success("Portfolio published successfully!");

      // Navigate back to portfolio dashboard
      router.push("/dashboard/portfolio");
    } catch (error) {
      toast.error("Failed to publish portfolio: " + error.message);
      console.error("Publish error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const availableTechnologies = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Django",
    "Flask",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Redux",
    "GraphQL",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/portfolio")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <FiArrowLeft className="text-lg" />
              Back to Portfolio
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Add New Portfolio
              </h1>
              <p className="text-gray-600 mt-1">
                Create a new portfolio project
              </p>
            </div>
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
              Save Draft
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
                Project Title: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                required
              />
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FiTag className="inline mr-2 text-purple-500" />
                Project Category: <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {/* Selected Category */}
                {formData.category && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center gap-1">
                      {formData.category}
                      <button
                        onClick={removeCategory}
                        className="hover:text-red-600 transition-colors duration-200"
                      >
                        <FiX className="text-xs" />
                      </button>
                    </span>
                  </div>
                )}

                {/* Add New Category */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add custom category..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                    onKeyPress={(e) => e.key === "Enter" && addCategory()}
                  />
                  <button
                    onClick={addCategory}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>

                {/* Quick Add Categories */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Quick select:</p>
                  <div className="flex flex-wrap gap-1">
                    {availableCategories
                      .filter((cat) => cat !== formData.category)
                      .slice(0, 8)
                      .map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              category: cat,
                            }));
                          }}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                        >
                          {cat}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description with TinyMCE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Description: <span className="text-red-500">*</span>
              </label>
              <Editor
                onInit={(evt, editor) => {
                  try {
                    editorRef.current = editor;
                  } catch (error) {
                    console.warn("Error initializing TinyMCE editor:", error);
                  }
                }}
                value={formData.description}
                onEditorChange={handleEditorChange}
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                init={{
                  height: 400,
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
                  placeholder: "Describe your project in detail...",
                  branding: false,
                  elementpath: false,
                  statusbar: false,
                  resize: false,
                  auto_focus: false,
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

            {/* Project Duration */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FiCalendar className="inline mr-2 text-purple-500" />
                Project Duration:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.projectDuration.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.projectDuration.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Project Budget */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FiDollarSign className="inline mr-2 text-purple-500" />
                Project Budget:
              </label>
              <input
                type="number"
                name="projectBudget"
                value={formData.projectBudget}
                onChange={handleInputChange}
                placeholder="Enter project budget (optional)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
              />
            </div>

            {/* Live Project & Git Repo */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Links:
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    <FiGlobe className="inline mr-2 text-purple-500" />
                    Live Project URL
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://your-project.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    <FiGithub className="inline mr-2 text-purple-500" />
                    Git Repository URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

                  {selectedFile && !formData.featureImage && (
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

                  {formData.featureImage && (
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
                          onClick={() => openMediaLibrary("featured")}
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
                    onClick={() => openMediaLibrary("featured")}
                    className="w-full px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <FiGrid className="text-lg" />
                    Select from Media Library
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Gallery Images:
              </label>
              <div className="space-y-3">
                {/* Upload Gallery Images */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-purple-400 transition-colors duration-300">
                  <input
                    type="file"
                    id="galleryImages"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleGalleryFileSelect}
                    multiple
                    className="hidden"
                    disabled={galleryUploading}
                  />
                  <label
                    htmlFor="galleryImages"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FiUpload className="text-lg text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Upload Multiple Images
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF, WebP up to 1MB each
                      </p>
                    </div>
                  </label>
                </div>

                {/* Selected Files Preview */}
                {selectedGalleryFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {selectedGalleryFiles.length} file(s) selected
                    </p>
                    <button
                      onClick={uploadGalleryImages}
                      disabled={galleryUploading}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {galleryUploading ? (
                        <>
                          <FiLoader className="animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FiUpload />
                          Upload {selectedGalleryFiles.length} Images
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Gallery Images Display */}
                {formData.galleryImage.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.image?.url || image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    >
                      <FiX className="text-sm" />
                    </button>
                  </div>
                ))}

                {/* Media Library Button for Gallery */}
                <div className="text-center">
                  <span className="text-xs text-gray-500">or</span>
                </div>

                <button
                  onClick={() => openMediaLibrary("gallery")}
                  className="w-full px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <FiGrid className="text-lg" />
                  Select from Media Library
                </button>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Technologies Used:
              </label>
              <div className="space-y-3">
                {/* Add New Technology */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add technology..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                    onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                  />
                  <button
                    onClick={addTechnology}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>

                {/* Selected Technologies */}
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-red-600 transition-colors duration-200"
                      >
                        <FiX className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Quick Add Technologies */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-1">
                    {availableTechnologies
                      .filter((tech) => !formData.technologies.includes(tech))
                      .slice(0, 8)
                      .map((tech) => (
                        <button
                          key={tech}
                          onClick={() => {
                            if (!formData.technologies.includes(tech)) {
                              setFormData((prev) => ({
                                ...prev,
                                technologies: [...prev.technologies, tech],
                              }));
                            }
                          }}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                        >
                          {tech}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
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
                <FiLoader className="text-2xl text-purple-600 animate-spin" />
                <span className="text-gray-700 font-medium">
                  Selecting image...
                </span>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Media Library
                </h3>
                <p className="text-sm text-gray-500">
                  {mediaLibraryMode === "featured"
                    ? `Select a featured image from your uploaded media (${mediaImages.length} images)`
                    : `Select multiple images for your gallery (${mediaImages.length} images)`}{" "}
                  • Press ESC to close
                </p>
                {mediaLibraryMode === "gallery" &&
                  selectedMediaImages.length > 0 && (
                    <p className="text-sm text-purple-600 font-medium mt-1">
                      {selectedMediaImages.length} image(s) selected
                    </p>
                  )}
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
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images by title, alt text, or filename..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Media Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh] bg-white">
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
                      : "No images uploaded yet"}
                  </p>
                  {!searchQuery && (
                    <p className="text-sm text-gray-400">
                      Upload your first image to get started
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaImages.map((image) => {
                    const isSelected =
                      mediaLibraryMode === "featured"
                        ? formData.featureImage?.image?.public_id ===
                          image.public_id
                        : selectedMediaImages.some(
                            (img) => img.id === image.id
                          );
                    return (
                      <div
                        key={image.id}
                        className={`group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-purple-500 ring-2 ring-purple-200"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                        onClick={async () => {
                          if (mediaLibraryMode === "featured") {
                            await selectMediaImage(image);
                          } else if (mediaLibraryMode === "gallery") {
                            toggleImageSelection(image);
                          }
                        }}
                      >
                        <div className="aspect-video bg-gray-100 relative">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                              <div className="bg-purple-600 rounded-full p-2">
                                <FiGrid className="text-white text-lg" />
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-white rounded-full p-2">
                                <FiGrid className="text-purple-600" />
                              </div>
                            </div>
                          </div>
                          {/* Delete button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(image);
                            }}
                            disabled={deletingImageId === image.id}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                            title="Delete image"
                          >
                            {deletingImageId === image.id ? (
                              <FiLoader className="text-xs animate-spin" />
                            ) : (
                              <FiX className="text-xs" />
                            )}
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {image.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {image.alt}
                          </p>
                          <div className="flex items-center justify-between mt-1">
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
                  {mediaLibraryMode === "featured" && formData.featureImage && (
                    <div className="text-sm text-gray-600">
                      Selected: {formData.featureImage.imageTitle}
                    </div>
                  )}
                  {mediaLibraryMode === "gallery" &&
                    selectedMediaImages.length > 0 && (
                      <div className="text-sm text-purple-600 font-medium">
                        {selectedMediaImages.length} image(s) selected
                      </div>
                    )}
                  <button
                    onClick={() => setShowMediaLibrary(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  {mediaLibraryMode === "gallery" && (
                    <button
                      onClick={handleSelectImages}
                      disabled={
                        selectedMediaImages.length === 0 || selectingImage
                      }
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {selectingImage ? (
                        <>
                          <FiLoader className="animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <FiGrid />
                          Add to Gallery ({selectedMediaImages.length})
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePortfolioPage;
