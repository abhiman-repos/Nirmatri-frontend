"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function LeftPanel({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <>
      {/* 🔒 OVERLAY — NAVBAR KE NICHE */}
      <div
        className="fixed top-14 left-0 right-0 bottom-0 z-[60]
                   bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 🧊 LEFT PANEL (RESPONSIVE) */}
      <aside
        className="
          fixed left-0 top-14 bottom-0 z-[70]
          w-full              /* 📱 Mobile: full screen */
          sm:w-[420px]        /* 📱 Tablet */
          lg:w-[1200px]       /* 💻 Desktop big panel */
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          shadow-[0_0_40px_rgba(0,0,0,0.18)]
          overflow-hidden
          transition-transform duration-300 ease-out
        "
      >
        {/* 🔹 HEADER */}
        <div
          className="h-14 px-6 flex items-center justify-between
                     border-b border-gray-200 dark:border-gray-800"
        >
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            My Account
          </span>

          <button
            onClick={onClose}
            className="rounded-full p-2
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 🔹 CONTENT AREA (SCROLL ONLY HERE) */}
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto p-4 sm:p-6">
          {children ?? (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              ✅ Mobile pe full screen panel <br />
              ✅ Desktop pe wide dashboard panel <br />
              ✅ Navbar ke niche perfect fit
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
