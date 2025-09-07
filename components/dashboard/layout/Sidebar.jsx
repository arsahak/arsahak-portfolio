"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBook,
  FaFolderOpen,
  FaSignOutAlt,
  FaStickyNote,
  FaTachometerAlt,
} from "react-icons/fa";

const navItems = [
  {
    label: "Dashboard",
    key: "dashboard",
    href: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  { label: "Blog", key: "blog", href: "/dashboard/blog", icon: <FaBook /> },
  {
    label: "Portfolio",
    key: "portfolio",
    href: "/dashboard/portfolio",
    icon: <FaFolderOpen />,
  },
  {
    label: "Note",
    key: "note",
    href: "/dashboard/note",
    icon: <FaStickyNote />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("dashboard_logged_in");
    router.push("/sign-in");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-white via-white to-gray-50 border-r border-gray-200 flex flex-col py-6 px-4 min-h-screen shadow fixed left-0 top-0 bottom-0 z-30 backdrop-blur-sm">
      {/* Enhanced Logo */}
      <div className="mb-12 flex items-center justify-center group relative">
        <div className="flex flex-col items-center relative">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8750f7] via-[#6c3fc5] to-[#8750f7] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] rounded-full blur-sm opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
            <Image
              src="/assets/home/arsahak1.jpg"
              alt="AR Sahak"
              width={300}
              height={300}
              className="relative w-20 h-20 rounded-full border-4 border-white shadow-2xl transform group-hover:scale-110 transition-all duration-500 object-cover ring-4 ring-[#8750f7]/20 group-hover:ring-[#8750f7]/40 image-cover image-center"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300"></div>
          </div>
          <div className="text-center relative">
            <span className="text-3xl font-black bg-gradient-to-r from-[#8750f7] via-[#6c3fc5] to-[#8750f7] bg-clip-text text-transparent tracking-wider leading-none">
              AR Sahak
            </span>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#8750f7] to-transparent mt-2 rounded-full opacity-70"></div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#8750f7]/40 via-[#6c3fc5] to-[#8750f7]/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`group relative flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-1 ${
              pathname === item.href
                ? "bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] text-white font-bold shadow-lg"
                : "text-[#2a1454] hover:bg-gradient-to-r hover:from-[#f3e8ff] hover:to-[#e8d5ff] hover:text-[#8750f7]"
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-2xl p-3 transition-all duration-300 ${
                pathname === item.href
                  ? "bg-white/20 shadow-lg backdrop-blur-sm"
                  : "group-hover:bg-[#8750f7]/10 group-hover:shadow-md"
              }`}
            >
              <span
                className={`text-xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 ${
                  pathname === item.href ? "text-white" : "text-[#8750f7]"
                }`}
              >
                {item.icon}
              </span>
              {pathname === item.href && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
              )}
            </div>
            <span className="relative">
              {item.label}
              {pathname === item.href && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/30 rounded-full"></div>
              )}
            </span>
            {pathname !== item.href && (
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#8750f7] to-[#6c3fc5] rounded-r-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* Enhanced Logout Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
        >
          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors duration-200">
            <FaSignOutAlt className="text-lg group-hover:rotate-12 transition-transform duration-200" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
