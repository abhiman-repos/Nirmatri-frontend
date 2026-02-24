"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        console.log("FULL RESPONSE:", credentialResponse);

        try {
          await axios.post("http://localhost:8000/api/auth/google-login/", {
            token: credentialResponse.credential, // ✅ MUST be credential
          });

          router.push("/home");
          localStorage.setItem("loggedIn", "true");
          router.push("/");
        } catch (error) {
          console.error("Backend login failed:", error);
        }
      }}
      onError={() => console.log("Login Failed")}
    />
  );
}
