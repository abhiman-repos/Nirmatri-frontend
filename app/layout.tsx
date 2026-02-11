import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/app/components/HeaderWrapper";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Nirmatri",
  description: "Nirmatri Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/*  THEME PROVIDER (ROOT) */}
        <ThemeProvider>
          {/*  HEADER + SIDEBAR CONTROLLER */}
          <HeaderWrapper />

          {/*  PAGE CONTENT */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
