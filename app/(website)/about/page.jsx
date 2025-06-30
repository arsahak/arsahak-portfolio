import React from "react";
import AboutMePage from "@/components/about/AboutMePage";
import LetsTalk from "@/components/home/LetsTalk";
import MySkills from "@/components/home/MySkills";
import ClinetLogoList from "@/components/shared/ClientLogoList";
import MyVison from "@/components/about/MyVison";
import MyWorkExperience from "@/components/about/MyWorkExperience";
import MyEducation from "@/components/about/MyEducation";

const page = () => {
  return (
    <div className="mt-12 overflow-x-hidden md:mt-20">
      <AboutMePage />
      <MySkills />
      <MyWorkExperience />
      <MyEducation />
      <MyVison />
      {/* <ClinetLogoList /> */}
      <LetsTalk />
    </div>
  );
};

export default page;
