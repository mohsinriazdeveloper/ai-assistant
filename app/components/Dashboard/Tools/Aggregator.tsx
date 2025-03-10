import { ResumeType } from "@/app/(pages)/agent/[id]/tools/page";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import MarkDown2 from "../../MarkDown/MarkDown2";

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
    // <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
    <div className="w-full">
      <div
        className={`col-span-1 border rounded-lg relative pt-11 pb-7 pl-12 pr-7 ${
          !resumeData1.length && "h-[70vh]"
        }`}
      >
        {/* <div className="h-4 w-full bg-[#0C61B6]"></div> */}

        {resumeData1.map((data, index) => (
          <div key={index}>
            <div className="py-3 px-5">
              <div className="flex justify-between items-center gap-2 mb-4">
                <div className="grow">
                  <p className="font-bold text-3xl">{data.section_name}</p>
                </div>
                <div>
                  <HiOutlineDotsHorizontal
                    className={`text-3xl cursor-pointer rotate-90 ml-auto`}
                    onClick={() => setDropDown1(!dropDown1)}
                  />
                  {dropDown1 && (
                    <div className="absolute w-[261px] h-[269px] bg-white rounded-md shadow-md pt-7 px-5 pb-5 top-8 right-6 border">
                      <RxCross1
                        className={`text-2xl cursor-pointer rotate-90 ml-auto text-[#717680] mb-16`}
                        onClick={() => setDropDown1(!dropDown1)}
                      />
                      <div className="w-full h-[68px] flex justify-center items-center bg-[#F9F9F9] rounded-[5px] mb-4 cursor-pointer">
                        <p className="text-sm font-semibold">Edit Prompt</p>
                      </div>
                      <div
                        onClick={deleteData1}
                        className="w-full h-[38px] flex justify-center items-center bg-[#FFE8E8] rounded-[5px] cursor-pointer"
                      >
                        <p className="text-sm font-semibold">Remove</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="divide-y space-y-4 divide-black">
                <div className="">
                  <div className="text-[#5C5C5C] text-xs mt-4">
                    <MarkDown2 content={data.section_report} />
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
      {/* <div
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
                    <MarkDown2 content={data.section_report} />
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
      </div> */}
    </div>
  );
};

export default Aggregator;
