import { Orbitron } from "next/font/google";
import Link from "next/link";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const orbitron = Orbitron({ subsets: ["latin"] });

const skillsInfo = [
  {
    icon: "/assets/skill/devicon_figma.png",
    ratio: "94%",
    title: "Figma",
  },
  {
    icon: "/assets/skill/devicon_framermotion.png",
    ratio: "62%",
    title: "Framer",
  },
  {
    icon: "/assets/skill/image 18.png",
    ratio: "70%",
    title: "Spline",
  },
  {
    icon: "/assets/skill/logos_adobe-photoshop.png",
    ratio: "90%",
    title: "Photoshop",
  },
  {
    icon: "/assets/skill/skill-icons_illustrator.png",
    ratio: "81%",
    title: "Adobe Illustrator",
  },
  {
    icon: "/assets/skill/skill-icons_xd.png",
    ratio: "94%",
    title: "Adobe XD",
  },
];

const LetsTalk = () => {
  return (
    <section className="overflow-hidden">
      <div className="container py-10 md:py-20">
        <ScrollMotionEffect effect="fade-up" duration="2000">
          <div className="p-10 text-black rounded-xl bg-[#181818]">
            <h2
              className={`text-5xl font-bold text-center text-white ${orbitron.className}`}
            >
              Start Your Project
            </h2>
            <p className="my-8 text-lg text-center text-white font-light">
              Transform Your Ideas into Stunning Interfaces
            </p>
            <div className="flex items-center justify-center">
              <Link
                className="flex items-center justify-center px-2 !py-3 mb-2 text-sm font-medium text-white uppercase hover:bg-primary md:text-lg md:px-8 me-3 md:me-6 rounded-md w-52 primary-gradient"
                href="/contact"
              >
                {`Let’s Talk`}

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-2 text-white size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </ScrollMotionEffect>
      </div>
    </section>
  );
};

export default LetsTalk;
