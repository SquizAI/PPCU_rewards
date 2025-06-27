import type { Metadata } from "next";
import { Montserrat, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Using similar fonts to PPCU's brand
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Postpartum Care USA - Share Your Experience",
  description: "Help other mothers by sharing your postpartum care experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${quicksand.variable} font-body`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
