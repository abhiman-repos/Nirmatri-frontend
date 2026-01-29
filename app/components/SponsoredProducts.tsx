"use client";

import { useState } from "react";
import {
  Star,
  TrendingUp,
  Award,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Card } from "@/app/components/ui/card";

const sponsoredProducts = [
  {
    id: 1,
    name: "Premium Silk Hand-Embroidered Kurta Set",
    artisan: "Priya Sharma",
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568371600021-36b968768c30",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Artisan Handwoven Cotton Saree",
    artisan: "Lakshmi Reddy",
    price: 3299,
    originalPrice: 4999,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Luxury Crochet Designer Shawl",
    artisan: "Anjali Devi",
    price: 1899,
    originalPrice: 2999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612208141706-2fbd2d45a143",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Heritage Terracotta Dinner Set (24 pieces)",
    artisan: "Meera Patel",
    price: 2799,
    originalPrice: 3999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611152171907-886a565484b5",
    badge: "Bestseller",
  },
];

export function SponsoredProducts() {
  const [loading, setLoading] = useState<{
    id: number | null;
    type: "cart" | "buy" | null;
  }>({ id: null, type: null });

  const discount = (original: number, current: number) =>
    Math.round(((original - current) / original) * 100);

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-blue-50/30 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            <span className="font-semibold">Sponsored</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl dark:text-gray-100">
              Top Rated Products
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Highly recommended by our community
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsoredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-white dark:bg-gray-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* IMAGE (clean – no cart icon) */}
              <div className="relative h-[200px] md:h-[230px] lg:h-[260px] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Sponsored */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Sponsored
                </div>

                <Badge
  className="
    absolute top-3 right-3
    bg-black text-white
    dark:bg-white dark:text-blue-950
  "
>
  {product.badge}
</Badge>


                {/* Discount */}
                <div className="absolute top-12 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                  {discount(product.originalPrice, product.price)}% OFF
                </div>
              </div>

              {/* INFO */}
              <div className="p-4 space-y-2">
                {/* NAME */}
                <h3 className="text-sm font-medium line-clamp-2 dark:text-gray-100">
                  {product.name}
                </h3>

                {/* ARTISAN */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  by {product.artisan}
                </p>

                {/* RATING ONLY */}
                <div className="flex items-center">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-[2px] rounded text-xs font-semibold">
                    <Star className="h-3 w-3 fill-white" />
                    {product.rating}
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-bold text-blue-900 dark:text-blue-400">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-2">
                  {/* ADD TO CART */}
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-900 hover:bg-blue-950 text-sm"
                    disabled={loading.id === product.id}
                    onClick={() => {
                      setLoading({ id: product.id, type: "cart" });
                      setTimeout(
                        () => setLoading({ id: null, type: null }),
                        1200
                      );
                    }}
                  >
                    {loading.id === product.id &&
                    loading.type === "cart" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>

                  {/* BUY NOW */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-sm border-blue-900 text-blue-900 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400"
                    disabled={loading.id === product.id}
                    onClick={() => {
                      setLoading({ id: product.id, type: "buy" });
                      setTimeout(
                        () => setLoading({ id: null, type: null }),
                        1200
                      );
                    }}
                  >
                    {loading.id === product.id &&
                    loading.type === "buy" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing
                      </span>
                    ) : (
                      "Buy Now"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
