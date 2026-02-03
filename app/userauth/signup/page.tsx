"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = () => {
    const firstName = (
      document.getElementById("firstName") as HTMLInputElement
    )?.value.trim();

    const lastName = (
      document.getElementById("lastName") as HTMLInputElement
    )?.value.trim();

    const email = (
      document.getElementById("email") as HTMLInputElement
    )?.value.trim();

    const password = (
      document.getElementById("password") as HTMLInputElement
    )?.value;

    const confirm = (
      document.getElementById("confirm") as HTMLInputElement
    )?.value;

    // ================= VALIDATION =================

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // ================= SUCCESS =================
    setError("");
    setLoading(true);

    // 🔁 Fake API call (backend baad me)
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#F4F7FD] flex justify-center">
      <div className="w-full max-w-4xl px-7 py-12">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              N
            </div>
            <span className="text-sm font-semibold text-gray-800">
              Nirmatri
            </span>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Register
        </h1>

        {/* ================= FORM CARD ================= */}
        <div className="bg-white rounded-3xl border shadow-sm p-14">
          {/* NAME */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@email.com"
            />
          </div>

          {/* PASSWORDS */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create password"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* ================= ERROR ================= */}
          {error && (
            <p className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}

          {/* ================= SUBMIT ================= */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white text-sm font-medium
                       hover:bg-blue-700 transition flex items-center justify-center gap-2
                       disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating your account..." : "Create your account"}
          </button>

          {/* ================= FOOTER ================= */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
