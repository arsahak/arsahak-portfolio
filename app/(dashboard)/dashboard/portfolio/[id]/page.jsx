"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiEdit,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiLoader,
  FiTag,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";
import SafeHTML from "../../../../../components/shared/SafeHTML";
import {
  deletePortfolio,
  getPortfolioById,
} from "../../../../../lib/portfolioService";

const ViewPortfolioPage = () => {
  const router = useRouter();
  const params = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPortfolioData();
    }
  }, [params.id, fetchPortfolioData]);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioById(params.id);
      setPortfolio(data);
    } catch (error) {
      toast.error("Failed to fetch portfolio: " + error.message);
      router.push("/dashboard/portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    try {
      setDeleting(true);
      await deletePortfolio(params.id);
      toast.success("Portfolio deleted successfully!");
      router.push("/dashboard/portfolio");
    } catch (error) {
      toast.error("Failed to delete portfolio: " + error.message);
    } finally {
      setDeleting(false);
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
            <div className="flex gap-2">
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-32"></div>
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-32"></div>
            </div>
          </div>

          {/* Portfolio Content Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden animate-pulse">
            {/* Featured Image Skeleton */}
            <div className="h-64 bg-gray-200"></div>

            <div className="p-8">
              {/* Title and Category Skeleton */}
              <div className="mb-6">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              </div>

              {/* Project Details Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Technologies Skeleton */}
              <div className="mb-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-18"></div>
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full mx-auto">
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Portfolio not found
            </h3>
            <p className="text-gray-600 mb-6">
              The portfolio item you&apos;re looking for doesn&apos;t exist
            </p>
            <button
              onClick={() => router.push("/dashboard/portfolio")}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                {portfolio.title}
              </h1>
              <p className="text-gray-600 mt-1">Portfolio Project Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                router.push(`/dashboard/portfolio/${params.id}/edit`)
              }
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium"
            >
              <FiEdit className="text-lg" />
              Edit Project
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-medium disabled:opacity-50"
            >
              {deleting ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <FiTrash2 className="text-lg" />
              )}
              {deleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Image */}
            {portfolio.featureImage && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                <img
                  src={portfolio.featureImage}
                  alt={portfolio.title}
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            )}

            {/* Category */}
            {portfolio.category && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                <div className="flex items-center gap-3">
                  <FiTag className="text-purple-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Project Category</p>
                    <p className="font-medium text-gray-900">
                      {portfolio.category}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Project Description
              </h2>
              <div className="text-gray-700 leading-relaxed prose prose-purple max-w-none">
                <SafeHTML content={portfolio.description} />
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Project Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-purple-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Project Duration</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(portfolio.projectDuration?.startDate)} -{" "}
                        {formatDate(portfolio.projectDuration?.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiDollarSign className="text-purple-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Project Budget</p>
                      <p className="font-medium text-gray-900">
                        {formatBudget(portfolio.projectBudget)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {portfolio.liveProject && (
                    <div className="flex items-center gap-3">
                      <FiGlobe className="text-purple-500 text-xl" />
                      <div>
                        <p className="text-sm text-gray-500">Live Project</p>
                        <a
                          href={portfolio.liveProject}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 flex items-center gap-1"
                        >
                          Visit Project
                          <FiExternalLink className="text-sm" />
                        </a>
                      </div>
                    </div>
                  )}

                  {portfolio.gitRepo && (
                    <div className="flex items-center gap-3">
                      <FiGithub className="text-purple-500 text-xl" />
                      <div>
                        <p className="text-sm text-gray-500">Git Repository</p>
                        <a
                          href={portfolio.gitRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 flex items-center gap-1"
                        >
                          View Code
                          <FiExternalLink className="text-sm" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Technologies */}
            {portfolio.technologies && portfolio.technologies.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {portfolio.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Images */}
            {portfolio.galleryImage && portfolio.galleryImage.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolio.galleryImage.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Summary
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium text-gray-900">
                    {new Date(portfolio.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {portfolio.updatedAt && (
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {new Date(portfolio.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">
                    {portfolio.category || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Technologies</p>
                  <p className="font-medium text-gray-900">
                    {portfolio.technologies ? portfolio.technologies.length : 0}{" "}
                    technologies
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gallery Images</p>
                  <p className="font-medium text-gray-900">
                    {portfolio.galleryImage ? portfolio.galleryImage.length : 0}{" "}
                    images
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    router.push(`/dashboard/portfolio/${params.id}/edit`)
                  }
                  className="w-full px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <FiEdit className="text-lg" />
                  Edit Project
                </button>

                {portfolio.liveProject && (
                  <a
                    href={portfolio.liveProject}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <FiGlobe className="text-lg" />
                    View Live Project
                  </a>
                )}

                {portfolio.gitRepo && (
                  <a
                    href={portfolio.gitRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <FiGithub className="text-lg" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPortfolioPage;
