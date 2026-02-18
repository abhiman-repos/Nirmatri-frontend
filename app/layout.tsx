import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";


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
        {/* ✅ Wrap entire app with ThemeProvider for global theme access */}
        <ThemeProvider>
          <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          {children}
        </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
