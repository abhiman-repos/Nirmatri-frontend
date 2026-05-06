"use client";

import { useRouter } from "next/navigation";
import { Store, Mail, Phone, Clock } from "lucide-react";

interface Seller {
  _id: string;
  store_name: string;
  owner_name: string;
  email: string;
  phone_number: string;
  status: string;
}

export default function SellerRequestCard({ seller }: { seller: Seller }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/super-admin/sellers/${seller._id}`)}
      className="
      bg-white dark:bg-gray-800
      rounded-xl
      shadow
      p-4
      flex
      items-center
      justify-between
      hover:shadow-lg
      cursor-pointer
      transition
    "
    >
      {/* Store Info */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
          <Store size={20} className="text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold">{seller.store_name}</h3>
          <p className="text-sm text-gray-500">{seller.owner_name}</p>
        </div>
      </div>

      {/* Contact */}
      <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Mail size={14} />
          {seller.email}
        </span>

        <span className="flex items-center gap-1">
          <Phone size={14} />
          {seller.phone_number}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-yellow-500" />
        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
          Pending
        </span>
      </div>
    </div>
  );
}