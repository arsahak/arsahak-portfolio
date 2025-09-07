"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "../../../../lib/portfolioService";

const PortfolioPage = () => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getAllPortfolios();
      setPortfolios(data);
    } catch (error) {
      toast.error("Failed to fetch portfolios: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FiLoader className="text-4xl text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading portfolios...</p>
            </div>
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
                  {/* Category Badge */}
                  {portfolio.category && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        <FiTag className="text-xs" />
                        {portfolio.category}
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {portfolio.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {portfolio.description}
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
                        router.push(`/dashboard/portfolio/${portfolio._id}`)
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
