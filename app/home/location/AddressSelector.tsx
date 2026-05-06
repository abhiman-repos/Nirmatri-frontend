"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";
import { User, Phone, MapPin, Building2, Hash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export default function ManualAddressForm({ onSave, onCancel }: any) {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    alternateNumber: "",
  });

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permission.state === "denied") {
      setShowLocationPopup(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          );

          const data = await res.json();
          const addr = data.address || {};

          setForm((prev) => ({
            ...prev,
            city: addr.village || "",
            state: addr.state || "",
            pincode: addr.postcode || "",
            address: addr.road || data.display_name || "",
          }));
        } catch (err) {
          console.error(err);
        }
      },
      () => {
        setShowLocationPopup(true);
      },
    );
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Card className="w-full h-full shadow-none border-0 rounded-none">
      <CardContent className="p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold uppercase">Add Address</h2>
          <p className="text-sm text-gray-500">Enter your delivery details</p>
        </div>

        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 h-11 rounded-xl"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 h-11 rounded-xl"
            placeholder="Phone Number"
            value={form.phone}
            maxLength={10}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 h-11 rounded-xl"
            placeholder="Street Address"
            value={form.address}
            maxLength={16}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 h-11 rounded-xl"
              placeholder="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div className="relative z-50">
            <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 z-10" />

            <Select
              value={form.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger className="pl-9 h-11 rounded-xl">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>

              <SelectContent position="popper" className="z-[100]">
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pincode */}
        <div className="relative">
          <Hash className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 h-11 rounded-xl"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 h-11 rounded-xl"
            placeholder="Alternate Number"
            value={form.alternateNumber}
            maxLength={10}
            onChange={(e) => handleChange("alternateNumber", e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="w-1/2 h-12 rounded-xl"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            className="w-1/2 h-11 rounded-xl text-base font-medium bg-green-500/20 text-green-600 hover:bg-green-500/20"
            onClick={handleSubmit}
          >
            Save Address
          </Button>
        </div>
      </CardContent>

      <p
        className="text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700 mt-1 uppercase"
        onClick={detectLocation}
      >
        Detect my location
      </p>

      {showLocationPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full text-center space-y-4">
            <MapPin className="mx-auto text-blue-500" size={32} />

            <h3 className="text-lg font-semibold">Enable Location Access</h3>

            <p className="text-sm text-gray-500">
              Please allow location access in your browser to automatically
              detect your address.
            </p>

            <Button
              className="w-full"
              onClick={() => {
                setShowLocationPopup(false);
                detectLocation();
              }}
            >
              Try Again
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowLocationPopup(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
