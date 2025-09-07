"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBlog,
  FaEye,
  FaFolderOpen,
  FaPlus,
  FaStickyNote,
} from "react-icons/fa";
import { getBlogs } from "../../../lib/blogService";
import { getAllNotes } from "../../../lib/noteService";
import { getAllPortfolios } from "../../../lib/portfolioService";

// Dynamic stats data generator
const generateStatsData = (dashboardData) => [
  {
    title: "Total Views",
    value: "24,567", // Keep fixed for now as requested
    change: "+12.5%",
    isIncrease: true,
    icon: <FaEye />,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Blog Posts",
    value: dashboardData.totalBlogs.toString(),
    change: dashboardData.totalBlogs > 0 ? `+${dashboardData.totalBlogs}` : "0",
    isIncrease: dashboardData.totalBlogs > 0,
    icon: <FaBlog />,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Portfolio Items",
    value: dashboardData.totalPortfolios.toString(),
    change:
      dashboardData.totalPortfolios > 0
        ? `+${dashboardData.totalPortfolios}`
        : "0",
    isIncrease: dashboardData.totalPortfolios > 0,
    icon: <FaFolderOpen />,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Notes",
    value: dashboardData.totalNotes.toString(),
    change: dashboardData.totalNotes > 0 ? `+${dashboardData.totalNotes}` : "0",
    isIncrease: dashboardData.totalNotes > 0,
    icon: <FaStickyNote />,
    color: "from-orange-500 to-orange-600",
  },
];

// Helper functions for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Create SVG path for smooth curves
const createSmoothPath = (points, height) => {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${height - points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const cp1x = prev.x + (curr.x - prev.x) / 3;
    const cp1y = height - prev.y;
    const cp2x = curr.x - (next ? next.x - prev.x : curr.x - prev.x) / 3;
    const cp2y = height - curr.y;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${height - curr.y}`;
  }

  return path;
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState({
    totalBlogs: 0,
    totalPortfolios: 0,
    totalNotes: 0,
    recentBlogs: [],
    recentPortfolios: [],
    recentNotes: [],
    monthlyData: [],
    loading: true,
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true }));

      // Fetch all data in parallel
      const [blogsResponse, portfoliosResponse, notesResponse] =
        await Promise.all([
          getBlogs({ limit: 100 }).catch(() => []),
          getAllPortfolios().catch(() => []),
          getAllNotes().catch(() => []),
        ]);

      // Handle blog response - getBlogs returns array directly, not { blogs: [] }
      const blogs = Array.isArray(blogsResponse) ? blogsResponse : [];
      const portfolios = Array.isArray(portfoliosResponse)
        ? portfoliosResponse
        : [];
      const notes = Array.isArray(notesResponse) ? notesResponse : [];

      // Get recent items (last 5)
      const recentBlogs = blogs
        .sort(
          (a, b) =>
            new Date(b.createdAt || b.publishDate || 0) -
            new Date(a.createdAt || a.publishDate || 0)
        )
        .slice(0, 5);

      const recentPortfolios = portfolios
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);

      const recentNotes = notes
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);

      // Generate monthly data for the chart (last 6 months)
      const monthlyData = generateMonthlyData(blogs, portfolios, notes);

      setDashboardData({
        totalBlogs: blogs.length,
        totalPortfolios: portfolios.length,
        totalNotes: notes.length,
        recentBlogs,
        recentPortfolios,
        recentNotes,
        monthlyData,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const generateMonthlyData = (blogs, portfolios, notes) => {
    const months = [];
    const now = new Date();

    // Generate last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.getFullYear();
      const month = date.getMonth();

      // Count items published in this month
      const blogCount = blogs.filter((blog) => {
        const blogDate = new Date(blog.createdAt || blog.publishDate || 0);
        return blogDate.getFullYear() === year && blogDate.getMonth() === month;
      }).length;

      const portfolioCount = portfolios.filter((portfolio) => {
        const portfolioDate = new Date(portfolio.createdAt || 0);
        return (
          portfolioDate.getFullYear() === year &&
          portfolioDate.getMonth() === month
        );
      }).length;

      const noteCount = notes.filter((note) => {
        const noteDate = new Date(note.createdAt || 0);
        return noteDate.getFullYear() === year && noteDate.getMonth() === month;
      }).length;

      months.push({
        month: monthName,
        blogs: blogCount,
        portfolios: portfolioCount,
        notes: noteCount,
        total: blogCount + portfolioCount + noteCount,
      });
    }

    return months;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "published":
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (dashboardData.loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-80"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-32"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow border border-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section Skeleton */}
        <div className="bg-white rounded-3xl p-8 shadow border border-gray-100 animate-pulse">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-12 bg-gray-200 rounded-full"></div>
              <div className="h-8 bg-gray-200 rounded w-48"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>

            <div className="h-80 bg-gray-100 rounded-2xl p-8">
              <div className="flex items-end justify-center h-full space-x-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-end space-x-1 h-48 mb-4">
                      <div className="w-6 bg-gray-200 rounded-t-lg h-32"></div>
                      <div className="w-6 bg-gray-200 rounded-t-lg h-24"></div>
                      <div className="w-6 bg-gray-200 rounded-t-lg h-40"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tables Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow border border-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-4 rounded-xl border border-gray-100"
                  >
                    <div className="space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="flex items-center gap-4">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#2a1454] via-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Welcome back! Here&apos;s what&apos;s happening with your content.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/dashboard/create-post"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] text-white rounded-xl font-semibold hover:shadow transition-all duration-300"
          >
            <FaPlus /> Create New
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {generateStatsData(dashboardData).map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white rounded-2xl p-6 shadow hover:shadow transition-all duration-300 border border-gray-100 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-3xl font-black text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.isIncrease ? (
                    <FaArrowUp className="text-green-500 text-sm" />
                  ) : (
                    <FaArrowDown className="text-red-500 text-sm" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      stat.isIncrease ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm">from last month</span>
                </div>
              </div>
              <div
                className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white text-2xl shadow group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Recent Analytics Bar Chart */}
      <div className="bg-white rounded-3xl p-8 shadow border border-gray-100/50 hover:shadow transition-all duration-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8750f7]/5 via-transparent to-[#6c3fc5]/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8750f7]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-12 bg-gradient-to-b from-[#8750f7] via-[#6c3fc5] to-[#8750f7] rounded-full shadow"></div>
                  <div className="absolute -left-1 top-2 w-1 h-8 bg-white/40 rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-gradient-to-r from-[#2a1454] via-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent">
                    Recent Analytics
                  </h2>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-sm shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Blogs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-sm shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Portfolios
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-sm shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Notes
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Blog Stats */}
            <div className="space-y-4">
              <div className="text-gray-600 text-sm font-medium">
                Total Blogs
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">
                    {dashboardData.totalBlogs}
                  </span>
                  <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Portfolio Stats */}
            <div className="space-y-4">
              <div className="text-gray-600 text-sm font-medium">
                Total Portfolios
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">
                    {dashboardData.totalPortfolios}
                  </span>
                  <span className="text-sm text-gray-500 bg-purple-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Notes Stats */}
            <div className="space-y-4">
              <div className="text-gray-600 text-sm font-medium">
                Total Notes
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">
                    {dashboardData.totalNotes}
                  </span>
                  <span className="text-sm text-gray-500 bg-orange-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-80 bg-gradient-to-br from-gray-50/30 to-white/80 rounded-2xl p-8 relative border border-gray-100/50 backdrop-blur-sm">
            <div className="relative h-full">
              {/* Chart Container */}
              <div className="flex items-end justify-center h-full space-x-8">
                {/* Bar Groups */}
                {dashboardData.monthlyData.map((data, index) => {
                  const maxValue = Math.max(
                    ...dashboardData.monthlyData.map((d) =>
                      Math.max(d.blogs, d.portfolios, d.notes)
                    ),
                    1 // Minimum 1 to avoid division by zero
                  );

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center group"
                    >
                      {/* Bars Container */}
                      <div className="flex items-end space-x-1 h-48 mb-4">
                        {/* Blogs Bar */}
                        <div
                          className="w-6 bg-gradient-to-t from-[#10b981] to-[#059669] rounded-t-lg shadow hover:shadow transition-all duration-500 hover:scale-105 relative group/bar"
                          style={{
                            height: `${(data.blogs / maxValue) * 100}%`,
                            minHeight: data.blogs > 0 ? "8px" : "0px",
                          }}
                        >
                          {data.blogs > 0 && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Blogs: {data.blogs}
                            </div>
                          )}
                        </div>

                        {/* Portfolios Bar */}
                        <div
                          className="w-6 bg-gradient-to-t from-[#8b5cf6] to-[#7c3aed] rounded-t-lg shadow hover:shadow transition-all duration-500 hover:scale-105 relative group/bar"
                          style={{
                            height: `${(data.portfolios / maxValue) * 100}%`,
                            minHeight: data.portfolios > 0 ? "8px" : "0px",
                          }}
                        >
                          {data.portfolios > 0 && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Portfolios: {data.portfolios}
                            </div>
                          )}
                        </div>

                        {/* Notes Bar */}
                        <div
                          className="w-6 bg-gradient-to-t from-[#f59e0b] to-[#d97706] rounded-t-lg shadow hover:shadow transition-all duration-500 hover:scale-105 relative group/bar"
                          style={{
                            height: `${(data.notes / maxValue) * 100}%`,
                            minHeight: data.notes > 0 ? "8px" : "0px",
                          }}
                        >
                          {data.notes > 0 && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Notes: {data.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Month Label */}
                      <div className="text-sm font-semibold text-gray-600 group-hover:text-[#8750f7] transition-colors duration-300">
                        {data.month}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 font-medium">
                <span className="bg-white/80 px-1 rounded">100%</span>
                <span className="bg-white/80 px-1 rounded">75%</span>
                <span className="bg-white/80 px-1 rounded">50%</span>
                <span className="bg-white/80 px-1 rounded">25%</span>
                <span className="bg-white/80 px-1 rounded">0%</span>
              </div>

              {/* Horizontal Grid Lines */}
              <div className="absolute left-8 right-0 top-0 h-48">
                {[0, 25, 50, 75, 100].map((percentage, index) => (
                  <div
                    key={index}
                    className="absolute left-0 right-0 border-t border-gray-200 border-dashed opacity-40"
                    style={{ top: `${100 - percentage}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Blog Posts */}
        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaBlog className="text-[#8750f7]" />
              Recent Blog Posts
            </h3>
            <button
              onClick={() => router.push("/dashboard/blog")}
              className="text-[#8750f7] hover:text-[#6c3fc5] font-semibold text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentBlogs.length > 0 ? (
              dashboardData.recentBlogs.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between p-4 rounded-xl border border-gray-100 hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#8750f7] transition-colors duration-300 break-words leading-tight">
                      {post.title || "Untitled"}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>
                        {Array.isArray(post.category)
                          ? post.category.join(", ")
                          : post.category || "Uncategorized"}
                      </span>
                      <span>•</span>
                      <span>Blog Post</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">
                        {formatDate(post.createdAt || post.publishDate)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status || "Published")}`}
                      >
                        {post.status || "Published"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaBlog className="mx-auto text-4xl mb-2 opacity-50" />
                <p>No blog posts found</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Portfolio */}
        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaFolderOpen className="text-[#8750f7]" />
              Recent Portfolio
            </h3>
            <button
              onClick={() => router.push("/dashboard/portfolio")}
              className="text-[#8750f7] hover:text-[#6c3fc5] font-semibold text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentPortfolios.length > 0 ? (
              dashboardData.recentPortfolios.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 rounded-xl border border-gray-100 hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#8750f7] transition-colors duration-300 break-words leading-tight">
                      {item.title || "Untitled"}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{item.projectType || "Project"}</span>
                      <span>•</span>
                      <span>
                        {item.technologies ||
                          item.techStack ||
                          "Portfolio Item"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor("Completed")}`}
                      >
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaFolderOpen className="mx-auto text-4xl mb-2 opacity-50" />
                <p>No portfolio items found</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaStickyNote className="text-[#8750f7]" />
              Recent Notes
            </h3>
            <button
              onClick={() => router.push("/dashboard/note")}
              className="text-[#8750f7] hover:text-[#6c3fc5] font-semibold text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentNotes.length > 0 ? (
              dashboardData.recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between p-4 rounded-xl border border-gray-100 hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#8750f7] transition-colors duration-300 break-words leading-tight">
                      {note.title || "Untitled"}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{note.category || "General"}</span>
                      {note.tags && note.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{note.tags.slice(0, 2).join(", ")}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">
                        {formatDate(note.createdAt)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note.isPinned ? "High" : "Medium")}`}
                      >
                        {note.isPinned ? "Pinned" : "Note"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaStickyNote className="mx-auto text-4xl mb-2 opacity-50" />
                <p>No notes found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
