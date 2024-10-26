"use client";
import React from "react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import { motion, useInView } from "framer-motion";

import { TbScanEye } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
import { PiFrameCornersThin } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { PiUserFocus } from "react-icons/pi";
import { TiFlowMerge } from "react-icons/ti";

import { SiMaterialdesignicons } from "react-icons/si";
import { RiGuideLine } from "react-icons/ri";

import { CgWebsite } from "react-icons/cg";
import { TbApi } from "react-icons/tb";
import { LuDatabase } from "react-icons/lu";
import { LuCloudCog } from "react-icons/lu";
import { MdOutlineAppShortcut } from "react-icons/md";

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
              <div
                className={`rounded-lg w-full h-[415px] p-6 flex flex-col bg-gradient-to-br bg-[#181818] mt-[-1px]`}
              >
                <div className="flex items-center rounded-full">
                  <Image
                    src="/assets/home/Component 20.png"
                    alt="AR Sahak"
                    width={250}
                    height={250}
                    className="w-[200px] h-auto rounded-full"
                    priority
                  />
                </div>

                <div className="mt-auto">
                  <p className="py-3 text-white">Let's Contact</p>
                  <div className="flex items-center justify-between text-white">
                    <h2
                      className={`text-[22px] font-semibold text-primary ${orbitron.className}`}
                    >
                      arsahakbd@gmail.com
                    </h2>
                  </div>
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
