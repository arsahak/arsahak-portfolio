"use client";
import { motion, useInView } from "framer-motion";
import { Orbitron } from "next/font/google";
import React from "react";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

import { MdOutlineDesignServices } from "react-icons/md";

import { CgWebsite } from "react-icons/cg";
import { FiCopy, FiMail } from "react-icons/fi";
import { LuCloudCog, LuDatabase } from "react-icons/lu";
import { SiOpenai } from "react-icons/si";
import { TbApi } from "react-icons/tb";

const orbitron = Orbitron({ subsets: ["latin"] });

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const specialties = [
  {
    icon: <CgWebsite className="text-black size-10" />,
    title: "Full Stack Development",
    description:
      "Building scalable web apps using React.js, Next.js, Node.js & FastAPI",
  },
  {
    icon: <TbApi className="text-black size-12" />,
    title: "API Design & Integration",
    description:
      "Designing RESTful & GraphQL APIs with robust security and performance",
  },
  {
    icon: <LuDatabase className="text-black size-10" />,
    title: "Database Architecture",
    description: "Expert in MongoDB, PostgreSQL, Prisma, and Vector Databases",
  },
  {
    icon: <SiOpenai className="text-black size-10" />,
    title: "AI Chatbot & RAG Systems",
    description:
      "Developing intelligent assistants using LangChain, OpenAI, and Pinecone",
  },
  {
    icon: <LuCloudCog className="text-black size-10" />,
    title: "Cloud & DevOps",
    description:
      "Deploying and scaling apps using AWS, Docker & CI/CD pipelines",
  },
  {
    icon: <MdOutlineDesignServices className="text-black size-10" />,
    title: "System Design & Optimization",
    description:
      "Architecting secure, high-performance, and maintainable systems",
  },
];

const MySpecialties = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [copied, setCopied] = React.useState(false);
  const email = "arsahakbd@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <section className="">
      <div className="container py-8 md:py-14">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[35%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Specialties
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-[100%] md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                {`Combining cutting-edge AI technologies like RAG models, LangChain, and Pinecone with modern web development to build intelligent, production-ready applications that transform businesses.`}
              </p>
            </ScrollMotionEffect>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-20 md:justify-between gap-x-4 md:items-start md:flex-row">
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-[100%] md:w-[70%] grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {specialties.map((el, index) => (
              <motion.div
                className={`bg-[#181818] rounded-lg w-full h-[220px] md:h-[235px] p-5 md:p-6 flex flex-col hover:scale-105 transition-transform duration-300 ${index === 2 ? "primary-gradient" : ""}`}
                key={index}
                variants={item}
              >
                <div className="flex items-center justify-center p-3 bg-white rounded-full w-12 h-12 md:w-14 md:h-14 mb-3">
                  {el?.icon}
                </div>

                <div className="mt-auto">
                  <h2
                    className={`text-[15px] md:text-[17px] font-bold text-white mb-2 leading-tight ${orbitron.className}`}
                  >
                    {el.title}
                  </h2>
                  <p className="text-[11px] md:text-[13px] text-gray-300 leading-relaxed">
                    {el.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="w-[100%] md:w-[30%] mt-6 md:mt-0">
            <ScrollMotionEffect effect="fade-up" duration="2000">
              <div className="rounded-2xl w-full h-[456px] md:h-[486px] p-6 flex flex-col items-center justify-center bg-white/10 border border-white/20 shadow-2xl backdrop-blur-lg relative overflow-hidden">
                {/* Glowing icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-br from-primary to-[#8750f7] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg animate-pulse-slow">
                    <FiMail
                      className="text-white text-3xl md:text-4xl drop-shadow-lg"
                      aria-label="Contact"
                    />
                  </div>
                </div>
                {/* Heading */}
                <h3
                  className={`text-xl md:text-2xl font-extrabold text-white mb-3 ${orbitron.className}`}
                >
                  Let&apos;s Connect
                </h3>
                {/* Subtitle */}
                <p className="text-sm md:text-base text-white/80 mb-6 text-center px-2">
                  Available for freelance work & collaboration opportunities
                </p>
                {/* Email with copy button */}
                <div className="flex items-center bg-white/20 border border-white/30 rounded-full px-4 py-2.5 mb-2 w-full max-w-[280px] mx-auto shadow-lg">
                  <span className="text-white text-sm md:text-base select-all flex-1 truncate">
                    {email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-1.5 rounded-full hover:bg-primary/30 transition-all duration-300"
                    title="Copy Email"
                    type="button"
                  >
                    <FiCopy
                      className={`text-white text-base md:text-lg transition-colors ${copied ? "text-primary" : ""}`}
                    />
                  </button>
                </div>
                {copied && (
                  <span className="text-primary text-sm font-semibold mt-2 animate-pulse">
                    ✓ Copied to clipboard!
                  </span>
                )}
                {/* Availability Badge */}
                <div className="mt-6 flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-xs md:text-sm font-medium">
                    Available for Projects
                  </span>
                </div>
              </div>
            </ScrollMotionEffect>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySpecialties;
