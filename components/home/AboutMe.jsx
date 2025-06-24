import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import { SiFiverr, SiUpwork, SiZoom } from "react-icons/si";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const AboutMe = () => {
  return (
    <section className="py-1 md:py-20">
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

                      <span className="text-black">4+</span>

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
              <div className="flex justify-center md:justify-start">
                <Link
                  href={"/assets/arsahak-resume.pdf"}
                  className="flex items-center justify-center px-2 py-2.5 mb-2 text-sm font-medium text-white md:text-lg md:px-8 me-0 md:me-6 rounded-md max-w-56 mt-8 primary-gradient"
                >
                  View Resume
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-2 text-white size-4 md:size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </ScrollMotionEffect>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
