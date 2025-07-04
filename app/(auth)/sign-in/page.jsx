"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if (email !== "admin@arsahak.com" || password !== "87537799Ar@") {
      setError("Invalid email or password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      Cookies.set("dashboard_logged_in", "true", { expires: 1 });
      setLoading(false);
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1e1e2e]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/assets/home/homepic.png"
            alt="AR Sahak Logo"
            className="w-16 h-16 rounded-full mb-2 border-4 border-[#8750f7] object-cover"
          />
          <span className="text-3xl font-extrabold tracking-widest text-[#2a1454]">
            AR Sahak
          </span>
        </div>
        {/* Sign In Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSignIn}>
          <div>
            <label className="block text-sm font-semibold text-[#2a1454] mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-[#f3f8fe] focus:outline-none focus:ring-2 focus:ring-[#8750f7] text-[#2a1454]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-[#2a1454] mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-[#f3f8fe] focus:outline-none focus:ring-2 focus:ring-[#8750f7] text-[#2a1454] pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-[#2a1454] mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-[#f3f8fe] focus:outline-none focus:ring-2 focus:ring-[#8750f7] text-[#2a1454] pr-10"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && (
            <div className="text-red-600 text-sm font-semibold text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#8750f7] text-white font-bold text-lg hover:bg-[#6c3fc5] transition min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
