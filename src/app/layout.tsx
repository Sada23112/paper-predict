import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "PaperPredict AI | CBSE 2026 Exam Question Predictor & Model Papers",
  description:
    "AI-powered exam question predictor based on 6 years of CBSE PYQ pattern analysis. Discover high-probability questions, chapter heatmaps, and download printable predicted mock papers.",
  keywords: [
    "CBSE 2026",
    "Class 10 Science important questions",
    "Class 12 Physics guess paper",
    "CBSE question predictor",
    "PaperPredict AI",
    "CBSE PYQ pattern analysis",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
