import AboutMePage from "../../../components/about/AboutMePage";
import MyEducation from "../../../components/about/MyEducation";
import MyVison from "../../../components/about/MyVison";
import MyWorkExperience from "../../../components/about/MyWorkExperience";
import LetsTalk from "../../../components/home/LetsTalk";
import MySkills from "../../../components/home/MySkills";

export const metadata = {
  title: "About Me",
  description:
    "Learn more about AR Sahak, a passionate Full Stack Developer and UI/UX Designer. Discover my journey, skills, work experience, education, and vision in web development and digital innovation.",
  keywords: [
    "About AR Sahak",
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Work Experience",
    "Education",
    "Skills",
    "Vision",
    "Portfolio",
  ],
  openGraph: {
    title: "About AR Sahak | Full Stack Developer & UI/UX Designer",
    description:
      "Learn more about AR Sahak, a passionate Full Stack Developer and UI/UX Designer. Discover my journey, skills, work experience, and vision in web development.",
    url: "https://arsahak.com/about",
    type: "website",
  },
  twitter: {
    title: "About AR Sahak | Full Stack Developer & UI/UX Designer",
    description:
      "Learn more about AR Sahak, a passionate Full Stack Developer and UI/UX Designer. Discover my journey, skills, work experience, and vision in web development.",
  },
  alternates: {
    canonical: "https://arsahak.com/about",
  },
};

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
