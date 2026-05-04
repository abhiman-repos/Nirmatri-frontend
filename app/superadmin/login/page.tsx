"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, LockKeyhole } from "lucide-react";
import Image from "next/image";
export default function SuperAdminLogin() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!adminId || !password) {
      setError("Please enter ID and Password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/super/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminId,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // save admin token
      localStorage.setItem("admin_token", data.token);

      // redirect to dashboard
      router.push("/superadmin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }

    setLoading(false);

  };

  return (
    <main className="min-h-screen w-full grid lg:grid-cols-2 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F1F5F9] overflow-y-auto font-sans">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col items-center justify-center p-10 min-h-screen relative">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/5 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-md w-full text-center space-y-8">

          <div className="flex justify-center">
            <Image
              src="/admin.png"
              alt="Admin Illustration"
              width={350}
              height={350}
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-snug">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                <span className="text-green-600 font-black">Super Admin</span>
                <br />
                Intelligence
              </h2>
            </h2>
            <p className="text-blue-600 text-base leading-relaxed">
              Real-time marketplace management with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center justify-center px-6 lg:px-16 py-12 min-h-screen relative">

        <div className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

        <div className="w-full max-w-md space-y-10">

          {/* Header */}
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <ShieldCheck size={24} strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Identity Verification
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-green-600 dark:text-green-400">
              Super Admin Portal
            </h1>

            <p className="text-slate-400 text-base">
              Please authorize to access the control center.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">

            {/* Admin ID */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Admin ID
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="ID-XXXXXXXX"
                className="w-full rounded-xl border-2 border-slate-100 bg-white px-5 py-4 text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 placeholder:text-slate-300 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black-700 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border-2 border-slate-100 bg-white px-5 py-4 text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 placeholder:text-slate-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <div className="min-h-[20px]">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <p className="text-red-600 text-sm font-semibold">{error}</p>
                </div>
              )}
            </div>

            {/* Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className={`w-full rounded-xl py-4 text-lg font-bold text-white transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 ${loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {loading ? (
                <span className="h-6 w-6 rounded-full border-4 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <LockKeyhole size={20} />
                  <span>Authorize Access</span>
                </>
              )}
            </button>
          </div>


        </div>
      </div>
    </main>
  );
}