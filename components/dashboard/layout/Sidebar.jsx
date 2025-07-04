"use client";
import Cookies from "js-cookie";
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
    <aside className="w-64 bg-gradient-to-b from-white via-white to-gray-50 border-r border-gray-200 flex flex-col py-6 px-4 min-h-screen shadow-xl fixed left-0 top-0 bottom-0 z-30 backdrop-blur-sm">
      {/* Enhanced Logo */}
      <div className="mb-12 flex items-center justify-center group relative">
        <div className="flex flex-col items-center relative">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8750f7] via-[#6c3fc5] to-[#8750f7] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-[#8750f7] to-[#6c3fc5] rounded-full blur-sm opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
            <img
              src="/assets/home/homepic.png"
              alt="AR Sahak"
              className="relative w-20 h-20 rounded-full border-4 border-white shadow-2xl transform group-hover:scale-110 transition-all duration-500 object-cover ring-4 ring-[#8750f7]/20 group-hover:ring-[#8750f7]/40"
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
      <div className="mt-8 pt-6 border-t border-gradient-to-r from-transparent via-gray-300 to-transparent">
        <button
          onClick={handleLogout}
          className="group relative w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl font-bold bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-800 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-4 w-full justify-center">
            <div className="relative p-2 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <span className="text-xl transition-all duration-500 group-hover:rotate-180 group-hover:scale-110">
                <FaSignOutAlt />
              </span>
            </div>
            <span className="font-black tracking-wider text-lg">Logout</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-300 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
        </button>
      </div>
    </aside>
  );
}
