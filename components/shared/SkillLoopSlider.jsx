import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

const SkillLoopSlider = ({ skillsInfo }) => {
  return (
    <div className="">
      <Marquee
        pauseOnHover={true}
        speed={60}
        gradient={true}
        gradientColor="black"
      >
        <div className="flex items-stretch gap-4">
          {skillsInfo.map((el, index) => (
            <div key={index} className="w-[150px] md:w-[180px] flex-1 gap-3">
              <div className="p-4 border border-white rounded-lg h-full flex flex-col justify-center">
                <div className="flex items-center justify-center flex-grow">
                  <Image
                    src={el.icon}
                    alt={el.title}
                    width={200}
                    height={200}
                    className="w-20 h-auto"
                    priority
                  />
                </div>
                <h2
                  className={`text-lg text-white text-center mt-4 ${orbitron.className}`}
                >
                  {el.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default SkillLoopSlider;
