"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/context/AuthContext";

export default function GoogleAuthButton() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          if (!credentialResponse.credential) {
            console.error("No credential received from Google");
            return;
          }

          const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/google-login/",
            {
              token: credentialResponse.credential,
            }
          );

          // ✅ Ensure backend returned token
          if (!res.data.token) {
            console.error("No token returned from backend");
            return;
          }

          // 🔐 Save token via AuthContext
          localStorage.setItem("auth_token", res.data.token);
          login(res.data.token);

          // Optional: store user
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }

          router.replace("/home");
        } catch (error) {
          console.error("Backend login failed:", error);
        }
      }}
      onError={() => console.log("Google Login Failed")}
    />
  );
}