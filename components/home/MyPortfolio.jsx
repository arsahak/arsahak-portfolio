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

import Link from "next/link";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

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
];

const MyPortfolio = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [portfolioId, setPortfolioId] = useState();

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
            <div className="max-w-[2000px] gap-6 grid grid-cols-12 grid-rows-2 ">
              <Card className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer">
                <div
                  onClick={() => {
                    onOpen();
                    setPortfolioId(1);
                  }}
                >
                  <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                    <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                      Swop App
                    </h4>
                  </CardHeader>
                  <Image
                    isZoomed
                    removeWrapper
                    alt="Card background"
                    className="z-0 object-cover w-full h-full"
                    src="assets/portfolio-item/swop-app.png"
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

              <Card className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer">
                <div
                  onClick={() => {
                    onOpen();
                    setPortfolioId(2);
                  }}
                >
                  <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                    <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                      ePharma Web
                    </h4>
                  </CardHeader>
                  <Image
                    isZoomed
                    removeWrapper
                    alt="Card background"
                    className="z-0 object-cover w-full h-full"
                    src="assets/portfolio-item/epharma-web.png"
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
              <Card className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer">
                <div
                  onClick={() => {
                    onOpen();
                    setPortfolioId(3);
                  }}
                >
                  <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                    <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                      Nazara
                    </h4>
                  </CardHeader>
                  <Image
                    isZoomed
                    removeWrapper
                    alt="Card background"
                    className="z-0 object-cover w-full h-full"
                    src="assets/portfolio-item/nazara-web.png"
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
              <Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-5 cursor-pointer"
              >
                <div
                  onClick={() => {
                    onOpen();
                    setPortfolioId(4);
                  }}
                >
                  <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0">
                    <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                      Butterfly App
                    </h4>
                  </CardHeader>
                  <Image
                    isZoomed
                    removeWrapper
                    alt="Card example background"
                    className="z-0 object-cover w-full h-full"
                    src="assets/portfolio-item/butterfly-appp.png"
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
              <Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-7 cursor-pointer"
              >
                <div
                  onClick={() => {
                    onOpen();
                    setPortfolioId(5);
                  }}
                >
                  <CardHeader className="absolute z-10 flex-col !items-center bg-[#75757595] rounded-full top-2 right-2 max-w-32 !p-1 !m-0 ">
                    <h4 className="flex justify-center mx-0 text-sm text-center text-white">
                      ePharma App
                    </h4>
                  </CardHeader>
                  <Image
                    isZoomed
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 object-cover w-full h-full"
                    src="assets/portfolio-item/epharma-app-850X770.png"
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
            </div>
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

export default MyPortfolio;
