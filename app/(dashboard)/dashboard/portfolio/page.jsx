"use client";
import { GrPin } from "react-icons/gr";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiEdit,
  FiEye,
  FiLoader,
  FiPlus,
  FiTag,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  deletePortfolio,
  getAllPortfolios,
  invalidatePortfolioCache,
} from "../../../../lib/portfolioService";

const PortfolioPage = () => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [pinningId, setPinningId] = useState(null);

  const fetchPortfolios = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      const data = await getAllPortfolios(true, forceRefresh);
      console.log("Fetched portfolios:", data);
      setPortfolios(data);
    } catch (error) {
      toast.error("Failed to fetch portfolios: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deletePortfolio(id);
      toast.success("Portfolio deleted successfully!");
      fetchPortfolios();
    } catch (error) {
      toast.error("Failed to delete portfolio: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePinToggle = async (id, currentPinned) => {
    try {
      setPinningId(id);
      const response = await fetch("/api/portfolio/pin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          pinned: !currentPinned,
        }),
      });

      if (response.ok) {
        toast.success(
          `Portfolio ${!currentPinned ? "pinned" : "unpinned"} successfully!`
        );
        // Force refresh with cache invalidation
        invalidatePortfolioCache();
        fetchPortfolios(true);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update pin status");
      }
    } catch (error) {
      toast.error("Failed to update pin status: " + error.message);
    } finally {
      setPinningId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatBudget = (budget) => {
    if (!budget || budget === 0) return "Not specified";
    return `$${budget.toLocaleString()}`;
  };

  const generateSlug = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-80"></div>
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-32"></div>
          </div>

          {/* Portfolio Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden animate-pulse"
              >
                {/* Featured Image Skeleton */}
                <div className="h-48 bg-gray-200"></div>

                {/* Content Skeleton */}
                <div className="p-6">
                  {/* Category Badge Skeleton */}
                  <div className="mb-3">
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                  </div>

                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

                  {/* Description Skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>

                  {/* Project Details Skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>

                  {/* Technologies Skeleton */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                  </div>

                  {/* Action Buttons Skeleton */}
                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log("cehck", portfolios);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Portfolio Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/portfolio/create")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-sm"
          >
            <FiPlus className="text-lg" />
            Add New Portfolio
          </button>
        </div>

        {/* Portfolio Grid */}
        {portfolios.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiPlus className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No portfolio items yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your portfolio by adding your first project
            </p>
            <button
              onClick={() => router.push("/dashboard/portfolio/create")}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Create Your First Portfolio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio._id}
                className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Featured Image */}
                {portfolio.featureImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={portfolio.featureImage}
                      alt={portfolio.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge and Pin Status */}
                  <div className="mb-3 flex items-center gap-2">
                    {portfolio.category && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        <FiTag className="text-xs" />
                        {portfolio.category}
                      </span>
                    )}
                    {portfolio.pinned && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        <GrPin className="text-xs fill-current" />
                        Pinned
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {portfolio.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {portfolio.description
                      ?.replace(/<[^>]*>/g, "")
                      .replace(/&nbsp;/g, " ")
                      .trim() || "No description available"}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiCalendar className="text-purple-500" />
                      <span>
                        {formatDate(portfolio.projectDuration?.startDate)} -{" "}
                        {formatDate(portfolio.projectDuration?.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiDollarSign className="text-purple-500" />
                      <span>{formatBudget(portfolio.projectBudget)}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  {portfolio.technologies &&
                    portfolio.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {portfolio.technologies
                          .slice(0, 3)
                          .map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        {portfolio.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{portfolio.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/portfolio/${portfolio.slug || generateSlug(portfolio.title)}`
                        )
                      }
                      className="flex-1 px-3 py-2 text-sm border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiEye className="text-sm" />
                      View
                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/portfolio/${portfolio._id}/edit`
                        )
                      }
                      className="flex-1 px-3 py-2 text-sm border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiEdit className="text-sm" />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handlePinToggle(portfolio._id, portfolio.pinned)
                      }
                      disabled={pinningId === portfolio._id}
                      className={`px-3 py-2 text-sm border rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 disabled:opacity-50 ${
                        portfolio.pinned
                          ? "border-orange-400 bg-orange-400 text-white hover:bg-orange-500"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                      title={
                        portfolio.pinned
                          ? "Unpin from home page"
                          : "Pin to home page"
                      }
                    >
                      {pinningId === portfolio._id ? (
                        <FiLoader className="text-sm animate-spin" />
                      ) : (
                        <GrPin
                          className={`text-sm ${portfolio.pinned ? "fill-current" : ""}`}
                        />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(portfolio._id)}
                      disabled={deletingId === portfolio._id}
                      className="px-3 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      {deletingId === portfolio._id ? (
                        <FiLoader className="text-sm animate-spin" />
                      ) : (
                        <FiTrash2 className="text-sm" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
