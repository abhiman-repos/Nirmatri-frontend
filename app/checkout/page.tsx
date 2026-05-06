"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT: Address Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-medium">Delivery Address</h2>

            <input className="w-full border p-3 rounded-lg" placeholder="Full Name" />
            <input className="w-full border p-3 rounded-lg" placeholder="Phone Number" />
            <input className="w-full border p-3 rounded-lg" placeholder="House / Street" />
            <input className="w-full border p-3 rounded-lg" placeholder="City" />

            <div className="grid grid-cols-2 gap-4">
              <input className="border p-3 rounded-lg" placeholder="State" />
              <input className="border p-3 rounded-lg" placeholder="Pincode" />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-medium">Payment Method</h2>
            <Badge className="bg-green-900">Cash on Delivery</Badge>
            <p className="text-sm text-gray-600">
              Online payments coming soon.
            </p>
          </Card>
        </div>

        {/* RIGHT: Order Summary */}
        <div>
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>

            <div className="flex gap-4">
              <Image
                src="/images/kurtaset.jpg"
                alt="Kurta Set"
                width={80}
                height={100}
                className="rounded-lg object-cover"
              />

              <div>
                <p className="font-medium">Hand-Embroidered Kurta Set</p>
                <p className="text-sm text-gray-500">Size: M</p>
                <p className="font-semibold mt-1">₹3,499</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹3,499</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹3,499</span>
              </div>
            </div>

            <Button
              className="w-full bg-green-900 hover:bg-green-800"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  alert("Order placed successfully 🎉");
                  setLoading(false);
                }, 1500);
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}