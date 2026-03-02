"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiCheck, FiX, FiSave, FiUser, FiMail, FiPhone } from "react-icons/fi";

type UserData = {
  id?: string;   // 🔥 add this
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  mobile: string;
};

export default function PersonalInformationPage() {

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
  });

  const [formData, setFormData] = useState<UserData>(userData);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await fetch(
        "http://127.0.0.1:8000/api/auth/profile/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("PROFILE RESPONSE:", data);

      if (res.ok) {
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          gender: data.gender || "",
          email: data.email || "",
          mobile: data.phone || "",
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };   

  fetchProfile();
}, []);
                     
  /* ================= HANDLERS ================= */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = () => {
    const updated = { ...formData };
    setUserData(updated);

    // Optional: store locally
    localStorage.setItem("personalInfo", JSON.stringify(updated));
  };

  if (loading) return <p>Loading profile...</p>;

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Personal Information</h1>

      <div className="space-y-4">

        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            placeholder="firstName"
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            placeholder="lastName"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
            placeholder="email"
          />
        </div>

        <div>
          <label>Mobile</label>
          <input
            name="mobile"
            value={formData.mobile}
            disabled
            className="border p-2 w-full rounded bg-gray-100"
            placeholder="mobile"
          />
        </div>

        <div>
          <label>Gender</label>
          <input
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            placeholder="gender"
          />
        </div>

        <button
          onClick={saveData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FiSave className="inline mr-2" />
          Save
        </button>

      </div>
    </div>
  );
}