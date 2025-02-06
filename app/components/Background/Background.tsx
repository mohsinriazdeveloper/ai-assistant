"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {
  const currentRoute = usePathname();
  return (
    <div
      className={`bg-[#101010] h-screen fixed w-full ${
        currentRoute.includes("/dashboard/") ? "p-10" : "pt-8 pb-10 px-10"
      }`}
    >
      <div className="w-full h-full rounded-lg overflow-hidden">{children}</div>
      {/* <div
        className={`w-full h-full rounded-[20px] overflow-y-scroll scrollbar-hide ${
          currentRoute.includes("/dashboard/") && "pb-8 bg-white"
        }`}
      >
        {children}
      </div> */}
    </div>
  );
};

export default Background;
