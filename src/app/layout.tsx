import type { Metadata } from "next";

import "./globals.css";

import NavBar from "@/components/Nav";

export const metadata: Metadata = {
  title: "NewJeans",
  description: "NewJeans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
