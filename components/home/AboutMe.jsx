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
                      className="absolute top-5 left-5 z-20 flex items-center bg-white/90 border-2 border-primary shadow px-3 py-2 rounded-full text-xs md:text-xl font-bold gap-2"
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
                      className="absolute left-1/2 bottom-[-28px] md:bottom-[-36px] -translate-x-1/2 flex gap-4 bg-gray-500/80 border border-primary/30 shadow-lg px-5 py-2 rounded-full z-20 backdrop-blur-md"
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
              <p className="mb-6 text-base text-center text-white md:text-lg md:text-left leading-relaxed">
                {`I'm AR Sahak, a Full Stack Developer specializing in AI-powered web applications with expertise in Generative AI integration and intelligent chatbot development. With a degree from Jiangsu University of Science and Technology, China, I currently work at Bayshore Communication in Dhaka, Bangladesh, where I architect cutting-edge AI solutions for modern businesses.`}
              </p>
              <p className="mb-6 text-base text-center text-white md:text-lg md:text-left leading-relaxed">
                {`I build production-ready applications using React.js and Next.js on the frontend, paired with Node.js, Express.js, and FastAPI on the backend. My expertise in AI includes developing RAG (Retrieval-Augmented Generation) models with LangChain and Pinecone for vector search, creating intelligent chatbots, and integrating OpenAI's GPT models to deliver context-aware, conversational AI experiences.`}
              </p>
              <p className="text-base text-center text-white md:text-lg md:text-left leading-relaxed">
                {`From database architecture (MongoDB, PostgreSQL, MySQL) to cloud deployment (AWS, Azure), I deliver end-to-end solutions that combine modern web development with advanced AI capabilities. Whether it's building AI chatbots from scratch, implementing RAG systems for knowledge retrieval, or creating generative AI applications, I transform complex requirements into scalable, high-performance products.`}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
                <a
                  href="/assets/ar_sahak_resume.pdf"
                  download="AR_Sahak_Resume.pdf"
                  className="flex items-center justify-center px-6 py-3 text-sm md:text-lg font-medium text-white rounded-md primary-gradient hover:opacity-90 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Resume
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-6 py-3 text-sm md:text-lg font-medium text-white bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-md transition-all duration-300"
                >
                  Get In Touch
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-2 size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
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
