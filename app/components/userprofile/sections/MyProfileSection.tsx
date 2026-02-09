"use client";

import { useRef, useState } from "react";
import {
  Camera,
  Edit2,
  Lock,
  Mail,
  Phone,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function MyProfileSection() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rahul Kumar",
    email: "rahul.kumar@gmail.com",
    phone: "+91 98765 43210",
    avatar: "",
  });

  const handleEditSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setIsEditing(false);
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () =>
      setProfile((p) => ({ ...p, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information
          </p>
        </div>

        <Button
          onClick={handleEditSave}
          disabled={saving}
          className={`gap-2 self-start sm:self-auto ${
            isEditing
              ? "bg-orange-500 hover:bg-orange-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-black"
              : "border border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10"
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </>
          )}
        </Button>
      </div>

      {/* ================= AVATAR ================= */}
      <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
        <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-orange-500 text-white dark:bg-blue-500 dark:text-black flex items-center justify-center text-3xl font-bold">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                "RK"
              )}
            </div>

            {isEditing && (
              <>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-orange-600 text-white dark:bg-blue-400 dark:text-black flex items-center justify-center shadow"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleImageChange(e.target.files[0])
                  }
                />
              </>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {profile.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Member since January 2024
            </p>
            {isEditing && (
              <p className="text-xs mt-1 text-gray-500">
                Click camera icon to change photo
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ================= PERSONAL INFO ================= */}
      <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500 dark:text-blue-400" />
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Full Name</Label>
            <Input
              disabled={!isEditing}
              value={profile.name}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed" : ""}
            />
          </div>

          <div>
            <Label className="flex gap-2">
              <Phone className="w-4 h-4 text-orange-500 dark:text-blue-400" />
              Phone
            </Label>
            <Input
              disabled={!isEditing}
              value={profile.phone}
              className={!isEditing ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed" : ""}
            />
          </div>

          <div className="md:col-span-2">
            <Label className="flex gap-2">
              <Mail className="w-4 h-4 text-orange-500 dark:text-blue-400" />
              Email
            </Label>
            <Input
              disabled
              value={profile.email}
              className="bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= PASSWORD ================= */}
      <Card className="bg-white dark:bg-[#0f0f10] border border-orange-200 dark:border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-500 dark:text-blue-400" />
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input type="password" placeholder="Current Password" />
          <Input type="password" placeholder="New Password" />
          <Input type="password" placeholder="Confirm New Password" />

          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>

          <Button
            disabled={updatingPassword}
            className="w-full sm:w-auto gap-2 bg-orange-500 hover:bg-orange-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-black"
          >
            {updatingPassword ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating…
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
