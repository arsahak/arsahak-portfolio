"use client";
import React, { useState } from "react";
import { Orbitron } from "next/font/google";
import {
  Card,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import LetsTalk from "@/components/home/LetsTalk";
import ScrollMotionEffect from "@/components/motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const portfolioInfo = [
  {
    id: 1,
    cardImage: "assets/portfolio-item/swop-app.png",
    fullImage: "assets/portfolio-item/swop-app-full.jpg",
    title: "Swop App",
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
  {
    id: 6,
    cardImage: "assets/portfolio-item/swop-web.png",
    fullImage: "assets/portfolio-item/swop-web-full.jpg",
    title: "Swop Web",
  },
  {
    id: 7,
    cardImage: "assets/portfolio-item/dxg-web.png",
    fullImage: "assets/portfolio-item/dxg-web-full.jpg",
    title: "DXG",
  },
  {
    id: 8,
    cardImage: "assets/portfolio-item/migrate-law-web.png",
    fullImage: "assets/portfolio-item/migrate-law-web-full.jpg",
    title: "Migrate Law",
  },
  {
    id: 9,
    cardImage: "assets/portfolio-item/butterfly-lighthouse-web.png",
    fullImage: "assets/portfolio-item/butterfly-lighthouse-web-full.jpg",
    title: "Butterfly",
  },
  {
    id: 10,
    cardImage: "assets/portfolio-item/tax-pro-dashboard.png",
    fullImage: "assets/portfolio-item/tax-pro-dashboard-full.jpg",
    title: "10x Tax Pro",
  },
  {
    id: 11,
    cardImage: "assets/portfolio-item/trip-law.png",
    fullImage: "assets/portfolio-item/trip-law-full.jpg",
    title: "Trip Law",
  },
  {
    id: 12,
    cardImage: "assets/portfolio-item/apex-advisor.png",
    fullImage: "assets/portfolio-item/apex-advisor-full.jpg",
    title: "Apex Advisor",
  },
  {
    id: 13,
    cardImage: "assets/portfolio-item/turnabroad.png",
    fullImage: "assets/portfolio-item/turnabroad-full.jpg",
    title: "Turn Abroad",
  },
  {
    id: 14,
    cardImage: "assets/portfolio-item/logicsoft.png",
    fullImage: "assets/portfolio-item/logicsoft-full.jpg",
    title: "Logicsoft",
  },
  {
    id: 15,
    cardImage: "assets/portfolio-item/shannonit.png",
    fullImage: "assets/portfolio-item/shannonit-full.jpg",
    title: "Shannonit",
  },
  {
    id: 16,
    cardImage: "assets/portfolio-item/shannonit.png",
    fullImage: "assets/portfolio-item/shannonit-full.jpg",
    title: "Shannonit",
  },
  {
    id: 17,
    cardImage: "assets/portfolio-item/simplestate-web.png",
    fullImage: "assets/portfolio-item/simplestate-web-full.jpg",
    title: "SimpleState",
  },
  {
    id: 18,
    cardImage: "assets/portfolio-item/travler.png",
    fullImage: "assets/portfolio-item/travler-full.jpg",
    title: "Travler",
  },
  {
    id: 19,
    cardImage: "assets/portfolio-item/credit-life.png",
    fullImage: "assets/portfolio-item/credit-life-full.jpg",
    title: "Credit Life",
  },

  {
    id: 21,
    cardImage: "assets/portfolio-item/ticket-2.png",
    fullImage: "assets/portfolio-item/ticket-2-full.jpg",
    title: "Ticket Web",
  },
  {
    id: 22,
    cardImage: "assets/portfolio-item/ticket-1.png",
    fullImage: "assets/portfolio-item/ticket-1-full.jpg",
    title: "Ticket App",
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
                      onOpen();
                      setPortfolioId(el?.id);
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
