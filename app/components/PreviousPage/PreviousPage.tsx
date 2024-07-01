"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Arrow from "@/app/assets/icons/leftarrow.png";

interface PreviousPageProps {}

const PreviousPage: FC<PreviousPageProps> = ({}) => {
  const router = useRouter();
  const handlePrevious = () => {
    router.back();
  };

  return (
    <div
      className="flex items-center gap-1 font-medium cursor-pointer"
      onClick={handlePrevious}
    >
      <Image src={Arrow} alt="" />
      <p>Back</p>
    </div>
  );
};

export default PreviousPage;
