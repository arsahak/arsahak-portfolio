"use client";
import ScrollMotionEffect from "@/components/motion/ScrollMotionEffect";
import { getAllPortfolios } from "@/lib/portfolioService";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { Orbitron } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const orbitron = Orbitron({ subsets: ["latin"] });

const PortfolioPage = () => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPortfolios();

      if (!Array.isArray(data)) {
        console.warn("Portfolio data is not an array:", data);
        setPortfolios([]);
        return;
      }

      // Filter for published portfolios only
      const publishedPortfolios = data.filter(
        (portfolio) => portfolio && portfolio.published === true
      );
      setPortfolios(publishedPortfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setError(error.message);
      toast.error("Failed to fetch portfolios: " + error.message);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handlePortfolioClick = useCallback(
    (slug) => {
      if (slug && typeof slug === "string") {
        router.push(`/portfolio/${slug}`);
      }
    },
    [router]
  );

  return (
    <section className="bg-black">
      <div className="container pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[45%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Work
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-[100%] md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                {`Cutting-Edge Projects Developed and optimized web applications with advanced features, utilizing modern technologies and frameworks to deliver exceptional user experiences and performance.`}
              </p>
            </ScrollMotionEffect>
          </div>
        </div>
        <div className="mt-14">
          <ScrollMotionEffect effect="fade-up" duration="2000">
            {loading ? (
              <div className="max-w-[2000px] gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <Card
                    key={`skeleton-${index}`}
                    className="h-[300px] sm:h-[350px] animate-pulse"
                  >
                    <div className="w-full h-full bg-gray-800 rounded-lg"></div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-red-400 text-lg mb-4">
                  Error loading portfolios: {error}
                </div>
                <button
                  onClick={fetchPortfolios}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : portfolios.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg">
                  No portfolio projects found.
                </div>
              </div>
            ) : (
              <div className="max-w-[2000px] gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {portfolios?.map((el, index) => {
                  if (!el || typeof el !== "object") {
                    return null;
                  }

                  return (
                    <Card
                      key={el._id || `portfolio-${index}`}
                      className="h-[300px] sm:h-[350px] cursor-pointer group hover:scale-105 transition-transform duration-300"
                    >
                      <div
                        onClick={() => handlePortfolioClick(el?.slug)}
                        className="relative w-full h-full overflow-hidden rounded-lg"
                      >
                        <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                          <h4 className="flex justify-center mx-0 !text-sm text-center text-white">
                            {el?.category || "Project"}
                          </h4>
                        </CardHeader>
                        <Image
                          isZoomed
                          removeWrapper
                          alt={el?.title || "Portfolio project"}
                          className="z-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          src={
                            el?.featureImage ||
                            "/assets/portfolio-item/epharma-web.png"
                          }
                          fallbackSrc="/assets/portfolio-item/epharma-web.png"
                          onError={(e) => {
                            e.target.src =
                              "/assets/portfolio-item/epharma-web.png";
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 z-5"></div>
                        <button className="bg-[#75757595] rounded-full p-4 m-2 flex justify-center items-center absolute bottom-2 left-2 z-10 cursor-pointer group-hover:bg-opacity-80 transition-all duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-white size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {/* Portfolio Title Overlay */}
                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                          <h3 className="text-white font-semibold text-lg line-clamp-2">
                            {el?.title || "Untitled Project"}
                          </h3>
                        </div> */}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollMotionEffect>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
