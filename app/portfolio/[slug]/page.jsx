"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";

// Portfolio data (should match your main portfolio data)
const portfolioInfo = [
  {
    id: 1,
    cardImage: "/assets/portfolio-item/swop-app.png",
    fullImage: "/assets/portfolio-item/swop-app-full.jpg",
    title: "Swop App",
    slug: "swop-app",
    gallery: [
      "/assets/portfolio-item/swop-app.png",
      "/assets/portfolio-item/swop-app-full.jpg",
    ],
    timeline: "Jan 2023 - May 2023",
    budget: "$12,000",
    description:
      "A modern app for swapping goods and services with a seamless user experience.",
    liveLink: "https://swopapp.com",
    githubLink: "https://github.com/arsahak/swop-app",
  },
  {
    id: 2,
    cardImage: "/assets/portfolio-item/epharma-web.png",
    fullImage: "/assets/portfolio-item/epharma-web-full.jpg",
    title: "ePharma Web",
    slug: "epharma-web",
    gallery: [
      "/assets/portfolio-item/epharma-web.png",
      "/assets/portfolio-item/epharma-web-full.jpg",
    ],
    timeline: "Mar 2022 - Aug 2022",
    budget: "$8,500",
    description:
      "A comprehensive online pharmacy platform with e-commerce and prescription management.",
    liveLink: "https://epharma.com",
    githubLink: "https://github.com/arsahak/epharma-web",
  },
  {
    id: 3,
    cardImage: "/assets/portfolio-item/nazara-web.png",
    fullImage: "/assets/portfolio-item/nazara-web-full.jpg",
    title: "Nazara",
    slug: "nazara",
    gallery: [
      "/assets/portfolio-item/nazara-web.png",
      "/assets/portfolio-item/nazara-web-full.jpg",
    ],
    timeline: "Jul 2021 - Dec 2021",
    budget: "$6,000",
    description:
      "A gaming platform with real-time multiplayer features and leaderboards.",
    liveLink: "https://nazara.com",
    githubLink: "https://github.com/arsahak/nazara",
  },
  {
    id: 4,
    cardImage: "/assets/portfolio-item/butterfly-app.png",
    fullImage: "/assets/portfolio-item/butterfly-app-full.jpg",
    title: "Butterfly App",
    slug: "butterfly-app",
    gallery: [
      "/assets/portfolio-item/butterfly-app.png",
      "/assets/portfolio-item/butterfly-app-full.jpg",
    ],
    timeline: "Feb 2021 - Jun 2021",
    budget: "$7,200",
    description: "A productivity app for task management and collaboration.",
    liveLink: "https://butterflyapp.com",
    githubLink: "https://github.com/arsahak/butterfly-app",
  },
  {
    id: 5,
    cardImage: "/assets/portfolio-item/epharma-app.png",
    fullImage: "/assets/portfolio-item/epharma-app-full.jpg",
    title: "ePharma App",
    slug: "epharma-app",
    gallery: [
      "/assets/portfolio-item/epharma-app.png",
      "/assets/portfolio-item/epharma-app-full.jpg",
    ],
    timeline: "Sep 2022 - Jan 2023",
    budget: "$9,000",
    description:
      "A mobile app for ePharma with prescription uploads and order tracking.",
    liveLink: "https://epharma.com/app",
    githubLink: "https://github.com/arsahak/epharma-app",
  },
];

const PortfolioDetailsPage = ({ params }) => {
  const project = portfolioInfo.find((item) => item.slug === params.slug);
  const [lightbox, setLightbox] = useState({ open: false, img: null });

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl text-white mb-4">Project Not Found</h1>
        <Link href="/portfolio" className="text-primary hover:underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
          {project.title}
        </h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {project.gallery.map((img, idx) => (
            <button
              key={idx}
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group focus:outline-none"
              onClick={() => setLightbox({ open: true, img })}
              aria-label="View full image"
            >
              <Image
                src={img}
                alt={project.title + " image " + (idx + 1)}
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
            <div className="relative w-[90vw] max-w-3xl aspect-[4/3]">
              <Image
                src={lightbox.img}
                alt="Full size project image"
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-10">
          <div>
            <h2 className="text-lg text-white font-semibold mb-2">Timeline</h2>
            <p className="text-gray-300 mb-4">{project.timeline}</p>
            <h2 className="text-lg text-white font-semibold mb-2">Budget</h2>
            <p className="text-gray-300 mb-4">{project.budget}</p>
            <h2 className="text-lg text-white font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-300 mb-4">{project.description}</p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center md:items-start">
            {project.liveLink && (
              <Link
                href={project.liveLink}
                target="_blank"
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors w-full justify-center md:justify-start"
              >
                <FaExternalLinkAlt /> Live Project
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                className="flex items-center gap-2 bg-black border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors w-full justify-center md:justify-start"
              >
                <FaGithub /> GitHub Repo
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailsPage;
