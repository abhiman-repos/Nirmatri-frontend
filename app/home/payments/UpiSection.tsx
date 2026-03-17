"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export function UpiSection() {
  const [upi, setUpi] = useState("");

  return (
    <div className="space-y-4">

      <Input
        placeholder="Enter UPI ID (example@upi)"
        value={upi}
        onChange={(e) => setUpi(e.target.value)}
      />

      <Button className="w-full">
        Verify UPI
      </Button>

    </div>
  );
}