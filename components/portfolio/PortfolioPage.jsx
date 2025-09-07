"use client";
import ScrollMotionEffect from "@/components/motion/ScrollMotionEffect";
import { getAllPortfolios } from "@/lib/portfolioService";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const orbitron = Orbitron({ subsets: ["latin"] });

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getAllPortfolios();
      // Filter for published portfolios only
      const publishedPortfolios = data.filter(
        (portfolio) => portfolio.published === true
      );
      setPortfolios(publishedPortfolios);
    } catch (error) {
      toast.error("Failed to fetch portfolios: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

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
              <div className="max-w-[2000px] gap-5 grid grid-cols-12 grid-rows-2">
                {[...Array(6)].map((_, index) => (
                  <Card
                    key={index}
                    className="col-span-12 sm:col-span-4 h-[300px] animate-pulse"
                  >
                    <div className="w-full h-full bg-gray-800 rounded-lg"></div>
                  </Card>
                ))}
              </div>
            ) : portfolios.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg">
                  No portfolio projects found.
                </div>
              </div>
            ) : (
              <div className="max-w-[2000px] gap-5 grid grid-cols-12 grid-rows-2">
                {portfolios?.map((el, index) => (
                  <Card
                    key={el._id || index}
                    className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
                  >
                    <div
                      onClick={() => {
                        window.location.href = `/portfolio/${el.slug}`;
                      }}
                    >
                      <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                        <h4 className="flex justify-center mx-0 !text-sm text-center text-white">
                          {el?.category}
                        </h4>
                      </CardHeader>
                      <Image
                        isZoomed
                        removeWrapper
                        alt="Card background"
                        className="z-0 object-cover w-full h-full"
                        src={
                          el?.featureImage ||
                          "/assets/portfolio-item/epharma-web.png"
                        }
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
            )}
          </ScrollMotionEffect>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
