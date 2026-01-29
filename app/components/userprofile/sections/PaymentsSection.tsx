"use client";

import {
  CreditCard,
  Plus,
  Smartphone,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useState } from "react";

const savedPayments = [
  {
    id: 1,
    type: "upi",
    label: "Google Pay",
    value: "rahul@okaxis",
    icon: "📱",
    isDefault: true,
  },
  {
    id: 2,
    type: "card",
    label: "HDFC Credit Card",
    value: "•••• •••• •••• 4532",
    icon: "💳",
    isDefault: false,
  },
];

const paymentHistory = [
  {
    id: 1,
    date: "25 Jan 2024",
    amount: 4999,
    method: "Google Pay",
    order: "ORD-2024-003",
  },
  {
    id: 2,
    date: "20 Jan 2024",
    amount: 1299,
    method: "HDFC Card",
    order: "ORD-2024-002",
  },
];

export function PaymentsSection() {
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fakeApi = (ms = 1200) =>
    new Promise((r) => setTimeout(r, ms));

  const handleAddNew = async () => {
    setAdding(true);
    await fakeApi();
    setAdding(false);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await fakeApi(900);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Payments
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage payment methods and view history
        </p>
      </div>

      {/* ================= SAVED PAYMENTS ================= */}
      <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-500 dark:text-blue-400" />
            Saved Payment Methods
          </CardTitle>

          <Button
            size="sm"
            onClick={handleAddNew}
            disabled={adding}
            className="gap-2 bg-orange-500 hover:bg-orange-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-black"
          >
            {adding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding…
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add New
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {savedPayments.map((payment) => (
            <div
              key={payment.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                payment.isDefault
                  ? "border-orange-500 bg-orange-50 dark:border-blue-400 dark:bg-blue-500/10"
                  : "border-orange-200 dark:border-white/10"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-blue-500/20 flex items-center justify-center text-2xl">
                {payment.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {payment.label}
                  </span>
                  {payment.isDefault && (
                    <Badge className="bg-orange-500 text-white dark:bg-blue-400 dark:text-black text-xs">
                      Default
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {payment.value}
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                disabled={deletingId === payment.id}
                onClick={() => handleDelete(payment.id)}
                className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                {deletingId === payment.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= PAYMENT HISTORY ================= */}
      <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-orange-500 dark:text-blue-400" />
            Payment History
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 rounded-xl bg-orange-50 dark:bg-[#16181c]"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {payment.order}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {payment.method} • {payment.date}
                </div>
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                ₹{payment.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
