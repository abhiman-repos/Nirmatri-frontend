"use client";

import { Search, LogIn, Menu, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import NirmatriLogo from "@/app/components/Nirmatri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useAuth } from "./context/AuthContext";

type HeaderProps = {
  onUserClick?: () => void;
};

export function Header({ onUserClick }: HeaderProps) {
  const [showTopBar, setShowTopBar] = useState(true);
  const [cartCount] = useState<number>(0);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sheetSearchOpen, setSheetSearchOpen] = useState(false);

  const { isLoggedIn } = useAuth(); // 🔐 auth state
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  /* ⏱️ TOP BAR AUTO HIDE */
  useEffect(() => {
    const timer = setTimeout(() => setShowTopBar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  /* 🔁 ROUTE CHANGE → CLOSE SEARCH */
  useEffect(() => {
    startTransition(() => {
      setMobileSearchOpen(false);
      setSheetSearchOpen(false);
    });
  }, [pathname]);

  /* 👆 CLICK OUTSIDE (MOBILE SEARCH) */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileSearchOpen]);

  if (
    pathname.startsWith("/userauth") ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/superadmin")
  ) {
    return null;
  }

  return (
    <>
      {/* 🔍 MOBILE SEARCH SHEET */}
      <Sheet open={sheetSearchOpen} onOpenChange={setSheetSearchOpen}>
        <SheetContent side="top" className="p-4 bg-[#6968A6]">
          <form action="/search" className="flex gap-2">
            <Input
              autoFocus
              name="q"
              type="search"
              placeholder="Search products..."
            />
            <Button size="icon" type="submit">
              <Search className="h-4 w-4 text-blue-500" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <header className="bg-[#3D6B4F] backdrop-blur-md sticky top-0 z-50 ">
        {/* 🔹 TOP BAR */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            showTopBar ? "max-h-10" : "max-h-0"
          }`}
        >
          <div className="bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800 text-white text-xs py-2 text-center">
            Where tradition is handcrafted into elegance
          </div>
        </div>

        {/* 🔹 MAIN HEADER */}

        <div className="h-14">
          <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-3">
            <NirmatriLogo />

            {/* DESKTOP SEARCH */}
            <div className="hidden md:flex flex-1 justify-center">
              <form action="/search" className="relative w-full max-w-xl">
                <Input
                  name="q"
                  type="search"
                  placeholder="Search handcrafted products..."
                  className="h-9 pl-4 pr-11 rounded-full bg-white"
                />
                <Button
                  size="icon"
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
                >
                  <Search className="h-6 w-6 text-white" />
                </Button>
              </form>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 ml-auto">
              {/* MOBILE SEARCH */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={() => setMobileSearchOpen((p) => !p)}
              >
                <Search className="h-6 w-6" />
              </Button>

              {!isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-8 px-3 gap-1.5 bg-[#EAF2EC] hover:bg-white"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push("/userauth/login")}
                    >
                      Continue as User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/seller/login")}
                    >
                      Login as Seller
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* 🟢 LOGGED-IN MODE */
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full hover:bg-white/10"
                    onClick={() => router.push("/home/card")}
                  >
                    <ShoppingCart className="h-6 w-6 text-white" />

                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center px-1">
                        {cartCount}
                      </span>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onUserClick}
                    className="rounded-full border border-[#6968A6]/30"
                  >
                    <Menu className="h-5 w-5 text-white" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
