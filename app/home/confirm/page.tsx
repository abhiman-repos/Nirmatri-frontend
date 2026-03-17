"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function ConfirmPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6">

        {/* Success Icon */}
        <CheckCircle className="mx-auto text-green-600 h-16 w-16" />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className="text-gray-500">
          Congratulations 🎉 Your order has been placed with 
          <span className="font-semibold"> Cash on Delivery</span>.
        </p>

        <p className="text-sm text-gray-400">
          You will receive your order within 3-5 business days.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4">

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => router.push("/home")}
          >
            Explore More Products
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/home/card")}
          >
            View Cart
          </Button>

        </div>

      </div>
    </div>
  );
}