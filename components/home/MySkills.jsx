import React from "react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import SkillLoopSlider from "../shared/SkillLoopSlider";

const orbitron = Orbitron({ subsets: ["latin"] });

const skillsInfo = [
  {
    icon: "/assets/skillicon/html.png",
    title: "Html",
  },
  {
    icon: "/assets/skillicon/css.png",
    title: "Css",
  },
  {
    icon: "/assets/skillicon/bootstrap.png",
    title: "Bootstrap",
  },
  {
    icon: "/assets/skillicon/tailwindcss.png",
    title: "Tailwind Css",
  },
  {
    icon: "/assets/skillicon/javascript.png",
    title: "JavaScript",
  },
  {
    icon: "/assets/skillicon/typescript.png",
    title: "TypeScript",
  },
  {
    icon: "/assets/skillicon/python.png",
    title: "Python",
  },
  {
    icon: "/assets/skillicon/reactjs.png",
    title: "React Js",
  },
  {
    icon: "/assets/skillicon/nextwhite.png",
    title: "Next Js",
  },
  {
    icon: "/assets/skillicon/mui.png",
    title: "Material UI",
  },

  {
    icon: "/assets/skillicon/reactnative.png",
    title: "React Native",
  },
  {
    icon: "/assets/skillicon/redux.png",
    title: "Redux",
  },
  {
    icon: "/assets/skillicon/nodejs.png",
    title: "Node Js",
  },
  {
    icon: "/assets/skillicon/js.png",
    title: "Express Js",
  },
  {
    icon: "/assets/skillicon/django.png",
    title: "Django",
  },
  {
    icon: "/assets/skillicon/restapi.png",
    title: "Rest Api",
  },
  {
    icon: "/assets/skillicon/graphql.png",
    title: "GraphQL",
  },
  {
    icon: "/assets/skillicon/apollowhite.png",
    title: "Apollo",
  },
  {
    icon: "/assets/skillicon/mongodb.png",
    title: "MongoDB",
  },
  {
    icon: "/assets/skillicon/mysql.png",
    title: "MySql",
  },
  {
    icon: "/assets/skillicon/postgresql.png",
    title: "PostgreSql",
  },
  {
    icon: "/assets/skillicon/prismaiconwhite.png",
    title: "Prisma",
  },
  {
    icon: "/assets/skillicon/websocketwhite.png",
    title: "WebSocket",
  },
  {
    icon: "/assets/skillicon/awswhite.png",
    title: "AWS",
  },
  {
    icon: "/assets/skillicon/docker.png",
    title: "Docker",
  },
  {
    icon: "/assets/skillicon/git.png",
    title: "Git",
  },
  {
    icon: "/assets/skillicon/github.png",
    title: "Github",
  },
  {
    icon: "/assets/skillicon/framerwhite.png",
    title: "Framer",
  },
  {
    icon: "/assets/skillicon/postman.png",
    title: "Postman",
  },
  {
    icon: "/assets/skillicon/figma.png",
    title: "Figma",
  },
];

const MySkills = () => {
  return (
    <section className="bg-black">
      <div className="container py-6 md:py-20">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[35%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Skills
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
          <SkillLoopSlider skillsInfo={skillsInfo} />
        </div>
      </div>
    </section>
  );
};

export default MySkills;
