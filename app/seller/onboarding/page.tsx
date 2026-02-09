"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const steps = ["Store Info", "KYC", "Bank", "Review"];

export default function SellerOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // ✅ Stepper complete
      setShowSuccess(true);

      // ⏳ success message ke baad dashboard
      setTimeout(() => {
        router.push("/seller/dashboard");
      }, 2000);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F9F8] flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* 🔹 STEPPER HEADER */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, index) => (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>

              <span
                className={`ml-3 text-sm font-medium hidden sm:block
                ${
                  index <= currentStep
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>

              {index !== steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-4 bg-gray-200">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{
                      width: index < currentStep ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔹 STEP CONTENT */}
        {!showSuccess && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {currentStep === 0 && <StoreInfo />}
              {currentStep === 1 && <KYC />}
              {currentStep === 2 && <Bank />}
              {currentStep === 3 && <Review />}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ✅ SUCCESS MESSAGE */}
        {showSuccess && (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-green-700">
              ✅ Successfully created your seller account
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Redirecting you to your dashboard…
            </p>
          </div>
        )}

        {/* 🔹 ACTIONS */}
        {!showSuccess && (
          <div className="flex justify-between mt-10">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 rounded-lg border text-gray-700 disabled:opacity-40"
            >
              Back
            </button>

            <button
              onClick={nextStep}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Continue"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

/* 🔹 STEP COMPONENTS */

function StoreInfo() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-900">
        Store Information
      </h2>

      <input
        placeholder="Store name"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />

      <input
        placeholder="Store category"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />

      <textarea
        placeholder="Store address"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />
    </div>
  );
}

function KYC() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-900">KYC Details</h2>

      <input
        placeholder="PAN Number"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />

      <input
        placeholder="Aadhaar Number"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />
    </div>
  );
}

function Bank() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-900">Bank Details</h2>

      <input
        placeholder="Account holder name"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />

      <input
        placeholder="Account number"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />

      <input
        placeholder="IFSC Code"
        className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500"
      />
    </div>
  );
}

function Review() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Review & Submit
      </h2>

      <p className="text-gray-600">
        Please review all details before submitting. You can go back and
        edit if needed.
      </p>
    </div>
  );
}
