"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Arrow from "@/app/assets/icons/leftarrow.png";
import { hideBackBtn } from "../HideLinks/HideLinks";
import { useAppDispatch } from "../ReduxToolKit/hook";
import { voiceResponce } from "../ReduxToolKit/voiceResSlice";
import { FaArrowLeftLong } from "react-icons/fa6";

interface PreviousPageProps {
  arrowColor?: string;
}

const PreviousPage: FC<PreviousPageProps> = ({ arrowColor }) => {
  const currentPage = usePathname();
  const dispatch = useAppDispatch();
  const hideBack = hideBackBtn.includes(currentPage);

  const router = useRouter();
  const handlePrevious = () => {
    // localStorage.setItem("myCustomChatId", "0");
    dispatch(voiceResponce({ inText: "" }));
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
          <FaArrowLeftLong className={`text-${arrowColor || "black"}`} />
          <p>Back</p>
        </div>
      )}
    </>
  );
};

export default PreviousPage;
