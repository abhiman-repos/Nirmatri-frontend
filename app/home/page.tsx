"use client";

import { useEffect } from "react";
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

  /* 🔒 HOME PAGE GUARD */
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      
      alert("You must be logged in to access the home page.");
      router.replace("/");
    }
  },
   []);


  return (
    
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <VideoLikeCarousel />
        <CategoryShowcase />
        <SponsoredProducts />
        <ArtisanSpotlight />
        <WhyShopWithUs />
        <NirmatriFooter />
      </div> 

  );
}
