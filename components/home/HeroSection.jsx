"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";

import Image from "next/image";
import Link from "next/link";
import { FaBehance, FaDribbble, FaFigma } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaStackOverflow } from "react-icons/fa";
import CountUp from "../shared/CountUp";

const orbitron = Orbitron({ subsets: ["latin"] });

const HeroSection = () => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const text = "AR Sahak".split(" ");

  return (
    <div className="bg-gradient-to-b from-[#b2a397] to-black pt-28 md:pt-44 md:pb-32 pb-14">
      <motion.div
        className=""
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <div className="container">
          <div className="flex flex-col-reverse items-center justify-center md:flex-row">
            <div className="w-full md:w-[55%]">
              <motion.h2
                variants={variants}
                className="flex items-center justify-center text-xl font-black text-center text-black md:justify-start md:text-3xl md:text-left"
              >
                <span>
                  <hr className="h-[2px] my-2 bg-black border-0 w-8" />
                </span>
                Hello, I’m 👋
              </motion.h2>
              <h1
                className={`mt-4 md:mt-10 text-[50px] md:text-[99px] font-[800] text-white text-center md:text-left leading-tight tracking-normal ${orbitron.className}`}
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
                className="mt-5 font-semibold text-center text-white md:text-left text-md md:text-3xl"
              >
                A Passionate <span className="text-primary"> Full Stack</span>{" "}
                Developer
              </motion.p>

              <motion.div
                variants={variants}
                className="flex justify-center mt-8 md:justify-start"
              >
                <Link
                  className="flex items-center justify-center h-[60px] w-36 md:w-48 mb-2 md:mb-0 text-sm md:text-lg font-medium text-white uppercase bg-black border border-black rounded-md hover:bg-primary md:px-8 me-3 md:me-6"
                  href="/contact"
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
                  href={"/portfolio"}
                  className="flex items-center justify-center h-[54px] md:h-[56px] w-36 md:w-48 mb-2 md:mb-0 text-sm md:text-lg font-medium text-white border border-white rounded-md hover:bg-primary hover:border-primary md:px-8"
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
                className="flex items-center justify-center mt-6 text-white md:justify-start md:mt-16 text-md md:text-3xl"
              >
                <div
                  className={`text-3xl font-semibold w-20 ${orbitron.className}`}
                >
                  <CountUp start={1} end={120} duration={5} delay={0} />
                </div>
                <p className="text-lg text-[#dbdbdb] ml-2">Worldwide Client</p>
                <p className="text-lg text-[#dbdbdb] mx-2">|</p>
                <div className="flex items-center gap-x-2">
                  <Link href={"https://github.com/arsahak"} target="_blank">
                    <FaGithub className="text-[#dbdbdb] size-5 cursor-pointer hover:text-primary" />
                  </Link>
                  <Link
                    href={"https://stackoverflow.com/users/15496362/ar-sahak"}
                    target="_blank"
                  >
                    <FaStackOverflow className="text-[#dbdbdb] size-6 cursor-pointer hover:text-primary" />
                  </Link>
                  {/* <FaFigma className="text-[#dbdbdb] size-5 cursor-pointer hover:text-primary" /> */}
                </div>
              </motion.div>
            </div>
            {/* <motion.div className='relative w-full md:w-[45%] overflow-hidden z-10 rotate-45'>
              <motion.div
                initial={{ x: '50%', y: '-100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1 }}
                className='absolute inset-0 w-[300px] h-full bg-[#B38645] rounded-b-3xl overflow-hidden'
                style={{ zIndex: -1 }}
              />

              <div className='absolute'>
                <Image
                  width={400}
                  height={450}
                  src='/assets/about/image.png'
                  alt='Available For All Devices'
                  className='z-50 w-[300px] h-auto overflow-hidden -rotate-45 '
                  priority
                />
              </div>
            </motion.div> */}
            <div className="w-full md:w-[45%]">
              <Image
                width={800}
                height={450}
                src="/assets/home/home-image.png"
                alt="Available For All Devices"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(HeroSection);
