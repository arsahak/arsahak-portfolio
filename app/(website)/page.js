import HeroSection from "../..//components/home/HeroSection";
import AboutMe from "../../components/home/AboutMe";
import LetsTalk from "../../components/home/LetsTalk";
import MyPortfolio from "../../components/home/MyPortfolio";
import MySkills from "../../components/home/MySkills";
import MySpecialties from "../../components/home/MySpecialties";
import NewsSection from "../../components/home/NewsSection";

export const metadata = {
  title: "AR Sahak | Full Stack Developer | AI, Machine Learning, Web3 & Blockchain",
  description:
    "AR Sahak is a passionate Full Stack Developer specializing in React, Next.js, Node.js, Express, Django, FastAPI, AI, Machine Learning, Web3, and Blockchain. Building innovative web apps, dApps, and smart contracts with modern technologies.",
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
    title: "AR Sahak | Full Stack Developer | AI, Machine Learning, Web3 & Blockchain",
    description:
      "AR Sahak is a passionate Full Stack Developer specializing in React, Next.js, Node.js, Express, Django, FastAPI, AI, Machine Learning, Web3, and Blockchain. Building innovative web apps, dApps, and smart contracts with modern technologies.",
    url: "https://arsahak.com",
    type: "website",
  },
  twitter: {
    title: "AR Sahak | Full Stack Developer | AI, Machine Learning, Web3 & Blockchain",
    description:
      "AR Sahak is a passionate Full Stack Developer specializing in React, Next.js, Node.js, Express, Django, FastAPI, AI, Machine Learning, Web3, and Blockchain. Building innovative web apps, dApps, and smart contracts with modern technologies.",
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
