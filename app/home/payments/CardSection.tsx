"use client";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export function CardSection() {
  return (
    <div className="space-y-4">

      <Input placeholder="Card Number" />

      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="Expiry (MM/YY)" />
        <Input placeholder="CVV" />
      </div>

      <Button className="w-full">
        Save Card
      </Button>

    </div>
  );
}