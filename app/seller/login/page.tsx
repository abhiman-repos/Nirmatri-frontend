"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SellerLoginPage() {
  const router = useRouter();

  // ================= STATES =================
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Backend states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ================= LOGIN FUNCTION =================
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://127.0.0.1:8000/api/seller/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      // backend error
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Save JWT token
      localStorage.setItem("sellerToken", data.token);

      // ✅ Redirect dashboard
      router.push("/seller/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <main className="min-h-screen flex bg-transparent overflow-hidden">

      {/* LEFT LOGIN */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-8">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome to Seller Panel
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Manage your store, products, and orders seamlessly.
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm mt-2 mb-2">
              {error}
            </p>
          )}

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-6">
            <Link
              href="/forgot-password"
              className="text-sm text-black-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            disabled={loading}
            onClick={handleLogin}
            className={`w-full rounded-lg py-3 font-medium text-white flex items-center justify-center gap-2 transition-all
  ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? (
              <>
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>


          {/* SOCIAL LOGIN */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-gray-500">Login with</span>
          </div>


          {/* REGISTER */}
          <p className="mt-8 text-sm text-gray-600">
            Don&apos;t have an Account?{" "}
            <Link
              href="/seller/register"
              className="text-black-600 font-medium hover:underline"
            >
              Register Now
            </Link>
          </p>


          <div className="hidden lg:flex w-[55%] relative overflow-hidden items-center justify-end">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-l-[140px]" />

            {/* Image */}
            <div className="relative z-10 flex items-center justify-end w-full pr-16">
              <img
                src="/user.png"
                alt="Seller Login"
                className="max-w-[420px] w-full drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>
    </main >
  );
}