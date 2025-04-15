import { Orbitron } from "next/font/google";
import React, { useMemo } from "react";

import Link from "next/link";

import { SITECONFIG } from "@/config/site";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const orbitron = Orbitron({ subsets: ["latin"] });

const Footer = () => {
  const quickLinks = useMemo(() => {
    return SITECONFIG?.footer?.quick_links || [];
  }, []);

  const SocialIcon = ({ icon: Icon, url }) => (
    <Link href={url} target="_blank">
      <Icon className="size-6 text-white hover:text-primary" />
    </Link>
  );

  return (
    <footer className="">
      <div className="container">
        <div className="py-6 md:py-10">
          <div className="flex flex-col items-center justify-center gap-x-8 sm:gap-6 md:justify-between">
            <h2
              className={`font-semibold text-[35px] md:text-[45px] text-white ${orbitron.className}`}
            >
              AR Sahak.
            </h2>
            <div className="flex justify-center flex-1 my-8 md:my-2">
              <ul className="flex flex-col items-center justify-center ml-0 font-normal text-center text-white list-none md:flex-row">
                {quickLinks.map((el, index) => (
                  <li
                    className="mb-4 flex items-center text-md md:text-[18px] font-semibold"
                    key={index}
                  >
                    <Link href={el.slug} className="hover:underline">
                      {el.title}
                    </Link>
                    {index < quickLinks.length - 1 && (
                      <span className="hidden mx-4 md:block">|</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center gap-x-4">
              <SocialIcon
                icon={FaFacebook}
                url={"https://www.facebook.com/arsahak1"}
              />
              <SocialIcon
                icon={RiTwitterXLine}
                url={"https://www.x.com/ar_sahak"}
              />
              <SocialIcon
                icon={IoLogoLinkedin}
                url={"https://www.linkedin.com/in/arsahak/"}
              />
              <SocialIcon
                icon={FaInstagram}
                url={"https://www.facebook.com/arsahak1"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#181818]">
        <div className="container flex items-center justify-center py-3 md:py-6">
          <p className="mb-4 text-center text-white text-[14px] md:text-[18px] md:mb-0">
            © 2025 AR Sahak. All Rights Reserved , Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
