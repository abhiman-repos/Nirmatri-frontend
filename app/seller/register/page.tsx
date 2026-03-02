"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerRegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const form = e.currentTarget;
  const data = new FormData(form);

  const payload = {
    full_name: data.get("fullName")?.toString().trim(),
    email: data.get("email")?.toString().trim(),
    password: data.get("password")?.toString(),
    confirm_password: data.get("confirm")?.toString(),
  };

  // ================= VALIDATION =================
  if (
    !payload.full_name ||
    !payload.email ||
    !payload.password ||
    !payload.confirm_password
  ) {
    setError("All fields are required");
    return;
  }

  if (payload.password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (payload.password !== payload.confirm_password) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/seller/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Registration failed");
    }

    // ✅ SUCCESS
    router.push("/seller/onboarding");

  } catch (err: any) {
    setError(err.message || "Server error");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F7FF]">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B7D6CF] to-[#DCEDEA]" />

      <div className="relative z-10 min-h-screen flex">
        {/* ================= LEFT – FORM ================= */}
        <div className="w-full lg:w-[45%] flex items-center justify-center px-6">
          <div className="w-full max-w-lg rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

            {/* BRAND */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                N
              </div>
              <span className="text-sm font-semibold text-gray-800">
                Nirmatri Seller
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Seller Registration
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Start selling handcrafted products on Nirmatri
            </p>

            {/* ================= FORM ================= */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="grid grid-cols gap-4">
                <input
                  name="fullName"
                  placeholder="Full name"
                  className="w-full rounded-lg border px-4 py-3 text-sm
                  text-gray-900 placeholder:text-gray-500
                  focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full rounded-lg border px-4 py-3 text-sm
                text-gray-900 placeholder:text-gray-500
                focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  className="w-full rounded-lg border px-4 py-3 pr-11 text-sm
                  text-gray-900 placeholder:text-gray-500
                  focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  placeholder="Confirm password"
                  className="w-full rounded-lg border px-4 py-3 pr-11 text-sm
                  text-gray-900 placeholder:text-gray-500
                  focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg py-3 text-white font-medium
                flex items-center justify-center gap-2
                transition-all duration-300
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Seller Account"
                )}
              </button>
            </form>

            {/* LOGIN */}
            <p className="mt-6 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                href="/seller/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>

            {/* FOOTER */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              By continuing, you agree to Nirmatri’s Seller Terms & Policies
            </p>
          </div>
        </div>

        {/* ================= RIGHT – INFO ================= */}
        <div className="hidden lg:flex w-[55%] relative overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/10" />
          <div className="absolute bottom-[-160px] left-[-160px] h-[520px] w-[520px] rounded-full bg-indigo-400/10" />

          <div className="relative z-10 flex flex-col justify-center px-20 w-full mt-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Start Your Seller Journey
            </h2>

            <p className="text-gray-600 max-w-md mb-8">
              Join thousands of artisans selling handcrafted products and
              growing their business with Nirmatri.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-blue-600" />
                <p className="text-sm text-gray-700">
                  Reach customers across India
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-blue-600" />
                <p className="text-sm text-gray-700">
                  Simple product & order management
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-2.5 w-2.5 mt-2 rounded-full bg-blue-600" />
                <p className="text-sm text-gray-700">
                  Transparent payouts & analytics
                </p>
              </div>
            </div>

            <img
              src="/Login-rafiki.svg"
              alt="Seller onboarding illustration"
              className="max-w-[480px] w-full h-auto self-center"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
