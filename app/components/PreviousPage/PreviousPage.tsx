"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { hideBackBtn } from "../HideLinks/HideLinks";
import { useAppDispatch } from "../ReduxToolKit/hook";
import { voiceResponce } from "../ReduxToolKit/voiceResSlice";

interface PreviousPageProps {
  arrowColor?: string;
}

const PreviousPage: FC<PreviousPageProps> = ({ arrowColor }) => {
  const currentPage = usePathname();
  const dispatch = useAppDispatch();
  const hideBack = hideBackBtn.includes(currentPage);

  const router = useRouter();
  const handlePrevious = () => {
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
