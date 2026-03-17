import { ShoppingCart } from "lucide-react";
import { useCart } from "./context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart className="h-6 w-6" />

      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-full">
          {cart.length}
        </span>
      )}
    </div>
  );
}