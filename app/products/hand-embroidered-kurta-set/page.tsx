"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT: Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <Image
              src="/products/kurtaset.jpg"
              alt="Hand Embroidered Kurta Set"
              width={600}
              height={750}
              className="w-full object-cover"
            />
          </Card>

          <div className="flex gap-3">
            {["/images/kurta-1.jpg", "/images/kurta-2.jpg", "/images/kurta-3.jpg"].map(
              (img, i) => (
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:border-green-800"
                >
                  <Image src={img} alt="Kurta view" width={120} height={150} />
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="space-y-6">
          <Badge className="bg-green-900">Handcrafted</Badge>

          <h1 className="text-3xl font-semibold text-gray-900">
            Hand-Embroidered Kurta Set
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-green-700 text-green-700" />
            ))}
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-900">₹3,499</span>
            <span className="text-sm text-gray-400 line-through">₹4,999</span>
            <Badge variant="outline" className="border-green-700 text-green-700">
              30% OFF
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            A timeless hand-embroidered kurta set crafted by skilled artisans
            using traditional techniques. Made with breathable fabric and
            intricate detailing, perfect for festive and everyday elegance.
          </p>

          {/* Highlights */}
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>100% Hand Embroidery</li>
            <li>Pure cotton fabric</li>
            <li>Ethically made by Indian artisans</li>
            <li>Includes Kurta & Palazzo</li>
          </ul>

          {/* Size Selection */}
          <div>
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size
                      ? "bg-green-900 text-white"
                      : "border-gray-300 hover:border-green-900"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded-lg"
              >
                <Minus size={16} />
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              className="flex-1 bg-green-900 hover:bg-green-800"
              onClick={() => {
                // future cart logic
                console.log("Added to cart", {
                  product: "Hand-Embroidered Kurta Set",
                  quantity,
                  selectedSize,
                });
              }}
            >
              <ShoppingBag className="mr-2" /> Add to Cart
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-green-900 text-green-900 hover:bg-green-50"
              onClick={() =>
                router.push(
                  `/checkout?product=hand-embroidered-kurta-set&qty=${quantity}&size=${selectedSize}`
                )
              }
            >
              Buy Now
            </Button>
          </div>

          {/* Artisan Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-900">
            🌿 Every purchase supports local artisans and preserves India’s
            handloom heritage.
          </div>
        </div>
      </div>
    </div>
  );
}