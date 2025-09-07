"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist. Return to AR Sahak's portfolio homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const [counter, setCounter] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
        }
        return prevCounter - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            404
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Go to Homepage
          </Link>
          
          <button
            onClick={() => router.back()}
            className="inline-block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Auto Redirect */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">
            Auto-redirecting to homepage in{" "}
            <span className="text-blue-400 font-semibold">{counter}</span> seconds
          </p>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 text-sm text-gray-400">
          <p className="mb-2">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/portfolio" className="text-blue-400 hover:text-blue-300 transition-colors">
              Portfolio
            </Link>
            <Link href="/about" className="text-blue-400 hover:text-blue-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
