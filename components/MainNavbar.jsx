"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { MdOutlineLightMode } from "react-icons/md";

import { LuUser2 } from "react-icons/lu";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lato } from "next/font/google";
import { FaGithub } from "react-icons/fa";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"], // Specify the weights you need
});

// Debounce function to limit the rate of calling the handleScroll function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [navbarColor, setNavbarColor] = useState(false);

  const menuItems = useMemo(
    () => [
      { title: "Home", slug: "/" },
      { title: "About", slug: "/about" },
      { title: "Portfolio", slug: "/portfolio" },
      { title: "Blog", slug: "/blog" },
      { title: "Contact", slug: "/contact" },
    ],
    []
  );

  const handleScroll = useCallback(
    debounce(() => {
      setNavbarColor(window.scrollY >= 100);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      className={`fixed top-0 left-0 right-0 py-4 z-50  border-b-1 border-gray-800 ${navbarColor || pathname !== "/" ? "!bg-bgPrimary shadow-small duration-1000" : "bg-transparent"}`}
    >
      <div className="container hidden md:block">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <h2
              className={`font-semibold text-[40px] text-white ${lato.className}`}
            >
              @arsahak
            </h2>
          </Link>
          <div className="flex items-center justify-end gap-x-8">
            {menuItems.map((el) => (
              <Link
                key={el.slug}
                href={el.slug}
                className={`nav-item text-md md:text-[18px] font-semibold ${pathname === el.slug ? "!text-primary border-b-2 border-primary" : ""} hover:text-primary`}
              >
                {el.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            {/* <MdOutlineLightMode className="text-black size-7 cursor-pointer hover:text-primary" /> */}
            <Link
              target="_blank"
              className="flex items-center justify-center px-2 !py-2 mb-2 text-sm font-medium text-white  hover:bg-primary md:text-lg md:px-4 rounded-md primary-gradient"
              href="https://www.upwork.com/freelancers/~01ee4ec811fe032f23"
            >
              {`Hire Me!`}

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
      </div>
      <div className="md:hidden">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className={`!mx-0 !px-0 pb-0 pt-2 md:pb-3 md:pt-4 fixed top-0 transition-colors duration-300 ${navbarColor || pathname !== "/" ? "!bg-secondary shadow-small" : "bg-transparent"}`}
        >
          <NavbarContent>
            <NavbarBrand>
              <Link href="/">
                <h2
                  className={`font-semibold text-[30px] text-white ${lato.className}`}
                >
                  @arsahak
                </h2>
              </Link>
            </NavbarBrand>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden text-white"
            />
          </NavbarContent>

          <NavbarMenu className="overflow-hidden">
            {menuItems.map((el, index) => (
              <NavbarMenuItem key={el.slug} className="flex flex-row">
                <Link
                  className={`w-full text-black text-center !text-xl font-medium py-1 ${pathname === el.slug ? "!text-primary" : ""} ${index === 0 ? "mt-6" : ""}`}
                  href={el.slug}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {el.title}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    </section>
  );
};

export default React.memo(MainNavbar);
