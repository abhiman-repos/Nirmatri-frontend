"use client";

import { useRouter } from "next/navigation";
import {
  Clock,
  ShieldCheck,
  LogOut,
  RefreshCcw
} from "lucide-react";

export default function PendingApprovalPage() {
  const router = useRouter();

  const handleLogout = () => {
    // clear auth/session here
    router.push("/seller/login");
  };

  const checkStatus = () => {
    // later: re-fetch seller status from backend
    // if APPROVED → redirect to dashboard
    alert("Your account is still under review.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F7FF] px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border p-10 text-center">

        {/* ICON */}
        <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
          <Clock className="h-7 w-7 text-blue-600" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Your information has been submitted
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Thank you for completing your seller onboarding.
          Our team is currently reviewing your details.
        </p>

        {/* STATUS BOX */}
        <div className="flex items-center justify-center gap-2 rounded-lg bg-yellow-50 border border-yellow-200 py-3 px-4 mb-6">
          <ShieldCheck className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            Status: Under Review
          </span>
        </div>

        {/* INFO */}
        <p className="text-xs text-gray-500 mb-8">
          Approval usually takes 24–48 hours.  
          You will be able to access your dashboard once approved.
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={checkStatus}
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCcw size={16} />
            Check Status
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </div>
    </main>
  );
}