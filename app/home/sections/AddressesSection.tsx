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
import AddressSelector from "@/app/home/location/AddressSelector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Address = {
  id: string;
  type: string;
  label: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
  lat?: number;
  lng?: number;
};

export function AddressesSection() {
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const setOpen = (isOpen: boolean) => setShowMap(isOpen);
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) return;

        const res = await fetch("http://127.0.0.1:8000/api/user/addresses/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("ADDRESS API RESPONSE:", data);
        const addressesArray = Array.isArray(data)
          ? data
          : data.addresses || [];

        if (res.ok) {
          const formatted = addressesArray.map((a: any) => ({
            id: String(a._id),
            type: a.type || "home",
            label: a.label || "Home",
            name: a.name || "",
            address: a.address || "",
            city: a.city || "",
            state: a.state || "",
            pincode: a.pincode || "",
            phone: a.phone || "",
            isDefault: a.is_default || false,
            lat: a.lat,
            lng: a.lng,
          }));

          setAddressList(formatted);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    };

    fetchAddresses();
  }, []);

  const deleteAddress = async (id: string) => {
    const token = localStorage.getItem("auth_token");
    await fetch(`http://127.0.0.1:8000/api/user/address/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAddressList((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = async (id: string) => {
    const token = localStorage.getItem("auth_token");

    await fetch("http://127.0.0.1:8000/api/user/address/default/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address_id: id }),
    });

    setAddressList((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e5e7eb]">
            Saved Addresses
          </h1>
          <p className="text-gray-600 dark:text-[#9ca3af]">
            Manage your delivery addresses
          </p>
        </div>

        <Button onClick={() => setShowMap(true)}>Add New Address</Button>
      </div>

      {/* ADDRESS GRID */}
      <div className="grid gap-4 md:grid-cols-2">
        {addressList.map((addr) => (
          <Card
            key={addr.id}
            className={`relative transition-all border-2 ${
              selectedAddress === addr.id
                ? "border-green-100 shadow-lg scale-[1.02]"
                : "border-green-800 hover:border-green-900"
            }`}
          >
            {addr.isDefault && (
              <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium bg-orange-500 text-white rounded-bl-lg">
                Default
              </div>
            )}

            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600">
                  {addr.type === "home" ? (
                    <Home className="w-6 h-6" />
                  ) : (
                    <Building2 className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{addr.label}</h3>

                    <Badge variant="outline" className="text-xs">
                      {addr.type}
                    </Badge>
                  </div>

                  <p className="font-medium">{addr.name}</p>

                  <p className="text-sm text-gray-600 mt-1">
                    {addr.address}, {addr.city}, {addr.state} – {addr.pincode}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">{addr.phone}</p>

                  <Button
                    size="sm"
                    className={`mt-3 ${
                      selectedAddress === addr.id
                        ? "bg-green-600 text-white"
                        : "bg-orange-500 text-white"
                    }`}
                    onClick={() => setSelectedAddress(addr.id)}
                  >
                    {selectedAddress === addr.id
                      ? "Selected"
                      : "Select Address"}
                  </Button>
                </div>
              </div>

              {/* ACTION BUTTONS */}

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={loadingId === addr.id}
                  onClick={async () => {
                    setLoadingId(addr.id);
                    await deleteAddress(addr.id);
                    setLoadingId(null);
                  }}
                  className="gap-1 text-red-600"
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
                      await setDefaultAddress(addr.id);
                      setLoadingId(null);
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Set Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* ADD NEW ADDRESS CARD */}

        <Card
          onClick={() => setShowMap(true)}
          className="border-2 border-dashed border-orange-300 hover:border-orange-500 cursor-pointer"
        >
          <CardContent className="py-12 flex flex-col items-center justify-center text-orange-600">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>

            <p className="font-medium">Add New Address</p>
          </CardContent>
        </Card>
      </div>

      {/* CONTINUE BUTTON */}

      {addressList.length > 0 && (
        <div className="flex justify-end pt-6">
          <Button
            disabled={!selectedAddress}
            onClick={() => router.push("/home/payments")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg"
          >
            Continue to Payment
          </Button>
        </div>
      )}

      {/* MAP MODAL */}

      {showMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Select Location</h2>

            <AddressSelector
              onCancel={() => setOpen(false)}
              onSave={async (address: any) => {
                const token = localStorage.getItem("auth_token");

                const res = await fetch(
                  "http://127.0.0.1:8000/api/user/address/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(address),
                  },
                );

                const data = await res.json();

                if (!res.ok) {
                  alert(data.error || "Failed to save address");
                  return;
                }

                const newAddress: Address = {
                  id: data.address_id,
                  type: "home",
                  label: "Home",
                  name: address.name,
                  address: address.address,
                  city: address.city,
                  state: address.state,
                  pincode: address.pincode,
                  phone: address.phone,
                  isDefault: false,
                  lat: address.lat,
                  lng: address.lng,
                };

                setAddressList((prev) => [...prev, newAddress]);

                setShowMap(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
