"use client";
import { useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBlog,
  FaEye,
  FaFolderOpen,
  FaPlus,
  FaStickyNote,
} from "react-icons/fa";

// Mock data for demonstration
const statsData = [
  {
    title: "Total Views",
    value: "24,567",
    change: "+12.5%",
    isIncrease: true,
    icon: <FaEye />,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Blog Posts",
    value: "48",
    change: "+3",
    isIncrease: true,
    icon: <FaBlog />,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Portfolio Items",
    value: "23",
    change: "+2",
    isIncrease: true,
    icon: <FaFolderOpen />,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Notes",
    value: "156",
    change: "-5",
    isIncrease: false,
    icon: <FaStickyNote />,
    color: "from-orange-500 to-orange-600",
  },
];

const recentBlogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    category: "Web Development",
    views: 1234,
    date: "2024-01-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Modern CSS Techniques for 2024",
    category: "Frontend",
    views: 987,
    date: "2024-01-12",
    status: "Published",
  },
  {
    id: 3,
    title: "Building Scalable React Applications",
    category: "React",
    views: 756,
    date: "2024-01-10",
    status: "Draft",
  },
  {
    id: 4,
    title: "Database Design Best Practices",
    category: "Backend",
    views: 645,
    date: "2024-01-08",
    status: "Published",
  },
  {
    id: 5,
    title: "API Security Implementation",
    category: "Security",
    views: 532,
    date: "2024-01-05",
    status: "Published",
  },
];

const recentPortfolio = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    type: "Web Application",
    technology: "React, Node.js",
    date: "2024-01-14",
    status: "Completed",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    type: "Mobile App",
    technology: "React Native",
    date: "2024-01-11",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Portfolio Website",
    type: "Website",
    technology: "Next.js, Tailwind",
    date: "2024-01-09",
    status: "Completed",
  },
  {
    id: 4,
    title: "Task Management System",
    type: "Web Application",
    technology: "Vue.js, Express",
    date: "2024-01-06",
    status: "Completed",
  },
  {
    id: 5,
    title: "Weather App",
    type: "Mobile App",
    technology: "Flutter",
    date: "2024-01-03",
    status: "Completed",
  },
];

const recentNotes = [
  {
    id: 1,
    title: "Project Ideas for Q1 2024",
    category: "Planning",
    date: "2024-01-15",
    priority: "High",
  },
  {
    id: 2,
    title: "Client Meeting Notes - Tech Corp",
    category: "Meetings",
    date: "2024-01-14",
    priority: "Medium",
  },
  {
    id: 3,
    title: "New Framework Research",
    category: "Research",
    date: "2024-01-13",
    priority: "Low",
  },
  {
    id: 4,
    title: "Bug Fixes and Improvements",
    category: "Development",
    date: "2024-01-12",
    priority: "High",
  },
  {
    id: 5,
    title: "Marketing Strategy Ideas",
    category: "Business",
    date: "2024-01-11",
    priority: "Medium",
  },
];

const chartData = [
  { month: "Jan", views: 4000, posts: 8, day: 1 },
  { month: "Feb", views: 3000, posts: 12, day: 2 },
  { month: "Mar", views: 5000, posts: 6, day: 3 },
  { month: "Apr", views: 4500, posts: 10, day: 4 },
  { month: "May", views: 6000, posts: 15, day: 5 },
  { month: "Jun", views: 7500, posts: 18, day: 6 },
];

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
  const [activeTab, setActiveTab] = useState("overview");

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#2a1454] via-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            <FaPlus /> Create New
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
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
                className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Recent Analytics Bar Chart */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8750f7]/5 via-transparent to-[#6c3fc5]/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8750f7]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-12 bg-gradient-to-b from-[#8750f7] via-[#6c3fc5] to-[#8750f7] rounded-full shadow-lg"></div>
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
                <div className="w-4 h-3 bg-gradient-to-r from-[#DAA520] to-[#FFD700] rounded-sm shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Trials
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-r from-[#2a1454] to-[#1a0d36] rounded-sm shadow-sm"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Subscribed
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Trial Stats */}
            <div className="space-y-4">
              <div className="text-gray-600 text-sm font-medium">Trial</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">500</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    10%
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly Stats */}
            <div className="space-y-4">
              <div className="text-gray-600 text-sm font-medium">Monthly</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">5</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    10%
                  </span>
                </div>
              </div>
            </div>

            {/* Yearly Stats */}
            <div className="space-y-4">
              <div className="text-gray-600 text-sm font-medium">Yearly</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">25</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    12%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-80 bg-gradient-to-br from-gray-50/30 to-white/80 rounded-2xl p-8 relative border border-gray-100/50 backdrop-blur-sm">
            <div className="relative h-full">
              {/* Chart Container */}
              <div className="flex items-end justify-center h-full space-x-12">
                {/* Bar Groups */}
                {[
                  { month: "10", trial: 85, subscribed: 75 },
                  { month: "11", trial: 0, subscribed: 0 },
                  { month: "12", trial: 85, subscribed: 75 },
                  { month: "13", trial: 0, subscribed: 0 },
                  { month: "14", trial: 85, subscribed: 75 },
                  { month: "15", trial: 0, subscribed: 0 },
                  { month: "16", trial: 0, subscribed: 0 },
                  { month: "17", trial: 0, subscribed: 0 },
                  { month: "18", trial: 0, subscribed: 0 },
                ].map((data, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    {/* Bars Container */}
                    <div className="flex items-end space-x-2 h-48 mb-4">
                      {/* Trial Bar */}
                      <div
                        className="w-8 bg-gradient-to-t from-[#DAA520] to-[#FFD700] rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 relative group/bar"
                        style={{ height: `${data.trial}%` }}
                      >
                        {data.trial > 0 && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Trial: {data.trial}%
                          </div>
                        )}
                      </div>

                      {/* Subscribed Bar */}
                      <div
                        className="w-8 bg-gradient-to-t from-[#2a1454] to-[#1a0d36] rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 relative group/bar"
                        style={{ height: `${data.subscribed}%` }}
                      >
                        {data.subscribed > 0 && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Subscribed: {data.subscribed}%
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Month Label */}
                    <div className="text-sm font-semibold text-gray-600 group-hover:text-[#8750f7] transition-colors duration-300">
                      {data.month}
                    </div>
                  </div>
                ))}
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
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaBlog className="text-[#8750f7]" />
              Recent Blog Posts
            </h3>
            <button className="text-[#8750f7] hover:text-[#6c3fc5] font-semibold text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentBlogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#8750f7] transition-colors duration-300 truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Portfolio */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaFolderOpen className="text-[#8750f7]" />
              Recent Portfolio
            </h3>
            <button className="text-[#8750f7] hover:text-[#6c3fc5] font-semibold text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPortfolio.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#8750f7] transition-colors duration-300 truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.technology}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{item.date}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaStickyNote className="text-[#8750f7]" />
              Recent Notes
            </h3>
            <button className="text-[#8750f7] hover:text-[#6c3fc5] font-semibold text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#8750f7] transition-colors duration-300 truncate">
                    {note.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{note.category}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{note.date}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note.priority)}`}
                    >
                      {note.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
