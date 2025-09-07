"use client";
import { motion, useInView } from "framer-motion";
import { Orbitron } from "next/font/google";
import React from "react";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

import { MdOutlineDesignServices } from "react-icons/md";

import { CgWebsite } from "react-icons/cg";
import { FiCopy, FiMail } from "react-icons/fi";
import { LuCloudCog, LuDatabase } from "react-icons/lu";
import { MdOutlineAppShortcut } from "react-icons/md";
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
    title: "Web App Development",
  },
  {
    icon: <TbApi className="text-black size-12" />,
    title: "API Design & Development",
  },
  {
    icon: <LuDatabase className="text-black size-10" />,
    title: "Database Management",
  },
  {
    icon: <LuCloudCog className="text-black size-16" />,
    title: "Cloud & Server Management",
  },
  {
    icon: <MdOutlineDesignServices className="text-black size-10" />,
    title: "UI/UX Design & Development",
  },
  {
    icon: <MdOutlineAppShortcut className="text-black size-10" />,
    title: "Mobile App Development:",
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
                {`Crafting intuitive interfaces, combining creativity with
                data-driven insights, and excelling in wireframing, prototyping,
                and user research.`}
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
                className={`bg-[#181818] rounded-lg w-full h-[200px] p-6 flex flex-col item ${index === 2 ? "primary-gradient" : ""}`}
                key={index}
                variants={item}
              >
                <div className="flex items-center justify-center p-4 bg-white rounded-full w-14 h-14">
                  {el?.icon}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-white">
                    <h2
                      className={`text-[15px] md:text-[20px] font-semibold ${orbitron.className}`}
                    >
                      {el.title}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="w-[100%] md:w-[30%] mt-6 md:mt-0">
            <ScrollMotionEffect effect="fade-up" duration="2000">
              <div className="rounded-2xl w-full h-[415px] p-6 flex flex-col items-center justify-center bg-white/10 border border-white/20 shadow-2xl backdrop-blur-lg relative overflow-hidden">
                {/* Glowing icon */}
                <div className="flex items-center justify-center mb-4 mt-2">
                  <div className="bg-gradient-to-br from-primary to-[#8750f7] rounded-full w-20 h-20 flex items-center justify-center shadow-lg animate-pulse-slow">
                    <FiMail
                      className="text-white text-4xl drop-shadow-lg"
                      aria-label="Contact"
                    />
                  </div>
                </div>
                {/* Heading */}
                <h3
                  className={`text-2xl font-extrabold text-white mb-2 ${orbitron.className}`}
                >
                  Let&apos;s Contact
                </h3>
                {/* Subtitle */}
                <p className="text-sm text-white/80 mb-4 text-center">
                  Available for freelance & collaboration
                </p>
                {/* Email with copy button */}
                <div className="flex items-center bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-2 w-full max-w-[260px] mx-auto">
                  <span className="text-white text-base select-all flex-1">
                    {email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-1 rounded-full hover:bg-primary/30 transition"
                    title="Copy Email"
                    type="button"
                  >
                    <FiCopy
                      className={`text-white text-lg ${copied ? "text-primary" : ""}`}
                    />
                  </button>
                </div>
                {copied && (
                  <span className="text-primary text-xs mt-1">Copied!</span>
                )}
              </div>
            </ScrollMotionEffect>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySpecialties;
