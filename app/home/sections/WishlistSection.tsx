"use client";

import {
  Heart,
  ShoppingCart,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const initialItems = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
    inStock: true,
    liked: true,
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    inStock: true,
    liked: true,
  },
  {
    id: 3,
    name: "Cotton Casual Shirt",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    inStock: false,
    liked: true,
  },
];

export function WishlistSection() {
  const [items, setItems] = useState(initialItems);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const fakeApi = (ms: number) =>
    new Promise((r) => setTimeout(r, ms));

  // ❤️ DOUBLE CLICK TO TOGGLE WISHLIST
  const toggleWishlist = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handleAddToCart = async (id: number) => {
    setAddingId(id);
    await fakeApi(1000);
    setAddingId(null);
  };

  const handleRemove = async (id: number) => {
    setRemovingId(id);
    await fakeApi(600);
    setItems((prev) => prev.filter((i) => i.id !== id));
    setRemovingId(null);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          My Wishlist
          <Heart className="w-6 h-6 text-red-500 fill-current" />
        </h1>

        <p className="text-gray-500 mt-1">
          {items.length} items saved
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            onDoubleClick={() => toggleWishlist(item.id)}
            className="group cursor-pointer overflow-hidden rounded-2xl border bg-white dark:bg-[#0f0f10]
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-0">

              {/* IMAGE */}
              <div className="relative h-[240px] overflow-hidden">

                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* DISCOUNT */}
                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {item.discount}% OFF
                </span>

                {/* HEART */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      item.liked
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">

                <h3 className="font-semibold line-clamp-2">
                  {item.name}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    ₹{item.price}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    ₹{item.originalPrice}
                  </span>
                </div>

                {!item.inStock && (
                  <p className="text-sm text-red-500 font-medium">
                    Out of Stock
                  </p>
                )}

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">

                  <Button
                    disabled={!item.inStock || addingId === item.id}
                    onClick={() => handleAddToCart(item.id)}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    {addingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    {removingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>

                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}