import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Providers } from "./providers"; // 1. Import the Theme Provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sejpo",
  description: "Sejpo is a premier outdoor advertising company specializing in billboard, digital, and transit media solutions. We help brands maximize visibility with strategic placements and high-impact campaigns across diverse platforms.",
};

export default function RootLayout({ children }) {
  return (
    // 2. Add `suppressHydrationWarning` to the <html> tag
    // This is important for next-themes to work correctly without errors.
    <html lang="en" suppressHydrationWarning> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 3. Wrap your layout components with the Providers component */}
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}