import React from "react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import CountUp from "../shared/CountUp";

const orbitron = Orbitron({ subsets: ["latin"] });

const AboutMePage = () => {
  return (
    <section className="pt-10 pb-6  md:pt-20 md:pb-10">
      <div className="container">
        <div className="flex flex-col items-center justify-between md:flex-row gap-x-10">
          <div className="w-[100%] md:w-[40%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <div className="hidden md:block">
                <div className=" flex items-center justify-center relative">
                  <div className="gradient-circle-about absolute mt-36">
                    <Image
                      width={800}
                      height={1050}
                      src="/assets/home/Component 19 (1).png"
                      alt="AR Sahak"
                      className="w-[380px] h-auto mx-auto absolute inset-0 top-[20%] left-0 right-0"
                      priority
                    />
                  </div>
                </div>
              </div>
            </ScrollMotionEffect>
          </div>
          <div className="w-[100%] md:w-[60%] md:mt-0 mt-10">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <h2
                className={`text-white text-4xl md:text-5xl mb-10 text-center md:text-left ${orbitron.className} `}
              >
                About Me
              </h2>
              <p className="mb-6 text-base text-center text-white md:text-lg md:text-left">
                {`I’m AR Sahak, a passionate Full Stack Developer focused on creating seamless and innovative web experiences. I graduated from Jiangsu University of Science and Technology, China, and currently work at Bayshore Communication in Dhaka, Bangladesh. I specialize in building responsive front-end interfaces using React and Next Js, and developing robust back-end systems with Node.js and Express. I am experienced in managing databases like MySQL, PostgreSQL, and MongoDB.`}
              </p>
              <p className="text-base text-center text-white md:text-lg md:text-left">
                {`I am skilled in designing RESTful APIs, implementing microservices, and deploying applications on AWS and Azure. I thrive in Agile environments, using Git for version control, and continually learning new technologies to deliver high-performance, secure, and user-friendly applications.`}
              </p>
            </ScrollMotionEffect>
            <div className="mt-12 md:mt-20">
              <ScrollMotionEffect effect="fade-left" duration="2000">
                <div className="flex items-start justify-center mx-0 gap-x-0 md:gap-x-24 md:justify-start">
                  <ul className="max-w-md gap-7">
                    <li className="pb-3 sm:pb-4">
                      <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <Image
                            src={"/assets/about/tabler_stars.png"}
                            alt="User Icon"
                            width={80}
                            height={80}
                            className="w-[45px] md:w-[80px] h-auto  pr-3  border-r-2 border-[#F0C143]"
                            priority
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xl font-extrabold text-white truncate md:text-4xl">
                            <CountUp start={1} end={3} duration={3} delay={0} />
                          </p>
                          <p className="text-xs text-white truncate md:text-lg">
                            Years of experience
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <Image
                            src={
                              "/assets/about/oui_security-signal-resolved.png"
                            }
                            alt="User Icon"
                            width={50}
                            height={50}
                            className="w-[50px] md:w-[80px] h-auto  pr-3  border-r-2 border-[#F0C143]"
                            priority
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-2xl font-extrabold text-white truncate md:text-4xl">
                            <CountUp
                              start={1}
                              end={45}
                              duration={3}
                              delay={0}
                            />
                          </p>
                          <p className="text-sm text-white truncate md:text-lg">
                            Problem Solved
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="max-w-md">
                    <li className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <Image
                            src={"/assets/about/majesticons_users-line.png"}
                            alt="User Icon"
                            width={80}
                            height={80}
                            className="w-[50px] md:w-[80px] h-auto  pr-3  border-r-2 border-[#F0C143]"
                            priority
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-2xl font-extrabold text-white truncate md:text-4xl">
                            <CountUp
                              start={1}
                              end={120}
                              duration={3}
                              delay={0}
                            />
                          </p>
                          <p className="text-sm text-white truncate md:text-lg">
                            Global Clients
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <Image
                            src={"/assets/about/mdi_trophy-award.png"}
                            alt="User Icon"
                            width={50}
                            height={50}
                            className="w-[50px] md:w-[80px] h-auto  pr-3  border-r-2 border-[#F0C143]"
                            priority
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-2xl font-extrabold text-white truncate md:text-4xl">
                            <CountUp start={1} end={6} duration={3} delay={0} />
                          </p>
                          <p className="text-sm text-white truncate md:text-lg">
                            Global Award Win
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollMotionEffect>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMePage;
