import Image from "next/image";
import React from "react";

const clientLogoList = [
  {
    title: "",
    url: "/assets/clientlogo/fiverr.png",
  },
  {
    title: "",
    url: "/assets/clientlogo/upwork.png",
  },
  {
    title: "",
    url: "/assets/clientlogo/peopleperhour.png",
  },
  {
    title: "",
    url: "/assets/clientlogo/freelancer.png",
  },
  {
    title: "",
    url: "/assets/clientlogo/glassdoor.png",
  },
  {
    title: "",
    url: "/assets/clientlogo/guru.png",
  },
];

const ClinetLogoList = () => {
  return (
    <div className="">
      <div className="container grid grid-cols-3 md:grid-cols-6 items-center gap-x-20 py-6 md:py-12">
        {clientLogoList?.map((el, index) => (
          <div className="">
            <Image
              src={el.url}
              alt="icon"
              width={140}
              height={140}
              className=""
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinetLogoList;
