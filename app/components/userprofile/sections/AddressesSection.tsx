"use client";

import { useState } from "react";
import {
  Building2,
  Edit2,
  Home,
  MapPin,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

const initialAddresses = [
  {
    id: 1,
    type: "home",
    label: "Home",
    name: "Rahul Kumar",
    address: "123, Sector 15, Near City Mall",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122001",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: 2,
    type: "office",
    label: "Office",
    name: "Rahul Kumar",
    address: "Tower B, 5th Floor, Cyber Hub",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
    phone: "+91 98765 43210",
    isDefault: false,
  },
];

export function AddressesSection() {
  const [addressList, setAddressList] = useState(initialAddresses);
  const [adding, setAdding] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const fakeApi = () => new Promise((r) => setTimeout(r, 1000));

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e5e7eb]">
            Saved Addresses
          </h1>
          <p className="text-gray-600 dark:text-[#9ca3af]">
            Manage your delivery addresses
          </p>
        </div>

        <Button
          disabled={adding}
          onClick={async () => {
            setAdding(true);
            await fakeApi();
            setAdding(false);
          }}
          className="
            gap-2 bg-orange-500 hover:bg-orange-600 text-white
            dark:bg-blue-400 dark:hover:bg-blue-300 dark:text-black
          "
        >
          {adding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding…
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add New Address
            </>
          )}
        </Button>
      </div>

      {/* ================= ADDRESS CARDS ================= */}
      <div className="grid gap-4 md:grid-cols-2">
        {addressList.map((addr) => (
          <Card
            key={addr.id}
            className={`
              relative transition-all
              bg-white border-2 border-orange-200
              hover:border-orange-500
              dark:bg-[#0f0f10] dark:border-white/10 dark:hover:border-blue-500/50
            `}
          >
            {addr.isDefault && (
              <div
                className="
                  absolute top-0 right-0 px-3 py-1 text-xs font-medium
                  bg-orange-500 text-white
                  dark:bg-blue-400 dark:text-black
                  rounded-bl-lg
                "
              >
                Default
              </div>
            )}

            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div
                  className="
                    w-12 h-12 rounded-xl flex items-center justify-center
                    bg-orange-100 text-orange-600
                    dark:bg-[#1f232a] dark:text-blue-400
                  "
                >
                  {addr.type === "home" ? (
                    <Home className="w-6 h-6" />
                  ) : (
                    <Building2 className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-[#e5e7eb]">
                      {addr.label}
                    </h3>
                    <Badge
                      variant="outline"
                      className="
                        text-xs border-orange-300 text-orange-600
                        dark:border-blue-500/40 dark:text-blue-300
                      "
                    >
                      {addr.type}
                    </Badge>
                  </div>

                  <p className="font-medium text-gray-900 dark:text-[#e5e7eb]">
                    {addr.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-[#9ca3af] mt-1">
                    {addr.address}, {addr.city}, {addr.state} – {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-[#9ca3af] mt-1">
                    {addr.phone}
                  </p>
                </div>
              </div>

              {/* ================= ACTIONS ================= */}
              <div
                className="
                  flex gap-2 mt-4 pt-4
                  border-t border-orange-200
                  dark:border-white/10
                "
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="
                    flex-1 gap-1 border-orange-300 text-orange-600
                    hover:bg-orange-50
                    dark:border-white/20 dark:text-[#e5e7eb]
                    dark:hover:bg-[#1f232a]
                  "
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={loadingId === addr.id}
                  onClick={async () => {
                    setLoadingId(addr.id);
                    await fakeApi();
                    setAddressList((p) => p.filter((a) => a.id !== addr.id));
                    setLoadingId(null);
                  }}
                  className="
                    gap-1 border-orange-300 text-red-600
                    hover:bg-red-50
                    dark:border-white/20 dark:text-red-400
                    dark:hover:bg-red-500/10
                  "
                >
                  {loadingId === addr.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </Button>

                {!addr.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loadingId === addr.id}
                    onClick={async () => {
                      setLoadingId(addr.id);
                      await fakeApi();
                      setAddressList((p) =>
                        p.map((a) => ({
                          ...a,
                          isDefault: a.id === addr.id,
                        }))
                      );
                      setLoadingId(null);
                    }}
                    className="
                      gap-1 border-orange-300 text-orange-600
                      hover:bg-orange-50
                      dark:border-blue-500/40 dark:text-blue-300
                      dark:hover:bg-blue-500/10
                    "
                  >
                    <MapPin className="w-4 h-4" />
                    Set Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* ================= ADD NEW CARD ================= */}
        <Card
          className="
            border-2 border-dashed border-orange-300
            hover:border-orange-500
            bg-white cursor-pointer
            dark:bg-[#0f0f10] dark:border-white/20 dark:hover:border-blue-500/50
          "
        >
          <CardContent className="py-12 flex flex-col items-center justify-center text-orange-600 dark:text-blue-300">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-[#1f232a] flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <p className="font-medium">Add New Address</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
