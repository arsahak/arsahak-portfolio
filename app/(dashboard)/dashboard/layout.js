"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaChevronDown, FaFolderOpen, FaSearch, FaSignOutAlt, FaStickyNote, FaTachometerAlt } from "react-icons/fa";

const navItems = [
  { label: "Dashboard", key: "dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
  { label: "Blog", key: "blog", href: "/dashboard/blog", icon: <FaBook /> },
  { label: "Portfolio", key: "portfolio", href: "/dashboard/portfolio", icon: <FaFolderOpen /> },
  { label: "Note", key: "note", href: "/dashboard/note", icon: <FaStickyNote /> },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Cookies.get("dashboard_logged_in") === "true");
  }, []);

  const handleLogout = () => {
    Cookies.remove("dashboard_logged_in");
    router.refresh(); // reloads the page, will show login
  };

  if (!loggedIn) {
    // Show only the login form, no sidebar/topbar
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#232526] to-[#414345]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 min-h-screen shadow-lg fixed left-0 top-0 bottom-0 z-30">
        {/* Simple Dashboard Title */}
        <div className="mb-8 flex items-center justify-center">
          <span className="text-3xl font-extrabold tracking-widest text-[#2a1454]">Admin</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded font-medium transition text-[#2a1454] hover:bg-[#f3e8ff] hover:text-[#8750f7] ${pathname === item.href ? "bg-[#8750f7] text-white font-bold" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 px-4 py-2 rounded font-semibold bg-red-600 text-white hover:bg-red-700 transition w-full justify-center"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="w-full h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200 shadow z-20 sticky top-0">
          {/* Left: Dashboard title */}
          <div className="flex items-center gap-4 min-w-[180px]">
            <span className="text-2xl font-bold text-[#181818]">Dashboard</span>
          </div>
          {/* Center: Search bar */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#f3f8fe] border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 text-[#6b7280] placeholder:text-[#a0aec0]"
              />
            </div>
          </div>
          {/* Right: Language selector and user */}
          <div className="flex items-center gap-4 min-w-[220px] justify-end">
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-gray-200 cursor-pointer">
              <img src="https://flagcdn.com/us.svg" alt="US" className="h-5 w-5 rounded-full" />
              <span className="text-sm text-gray-700">Eng (US)</span>
              <FaChevronDown className="text-xs text-gray-400 ml-1" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-blue-200 bg-white shadow-sm">
              <img src="/assets/home/aboutpic.png" alt="shahak" className="h-8 w-8 rounded-full border-2 border-blue-200 object-cover" />
              <span className="font-semibold text-[#2a1454]">shahak</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto bg-[#f7f8fa]">{children}</main>
      </div>
    </div>
  );
} 