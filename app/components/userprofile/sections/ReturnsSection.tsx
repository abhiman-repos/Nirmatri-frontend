"use client";

import { ArrowLeft, Clock, Package, RotateCcw } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";

/* ---------------- DATA ---------------- */

const returns = [
  {
    id: "RET-2024-001",
    orderId: "ORD-2023-045",
    product: "Wireless Mouse",
    reason: "Product not as described",
    status: "refund_initiated",
    refundAmount: 799,
    createdAt: "22 Jan 2024",
    image: "🖱️",
  },
];

/* ---------------- STATUS CONFIG (FIXED) ---------------- */

const statusConfig = {
  requested: {
    label: "Return Requested",
    progress: 25,
    badge:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40",
  },
  approved: {
    label: "Return Approved",
    progress: 50,
    badge:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40",
  },
  picked_up: {
    label: "Picked Up",
    progress: 75,
    badge:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40",
  },
  refund_initiated: {
    label: "Refund Initiated",
    progress: 90,
    badge:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/40",
  },
  completed: {
    label: "Completed",
    progress: 100,
    badge:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/40",
  },
};

/* ---------------- COMPONENT ---------------- */

export function ReturnsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-orange-500 dark:text-blue-400" />
            Returns & Refunds
          </h1>
          <p className="text-muted-foreground">
            Track your return requests and refunds
          </p>
        </div>

        <Button className="gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-black">
          <ArrowLeft className="w-4 h-4" />
          Request Return
        </Button>
      </div>

      {/* Active Returns */}
      <Card>
        <CardHeader>
          <CardTitle>Active Returns</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {returns.map((item) => {
            const status =
              statusConfig[item.status as keyof typeof statusConfig];

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border bg-secondary/30"
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                    {item.image}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.product}</h3>
                      <Badge
                        variant="outline"
                        className={status.badge}
                      >
                        {status.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      Return ID: {item.id} • Order: {item.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Reason: {item.reason}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <Progress value={status.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Requested</span>
                    <span>Approved</span>
                    <span>Picked Up</span>
                    <span>Refunded</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Initiated on {item.createdAt}
                  </div>

                  <div className="font-semibold text-green-600 dark:text-green-400">
                    Refund: ₹{item.refundAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}

          {returns.length === 0 && (
            <div className="py-10 text-center">
              <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                No active return requests
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Policy */}
      <Card className="bg-accent/30">
        <CardContent className="py-4">
          <h3 className="font-medium mb-2">Return Policy</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Easy 7-day return policy</li>
            <li>• Free doorstep pickup</li>
            <li>• Refund in 5–7 business days</li>
            <li>• Original payment method</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
