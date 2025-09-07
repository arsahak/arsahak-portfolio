"use client";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendar,
  FaDollarSign,
  FaExternalLinkAlt,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaShare,
  FaTimes,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import SafeHTML from "../../../../components/shared/SafeHTML";
import ShareToast from "../../../../components/shared/ShareToast";

const orbitron = Orbitron({ subsets: ["latin"] });

const PortfolioDetailsClient = ({ params }) => {
  const { slug } = params || {};
  const [portfolio, setPortfolio] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, img: null });

  // Social sharing functions
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = portfolio?.title || "";
  const shareDescription = portfolio?.description || "";

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we'll copy the URL to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setToastMessage(
        "URL copied to clipboard! You can now paste it in your Instagram story or post."
      );
      setShowToast(true);
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setToastMessage("URL copied to clipboard!");
      setShowToast(true);
    }
  };

  // Close mobile share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest(".share-menu-container")) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/portfolio?slug=${encodeURIComponent(slug)}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPortfolio(data);

        // fetch some related portfolios
        const allRes = await fetch(`/api/portfolio?published=true`, {
          cache: "no-store",
        });
        const all = allRes.ok ? await allRes.json() : [];
        setRelated((all || []).filter((p) => p.slug !== data.slug).slice(0, 3));
      } catch (e) {
        setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Loading Hero Section */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <div className="flex items-center text-white/80 mb-4">
                <div className="w-6 h-6 bg-gray-600 rounded animate-pulse mr-2"></div>
                <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-6 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
              </div>

              <div className="w-3/4 h-12 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Loading Content Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content Loading */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Sidebar Loading */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl p-6 border border-white/10">
                  <div className="w-32 h-6 bg-gray-600 rounded animate-pulse mb-6"></div>
                  <div className="space-y-4">
                    <div className="w-full h-10 bg-gray-600 rounded animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-600 rounded animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <FaArrowLeft className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-4xl text-white mb-4 font-bold">
              Portfolio Project Not Found
            </h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              The portfolio project you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

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

  const getProjectDuration = () => {
    if (
      portfolio.projectDuration?.startDate &&
      portfolio.projectDuration?.endDate
    ) {
      return `${formatDate(portfolio.projectDuration.startDate)} - ${formatDate(portfolio.projectDuration.endDate)}`;
    }
    return "Not specified";
  };

  const getGalleryImages = () => {
    if (portfolio.images && portfolio.images.length > 0) {
      return portfolio.images.map((img) => img.url);
    }
    // Fallback to feature image if no gallery images
    if (portfolio.featureImage) {
      return [portfolio.featureImage];
    }
    return ["/assets/portfolio-item/epharma-web.png"];
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={
            portfolio.featureImage || "/assets/portfolio-item/epharma-web.png"
          }
          alt={portfolio.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Portfolio
            </Link>

            <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
              <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs">
                {portfolio.category || "Project"}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendar className="w-4 h-4" />
                {getProjectDuration()}
              </span>
              <span className="flex items-center gap-1">
                <FaDollarSign className="w-4 h-4" />
                {formatBudget(portfolio.projectBudget)}
              </span>
              {portfolio.clientName && (
                <span className="flex items-center gap-1">
                  <FaUser className="w-4 h-4" />
                  {portfolio.clientName}
                </span>
              )}
            </div>

            <h1
              className={`text-3xl md:text-5xl text-white font-bold leading-tight ${orbitron.className}`}
            >
              {portfolio.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  About this project
                </h2>
                <div className="blog-content mb-8">
                  <SafeHTML content={portfolio.description || ""} />
                </div>

                {portfolio.content && (
                  <div className="blog-content mb-8">
                    <SafeHTML content={portfolio.content} />
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-6">
                  Project Related Images
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {getGalleryImages().map((img, idx) => (
                    <button
                      key={idx}
                      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group focus:outline-none border border-white/10 shadow-lg hover:shadow-2xl transition"
                      onClick={() => setLightbox({ open: true, img })}
                      aria-label="View full image"
                    >
                      <Image
                        src={img}
                        alt={portfolio.title + " image " + (idx + 1)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={idx === 0}
                      />
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                        Click to enlarge
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-32"
              >
                <div className="bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl p-6 border border-white/10 h-fit">
                  {/* Project Links */}
                  <div className="mb-8">
                    <h3
                      className={`text-2xl font-bold text-white mb-6 ${orbitron.className}`}
                    >
                      Project Links
                    </h3>
                    <div className="space-y-3">
                      {/* Live Project Link - Always show if available */}
                      {portfolio.liveUrl && portfolio.liveUrl.trim() !== "" && (
                        <Link
                          href={portfolio.liveUrl}
                          target="_blank"
                          className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors w-full justify-center"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                          Live Project
                        </Link>
                      )}

                      {/* GitHub Repo Link - Only show if provided and not empty */}
                      {portfolio.githubUrl &&
                        portfolio.githubUrl.trim() !== "" && (
                          <Link
                            href={portfolio.githubUrl}
                            target="_blank"
                            className="flex items-center gap-2 bg-black border border-white/20 text-white px-4 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors w-full justify-center"
                          >
                            <FaGithub className="w-4 h-4" />
                            GitHub Repo
                          </Link>
                        )}

                      {/* Client Website Link - Only show if provided and not empty */}
                      {portfolio.clientWebsite &&
                        portfolio.clientWebsite.trim() !== "" && (
                          <Link
                            href={portfolio.clientWebsite}
                            target="_blank"
                            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors w-full justify-center"
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                            Client Website
                          </Link>
                        )}

                      {/* Show message if no links available */}
                      {(!portfolio.liveUrl ||
                        portfolio.liveUrl.trim() === "") &&
                        (!portfolio.githubUrl ||
                          portfolio.githubUrl.trim() === "") &&
                        (!portfolio.clientWebsite ||
                          portfolio.clientWebsite.trim() === "") && (
                          <div className="text-center py-4">
                            <p className="text-gray-400 text-sm">
                              No project links available
                            </p>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Technologies */}
                  {portfolio.technologies &&
                    portfolio.technologies.length > 0 && (
                      <div className="mb-8">
                        <h3
                          className={`text-xl font-bold text-white mb-4 ${orbitron.className}`}
                        >
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {portfolio.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Related Projects */}
                  {related.length > 0 && (
                    <div className="mb-8">
                      <h3
                        className={`text-xl font-bold text-white mb-4 ${orbitron.className}`}
                      >
                        Related Projects
                      </h3>
                      <div className="space-y-4">
                        {related.map((relatedPortfolio) => (
                          <Link
                            key={relatedPortfolio._id || relatedPortfolio.slug}
                            href={`/portfolio/${relatedPortfolio.slug}`}
                            className="block group"
                          >
                            <div className="flex gap-3">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={
                                    relatedPortfolio.featureImage ||
                                    "/assets/portfolio-item/epharma-web.png"
                                  }
                                  alt={relatedPortfolio.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                  {relatedPortfolio.title}
                                </h4>
                                <p className="text-gray-400 text-xs mt-1">
                                  {relatedPortfolio.category}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Sharing Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h3
                      className={`text-xl font-bold text-white mb-4 ${orbitron.className}`}
                    >
                      Share this project
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={shareToFacebook}
                        className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        title="Share on Facebook"
                      >
                        <FaFacebook className="w-4 h-4" />
                        <span className="text-sm">Facebook</span>
                      </button>

                      <button
                        onClick={shareToTwitter}
                        className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        title="Share on Twitter"
                      >
                        <FaTwitter className="w-4 h-4" />
                        <span className="text-sm">Twitter</span>
                      </button>

                      <button
                        onClick={shareToLinkedIn}
                        className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#006BA1] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        title="Share on LinkedIn"
                      >
                        <FaLinkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                      </button>

                      <button
                        onClick={shareToInstagram}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#E4405F] to-[#C13584] hover:from-[#D6336C] hover:to-[#B02A5B] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        title="Copy link for Instagram"
                      >
                        <FaInstagram className="w-4 h-4" />
                        <span className="text-sm">Instagram</span>
                      </button>

                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        title="Copy link"
                      >
                        <FaShare className="w-4 h-4" />
                        <span className="text-sm">Copy Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Share Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <div className="relative share-menu-container">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            title="Share this project"
          >
            <FaShare className="w-5 h-5" />
          </button>

          {showShareMenu && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 min-w-[200px]">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    shareToFacebook();
                    setShowShareMenu(false);
                  }}
                  className="w-full flex items-center gap-3 text-left p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="text-gray-800">Facebook</span>
                </button>

                <button
                  onClick={() => {
                    shareToTwitter();
                    setShowShareMenu(false);
                  }}
                  className="w-full flex items-center gap-3 text-left p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <FaTwitter className="w-5 h-5 text-[#1DA1F2]" />
                  <span className="text-gray-800">Twitter</span>
                </button>

                <button
                  onClick={() => {
                    shareToLinkedIn();
                    setShowShareMenu(false);
                  }}
                  className="w-full flex items-center gap-3 text-left p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <FaLinkedin className="w-5 h-5 text-[#0077B5]" />
                  <span className="text-gray-800">LinkedIn</span>
                </button>

                <button
                  onClick={() => {
                    shareToInstagram();
                    setShowShareMenu(false);
                  }}
                  className="w-full flex items-center gap-3 text-left p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <FaInstagram className="w-5 h-5 text-[#E4405F]" />
                  <span className="text-gray-800">Instagram</span>
                </button>

                <button
                  onClick={() => {
                    copyToClipboard();
                    setShowShareMenu(false);
                  }}
                  className="w-full flex items-center gap-3 text-left p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <FaShare className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">Copy Link</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightbox({ open: false, img: null })}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl z-50 hover:text-primary"
            onClick={() => setLightbox({ open: false, img: null })}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div className="relative w-[90vw] max-w-md md:w-[50vw] md:max-w-2xl aspect-[4/3]">
            <Image
              src={lightbox.img}
              alt="Full size project image"
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ShareToast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default PortfolioDetailsClient;
