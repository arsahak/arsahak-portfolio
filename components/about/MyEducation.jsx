import React from "react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const workExperience = [
  {
    imgUrl: "/assets/about/just.png",
    instituteName: "Jiangsu University of Science and Technology",
    degree: "BSc in CSE",
    CGPA: "3.03 (out of 4)",
    session: "Sep 2018 - Jul 2022",
    description:
      "During my time at Jiangsu University of Science and Technology, I honed my skills in computer science, embraced new technologies, and collaborated on projects that enhanced my practical and theoretical knowledge.",
  },
  {
    imgUrl: "/assets/about/dpi.png",
    instituteName: "Dinajpur Polytechnic Institute",
    degree: "Diploma in CE",
    CGPA: "3.46 (out of 4)",
    session: "June 2014 - Jul 2018",
    description:
      "I pursued a Diploma in Computer Engineering at Dinajpur Polytechnic Institute from June 2014 to July 2018. During this time, I developed strong technical skills and a deep understanding of computer systems and programming.",
  },
];

const MyEducation = () => {
  return (
    <section className="py-6 md:py-16">
      <div className="container">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4">
          <div className="w-full md:w-[40%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={`text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Education
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

        <div className="mt-10 md:mt-16">
          {workExperience?.map((el, index) => (
            <div
              className={` p-5 flex items-center justify-between my-4 rounded-md ${index === 0 ? "primary-gradient" : "bg-[#0A0A0A]"}`}
            >
              <div className="w-[15%]  mx-0">
                <Image
                  src={el?.imgUrl}
                  alt={el?.companyName}
                  width={200}
                  height={200}
                  className=" size-16 h-auto bg-cover bg-center rounded-full"
                  priority
                />
              </div>
              <div className="w-[25%]">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {el?.degree}
                </h2>
                <p className="text-gray-300"> {el?.instituteName}</p>
              </div>
              <div className="w-[25%]">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {el?.CGPA}
                </h2>
                <p className="text-gray-300"> {el?.session}</p>
              </div>
              <div className="w-[40%]">
                <p className="text-gray-300">{el?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyEducation;
