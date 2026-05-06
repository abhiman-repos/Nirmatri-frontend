"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Award, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "@/app/components/ui/card";
import { useCart } from "./context/CartContext";

const TopsellersProduct = [
  {
    id: 1,
    name: "Premium Silk",
    artisan: "Priya Sharma",
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568371600021-36b968768c30",
  },
];

export function SponsoredProducts() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [loading, setLoading] = useState<{
    id: number | null;
    type: "cart" | "buy" | null;
  }>({ id: null, type: null });

  const discount = (original: number, current: number) =>
    Math.round(((original - current) / original) * 100);

  return (
    <section className="py-12 px-4 bg-[#EAF2EC]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            <span className="font-semibold">Top Sellers</span>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TopsellersProduct.map((product) => (
            <Card
              key={product.id}
              onClick={() =>
                router.push(`/home/products/${product.id}`)
              }
              className="group overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {/* IMAGE AREA */}
              <div className="relative h-[240px] md:h-[300px] overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* DISCOUNT BADGE */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {discount(product.originalPrice, product.price)}% OFF
                </div>

                {/* RATING */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur text-white px-2 py-1 rounded-md text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </div>
              </div>

              {/* INFO */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500">by {product.artisan}</p>

                {/* PRICE */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-bold text-[#1A3A2A]">
                    ₹{product.price.toLocaleString()}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#1a3a2a] hover:bg-green-500 hover:text-black text-sm"
                    disabled={loading.id === product.id}
                    onClick={(e) => {
                      e.stopPropagation();

                      addToCart(product);

                      setLoading({ id: product.id, type: "cart" });

                      setTimeout(
                        () => setLoading({ id: null, type: null }),
                        1000,
                      );
                    }}
                  >
                    {loading.id === product.id && loading.type === "cart" ? (
                      <span className="flex  items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-sm border-bluen-900 text-brown hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400"
                    disabled={loading.id === product.id}
                    onClick={(e) => {
                      e.stopPropagation();

                      setLoading({ id: product.id, type: "buy" });

                      setTimeout(() => {
                        setLoading({ id: null, type: null });
                        router.push("/home/address");
                      }, 800);
                    }}
                  >
                    {loading.id === product.id && loading.type === "buy" ? (
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
