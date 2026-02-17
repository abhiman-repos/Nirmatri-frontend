"use client";

import { useState, useEffect } from "react";

export default function SellerProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize from localStorage
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);

    // Sync if changed in another page
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="min-h-screen bg-[#F6F9F8] dark:bg-gray-900 p-6 transition-colors duration-300">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-none dark:border dark:border-gray-700 p-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Seller Profile & Settings
          </h1>

          <div className="space-y-5">
            <Input label="Store Name" value="Nirmatri Crafts" />
            <Input label="Owner Name" value="Adarsh Kumar" />
            <Input label="Email" value="seller@nirmatri.com" />
            <Input label="Phone" value="+91 9876543210" />

            <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        defaultValue={value}
        className="w-full rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
      />
    </div>
  );
}