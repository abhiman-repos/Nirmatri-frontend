"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/app/components/context/AuthContext";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirm) {
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

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:8000/api/user/register/", {
        name: fullName,
        email,
        password,
      });

      const data = res.data;

      if (data.token) {
        localStorage.setItem("auth_token", data.token); // ✅ fixed
        login(data.token);
        router.replace("/home");
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F7FD] flex justify-center">
      <div className="w-full max-w-4xl px-7 py-12">
        {/* ================= TITLE ================= */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Register</h1>

        {/* ================= FORM CARD ================= */}
        <div className="bg-white rounded-3xl border shadow-sm p-14">
          {/* NAME */}
          <div className="grid gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          {/* PASSWORDS */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* ================= ERROR ================= */}
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          {/* SUBMIT */}
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className={`w-full rounded-xl py-3 text-sm font-medium transition
              flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-[#1a3a2a] cursor-not-allowed opacity-70"
                  : "bg-[#1a3a2a] text-white hover:bg-[#EAF2EC] hover:text-black hover:shadow-lg"
              }
            `}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating your account..." : "Create your account"}
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              href="/userauth/login"
              className="text-[#1a3a2a] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
