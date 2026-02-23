import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import HeaderWrapper from "@/app/components/HeaderWrapper";

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

          <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >

          {/*  HEADER + SIDEBAR CONTROLLER */}
          <HeaderWrapper />

          {/*  PAGE CONTENT */}
          {children}
        </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
