"use client";

import {
  Bell,
  Gift,
  Package,
  Settings,
  Tag,
  Truck,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "Order Shipped!",
    message: "Your order ORD-2024-002 has been shipped. Track your delivery.",
    time: "2 hours ago",
    icon: Truck,
    read: false,
  },
  {
    id: 2,
    type: "offer",
    title: "Flash Sale! 🔥",
    message: "Get up to 50% off on electronics. Limited time offer!",
    time: "5 hours ago",
    icon: Tag,
    read: false,
  },
  {
    id: 3,
    type: "product",
    title: "Back in Stock",
    message: "Wireless Earbuds Pro from your wishlist is back in stock.",
    time: "1 day ago",
    icon: Package,
    read: true,
  },
  {
    id: 4,
    type: "offer",
    title: "Birthday Special! 🎂",
    message: "Happy Birthday! Here's a special 20% discount just for you.",
    time: "3 days ago",
    icon: Gift,
    read: true,
  },
];

const notificationSettings = [
  {
    id: "orders",
    label: "Order Updates",
    description: "Get notified about order status changes",
  },
  {
    id: "offers",
    label: "Offers & Promotions",
    description: "Receive exclusive deals and discounts",
  },
  {
    id: "products",
    label: "New Products",
    description: "Be the first to know about new arrivals",
  },
  {
    id: "wishlist",
    label: "Wishlist Alerts",
    description: "Price drops and back in stock alerts",
  },
];

export function NotificationsSection() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Bell className="w-6 h-6 text-orange-500 dark:text-blue-400" />
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your orders and offers
          </p>
        </div>

        <Button
          variant="outline"
          className="
            gap-2
            border-orange-300 text-orange-600 hover:bg-orange-50
            dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10
          "
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================= NOTIFICATIONS LIST ================= */}
        <div className="lg:col-span-2 space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon;

            return (
              <Card
                key={notif.id}
                className={`
                  transition-all cursor-pointer
                  bg-white dark:bg-[#0f0f10]
                  border border-orange-200 dark:border-white/10
                  hover:shadow-md dark:hover:bg-[#16181c]
                  ${
                    !notif.read
                      ? "border-l-4 border-l-orange-500 dark:border-l-blue-400"
                      : ""
                  }
                `}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                        ${
                          notif.type === "order"
                            ? "bg-orange-100 text-orange-600 dark:bg-blue-500/20 dark:text-blue-400"
                            : notif.type === "offer"
                            ? "bg-orange-100 text-orange-600 dark:bg-blue-500/20 dark:text-blue-400"
                            : "bg-orange-100 text-orange-600 dark:bg-blue-500/20 dark:text-blue-400"
                        }
                      `}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-orange-500 dark:bg-blue-400 mt-2" />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ================= SETTINGS ================= */}
        <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10 h-fit">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
              Notification Preferences
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {notificationSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <Label className="font-medium text-gray-900 dark:text-gray-100">
                    {setting.label}
                  </Label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {setting.description}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
