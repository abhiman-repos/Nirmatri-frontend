"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

const popularBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
];

const allBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Union Bank of India",
  "Canara Bank",
  "IndusInd Bank",
  "Yes Bank",
  "IDFC First Bank",
];

export function NetBankingSection() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!selectedBank) return;

    setLoading(true);

    // simulate payment API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(`Redirecting to ${selectedBank} Net Banking`);

    setLoading(false);
  };

  return (
    <div className="space-y-6">

      {/* Popular Banks */}
      <div>
        <h3 className="text-sm font-semibold mb-3">
          Popular Banks
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {popularBanks.map((bank) => (
            <button
              key={bank}
              onClick={() => setSelectedBank(bank)}
              className={`p-3 border rounded-lg text-sm transition
              ${
                selectedBank === bank
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              {bank}
            </button>
          ))}
        </div>
      </div>

      {/* Other Banks */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">
          Other Banks
        </h3>

        <Select onValueChange={(value) => setSelectedBank(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Bank" />
          </SelectTrigger>

          <SelectContent>
            {allBanks.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Bank */}
      {selectedBank && (
        <div className="p-3 rounded-lg bg-gray-50 text-sm">
          Selected Bank: <strong>{selectedBank}</strong>
        </div>
      )}

      {/* Pay Button */}
      <Button
        className="w-full"
        disabled={!selectedBank || loading}
        onClick={handlePay}
      >
        {loading ? "Processing..." : "Continue to Bank"}
      </Button>
    </div>
  );
}