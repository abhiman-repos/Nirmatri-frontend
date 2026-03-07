"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext"; // ✅ ADD THIS


import GoogleAuthButton from "@/lib/google-auth";
import { useAuth } from "@/app/components/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    // ✅ Use AuthContext (MOST IMPORTANT)
    login(data.token);

    // Optional: store user info
    localStorage.setItem("user", JSON.stringify(data.user));

    router.replace("/home");
  } catch (err) {
    setError("Backend not reachable");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center px-4 text-gray-900">
      <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10">Login</h1>

        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-gray-300/60 bg-white/60 px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300/60 bg-white/60 px-4 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

        <div className="text-right mb-10">
          <Link href="/forgot-password" className="text-sm text-[#1a3a2a] hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full rounded-xl py-4 text-sm font-medium transition flex items-center justify-center gap-2
            ${
              loading
                ? "bg-[#1a3a2a] cursor-not-allowed opacity-70"
                : "bg-[#1a3a2a] text-white hover:bg-white hover:shadow-lg hover:text-black"
            }
          `}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
        >

        </button>

        {/* ================= GOOGLE ================= */}
        <GoogleAuthButton />

        {/* ================= REGISTER ================= */}
        <p className="mt-10 text-sm text-gray-700 text-center">
          Don’t have an account?{" "}
          <Link href="/userauth/signup" className="text-[#1a3a2a] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}