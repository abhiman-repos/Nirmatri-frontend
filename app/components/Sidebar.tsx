"use client";

import {
  X,
  Home,
  User,
  Heart,
  ShoppingBag,
  Info,
  Mail,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  const navigationItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: User, label: "Profile", href: "#" },
    { icon: ShoppingBag, label: "My Orders", href: "#" },
    { icon: Heart, label: "Wishlist", href: "#" },
    { icon: Users, label: "Our Artisans", href: "#" },
    { icon: Info, label: "About Us", href: "#" },
    { icon: Mail, label: "Contact", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const handleLogout = () => {
    onClose();            // sidebar band
    router.push("/");     // 👉 landing page
    // agar login page /login hai:
    // router.push("/login");
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-transparent ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800
        shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Menu
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-700
                         transition-all duration-300 hover:rotate-90"
            >
              <X className="h-5 w-5 dark:text-gray-300" />
            </Button>
          </div>

          {/* USER PROFILE */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100
                          dark:from-blue-900/20 dark:to-blue-800/20
                          border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br
                              from-blue-700 to-blue-900
                              flex items-center justify-center
                              text-white text-2xl font-semibold shadow-lg">
                P
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Priya Sharma
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  priya.sharma@email.com
                </p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg
                               text-gray-700 dark:text-gray-300
                               hover:bg-gradient-to-r
                               hover:from-blue-50 hover:to-blue-100
                               dark:hover:from-blue-900/20 dark:hover:to-blue-800/20
                               hover:text-blue-900 dark:hover:text-blue-300
                               transition-all duration-300 group"
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* LOGOUT */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2
                         border-red-300 dark:border-red-800
                         text-red-600 dark:text-red-400
                         hover:bg-red-50 dark:hover:bg-red-900/20
                         hover:border-red-400 dark:hover:border-red-700
                         transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
