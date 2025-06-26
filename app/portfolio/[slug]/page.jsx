"use client";
import { Orbitron } from "next/font/google";
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
    technologies: ["React Native", "Node.js", "MongoDB", "Express.js"],
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
    technologies: ["Next.js", "Tailwind CSS", "MongoDB"],
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
    technologies: ["React", "Socket.io", "Node.js"],
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
    technologies: ["Flutter", "Firebase"],
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
    technologies: ["React Native", "Redux", "Express.js"],
    description:
      "A mobile app for ePharma with prescription uploads and order tracking.",
    liveLink: "https://epharma.com/app",
    githubLink: "https://github.com/arsahak/epharma-app",
  },
];

const orbitron = Orbitron({ subsets: ["latin"] });

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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={project.gallery[0]}
          alt={project.title}
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
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Portfolio
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-4">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {project.timeline}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 12v4m8-8h-4m-8 0H4"
                  />
                </svg>
                {project.budget}
              </span>
            </div>
            <h1
              className={`text-3xl md:text-5xl text-white font-bold leading-tight ${orbitron.className}`}
            >
              {project.title}
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
              <h2 className="text-2xl font-bold text-white mb-6">
                About this project
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group focus:outline-none border border-white/10 shadow-lg hover:shadow-2xl transition"
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
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 bg-gradient-to-br from-[#181818] to-[#1a1a1a] rounded-2xl p-6 border border-white/10 h-fit flex flex-col gap-4 items-center md:items-start">
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
                <div className="mt-4 w-full">
                  <h3 className="text-white font-semibold mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies &&
                      project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                  {project.credentials && (
                    <div className="mt-4">
                      <h3 className="text-white font-semibold mb-2">
                        Project Credentials
                      </h3>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {Object.entries(project.credentials).map(
                          ([key, value]) => (
                            <li key={key}>
                              <span className="font-semibold text-white capitalize">
                                {key}:
                              </span>{" "}
                              {value}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default PortfolioDetailsPage;
