"use client";
import { Card, CardHeader, Image, useDisclosure } from "@nextui-org/react";
import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";

import { getPinnedPortfolios } from "@/lib/portfolioService";
import Link from "next/link";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const portfolioInfo = [
  {
    id: 1,
    cardImage: "assets/portfolio-item/swop-app.png",
    fullImage: "assets/portfolio-item/swop-app-full.jpg",
    title: "Swop App",
    slug: "swop-app",
  },
  {
    id: 2,
    cardImage: "assets/portfolio-item/epharma-web.png",
    fullImage: "assets/portfolio-item/epharma-web-full.jpg",
    title: "ePharma Web",
  },
  {
    id: 3,
    cardImage: "assets/portfolio-item/nazara-web.png",
    fullImage: "assets/portfolio-item/nazara-web-full.jpg",
    title: "Nazara",
  },
  {
    id: 4,
    cardImage: "assets/portfolio-item/butterfly-app.png",
    fullImage: "assets/portfolio-item/butterfly-app-full.jpg",
    title: "Butterfly App",
  },
  {
    id: 5,
    cardImage: "assets/portfolio-item/epharma-app.png",
    fullImage: "assets/portfolio-item/epharma-app-full.jpg",
    title: "ePharma App",
  },
];

const MyPortfolio = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [portfolioId, setPortfolioId] = useState();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple image URL getter for portfolio
  const getImageUrl = (portfolio) => {
    return portfolio?.featureImage || "/assets/portfolio-item/epharma-web.png";
  };

  useEffect(() => {
    const fetchPinnedPortfolios = async () => {
      try {
        setLoading(true);
        const data = await getPinnedPortfolios();
        setPortfolios(data.slice(0, 5)); // Get max 5 portfolios
      } catch (error) {
        console.error("Error fetching pinned portfolios:", error);
        setPortfolios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedPortfolios();
  }, []);

  return (
    <section className="bg-[#181818]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[45%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Recent Work
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-[100%] md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                {`Cutting-Edge Projects Developed and optimized web applications
                with advanced features, utilizing modern technologies and
                frameworks to deliver exceptional user experiences and
                performance.`}
              </p>
            </ScrollMotionEffect>
          </div>
        </div>
        <div className="mt-14">
          <ScrollMotionEffect effect="fade-up" duration="2000">
            {loading ? (
              // Loading skeleton with same layout
              <div className="max-w-[2000px] gap-6 grid grid-cols-12 grid-rows-2">
                {[...Array(5)].map((_, index) => (
                  <Card
                    key={`skeleton-${index}`}
                    className={`h-[300px] cursor-pointer animate-pulse ${
                      index < 3
                        ? "col-span-12 sm:col-span-4"
                        : index === 3
                          ? "col-span-12 sm:col-span-5"
                          : "col-span-12 sm:col-span-7"
                    }`}
                  >
                    <div className="w-full h-full bg-gray-700 rounded-lg"></div>
                  </Card>
                ))}
              </div>
            ) : portfolios.length > 0 ? (
              <div className="max-w-[2000px] gap-6 grid grid-cols-12 grid-rows-2">
                {/* First 3 cards - top row */}
                {portfolios.slice(0, 3).map((portfolio, index) => (
                  <Card
                    key={portfolio._id}
                    className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
                  >
                    <div
                      onClick={() => {
                        window.location.href = `/portfolio/${portfolio.slug}`;
                      }}
                    >
                      <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                        <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                          {portfolio.category}
                        </h4>
                      </CardHeader>
                      <Image
                        isZoomed
                        removeWrapper
                        alt={portfolio.title}
                        className="z-0 object-cover w-full h-full"
                        src={getImageUrl(portfolio)}
                      />
                      <button className="bg-[#75757595] rounded-full p-4 m-2 flex justify-center items-center absolute bottom-0 z-10 cursor-pointer">
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
                    </div>
                  </Card>
                ))}

                {/* Last 2 cards - bottom row */}
                {portfolios.slice(3, 5).map((portfolio, index) => (
                  <Card
                    key={portfolio._id}
                    isFooterBlurred
                    className={`w-full h-[300px] cursor-pointer ${
                      index === 0
                        ? "col-span-12 sm:col-span-5"
                        : "col-span-12 sm:col-span-7"
                    }`}
                  >
                    <div
                      onClick={() => {
                        window.location.href = `/portfolio/${portfolio.slug}`;
                      }}
                    >
                      <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                        <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                          {portfolio.category}
                        </h4>
                      </CardHeader>
                      <Image
                        isZoomed
                        removeWrapper
                        alt={portfolio.title}
                        className="z-0 object-cover w-full h-full"
                        src={getImageUrl(portfolio)}
                      />
                      <button className="bg-[#75757595] rounded-full p-4 m-2 flex justify-center items-center absolute bottom-0 z-10 cursor-pointer">
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
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg">
                  No pinned portfolios found. Please pin some portfolios from
                  the dashboard.
                </div>
              </div>
            )}
          </ScrollMotionEffect>
          <div className="flex justify-center mx-0 mt-16">
            <ScrollMotionEffect effect="fade-up" duration="2000">
              <div className="p-[2px] bg-gradient-to-r from-[#8750f7] to-[#2a1454] rounded-md">
                <Link
                  href={"/portfolio"}
                  className="flex items-center justify-center h-[54px] md:h-[56px] w-44 md:w-48 mb-2 md:mb-0 text-sm md:text-lg font-medium text-white bg-black rounded-md  hover:bg-gradient-to-r from-[#8750f7] to-[#2a1454]"
                >
                  View All Works
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
              </div>
            </ScrollMotionEffect>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPortfolio;
