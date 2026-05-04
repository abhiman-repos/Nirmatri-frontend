"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import TermsModal from "@/app/components/TermsModal";
import axios from "axios";

export default function SellerRegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // ✅ Seller Terms Content (used by modal)
  const sellerTermsContent = [
    {
      title: "1. Seller Eligibility",
      content:
        "By registering as a seller on Nirmatri Crafts, you confirm that you are highlighting authentic, handcrafted items. We reserve the right to verify the origin of your products and request additional documentation if needed.",
    },
    {
      title: "2. Commissions & Fees",
      content:
        "Nirmatri Crafts charges a standard 10% platform fee on every successful sale. This covers payment processing, marketing for your products, customer support, and platform maintenance. Additional fees may apply for premium features.",
    },
    {
      title: "3. Product Authenticity",
      content:
        "All products must be handmade, handcrafted, or artisanal. Mass-produced items, counterfeit goods, or items misrepresented as handmade are strictly prohibited. We conduct regular quality checks to maintain marketplace integrity.",
    },
    {
      title: "4. Shipping Policy",
      content:
        "Sellers are responsible for packaging products safely and securely. Orders must be dispatched within 48 hours of confirmation unless otherwise specified. Failure to ship on time may result in store penalties, reduced visibility, or account suspension.",
    },
    {
      title: "5. Payout Schedule",
      content:
        "Funds from sales are held in escrow for 7 days post-delivery to handle potential returns or disputes. Payouts are processed every Monday directly to your registered bank account. Minimum payout threshold is ₹500.",
    },
    {
      title: "6. Returns & Refunds",
      content:
        "Sellers must honor our 7-day return policy for damaged or defective items. Return shipping costs for seller errors will be deducted from your account. Customer satisfaction is our priority.",
    },
    {
      title: "7. Prohibited Items",
      content:
        "Mass-produced industrial goods, hazardous materials, illegal substances, weapons, copyrighted designs without permission, and any items violating Indian law are strictly prohibited. Violations may result in immediate account termination.",
    },
    {
      title: "8. Intellectual Property",
      content:
        "You retain ownership of your product designs. However, by listing on Nirmatri, you grant us a license to display, market, and promote your products across our platforms and marketing channels.",
    },
    {
      title: "9. Account Termination",
      content:
        "We reserve the right to suspend or terminate seller accounts for policy violations, fraudulent activity, poor customer ratings, or failure to maintain quality standards. Termination procedures are outlined in our dispute resolution policy.",
    },
    {
      title: "10. Changes to Terms",
      content:
        "Nirmatri reserves the right to modify these terms at any time. Sellers will be notified via email 30 days before changes take effect. Continued use of the platform constitutes acceptance of updated terms.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullname = data.get("fullname")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString();
    const confirm = data.get("confirm")?.toString();

    if (!fullname || !email || !password || !confirm) {
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

    if (!agreeTerms) {
      setError(
        "You must agree to the Terms & Conditions to create a seller account",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/seller/register/",
        {
          fullname: fullname,
          email: email,
          password: password,
        }
      );
      
      const result = res.data;

      if (result.token) {
        localStorage.setItem("auth_token", result.token);
      }

      router.push("/seller/onboarding");

    } catch (err: any) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.error || "Registration failed");
      } else {
        setError("Server error . Please try again. ");
      }
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F7FF]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#B7D6CF] to-[#DCEDEA]" />

      <div className="relative z-10 min-h-screen flex">
        {/* LEFT */}

        <div className="w-full lg:w-[45%] flex items-center justify-center px-6">
          <div className="w-full max-w-lg rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

            <div className="flex items-center gap-2 mb-8">
              <div className="">
                {/* N */}
              </div>
              
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Seller Registration
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Start selling handcrafted products on Nirmatri
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols gap-4">
                <input
                  name="fullname"
                  placeholder="Full name"
                  size={18}
                  className="w-full rounded-lg border px-4 py-3 text-black focus:ring-3 focus:ring-blue-500 outline-none placeholder:text-gray-400"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full rounded-lg border px-4 py-3 text-black focus:ring-3 focus:ring-blue-500 outline-none placeholder:text-gray-400"
              />

              <div className="relative ">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  className="w-full rounded-lg border px-4 py-3 pr-11 text-black focus:ring-3 focus:ring-blue-500 outline-none placeholder:text-gray-400 "
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 placeholder:text-gray-400"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  placeholder="Confirm password"
                  className="w-full rounded-lg border px-4 py-3 pr-11 text-black focus:ring-3 focus:ring-blue-500 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <Link
                    href="/seller/privacy-policy"
                    target="_blank"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading || !agreeTerms}
                className={`w-full rounded-lg py-3 text-white font-medium transition-all ${
                  loading || !agreeTerms
                    ? "bg-[#75975e] cursor-not-allowed"
                    : "bg-[#1a3a2a] hover:bg-white hover:text-black hover:shadow-lg"
                }`}
              >
                {loading ? "Creating account..." : "Create Seller Account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              Already have an account?{" "}

              <Link href="/seller/login" className="text-[#1a3a2a] font-medium hover:underline">

                Login
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT – PHOTO (UNCHANGED) */}
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

            <img
              src="/Login-rafiki.svg"
              alt="Seller onboarding illustration"
              className="max-w-[480px] w-full h-auto self-center"
            />
          </div>
        </div>
      </div>

      {/* ✅ TERMS MODAL */}
      <TermsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        termsContent={sellerTermsContent}
      />
    </main>
  );
}