"use client";
import React from "react";
import { Orbitron } from "next/font/google";
// import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import SkillLoopSlider from "../shared/SkillLoopSlider";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const orbitron = Orbitron({ subsets: ["latin"] });

const list = [
  {
    title: "Waivers",
    img: "assets/portfolio-item/epharma-web.png",
    price: "April 28, 2021",
  },
  {
    title: "Do You Need an Immigration Lawyer for naturalization",
    img: "assets/portfolio-item/epharma-web.png",
    price: "April 28, 2021",
  },
  {
    title: "How can i contact an immigration lawyer for free",
    img: "assets/portfolio-item/butterfly-app.png",
    price: "April 28, 2021",
  },
];

const NewsSection = () => {
  return (
    <section className="">
      <div className="container py-6 md:py-20">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[35%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                Recent News
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-[100%] md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                Full Stack Expertise Proficient in front-end and back-end
                development, with strong skills in database management, API
                design, microservices, and cloud deployment.
              </p>
            </ScrollMotionEffect>
          </div>
        </div>
        <div className="mt-16">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 mt-0 md:mt-12">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                radius="md"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
                className="bg-[#181818]"
              >
                <CardBody className="p-0">
                  <Image
                    shadow="none"
                    radius="none"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[300px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small block text-left bg-[#181818]">
                  <div className="flex justify-between items-center mb-3 ">
                    <p className=" text-white">Full Stack</p>
                    <p className=" text-white">12 Jully 2024</p>
                  </div>
                  <h2 className=" text-lg font-bold block line-clamp-1 text-white">
                    Full Stack Expertise Proficient in front-end and back-end
                    development
                  </h2>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

// "use client";
// import React from "react";
// import SectionLayout from "../shared/SectionLayout";
// import CardMotion from "../motion/CardMotion";
// import ImageMotion from "../motion/ImageMotion";
// import MotionEffect from "../motion/MotionEffect";
// import { Mulish, Bitter } from "next/font/google";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { articlesInfo } from "@/config/data";
// import BlackButton from "../shared/BlackButton";
// import ScondayButton from "../shared/ScondayButton";
// const bitter = Bitter({ subsets: ["latin"] });
// const mulish = Mulish({ subsets: ["latin"] });

// const NewsSection = () => {
// const list = [
//   {
//     title: "Waivers",
//     img: "/assets/home/blogone.png",
//     price: "April 28, 2021",
//   },
//   {
//     title: "Do You Need an Immigration Lawyer for naturalization",
//     img: "/assets/home/blogtwo.png",
//     price: "April 28, 2021",
//   },
//   {
//     title: "How can i contact an immigration lawyer for free",
//     img: "/assets/home/blogthree.png",
//     price: "April 28, 2021",
//   },
// ];
//   return (
//     <SectionLayout bg="bg-slate-50 ">
//       <div className="">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center">
//           <CardMotion
//             whileInView={{
//               opacity: 1,
//               y: 0,
//               transition: {
//                 duration: 1.1,
//               },
//             }}
//             initial={{
//               opacity: 0,
//               y: 100,
//             }}
//           >
//             <div className="">
//               <h2 className="text-stone-950 font-bold text-base ">News</h2>
//               <hr class="h-[2px] my-0 bg-stone-950 border-0 w-4"></hr>
//               <h2
//                 className={`text-stone-950 font-bold text-5xl mt-5 mb-4 text-center md:text-left ${bitter.className}`}
//               >
//                 News
//               </h2>
//             </div>
//           </CardMotion>
//           <CardMotion
//             whileInView={{
//               opacity: 1,
//               y: 0,
//               transition: {
//                 duration: 1.1,
//               },
//             }}
//             initial={{
//               opacity: 0,
//               y: 100,
//             }}
//           >
//             <div className="flex justify-end invisible md:visible">
//               <ScondayButton
//                 title={"View All"}
//                 link={"/blog"}
//                 style={"bg-[#1B2639] text-white"}
//                 radius={"none"}
//               />
//             </div>
//           </CardMotion>
//         </div>
//         <CardMotion
//           whileInView={{
//             opacity: 1,
//             y: 0,
//             transition: {
//               duration: 1.1,
//             },
//           }}
//           initial={{
//             opacity: 0,
//             y: 100,
//           }}
//         >
//           <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-0 md:mt-12">
//             {list.map((item, index) => (
//               <Card
//                 shadow="sm"
//                 radius="none"
//                 key={index}
//                 isPressable
//                 onPress={() => console.log("item pressed")}
//               >
//                 <CardBody className=" p-0">
//                   <Image
//                     shadow="none"
//                     radius="none"
//                     width="100%"
//                     alt={item.title}
//                     className="w-full object-cover h-[300px]"
//                     src={item.img}
//                   />
//                 </CardBody>
//                 <CardFooter className="text-small block text-left">
//                   <h2 className="text-default-500 text-lg font-bold block line-clamp-1">
//                     {item.title}
//                   </h2>
//                   <p className="text-default-500 block">{item.price}</p>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </CardMotion>

//         <CardMotion
//           whileInView={{
//             opacity: 1,
//             y: 0,
//             transition: {
//               duration: 1.1,
//             },
//           }}
//           initial={{
//             opacity: 0,
//             y: 100,
//           }}
//         >
//           <div className="flex justify-center visible md:invisible mt-12 md:mt-[-60px]">
//             <ScondayButton
//               title={"View All"}
//               link={"/blog"}
//               style={"bg-[#1B2639] text-white"}
//               radius={"none"}
//             />
//           </div>
//         </CardMotion>
//       </div>
//     </SectionLayout>
//   );
// };

// export default NewsSection;
