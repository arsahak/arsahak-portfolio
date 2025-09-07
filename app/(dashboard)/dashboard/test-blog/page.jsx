"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { createBlog, getBlogs } from "../../../../lib/blogService";

const TestBlogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState("");
  const [dbStatus, setDbStatus] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [healthStatus, setHealthStatus] = useState("");

  const testHealthCheck = async () => {
    try {
      setHealthStatus("Testing API health...");
      const response = await fetch("/api/health");
      const result = await response.json();

      if (result.success) {
        setHealthStatus(`✅ API Health: ${result.message}`);
        toast.success("API health check successful!");
      } else {
        setHealthStatus(`❌ API Health error: ${result.message}`);
        toast.error("API health check failed!");
      }
    } catch (error) {
      setHealthStatus(`❌ API Health test failed: ${error.message}`);
      toast.error("API health test failed!");
    }
  };

  const testDatabaseConnection = async () => {
    try {
      setDbStatus("Testing Prisma database connection...");
      const response = await fetch("/api/test-db");
      const result = await response.json();

      if (result.success) {
        setDbStatus(`✅ Prisma Database: ${result.message}`);
        toast.success("Database connection successful!");
      } else {
        setDbStatus(`❌ Database error: ${result.message}`);
        toast.error("Database connection failed!");
      }
    } catch (error) {
      setDbStatus(`❌ Database test failed: ${error.message}`);
      toast.error("Database test failed!");
    }
  };

  const testImageUpload = async () => {
    try {
      setUploadStatus("Testing image upload...");
      const response = await fetch("/api/test-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: "test" }),
      });
      const result = await response.json();

      if (result.success) {
        setUploadStatus(`✅ Image upload working: ${result.public_id}`);
        toast.success("Image upload test successful!");
      } else {
        setUploadStatus(`❌ Image upload error: ${result.message}`);
        toast.error("Image upload test failed!");
      }
    } catch (error) {
      setUploadStatus(`❌ Image upload test failed: ${error.message}`);
      toast.error("Image upload test failed!");
    }
  };

  const testBlogCreation = async () => {
    setIsLoading(true);
    setTestResult("");

    try {
      // Test blog data
      const testBlogData = {
        title: "Test Blog Post",
        body: "<p>This is a test blog post content.</p>",
        slug: "test-blog-post-" + Date.now(),
        author: "Test Author",
        category: ["Test", "Development"],
        metaDescription: "This is a test blog post for testing purposes.",
        published: false,
      };

      console.log("Testing blog creation with data:", testBlogData);

      // Create blog
      const createdBlog = await createBlog(testBlogData);
      console.log("Blog created successfully:", createdBlog);

      setTestResult("✅ Blog created successfully! ID: " + createdBlog.id);
      toast.success("Test blog created successfully!");

      // Test fetching blogs
      setTimeout(async () => {
        try {
          const blogs = await getBlogs({ limit: 10 });
          console.log("Blogs fetched:", blogs);
          setTestResult(
            (prev) =>
              prev +
              "\n✅ Blogs fetched successfully! Count: " +
              (blogs.data?.length || 0)
          );
        } catch (error) {
          console.error("Error fetching blogs:", error);
          setTestResult(
            (prev) => prev + "\n❌ Error fetching blogs: " + error.message
          );
        }
      }, 1000);
    } catch (error) {
      console.error("Test failed:", error);
      setTestResult("❌ Test failed: " + error.message);
      toast.error("Test failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setTestResult("");
    setDbStatus("");
    setUploadStatus("");
    setHealthStatus("");

    // Test API health first
    await testHealthCheck();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test database
    await testDatabaseConnection();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test image upload
    await testImageUpload();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test blog creation
    await testBlogCreation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-purple-100">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
            Blog System Test (Prisma)
          </h1>

          <div className="space-y-6">
            {/* API Health Test */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">
                API Health Check:
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={testHealthCheck}
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
                >
                  Test API Health
                </button>
                <span className="text-sm text-purple-700">{healthStatus}</span>
              </div>
            </div>

            {/* Database Test */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Prisma Database Connection Test:
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={testDatabaseConnection}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                >
                  Test Database
                </button>
                <span className="text-sm text-blue-700">{dbStatus}</span>
              </div>
            </div>

            {/* Image Upload Test */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">
                Image Upload Test:
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={testImageUpload}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                >
                  Test Upload
                </button>
                <span className="text-sm text-green-700">{uploadStatus}</span>
              </div>
            </div>

            {/* Blog Creation Test */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Blog Creation Test
              </h2>
              <p className="text-gray-600 mb-4">
                This will create a test blog post and then fetch all blogs to
                verify the API is working correctly.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={testBlogCreation}
                  disabled={isLoading}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? "Testing..." : "Test Blog Creation"}
                </button>

                <button
                  onClick={runAllTests}
                  disabled={isLoading}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? "Running All Tests..." : "Run All Tests"}
                </button>
              </div>
            </div>

            {testResult && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Test Results:
                </h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {testResult}
                </pre>
              </div>
            )}

            {/* Environment Check */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Environment Check:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • DATABASE_URL:{" "}
                  {process.env.NEXT_PUBLIC_DATABASE_URL
                    ? "✅ Set"
                    : "❌ Not set (should be in .env.local)"}
                </li>
                <li>
                  • CLOUDINARY_CLOUD_NAME:{" "}
                  {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                    ? "✅ Set"
                    : "❌ Not set (should be in .env.local)"}
                </li>
                <li>• Database Provider: Prisma</li>
                <li>• API Health: /api/health</li>
                <li>• Database Test: /api/test-db</li>
                <li>• Upload Test: /api/test-upload</li>
                <li>• Blog API: /api/blog</li>
              </ul>
            </div>

            {/* Setup Instructions */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-800 mb-2">
                Prisma Setup Instructions:
              </h3>
              <ol className="text-sm text-indigo-700 space-y-1 list-decimal list-inside">
                <li>Copy env.example to .env.local and update DATABASE_URL</li>
                <li>Run: npx prisma db push (to create tables)</li>
                <li>Run: npx prisma generate (to generate client)</li>
                <li>Restart your development server</li>
                <li>Test the database connection</li>
              </ol>
            </div>

            {/* Troubleshooting */}
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">
                Troubleshooting Steps:
              </h3>
              <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                <li>Check your .env.local file has DATABASE_URL set correctly</li>
                <li>Ensure your database is running and accessible</li>
                <li>Run &quot;npx prisma db push&quot; to create database tables</li>
                <li>Verify Cloudinary credentials are correct</li>
                <li>Check browser console for detailed error messages</li>
                <li>Restart your development server if needed</li>
                <li>Run &quot;Run All Tests&quot; to check each component</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBlogPage;
