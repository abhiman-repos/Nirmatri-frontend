"use client";

import { useCart } from "../../components/context/CartContext";
import { Button } from "@/app/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter()
  const { cart } = useCart();

  const payment = () => {
    router.push("/home/payments");
};


  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500">Start adding some products</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      
      <h1 className="text-3xl font-bold mb-8">Your cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* PRODUCT LIST */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-lg"
            >
              
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-blue-900 font-semibold">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-4 font-semibold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <Button
          onClick={payment} 
          className="w-full bg-green-400 hover:bg-green-800">
            Proceed to Checkout
          </Button>
        </div>

      </div>
    </div>
  );
}