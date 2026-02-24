import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-JMQLNXQGYQ";

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
    default: "xTriam - Software Built for Contractors",
    template: "%s | xTriam",
  },
  description:
    "xTriam builds software that helps contractors run their businesses — from Salesforce-native CRM to AI-powered invoicing. Serving window, door, and trade contractors.",
  keywords: [
    "contractor software",
    "CRM",
    "window contractors",
    "door contractors",
    "Salesforce",
    "bpmPro",
    "InvoiceTicket",
    "invoicing for contractors",
    "AI invoicing",
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
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "xTriam - Software Built for Contractors",
      },
    ],
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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
