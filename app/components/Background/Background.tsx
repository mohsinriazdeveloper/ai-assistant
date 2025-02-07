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
        currentRoute.includes("/dashboard/")
          ? "py-8 px-[26px]"
          : "pt-8 pb-8 px-[26px]"
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
