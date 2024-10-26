"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";

import Image from "next/image";
import Link from "next/link";
import { FaBehance, FaDribbble, FaFigma } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaStackOverflow } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { VscGithub } from "react-icons/vsc";

import CountUp from "../shared/CountUp";

const orbitron = Orbitron({ subsets: ["latin"] });

const HeroSection = () => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const text = "AR Sahak".split(" ");

  return (
    <div className="pt-28 md:pt-44 pb-14 md:pb-32">
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row items-center justify-center">
            <div className="w-full md:w-[50%]">
              <motion.h2
                variants={variants}
                className="flex items-center justify-center md:justify-start text-xl md:text-3xl font-black text-white text-center md:text-left"
              >
                <hr className="w-8 h-[2px] bg-black my-2 mr-2" />
                Hello, I’m 👋
              </motion.h2>
              <h1
                className={`mt-4 md:mt-10 text-[50px] md:text-[99px] font-extrabold text-white text-center md:text-left leading-tight tracking-normal ${orbitron.className}`}
              >
                {text.map((word, index) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: index / 10 }}
                    key={index}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                variants={variants}
                className="mt-5 text-md md:text-3xl font-semibold text-center md:text-left text-white"
              >
                A Passionate <span className="text-primary">Full Stack</span>{" "}
                Developer
              </motion.p>

              <motion.div
                variants={variants}
                className="flex justify-center md:justify-start mt-8"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-[60px] w-36 md:w-48 mb-2 md:mb-0 text-sm md:text-lg font-medium text-white uppercase bg-black border border-black rounded-md hover:bg-primary md:px-8 me-3 md:me-6"
                >
                  Let’s Talk
                  <span className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/portfolio"
                  className="flex items-center justify-center h-[54px] md:h-[56px] w-36 md:w-48 mb-2 md:mb-0 text-sm md:text-lg font-medium text-white bg-black rounded-md hover:bg-gradient-to-r from-[#8750f7] to-[#2a1454]"
                >
                  My Work
                  <span className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
              <motion.div
                variants={variants}
                className="flex items-center justify-center md:justify-start mt-6 md:mt-16 text-md md:text-3xl text-white"
              >
                <div
                  className={`text-3xl font-semibold w-20 ${orbitron.className}`}
                >
                  <CountUp start={1} end={120} duration={5} />
                </div>
                <p className="text-lg text-[#dbdbdb] ml-2">Worldwide Client</p>
                <p className="text-lg text-[#dbdbdb] mx-2">|</p>
                <div className="flex items-center gap-2">
                  <Link href="https://github.com/arsahak" target="_blank">
                    <VscGithub className="text-[#dbdbdb] size-5 cursor-pointer hover:text-primary" />
                  </Link>
                  <Link
                    href="https://stackoverflow.com/users/15496362/ar-sahak"
                    target="_blank"
                  >
                    <FaStackOverflow className="text-[#dbdbdb] size-6 cursor-pointer hover:text-primary" />
                  </Link>
                  <Link href="https://leetcode.com/u/arsahak/" target="_blank">
                    <SiLeetcode className="text-[#dbdbdb] size-5 cursor-pointer hover:text-primary" />
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="hidden md:block w-full md:w-[50%]">
              <div className=" flex items-center justify-center relative">
                <div className="gradient-circle absolute mt-36">
                  <Image
                    width={1000}
                    height={1050}
                    src="/assets/home/Component 19.png"
                    alt="AR Sahak"
                    className="w-[400px] h-auto mx-auto absolute inset-0 top-[18%] left-0 right-0"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(HeroSection);
