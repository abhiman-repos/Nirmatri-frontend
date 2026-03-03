import type { Metadata } from "next";
import "./globals.css";
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
      <body
        className="
          min-h-screen
          bg-[#EAF2EC]
        "
      >
        {/* 🔐 AUTH PROVIDER (ROOT) */}
        <AuthProvider>
          {/* 🎨 THEME PROVIDER */}
          <ThemeProvider>
            {/* 🧭 HEADER + SIDEBAR */}
            <HeaderWrapper />

            {/* 📄 PAGE CONTENT */}
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}