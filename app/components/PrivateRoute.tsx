"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace("/userauth/login"); // ✅ correct path
    }
  }, [router]);

  if (isAuthenticated === null) return(
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );


  return <>{isAuthenticated && children}</>;
}