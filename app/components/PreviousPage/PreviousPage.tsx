"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Arrow from "@/app/assets/icons/leftarrow.png";
import { hideBackBtn } from "../HideLinks/HideLinks";

interface PreviousPageProps {}

const PreviousPage: FC<PreviousPageProps> = ({}) => {
  const currentPage = usePathname();

  const hideBack = hideBackBtn.includes(currentPage);

  const router = useRouter();
  const handlePrevious = () => {
    router.back();
  };

  return (
    <>
      {hideBack ? (
        <div className="flex items-center gap-1 font-medium cursor-pointer"></div>
      ) : (
        <div
          className="flex items-center gap-1 font-medium cursor-pointer"
          onClick={handlePrevious}
        >
          <Image src={Arrow} alt="" />
          <p>Back</p>
        </div>
      )}
    </>
  );
};

export default PreviousPage;
