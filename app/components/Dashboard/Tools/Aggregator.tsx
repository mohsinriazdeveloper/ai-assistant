import { ResumeType } from "@/app/(pages)/agent/[id]/tools/page";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import MarkDown from "../../MarkDown/MarkDown";

interface AggregatorProps {
  resumeData1: ResumeType[];
  resumeData2: ResumeType[];
  setResumeData1: Dispatch<SetStateAction<ResumeType[]>>;
  setResumeData2: Dispatch<SetStateAction<ResumeType[]>>;
  aggregatorOverlay1: boolean;
  aggregatorOverlay2: boolean;
  setAggregatorOverlay1: Dispatch<SetStateAction<boolean>>;
  setAggregatorOverlay2: Dispatch<SetStateAction<boolean>>;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
}

const Aggregator: FC<AggregatorProps> = ({
  resumeData1,
  resumeData2,
  setResumeData1,
  setResumeData2,
  aggregatorOverlay1,
  aggregatorOverlay2,
  setAggregatorOverlay1,
  setAggregatorOverlay2,
  setAggregatorSetup,
}) => {
  const [dropDown1, setDropDown1] = useState<boolean>(false);
  const [dropDown2, setDropDown2] = useState<boolean>(false);

  const deleteData1 = () => {
    setDropDown1(false);
    setResumeData1([]);
    setAggregatorOverlay1(true);
  };
  const deleteData2 = () => {
    setDropDown2(false);
    setResumeData2([]);
    setAggregatorOverlay2(true);
  };
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
      <div
        className={`col-span-1 border rounded-lg overflow-hidden relative ${
          !resumeData1.length && "h-[70vh]"
        }`}
      >
        <div className="h-4 w-full bg-[#0C61B6]"></div>
        <HiOutlineDotsHorizontal
          className={`text-2xl cursor-pointer rotate-90 ml-auto`}
          onClick={() => setDropDown1(!dropDown1)}
        />
        {dropDown1 && (
          <div className="absolute w-[100px] bg-white rounded-md shadow-md p-1 right-0">
            <p
              onClick={deleteData1}
              className="text-sm text-red-500 hover:bg-slate-200 cursor-pointer px-2 py-1"
            >
              Delete
            </p>
          </div>
        )}

        {resumeData1.map((data, index) => (
          <div key={index}>
            <div className="py-3 px-5">
              <div className="flex justify-between items-center gap-2 mb-4">
                <div className="grow">
                  <p className="font-bold text-sm">{data.section_name}</p>
                </div>
              </div>
              <div className="divide-y space-y-4 divide-black">
                <div className="">
                  <div className="text-[#5C5C5C] text-xs mt-4">
                    <MarkDown content={data.section_report} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {aggregatorOverlay1 && (
          <div className="absolute inset-0 bg-[#3C3C3F] bg-opacity-80 flex items-center justify-center z-10 h-full">
            <button
              onClick={() => setAggregatorSetup("setup1")}
              className="py-2 px-6 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-full text-sm"
            >
              Setup
            </button>
          </div>
        )}
      </div>
      <div
        className={`col-span-1 border rounded-lg overflow-hidden relative ${
          !resumeData2.length && "h-[70vh]"
        }`}
      >
        <div className="h-4 w-full bg-[#751A1A]"></div>
        <HiOutlineDotsHorizontal
          className={`text-2xl cursor-pointer rotate-90 ml-auto`}
          onClick={() => setDropDown2(!dropDown2)}
        />
        {dropDown2 && (
          <div className="absolute w-[100px] bg-white rounded-md shadow-md p-1 right-0">
            <p
              onClick={deleteData2}
              className="text-sm text-red-500 hover:bg-slate-200 cursor-pointer px-2 py-1"
            >
              Delete
            </p>
          </div>
        )}
        {resumeData2.map((data, index) => (
          <div key={index}>
            <div className="py-3 px-5">
              <div className="flex justify-between items-center gap-2 mb-4">
                <div className="grow">
                  <p className="font-bold text-sm">{data.section_name}</p>
                </div>
              </div>
              <div className="divide-y space-y-4 divide-black">
                <div className="">
                  <div className="text-[#5C5C5C] text-xs mt-4">
                    <MarkDown content={data.section_report} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {aggregatorOverlay2 && (
          <div className="absolute inset-0 bg-[#3C3C3F] bg-opacity-80 flex items-center justify-center z-10 h-full">
            <button
              onClick={() => setAggregatorSetup("setup2")}
              className="py-2 px-6 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-full text-sm"
            >
              Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aggregator;
