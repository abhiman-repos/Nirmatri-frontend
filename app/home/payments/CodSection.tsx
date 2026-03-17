"use client";

import { Switch } from "@/app/components/ui/switch";

export function CodSection() {
  return (
    <div className="flex items-center justify-between">

      <span>Enable Cash on Delivery</span>

      <Switch />

    </div>
  );
}