import { Dispatch, FC, SetStateAction } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface AggregatorProps {
  agentId: number;
  aggregatorOverlay: boolean;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
}

const Aggregator: FC<AggregatorProps> = ({
  agentId,
  aggregatorOverlay,
  setAggregatorSetup,
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2 relative">
      <div className="col-span-1 border rounded-lg overflow-hidden">
        <div className="h-4 w-full bg-[#0C61B6]"></div>
        <div className="py-3 px-5">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="grow">
              <p className="font-bold text-sm">RBC data</p>
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#0C61B6]">
                <p>www.rbc.com/link</p>
                <p>GDP report 2025.pdf</p>
                <p>GDP report 2025.pdf</p>
              </div>
            </div>
            <HiOutlineDotsHorizontal
              className={`text-2xl cursor-pointer rotate-90`}
            />
          </div>
          <div className="divide-y space-y-4 divide-black">
            <div className="">
              <p className="text-sm font-bold">Summary</p>
              <p className="text-[#5C5C5C] text-xs mt-4">
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm font-bold">CPI report informations</p>
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#0C61B6]">
                <p>www.rbc.com/link</p>
              </div>

              <p className="text-[#5C5C5C] text-xs mt-4">
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm font-bold">GDP projections</p>
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#0C61B6]">
                <p>GDP report 2025.pdf</p>
              </div>
              <p className="text-[#5C5C5C] text-xs mt-4">
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 border rounded-lg overflow-hidden">
        <div className="h-4 w-full bg-[#751A1A]"></div>
        <div className="py-3 px-5">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="grow">
              <p className="font-bold text-sm">RBC data</p>
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#0C61B6]">
                <p>www.rbc.com/link</p>
                <p>GDP report 2025.pdf</p>
                <p>GDP report 2025.pdf</p>
              </div>
            </div>
            <HiOutlineDotsHorizontal
              className={`text-2xl cursor-pointer rotate-90`}
            />
          </div>
          <div className="divide-y space-y-4 divide-black">
            <div className="">
              <p className="text-sm font-bold">Summary</p>
              <p className="text-[#5C5C5C] text-xs mt-4">
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm font-bold">CPI report informations</p>
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#0C61B6]">
                <p>www.rbc.com/link</p>
              </div>

              <p className="text-[#5C5C5C] text-xs mt-4">
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm font-bold">GDP projections</p>
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#0C61B6]">
                <p>GDP report 2025.pdf</p>
              </div>
              <p className="text-[#5C5C5C] text-xs mt-4">
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page.
                Highlights of the page - Actual things mentionned in the page
              </p>
            </div>
          </div>
        </div>
      </div>
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
