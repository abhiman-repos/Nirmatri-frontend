"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function NirmatriLogo() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      router.push("/superadmin/login");
    }
  };

  return (
    <div
      onClick={pathname === "/" ? handleClick : undefined}
      className="flex items-center cursor-pointer"
    >
      <div className="relative flex items-center">

        {/* Glow */}
        <Image
          src="/logo.svg"
          alt="Nirmatri Logo Glow"
          width={60}
          height={60}
          className="absolute blur-[4px] opacity-40 scale-110 pointer-events-none"
        />

       <Image
  src="/nirmatri.png"
  alt="Nirmatri Logo"
  width={85}
  height={85}
  className="relative z-10 rounded-md"
  priority
/>
      </div>
    </div>
  );
}