import type { Metadata } from "next";
import "./globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import HeaderWrapper from "@/app/components/HeaderWrapper";
import { AuthProvider } from "./components/context/AuthContext"; // ✅ ADD THIS
import "leaflet/dist/leaflet.css"; 
import { CartProvider } from "./components/context/CartContext";

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

          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <AuthProvider>
              <HeaderWrapper />
              <CartProvider>
              {children}
              </CartProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
      </body>
    </html>
  );
}
