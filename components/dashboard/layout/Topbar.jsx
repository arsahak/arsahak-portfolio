"use client";
import { FaBell, FaChevronDown, FaGlobe } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-8 bg-gradient-to-r from-white via-gray-50/50 to-white border-b border-gray-200/80 shadow z-20 sticky top-0 backdrop-blur-md">
      {/* Left: Enhanced Dashboard title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-3 h-10 bg-gradient-to-b from-[#8750f7] via-[#6c3fc5] to-[#8750f7] rounded-full shadow-lg"></div>
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full opacity-40"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black bg-gradient-to-r from-[#2a1454] via-[#8750f7] to-[#6c3fc5] bg-clip-text text-transparent tracking-tight leading-none">
              Dashboard
            </span>
            <div className="w-full h-0.5 bg-gradient-to-r from-[#8750f7]/30 via-[#6c3fc5]/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right: Enhanced Action buttons */}
      <div className="flex items-center gap-4">
        {/* Enhanced Notifications */}
        <div className="relative group">
          <button className="relative p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 hover:border-[#8750f7]/30 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
            <FaBell className="text-lg text-gray-600 group-hover:text-[#8750f7] transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
              3
            </div>
          </button>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#8750f7] group-hover:w-full transition-all duration-300 rounded-full"></div>
        </div>

        {/* Enhanced Language selector */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 cursor-pointer hover:border-[#8750f7]/30 hover:shadow-md transition-all duration-300 group">
          <div className="relative">
            <FaGlobe className="text-lg text-gray-500 group-hover:text-[#8750f7] transition-colors duration-300" />
            <div className="absolute -inset-1 bg-[#8750f7]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </div>
          <span className="text-base font-semibold text-gray-700 group-hover:text-[#8750f7] transition-colors duration-300">
            EN
          </span>
          <FaChevronDown className="text-xs text-gray-400 group-hover:text-[#8750f7] group-hover:rotate-180 transition-all duration-300" />
        </div>
      </div>
    </header>
  );
}
