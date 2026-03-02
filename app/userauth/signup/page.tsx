"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    const firstName = (document.getElementById("firstName") as HTMLInputElement)?.value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    const confirm = (document.getElementById("confirm") as HTMLInputElement)?.value;

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/userRegister/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Registration successful 🎉");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", "true");
      }

      router.push("/home");
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("token", data.token);

    } catch (error) {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <main className="min-h-screen bg-[#F4F7FD] flex justify-center items-center">
      <div className="w-full max-w-4xl px-7 py-12">

        {/* TOP BAR */}
        <div className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            N
          </div>
          <span className="text-sm font-semibold text-gray-800">Nirmatri</span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Register</h1>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl border shadow-sm p-14">

          {/* NAME */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <input id="firstName" placeholder="First name" className={inputStyle} />
            <input id="lastName" placeholder="Last name" className={inputStyle} />
          </div>

          {/* EMAIL */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={`${inputStyle} mb-6`}
          />

          {/* PASSWORD */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={inputStyle}
            />
            <input
              id="confirm"
              type="password"
              placeholder="Confirm password"
              className={inputStyle}
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white flex justify-center gap-2 disabled:opacity-70 hover:bg-blue-700 transition"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-6 text-sm text-center text-gray-700">
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