import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/components/context/AuthContext";
import HeaderWrapper from "@/app/components/HeaderWrapper";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { AuthProvider } from "@/app/contexts/AuthContext"; // ✅ ADD THIS

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
        <ThemeProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <AuthProvider>
              <HeaderWrapper />
              {children}
            </AuthProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}