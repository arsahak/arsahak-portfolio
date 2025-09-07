import FaqPage from "@/components/faq/FaqPage";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently Asked Questions about AR Sahak's web development services, portfolio, skills, and expertise. Find answers to common questions about Full Stack Development, UI/UX Design, and project collaboration.",
  keywords: [
    "FAQ",
    "Frequently Asked Questions",
    "AR Sahak",
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Development Services",
    "Portfolio Questions",
    "Development Process",
    "Project Timeline",
    "Pricing",
    "Skills",
    "Expertise",
  ],
  openGraph: {
    title: "FAQ | AR Sahak - Full Stack Developer & UI/UX Designer",
    description:
      "Frequently Asked Questions about AR Sahak's web development services, portfolio, skills, and expertise. Find answers to common questions about development and design services.",
    url: "https://arsahak.com/faq",
    type: "website",
  },
  twitter: {
    title: "FAQ | AR Sahak - Full Stack Developer & UI/UX Designer",
    description:
      "Frequently Asked Questions about AR Sahak's web development services, portfolio, skills, and expertise.",
  },
  alternates: {
    canonical: "https://arsahak.com/faq",
  },
};

const page = () => {
  return (
    <div>
      <FaqPage />
    </div>
  );
};

export default page;
