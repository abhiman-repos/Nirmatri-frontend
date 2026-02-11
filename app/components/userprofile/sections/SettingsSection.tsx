" use client";

import { useState, useId } from "react";
import { useTheme } from "@/app/contexts/ThemeContext";
import {
  User,
  Lock,
  Bell,
  Shield,
  Moon,
  Sun,
  Laptop,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

export function SettingsSection() {
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div className="p-6 space-y-10 text-gray-900 dark:text-gray-100">
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account, privacy & preferences
        </p>
      </header>

      {/* ================= PROFILE ================= */}
      <Section title="Profile" icon={<User />}>
        <Input label="Full Name" defaultValue="Rahul Kumar" />
        <Input label="Email Address" defaultValue="rahul@gmail.com" />
        <Input label="Mobile Number" defaultValue="+91 9876543210" />
        <Button text="Save Changes" />
      </Section>

      {/* ================= SECURITY ================= */}
      <Section title="Security" icon={<Lock />}>
        <Input
          label="Current Password"
          type={showPassword ? "text" : "password"}
          rightIcon={
            showPassword ? (
              <EyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <Eye onClick={() => setShowPassword(true)} />
            )
          }
        />
        <Input label="New Password" type="password" />
        <Input label="Confirm Password" type="password" />
        <Button text="Update Password" />
      </Section>

      {/* ================= APPEARANCE ================= */}
      <Section title="Appearance" icon={<Moon />}>
        <div className="grid grid-cols-3 gap-3">
          <ThemeCard
            label="Light"
            active={theme === "light"}
            icon={<Sun />}
            onClick={() => setTheme("light")}
          />
          <ThemeCard
            label="Dark"
            active={theme === "dark"}
            icon={<Moon />}
            onClick={() => setTheme("dark")}
          />
          <ThemeCard
            label="System"
            active={theme === "system"}
            icon={<Laptop />}
            onClick={() => setTheme("system")}
          />
        </div>
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section title="Notifications" icon={<Bell />}>
        <Toggle
          label="Email Notifications"
          value={notifications.email}
          onChange={() =>
            setNotifications((p) => ({ ...p, email: !p.email }))
          }
        />
        <Toggle
          label="SMS Alerts"
          value={notifications.sms}
          onChange={() =>
            setNotifications((p) => ({ ...p, sms: !p.sms }))
          }
        />
        <Toggle
          label="Push Notifications"
          value={notifications.push}
          onChange={() =>
            setNotifications((p) => ({ ...p, push: !p.push }))
          }
        />
      </Section>

      {/* ================= PRIVACY ================= */}
      <Section title="Privacy" icon={<Shield />}>
        <Toggle label="Make profile private" value={true} />
        <Toggle label="Search engine visibility" value={false} />
      </Section>

      {/* ================= DANGER ZONE ================= */}
      <Section title="Danger Zone" icon={<Trash2 />} danger>
        <button
          className="danger-btn"
          aria-label="Delete account permanently"
        >
          <Trash2 size={16} />
          Delete Account
        </button>
      </Section>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Section({
  title,
  icon,
  children,
  danger,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl p-5 space-y-4 border ${
        danger
          ? "border-red-300 dark:border-red-800"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="flex items-center gap-2 font-semibold">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
}

function Input({
  label,
  type = "text",
  defaultValue,
  rightIcon,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  rightIcon?: React.ReactNode;
}) {
  const id = useId();

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          className="input w-full"
        />

        {rightIcon && (
          <span
            className="absolute right-3 top-3 cursor-pointer"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  value = false,
  onChange,
}: {
  label: string;
  value?: boolean;
  onChange?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>

      <button
        type="button"
        onClick={onChange}
        aria-label={label}
        aria-pressed={value ? "true" : "false"}
        className={`w-12 h-6 rounded-full transition ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`block h-5 w-5 bg-white rounded-full transition ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeCard({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Switch to ${label} theme`}
      className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${
        active
          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Button({ text }: { text: string }) {
  return <button className="primary-btn">{text}</button>;
}
