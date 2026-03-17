"use client";

import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Landmark,
  Truck,
  Smartphone,
} from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

import { UpiSection } from "./UpiSection";
import { CardSection } from "./CardSection";
import { NetBankingSection } from "./NetBankingSelection";
import { WalletSection } from "./WalletSelection";
import { CodSection } from "./CodSection";
import { useRouter } from "next/navigation";

export function PaymentsSection() {
  const [method, setMethod] = useState("upi");
  const router = useRouter();

const handleProceed = () => {
  if (method === "cod") {
    router.replace("/home/confirm");
  } else {
    alert(`Proceeding with ${method} payment`);
  }
};

  const PaymentOption = ({
    id,
    title,
    icon,
    children,
  }: {
    id: string;
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
  }) => (
    <Card
      onClick={() => setMethod(id)}
      className={`cursor-pointer transition-all border
      ${
        method === id
          ? "border-blue-600 shadow-lg bg-blue-50"
          : "hover:shadow-md"
      }`}
    >
      <CardContent className="p-5">

        <div className="flex items-center gap-4">
          <input
            type="radio"
            checked={method === id}
            readOnly
            className="accent-blue-600"
          />

          <div className="p-2 rounded-lg bg-gray-100">{icon}</div>

          <span className="font-medium text-lg">{title}</span>
        </div>

        {method === id && (
          <div className="mt-4 pl-8">{children}</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      <div>
        <h1 className="text-3xl font-bold">Select Payment Method</h1>
        <p className="text-gray-500">
          All transactions are secure and encrypted
        </p>
      </div>

      <PaymentOption id="upi" title="UPI" icon={<Smartphone size={20} />}>
        <UpiSection />
      </PaymentOption>

      <PaymentOption
        id="card"
        title="Credit / Debit Card"
        icon={<CreditCard size={20} />}
      >
        <CardSection />
      </PaymentOption>

      <PaymentOption
        id="netbanking"
        title="Net Banking"
        icon={<Landmark size={20} />}
      >
        <NetBankingSection />
      </PaymentOption>

      <PaymentOption id="wallet" title="Wallet" icon={<Wallet size={20} />}>
        <WalletSection />
      </PaymentOption>

      <PaymentOption
        id="cod"
        title="Cash on Delivery"
        icon={<Truck size={20} />}
      >
        <CodSection />
      </PaymentOption>

      {/* Proceed Button */}

      <div className="pt-4">
        <Button
          onClick={handleProceed}
          className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
        >
          {method === "cod" ? "Place Order" : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
}