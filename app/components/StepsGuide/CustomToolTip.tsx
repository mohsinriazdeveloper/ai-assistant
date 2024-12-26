import QuestionMarkIcon from "@/app/assets/icons/stepsQuestionMark.png";
import Image from "next/image";
import { FC } from "react";
import { TooltipRenderProps } from "react-joyride";

interface CustomTooltipProps extends TooltipRenderProps {
  stepNumber: number;
  title: string;
  description: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({
  stepNumber,
  title,
  description,
  primaryProps,
  continuous,
  isLastStep,
}) => {
  return (
    <div className="w-[235px] pt-5 border relative">
      <Image
        src={QuestionMarkIcon}
        alt="Question Mark Icon"
        className="w-10 h-10 absolute right-[42%] top-[3px]"
      />
      <div className="bg-[#343434] rounded-lg h-full pt-7 px-4 pb-5">
        <p className="text-center text-xl font-medium mb-2">
          Step {stepNumber}
        </p>
        <p className="text-center font-medium mb-2">{title}</p>
        <p className="text-center text-xs font-medium mb-4">{description}</p>

        {/* Render the Next or Finish button conditionally */}
        <button
          onClick={primaryProps?.onClick}
          className="w-full text-white bg-[#7D7D7D] py-2 rounded-md text-sm"
        >
          {isLastStep ? "Finish" : "Got it"}
        </button>
      </div>
    </div>
  );
};

export default CustomTooltip;
