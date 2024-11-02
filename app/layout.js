import { Orbitron, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";

// Load the fonts with proper configuration
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"], // Specify the weights you need
});

export const metadata = {
  title: "AR Sahak | Portfolio",
  description:
    "Explore the portfolio of AR Sahak, a passionate Full Stack Developer skilled in building seamless, innovative, and scalable web applications using modern front-end and back-end technologies.",
  metadataBase: new URL("https://arsahak.online"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-USA",
    },
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${lato.variable}`}>
      <body className={`${lato.className} overflow-x-hidden text-black`}>
        <Providers>
          <MainNavbar />
          <div className="">{children}</div>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
