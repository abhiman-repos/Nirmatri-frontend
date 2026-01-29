"use client";

import { useState } from "react";
import {
  Download,
  Package,
  RefreshCw,
  Truck,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

const orders = [
  {
    id: "ORD-2024-001",
    date: "15 Jan 2024",
    status: "delivered",
    total: 2499,
    items: [
      { name: "Wireless Bluetooth Headphones", qty: 1, price: 2499, image: "🎧" },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "20 Jan 2024",
    status: "shipped",
    total: 1299,
    items: [
      { name: "Smart Watch Band", qty: 2, price: 649, image: "⌚" },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "25 Jan 2024",
    status: "processing",
    total: 4999,
    items: [
      { name: "Running Shoes - Nike Air", qty: 1, price: 4999, image: "👟" },
    ],
  },
];

const statusConfig = {
  processing: { label: "Processing", icon: Package },
  shipped: { label: "Shipped", icon: Truck },
  delivered: { label: "Delivered", icon: Package },
};

export function OrdersSection() {
  const [invoiceLoading, setInvoiceLoading] = useState<string | null>(null);
  const [reorderLoading, setReorderLoading] = useState<string | null>(null);

  const fakeApi = () => new Promise((r) => setTimeout(r, 1200));

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e5e7eb]">
          My Orders
        </h1>
        <p className="text-gray-600 dark:text-[#9ca3af]">
          Track and manage your orders
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: 12 },
          { label: "In Progress", value: 2 },
          { label: "Delivered", value: 10 },
        ].map((stat, i) => (
          <Card
            key={i}
            className="
              bg-orange-50 border-orange-200
              dark:bg-[#16181c] dark:border-white/10
            "
          >
            <CardContent className="pt-4 text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-[#9ca3af]">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= ORDERS ================= */}
      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon =
            statusConfig[order.status as keyof typeof statusConfig].icon;

          return (
            <Card
              key={order.id}
              className="
                bg-white border-orange-200
                dark:bg-[#0f0f10] dark:border-white/10
                overflow-hidden
              "
            >
              <CardContent className="p-0">
                {/* -------- Header -------- */}
                <div
                  className="
                    flex items-center justify-between p-4
                    bg-orange-50 border-b border-orange-200
                    dark:bg-[#16181c] dark:border-white/10
                  "
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-gray-600 dark:text-[#9ca3af]">
                      {order.id}
                    </span>
                    <Badge
                      variant="outline"
                      className="
                        bg-orange-100 text-orange-600 border-orange-200
                        dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40
                      "
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-[#9ca3af]">
                    {order.date}
                  </span>
                </div>

                {/* -------- Items -------- */}
                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div
                        className="
                          w-16 h-16 rounded-lg
                          bg-orange-100
                          dark:bg-[#1f232a]
                          flex items-center justify-center text-3xl
                        "
                      >
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-[#e5e7eb]">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-[#9ca3af]">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-[#e5e7eb]">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* -------- Footer -------- */}
                <div
                  className="
                    flex items-center justify-between p-4
                    border-t border-orange-200
                    dark:border-white/10
                  "
                >
                  <div className="font-semibold text-gray-900 dark:text-[#e5e7eb]">
                    Total: ₹{order.total.toLocaleString()}
                  </div>

                  <div className="flex gap-2">
                    {/* Invoice */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={invoiceLoading === order.id}
                      onClick={async () => {
                        setInvoiceLoading(order.id);
                        await fakeApi();
                        setInvoiceLoading(null);
                      }}
                      className="
                        gap-1 border-orange-300 text-gray-800
                        dark:border-white/20 dark:text-[#e5e7eb]
                        hover:bg-orange-50 dark:hover:bg-[#1f232a]
                      "
                    >
                      {invoiceLoading === order.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Invoice
                    </Button>

                    {/* Re-order */}
                    <Button
                      size="sm"
                      disabled={reorderLoading === order.id}
                      onClick={async () => {
                        setReorderLoading(order.id);
                        await fakeApi();
                        setReorderLoading(null);
                      }}
                      className="
                        gap-1 bg-orange-500 hover:bg-orange-600 text-white
                        dark:bg-blue-400 dark:hover:bg-blue-300 dark:text-black
                      "
                    >
                      {reorderLoading === order.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Re-ordering…
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Re-order
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
