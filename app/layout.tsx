import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DashboardNavbar } from "./components/dashboard-navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AZ DSA Library",
  description: "Internal preview platform for DSA Library content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#090d12] text-slate-100">
        <DashboardNavbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
