import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";

import { CartProvider } from "@/app/components/context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/components/context/AuthContext";
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
      <body className="min-h-screenbg-[#EAF2EC]">
       
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