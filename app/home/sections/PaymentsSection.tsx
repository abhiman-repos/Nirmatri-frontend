"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Landmark, Wallet, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";

export function PaymentsSection() {
  const [showUpi, setShowUpi] = useState(false);
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-gray-500">Manage how you pay for your orders</p>
      </div>

      {/* ================= UPI ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-500" />
            UPI
          </CardTitle>

          <Button
            size="sm"
            className="gap-2"
            onClick={() => setShowUpi(!showUpi)}
          >
            <Plus className="w-4 h-4" />
            Add UPI ID
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">

          {!showUpi && (
            <p className="text-sm text-gray-600">
              Pay directly using UPI apps
            </p>
          )}

          {showUpi && (
            <>
              <Input placeholder="Enter UPI ID (example@upi)" />

              <Button className="w-full">
                Verify UPI
              </Button>
            </>
          )}

        </CardContent>
      </Card>

      {/* ================= CARDS ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-500" />
            Credit / Debit Cards
          </CardTitle>

          <Button
            size="sm"
            className="gap-2"
            onClick={() => setShowCard(!showCard)}
          >
            <Plus className="w-4 h-4" />
            Add Card
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">

          {!showCard && (
            <p className="text-sm text-gray-600">
              Add and manage your cards
            </p>
          )}

          {showCard && (
            <>
              <Input placeholder="Card Number" />

              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Expiry (MM/YY)" />
                <Input placeholder="CVV" />
              </div>

              <Button className="w-full">
                Save Card
              </Button>
            </>
          )}

        </CardContent>
      </Card>

      {/* ================= NET BANKING ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-purple-500" />
            Net Banking
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">

          <p className="text-sm text-gray-600">
            Select your bank to continue
          </p>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="sbi">State Bank of India</SelectItem>
              <SelectItem value="hdfc">HDFC Bank</SelectItem>
              <SelectItem value="icici">ICICI Bank</SelectItem>
              <SelectItem value="axis">Axis Bank</SelectItem>
            </SelectContent>
          </Select>

        </CardContent>
      </Card>

      {/* ================= WALLETS ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-orange-500" />
            Wallets
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">

          <Button variant="outline" className="w-full">
            Paytm
          </Button>

          <Button variant="outline" className="w-full">
            PhonePe
          </Button>

          <Button variant="outline" className="w-full">
            Amazon Pay
          </Button>

        </CardContent>
      </Card>

      {/* ================= COD ================= */}
      <Card>
        <CardHeader>
          <CardTitle>
            Cash on Delivery
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">

          <span className="text-sm text-gray-600">
            Enable Cash on Delivery
          </span>

          <Switch />

        </CardContent>
      </Card>

    </div>
  );
}