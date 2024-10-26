import AboutMe from "@/components/home/AboutMe";
import HeroSection from "@/components/home/HeroSection";
import LetsTalk from "@/components/home/LetsTalk";
import MyPortfolio from "@/components/home/MyPortfolio";
import MySkills from "@/components/home/MySkills";
import MySpecialties from "@/components/home/MySpecialties";
import NewsSection from "@/components/home/NewsSection";

import ClinetLogoList from "@/components/shared/ClientLogoList";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <MySpecialties />
      <AboutMe />
      <MySkills />
      <MyPortfolio />
      {/* <ClinetLogoList /> */}
      <NewsSection />
      <LetsTalk />
    </div>
  );
}
