import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
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
  title: {
    default: "xTriam - Specialized CRM++ for Window & Door Contractors",
    template: "%s | xTriam",
  },
  description:
    "bpmPro is a Salesforce-native CRM designed specifically for window and door contractors in Florida. Streamline your sales, manage projects, and grow your business.",
  keywords: [
    "CRM",
    "window contractors",
    "door contractors",
    "Salesforce",
    "bpmPro",
    "Florida",
    "business process management",
  ],
  authors: [{ name: "xTriam" }],
  creator: "xTriam",
  metadataBase: new URL("https://www.xtriam.com"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "xTriam",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
