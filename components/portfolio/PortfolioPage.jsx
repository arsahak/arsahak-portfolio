"use client";
import {
  Button,
  Card,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Orbitron } from "next/font/google";
import { useState } from "react";

import ScrollMotionEffect from "@/components/motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const portfolioInfo = [
  {
    id: 1,
    cardImage: "/assets/portfolio-item/swop-app.png",
    fullImage: "/assets/portfolio-item/swop-app-full.jpg",
    title: "Swop App",
    slug: "swop-app",
    gallery: [
      "/assets/portfolio-item/swop-app.png",
      "/assets/portfolio-item/swop-app-full.jpg",
    ],
    timeline: "Jan 2023 - May 2023",
    budget: "$12,000",
    description:
      "A modern app for swapping goods and services with a seamless user experience.",
    liveLink: "https://swopapp.com",
    githubLink: "https://github.com/arsahak/swop-app",
  },
  {
    id: 2,
    cardImage: "/assets/portfolio-item/epharma-web.png",
    fullImage: "/assets/portfolio-item/epharma-web-full.jpg",
    title: "ePharma Web",
    slug: "epharma-web",
    gallery: [
      "/assets/portfolio-item/epharma-web.png",
      "/assets/portfolio-item/epharma-web-full.jpg",
    ],
    timeline: "Mar 2022 - Aug 2022",
    budget: "$8,500",
    description:
      "A comprehensive online pharmacy platform with e-commerce and prescription management.",
    liveLink: "https://epharma.com",
    githubLink: "https://github.com/arsahak/epharma-web",
  },
  {
    id: 3,
    cardImage: "/assets/portfolio-item/nazara-web.png",
    fullImage: "/assets/portfolio-item/nazara-web-full.jpg",
    title: "Nazara",
    slug: "nazara",
    gallery: [
      "/assets/portfolio-item/nazara-web.png",
      "/assets/portfolio-item/nazara-web-full.jpg",
    ],
    timeline: "Jul 2021 - Dec 2021",
    budget: "$6,000",
    description:
      "A gaming platform with real-time multiplayer features and leaderboards.",
    liveLink: "https://nazara.com",
    githubLink: "https://github.com/arsahak/nazara",
  },
  {
    id: 4,
    cardImage: "/assets/portfolio-item/butterfly-app.png",
    fullImage: "/assets/portfolio-item/butterfly-app-full.jpg",
    title: "Butterfly App",
    slug: "butterfly-app",
    gallery: [
      "/assets/portfolio-item/butterfly-app.png",
      "/assets/portfolio-item/butterfly-app-full.jpg",
    ],
    timeline: "Feb 2021 - Jun 2021",
    budget: "$7,200",
    description: "A productivity app for task management and collaboration.",
    liveLink: "https://butterflyapp.com",
    githubLink: "https://github.com/arsahak/butterfly-app",
  },
  {
    id: 5,
    cardImage: "/assets/portfolio-item/epharma-app.png",
    fullImage: "/assets/portfolio-item/epharma-app-full.jpg",
    title: "ePharma App",
    slug: "epharma-app",
    gallery: [
      "/assets/portfolio-item/epharma-app.png",
      "/assets/portfolio-item/epharma-app-full.jpg",
    ],
    timeline: "Sep 2022 - Jan 2023",
    budget: "$9,000",
    description:
      "A mobile app for ePharma with prescription uploads and order tracking.",
    liveLink: "https://epharma.com/app",
    githubLink: "https://github.com/arsahak/epharma-app",
  },
];

const PortfolioPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [portfolioId, setPortfolioId] = useState();

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
            <div className="max-w-[2000px] gap-5 grid grid-cols-12 grid-rows-2 ">
              {portfolioInfo?.map((el, index) => (
                <Card
                  key={index}
                  className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
                >
                  <div
                    onClick={() => {
                      window.location.href = `/portfolio/${el.slug}`;
                    }}
                  >
                    <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                      <h4 className="flex justify-center mx-0 !text-sm text-center text-white">
                        {el?.title}
                      </h4>
                    </CardHeader>
                    <Image
                      isZoomed
                      removeWrapper
                      alt="Card background"
                      className="z-0 object-cover w-full h-full"
                      src={el?.cardImage}
                    />
                    <button className="bg-[#75757595] rounded-full p-4 m-2 flex justify-center items-center absolute bottom-0 z-10 cursor-pointer ">
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
          </ScrollMotionEffect>
        </div>
      </div>
      <div className="flex flex-wrap">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="5xl"
          scrollBehavior="outside"
          className="bg-[#181818]"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-white">
                  Website
                </ModalHeader>
                <ModalBody>
                  id:{portfolioId}
                  {portfolioInfo
                    ?.filter((item) => item.id === portfolioId)
                    .map((el, index) => (
                      <Image
                        key={index}
                        removeWrapper
                        alt={"Portfolio image"}
                        className="z-0 object-cover w-full h-full"
                        src={
                          el.fullImage || "assets/portfolio/website-image.png"
                        }
                      />
                    ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};

export default PortfolioPage;
