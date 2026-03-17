"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  // 🔥 FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/product/${id}`);
        const data = await res.json();

        setProduct(data);
        setSelectedSize(data.sizes?.[0] || "M");
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // 🔄 LOADING STATE
  if (loading) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT: Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={750}
              className="w-full object-cover"
            />
          </Card>

          <div className="flex gap-3">
            {product.images.map((img: string, i: number) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Image src={img} alt="view" width={120} height={150} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Badge className="bg-green-900">Handcrafted</Badge>

          <h1 className="text-3xl font-semibold">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-green-700 text-green-700" />
            ))}
            <span className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-900">
              ₹{product.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.originalPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600">{product.description}</p>

          {/* Sizes */}
          <div>
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-3">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? "bg-green-900 text-white"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border rounded"
            >
              <Minus size={16} />
            </button>

            {quantity}

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 border rounded"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-green-900">
              <ShoppingBag className="mr-2" /> Add to Cart
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                router.push(
                  `/checkout?id=${product.id}&qty=${quantity}&size=${selectedSize}`
                )
              }
            >
              Buy Now
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}