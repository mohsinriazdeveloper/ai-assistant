"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Arrow from "@/app/assets/icons/leftarrow.png";
import { hideBackBtn } from "../HideLinks/HideLinks";
import { useAppDispatch } from "../ReduxToolKit/hook";
import { voiceResponce } from "../ReduxToolKit/voiceResSlice";

interface PreviousPageProps {}

const PreviousPage: FC<PreviousPageProps> = ({}) => {
  const currentPage = usePathname();
  const dispatch = useAppDispatch();
  const hideBack = hideBackBtn.includes(currentPage);

  const router = useRouter();
  const handlePrevious = () => {
    dispatch(voiceResponce({ inText: "", stopAudioPlaying: true }));
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
