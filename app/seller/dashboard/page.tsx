"use client";

import Link from "next/link";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  Clock,
  Plus,
  Layers,
  Landmark,
  ShieldCheck,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";

export default function SellerDashboardPage() {
  const seller = {
    storeName: "Nirmatri Crafts",
    sellerId: "SELLER-1023",
    status: "Pending KYC",
  };

  const stats = {
    totalOrders: 128,
    activeProducts: 34,
    totalEarnings: "₹84,560",
    pendingOrders: 6,
  };

  const orders = [
    { id: "ORD-1001", product: "Handmade Vase", status: "Delivered", amount: "₹1,200" },
    { id: "ORD-1002", product: "Clay Pot Set", status: "Shipped", amount: "₹2,450" },
    { id: "ORD-1003", product: "Wooden Wall Art", status: "Pending", amount: "₹980" },
  ];

  const notifications = [
    { text: "Complete your KYC to receive payouts", icon: AlertTriangle, color: "text-orange-500" },
    { text: "New order received today", icon: ShoppingCart, color: "text-green-500" },
    { text: "One product is out of stock", icon: Package, color: "text-red-500" },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 p-4 md:p-8">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {seller.storeName}
        </h1>
        <p className="text-sm text-slate-500">
          Seller ID: {seller.sellerId} ·{" "}
          <span className="text-orange-600">{seller.status}</span>
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={Package} />
        <StatCard title="Active Products" value={stats.activeProducts} icon={Layers} />
        <StatCard title="Total Earnings" value={stats.totalEarnings} icon={IndianRupee} />
        <StatCard title="Pending Orders" value={stats.pendingOrders} icon={Clock} />
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ActionButton title="Add New Product" icon={Plus}  href="/seller/dashboard/products?mode=add"/>
        <ActionButton title="Manage Products" icon={ShoppingBag} href="/seller/dashboard/manageproducts" />
        <ActionButton title="Bank Details" icon={Landmark} href="/seller/dashboard/bank-details" />
        <ActionButton title="KYC Status" icon={ShieldCheck} href="/seller/dashboard/kyc-status" />
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
          Notifications & Alerts
        </h2>

        <ul className="space-y-3">
          {notifications.map((note, index) => {
            const Icon = note.icon;
            return (
              <li
                key={index}
                className="flex items-center gap-3 border-l-4 border-blue-500 bg-slate-50 dark:bg-blue-900/20 px-4 py-3 rounded-r-lg"
              >
                <Icon className={`w-4 h-4 ${note.color}`} />
                <span>{note.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

/* SMALL COMPONENTS */

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
      <div className="flex justify-between mb-2">
        <p className="text-sm text-slate-500">{title}</p>
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}

function ActionButton({
  title,
  icon: Icon,
  href,
}: {
  title: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center gap-3 hover:shadow-md"
    >
      <Icon className="w-6 h-6 text-blue-600" />
      <span>{title}</span>
    </Link>
  );
}
