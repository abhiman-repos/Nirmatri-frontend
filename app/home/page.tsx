"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { VideoLikeCarousel } from "@/app/components/VideoLikeCarousel";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { SponsoredProducts } from "@/app/components/SponsoredProducts";
import { ArtisanSpotlight } from "@/app/components/ArtisanSpotlight";
import { WhyShopWithUs } from "@/app/components/WhyShopWithUs";
import { NirmatriFooter } from "@/app/components/NirmatriFooter";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

export default function Page() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

/* 🔒 HOME PAGE GUARD */
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/userauth/login");
  } else {
    setIsAuthorized(true);
  }
}, [router]);

if (!isAuthorized)
{
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black transition-colors duration-300">
        <VideoLikeCarousel />
        <CategoryShowcase />
        <SponsoredProducts />
        <ArtisanSpotlight />
        <WhyShopWithUs />
        <NirmatriFooter />
      </div>
    </ThemeProvider>
  );}
}
