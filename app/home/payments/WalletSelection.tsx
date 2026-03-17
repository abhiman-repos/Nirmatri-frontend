"use client";

import { Button } from "@/app/components/ui/button";

export function WalletSection() {
  return (
    <div className="space-y-3">

      <Button variant="outline" className="w-full">
        Paytm
      </Button>

      <Button variant="outline" className="w-full">
        PhonePe
      </Button>

      <Button variant="outline" className="w-full">
        Amazon Pay
      </Button>

    </div>
  );
}