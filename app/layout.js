import { Lato, Orbitron } from "next/font/google";
import ErrorBoundary from "../components/shared/ErrorBoundary";
import "./globals.css";
import { Providers } from "./providers";

// Load the fonts with proper configuration
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"], // Specify the weights you need
});

export const metadata = {
  title: {
    default: "AR Sahak | Full Stack Developer",
    template: "%s | AR Sahak",
  },
  description:
    "AR Sahak is a Full Stack Developer with expertise in React, Next.js, Node.js, AI, Machine Learning, dApps, Web3, and Blockchain technologies. Explore my portfolio of scalable web applications, smart contracts, and innovative digital solutions.",
  keywords: [
    "AR Sahak",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "AI Developer",
    "Machine Learning",
    "Web3 Developer",
    "Blockchain Developer",
    "dApp Developer",
    "Web Developer",
    "Portfolio",
    "Digital Solutions",
    "Smart Contracts",
    "Scalable Applications",
  ],
  authors: [{ name: "AR Sahak" }],
  creator: "AR Sahak",
  publisher: "AR Sahak",
  metadataBase: new URL("https://www.arsahak.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arsahak.com",
    siteName: "AR Sahak Portfolio",
    title: "AR Sahak | Full Stack Developer & AI/Web3 Expert",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, AI, Machine Learning, dApps, Web3, and Blockchain. Explore innovative web applications and smart contracts.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AR Sahak - Full Stack Developer & AI/Web3 Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AR Sahak | A Passionate Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, AI, Machine Learning, dApps, Web3, and Blockchain.",
    images: ["/opengraph-image.png"],
    creator: "@arsahak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${lato.variable}`}>
      <body className={`${lato.className} overflow-x-hidden text-black`}>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
