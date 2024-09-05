"use client";
import React from "react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const orbitron = Orbitron({ subsets: ["latin"] });

const MyVision = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="bg-[#181818] py-6 md:py-20">
      <div className="container">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4">
          <div className="w-full md:w-[35%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={`text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Vision
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-full md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                Synergistically seize front-end methods of empowerment without
                extensive core competencies. Progressively repurpose alternative
                platforms.
              </p>
            </ScrollMotionEffect>
          </div>
        </div>

        <div className="mt-16 cursor-pointer" onClick={onOpen}>
          <Image
            src="/assets/about/videothumble.png"
            alt="video thumbnail"
            width={1040}
            height={1040}
            className="w-full h-auto bg-cover bg-center"
            priority
          />
        </div>

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
                  My Vison
                </ModalHeader>
                <ModalBody>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/kSx8AXLVvFk?si=Cewp1xjSIwidqQqx"
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
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

export default MyVision;
