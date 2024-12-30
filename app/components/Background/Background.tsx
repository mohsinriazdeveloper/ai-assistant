"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {
  const currentRoute = usePathname();
  return (
    <div className="bg-[#101010] h-screen p-5 fixed w-full">
      <div
        className={`w-full h-full rounded-[20px] overflow-y-scroll scrollbar-hide ${
          currentRoute.includes("/dashboard/") && "pb-8 bg-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
