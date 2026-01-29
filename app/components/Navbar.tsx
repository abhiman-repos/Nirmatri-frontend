"use client";

import {
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";

export function Navbar() {
  const [cartCount] = useState(3);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auto-hide top bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTopBar(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Search Sheet */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="p-4">
          <form action="/search" className="flex gap-2">
            <Input
              autoFocus
              name="q"
              type="search"
              placeholder="Search products..."
              className="flex-1"
            />
            <Button size="icon" type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Top Bar */}
        <div
          className={`overflow-hidden transition-all duration-700 ${
            showTopBar ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 px-4">
            <div className="max-w-7xl mx-auto text-center text-sm">
              Where tradition is handcrafted into elegance
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* LOGO */}
            <Link href="/">
              <img
                src="/bgnirmatri.png"
                alt="Nirmatri Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP SEARCH */}
            <div className="hidden md:flex flex-1 justify-center">
              <form action="/search" className="relative w-full max-w-xl">
                <Input
                  name="q"
                  type="search"
                  placeholder="Search handcrafted products..."
                  className="
                    w-full h-12 pl-5 pr-12 rounded-full text-base
                    bg-white dark:bg-[#111827]
                    text-gray-900 dark:text-gray-100
                    border border-gray-300 dark:border-gray-600
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:ring-2 focus:ring-blue-500/40
                  "
                />
                <Button
                  size="icon"
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    h-8 w-8 rounded-full bg-blue-900 hover:bg-blue-950"
                >
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </form>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2 md:gap-3 ml-auto">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-6 w-6" />
              </Button>

              <ThemeToggle />

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-blue-900 text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* USER PROFILE → EXTREME RIGHT */}
              <Link href="/userdashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    ml-2
                    rounded-full
                    border border-gray-300 dark:border-gray-600
                    hover:scale-105 transition-transform
                  "
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
