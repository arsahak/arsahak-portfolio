import { Lato, Orbitron } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Dashboard | AR Sahak",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${lato.variable}`}>
      <body className={`${lato.className} overflow-x-hidden text-black`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 