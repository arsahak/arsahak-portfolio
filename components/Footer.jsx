import { Orbitron } from "next/font/google";
import React, { useMemo } from "react";

import Link from "next/link";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { SITECONFIG } from "../config/site";

const orbitron = Orbitron({ subsets: ["latin"] });

const Footer = () => {
  const quickLinks = useMemo(() => {
    return SITECONFIG?.footer?.quick_links || [];
  }, []);

  const SocialIcon = ({ icon: Icon, url, label }) => (
    <Link href={url} target="_blank" aria-label={label}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-md hover:bg-primary/80 transition-all border border-white/10 group">
        <Icon className="size-6 text-white group-hover:text-white" />
      </span>
    </Link>
  );

  return (
    <footer className="pt-12 border-t border-white/10 bg-gradient-to-b from-[#181818] via-[#181818]/90 to-black">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h2
              className={`font-extrabold text-[32px] md:text-[44px] text-white tracking-tight ${orbitron.className}`}
            >
              AR Sahak.
            </h2>
            <span className="block w-12 h-1 mt-2 rounded-full bg-gradient-to-r from-primary to-[#8750f7]" />
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            {quickLinks.map((el, index) => (
              <Link
                key={index}
                href={el.slug}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-primary/80 text-white font-medium text-sm md:text-base transition-all shadow-sm"
              >
                {el.title}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-2 md:mt-0">
            <SocialIcon
              icon={FaFacebook}
              url={"https://www.facebook.com/arsahak1"}
              label="Facebook"
            />
            <SocialIcon
              icon={RiTwitterXLine}
              url={"https://www.x.com/ar_sahak"}
              label="Twitter"
            />
            <SocialIcon
              icon={IoLogoLinkedin}
              url={"https://www.linkedin.com/in/arsahak/"}
              label="LinkedIn"
            />
            <SocialIcon
              icon={FaInstagram}
              url={"https://www.facebook.com/arsahak1"}
              label="Instagram"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#181818] border-t border-white/10">
        <div className="container flex items-center justify-center py-4">
          <p className="text-center text-white/60 text-xs md:text-sm">
            © 2025 AR Sahak. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
