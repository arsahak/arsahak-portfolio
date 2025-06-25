import { Orbitron } from "next/font/google";
import Image from "next/image";
import { FaTrophy } from "react-icons/fa";
import { SiFiverr, SiUpwork, SiZoom } from "react-icons/si";
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
                <div className="flex items-center justify-center relative min-h-[300px] md:min-h-[500px] lg:min-h-[600px]">
                  <div
                    className="w-full flex items-center justify-center relative"
                    style={{ minHeight: "300px" }}
                  >
                    {/* Experience badge */}
                    <div
                      className="absolute top-5 left-5 z-20 flex items-center bg-white/90 border-2 border-primary shadow-xl px-3 py-2 rounded-full text-xs md:text-xl font-bold gap-2"
                      style={{ backdropFilter: "blur(6px)" }}
                    >
                      <FaTrophy
                        className="text-primary text-base md:text-2xl"
                        aria-label="Trophy"
                      />

                      <span className="text-black">3+</span>

                      <span className="text-black">Years Experience</span>
                    </div>
                    <div className="hero-animated-circle"></div>
                    <Image
                      width={400}
                      height={400}
                      src="/assets/home/homepic.png"
                      alt="AR Sahak"
                      className="w-[70vw] max-w-[400px] h-auto mx-auto relative z-10 rounded-full shadow-lg object-cover border-4 border-white"
                      priority
                    />
                    <div
                      className="absolute left-1/2 bottom-[-28px] md:bottom-[-36px] -translate-x-1/2 flex gap-4 bg-white/80 border border-primary/30 shadow-lg px-5 py-2 rounded-full z-20 backdrop-blur-md"
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <a
                        href="https://www.upwork.com/freelancers/~yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Upwork"
                        aria-label="Upwork"
                      >
                        <SiUpwork className="text-2xl md:text-3xl text-primary hover:scale-110 hover:drop-shadow-lg transition" />
                      </a>
                      <a
                        href="https://www.fiverr.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Fiverr"
                        aria-label="Fiverr"
                      >
                        <SiFiverr className="text-2xl md:text-3xl text-primary hover:scale-110 hover:drop-shadow-lg transition" />
                      </a>
                      <a
                        href="https://www.peopleperhour.com/freelancer/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="PeoplePerHour"
                        aria-label="PeoplePerHour"
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 32 32"
                          fill="none"
                          className="inline-block align-middle hover:scale-110 hover:drop-shadow-lg transition"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="16" cy="16" r="16" fill="#F89C1D" />
                          <ellipse cx="16" cy="16" rx="7" ry="7" fill="white" />
                          <ellipse
                            cx="16"
                            cy="16"
                            rx="3.5"
                            ry="3.5"
                            fill="#F89C1D"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://zoom.us/yourmeetinglink"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Zoom"
                        aria-label="Zoom"
                      >
                        <SiZoom className="text-2xl md:text-3xl text-primary hover:scale-110 hover:drop-shadow-lg transition" />
                      </a>
                    </div>
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
                {`I'm AR Sahak, a passionate Full Stack Developer focused on creating seamless and innovative web experiences. I graduated from Jiangsu University of Science and Technology, China, and currently work at Bayshore Communication in Dhaka, Bangladesh. I specialize in building responsive front-end interfaces using React and Next Js, and developing robust back-end systems with Node.js and Express. I am experienced in managing databases like MySQL, PostgreSQL, and MongoDB.`}
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
                              end={90}
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
