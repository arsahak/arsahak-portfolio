import ContactSection from "@/components/contact-us/ContactSection";

export const metadata = {
  title: "Contact Me",
  description:
    "Get in touch with AR Sahak, Full Stack Developer and UI/UX Designer. Ready to discuss your next web development project, mobile app, or digital solution. Let's create something amazing together.",
  keywords: [
    "Contact AR Sahak",
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Developer",
    "Hire Developer",
    "Project Consultation",
    "Web Development Services",
    "Mobile App Development",
    "Contact Form",
    "Get In Touch",
  ],
  openGraph: {
    title: "Contact AR Sahak | Full Stack Developer & UI/UX Designer",
    description:
      "Get in touch with AR Sahak, Full Stack Developer and UI/UX Designer. Ready to discuss your next web development project or digital solution.",
    url: "https://arsahak.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact AR Sahak | Full Stack Developer & UI/UX Designer",
    description:
      "Get in touch with AR Sahak, Full Stack Developer and UI/UX Designer. Ready to discuss your next web development project or digital solution.",
  },
  alternates: {
    canonical: "https://arsahak.com/contact",
  },
};

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <ContactSection />
    </div>
  );
};

export default page;
