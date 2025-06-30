"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const categoryOptions = [
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

export default function AddBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [featureImageFile, setFeatureImageFile] = useState<File | null>(null);
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCategoryChange = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeatureImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFeatureImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    let imageUrl = "";
    if (featureImage) {
      // Upload image to Cloudinary
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: featureImage }),
      });
      const data = await res.json();
      if (data.url) imageUrl = data.url;
      else {
        setError("Image upload failed");
        setLoading(false);
        return;
      }
    }
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: metaDescription,
        content: body,
        author,
        category: categories.join(", "),
        featureImage: imageUrl,
        slug,
      }),
    });
    const data = await res.json();
    if (data._id) {
      setSuccess("Blog published!");
      router.push("/dashboard/blog");
    } else {
      setError(data.error || "Blog publish failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Add New Blog</h1>
      </div>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Title and Body */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title:</label>
            <input
              className="w-full p-3 border rounded text-lg"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Body:</label>
            <ReactQuill theme="snow" value={body} onChange={setBody} />
          </div>
        </div>
        {/* Right: Meta, Author, Category, Image, SEO, Slug, Buttons */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1">Author:</label>
            <input
              className="w-full p-2 border rounded"
              placeholder="Type author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Category:</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <label key={cat} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Featured Image:</label>
            <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center h-32 border border-dashed border-gray-300">
              {featureImage ? (
                <img
                  src={featureImage}
                  alt="Feature"
                  className="h-28 object-contain rounded"
                />
              ) : (
                <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                  <span className="text-gray-400">Add featured image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">SEO:</label>
            <input
              className="w-full p-2 border rounded"
              placeholder="Meta Description (70-160 char. including white space)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Slug:</label>
            <input
              className="w-full p-2 border rounded"
              placeholder="Enter the name to get slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="border border-orange-500 text-orange-500 font-semibold px-4 py-2 rounded-full hover:bg-orange-50 transition"
              disabled={loading}
              onClick={() => alert("Draft functionality not implemented yet")}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow transition"
              disabled={loading}
              onClick={handlePublish}
            >
              <FaPlus className="inline mr-1" /> Publish
            </button>
          </div>
          {error && (
            <div className="text-red-500 font-semibold mt-2">{error}</div>
          )}
          {success && (
            <div className="text-green-600 font-semibold mt-2">{success}</div>
          )}
        </div>
      </div>
    </div>
  );
}
