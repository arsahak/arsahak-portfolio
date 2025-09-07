import LetsTalk from "@/components/home/LetsTalk";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import PortfolioBar from "@/components/shared/PortfolioBar";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore AR Sahak's portfolio of innovative web applications, mobile apps, and digital solutions. Discover projects built with React, Next.js, Node.js, and modern web technologies. See my work in Full Stack Development and UI/UX Design.",
  keywords: [
    "Portfolio",
    "AR Sahak Portfolio",
    "Web Development Projects",
    "React Projects",
    "Next.js Projects",
    "Node.js Projects",
    "Full Stack Development",
    "UI/UX Design",
    "Web Applications",
    "Mobile Apps",
    "Digital Solutions",
    "Project Showcase",
    "Work Examples",
  ],
  openGraph: {
    title: "Portfolio | AR Sahak - Full Stack Developer & UI/UX Designer",
    description:
      "Explore AR Sahak's portfolio of innovative web applications, mobile apps, and digital solutions. Discover projects built with modern web technologies.",
    url: "https://arsahak.com/portfolio",
    type: "website",
  },
  twitter: {
    title: "Portfolio | AR Sahak - Full Stack Developer & UI/UX Designer",
    description:
      "Explore AR Sahak's portfolio of innovative web applications, mobile apps, and digital solutions. Discover projects built with modern web technologies.",
  },
  alternates: {
    canonical: "https://arsahak.com/portfolio",
  },
};

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <PortfolioPage />
      <PortfolioBar />
      {/* <ClinetLogoList /> */}
      <LetsTalk />
    </div>
  );
};

export default page;
