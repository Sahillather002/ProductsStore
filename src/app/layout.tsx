import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProviderWrapper } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Store - Premium E-Commerce Platform",
  description: "Modern e-commerce platform with amazing deals, fast shipping, and secure payments in India.",
  keywords: ["e-commerce", "shopping", "online store", "premium products", "deals", "India"],
  authors: [{ name: "Product Store Team" }],
  icons: {
    icon: "/product-store-logo.svg",
  },
  openGraph: {
    title: "Product Store - Premium E-Commerce",
    description: "Discover amazing products at unbeatable prices in India",
    url: "https://productstore.com",
    siteName: "Product Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Store - Premium E-Commerce",
    description: "Discover amazing products at unbeatable prices in India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProviderWrapper>
              {children}
              <Toaster />
            </SessionProviderWrapper>
          </ThemeProvider>
      </body>
    </html>
  );
}
