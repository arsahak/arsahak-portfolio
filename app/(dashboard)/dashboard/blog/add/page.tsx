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

  const handlePublish = async (isDraft = false) => {
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
        published: !isDraft,
      }),
    });
    const data = await res.json();
    if (data._id) {
      setSuccess(isDraft ? "Blog saved as draft!" : "Blog published!");
      router.push("/dashboard/blog");
    } else {
      setError(
        data.error || (isDraft ? "Draft save failed" : "Blog publish failed")
      );
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold whitespace-nowrap">Add New Blog</h1>
      </div>
      <hr className="mb-6" />
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-lg shadow p-6"
        onSubmit={(e) => {
          e.preventDefault();
          handlePublish();
        }}
      >
        {/* Left: Title and Body */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <label className="block font-semibold mb-1">Title:</label>
            <input
              className="w-full p-3 border rounded text-lg focus:ring-2 focus:ring-[#8750f7]"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Body:</label>
            <div
              className="bg-white rounded border border-gray-200"
              style={{ minHeight: 500 }}
            >
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                style={{ minHeight: 500 }}
              />
            </div>
          </div>
        </div>
        {/* Right: Meta, Author, Category, Image, SEO, Slug, Buttons */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-semibold mb-1">Author:</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#8750f7]"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#8750f7]"
              placeholder="Meta Description (70-160 char. including white space)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Slug:</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#8750f7]"
              placeholder="Enter the name to get slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="border-2 border-[#8750f7] text-[#8750f7] font-bold px-4 py-2 rounded-full hover:bg-[#f3e8ff] transition w-full shadow"
              disabled={loading}
              onClick={() => handlePublish(true)}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-[#8750f7] hover:bg-[#6a3fd9] text-white font-bold px-6 py-2 rounded-full shadow transition w-full"
              disabled={loading}
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
      </form>
    </div>
  );
}
