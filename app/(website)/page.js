import HeroSection from "../..//components/home/HeroSection";
import AboutMe from "../../components/home/AboutMe";
import LetsTalk from "../../components/home/LetsTalk";
import MyPortfolio from "../../components/home/MyPortfolio";
import MySkills from "../../components/home/MySkills";
import MySpecialties from "../../components/home/MySpecialties";
import NewsSection from "../../components/home/NewsSection";

export const metadata = {
  title: "Home",
  description: "Welcome to AR Sahak's portfolio. I'm a passionate Full Stack Developer and UI/UX Designer creating innovative web applications, mobile apps, and digital solutions using React, Next.js, Node.js, and modern technologies.",
  keywords: [
    "AR Sahak",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "UI/UX Designer",
    "Web Developer",
    "Portfolio",
    "Home"
  ],
  openGraph: {
    title: "AR Sahak | Full Stack Developer & UI/UX Designer",
    description: "Welcome to AR Sahak's portfolio. Passionate Full Stack Developer and UI/UX Designer creating innovative web applications and digital solutions.",
    url: "https://arsahak.com",
    type: "website",
  },
  twitter: {
    title: "AR Sahak | Full Stack Developer & UI/UX Designer",
    description: "Welcome to AR Sahak's portfolio. Passionate Full Stack Developer and UI/UX Designer creating innovative web applications and digital solutions.",
  },
  alternates: {
    canonical: "https://arsahak.com",
  },
};

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
