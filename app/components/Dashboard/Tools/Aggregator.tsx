import { ResumeType } from "@/app/(pages)/agent/[id]/tools/page";
import { Dispatch, FC, SetStateAction } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import MarkDown from "../../MarkDown/MarkDown";

interface AggregatorProps {
  resumeData: ResumeType[];
  aggregatorOverlay: boolean;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
}

const Aggregator: FC<AggregatorProps> = ({
  resumeData,
  aggregatorOverlay,
  setAggregatorSetup,
}) => {
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 relative">
      {resumeData.map((data, index) => (
        <div
          key={index}
          className="col-span-1 border rounded-lg overflow-hidden"
        >
          <div className="h-4 w-full bg-[#0C61B6]"></div>
          <div className="py-3 px-5">
            <div className="flex justify-between items-center gap-2 mb-4">
              <div className="grow">
                <p className="font-bold text-sm">{data.section_name}</p>
              </div>
              <HiOutlineDotsHorizontal
                className={`text-2xl cursor-pointer rotate-90`}
              />
            </div>
            <div className="divide-y space-y-4 divide-black">
              <div className="">
                <p className="text-sm font-bold">Summary</p>
                <div className="text-[#5C5C5C] text-xs mt-4">
                  <MarkDown content={data.section_report} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {aggregatorOverlay && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-[70vh]">
          <button
            onClick={() => setAggregatorSetup("setup")}
            className="py-2 px-6 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-full text-sm"
          >
            Setup
          </button>
        </div>
      )}
    </div>
  );
};

export default Aggregator;
