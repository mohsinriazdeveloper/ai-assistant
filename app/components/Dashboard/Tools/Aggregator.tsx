import MarkDown2 from "@/app/components/MarkDown/MarkDown2";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { useGetResumeQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
interface AggregatorProps {
  agentId: number;
  aggregatorOverlay1: boolean | undefined;
  setAggregatorOverlay1: Dispatch<SetStateAction<boolean | undefined>>;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
}

const Aggregator: FC<AggregatorProps> = ({
  agentId,
  aggregatorOverlay1,
  setAggregatorOverlay1,
  setAggregatorSetup,
}) => {
  const { data: getReportData } = useGetResumeQuery(agentId);
  const [dropDown1, setDropDown1] = useState<boolean>(false);

  useEffect(() => {
    if (getReportData) {
      setAggregatorOverlay1(false);
    } else {
      setAggregatorOverlay1(true);
    }
  }, [getReportData]);

  const deleteData1 = () => {
    setDropDown1(false);
    setAggregatorOverlay1(true);
  };
  return (
    <div className="w-full">
      <div
        className={`col-span-1 border rounded-lg relative pt-11 pb-7 pl-12 pr-7 min-h-[70vh]
        }`}
      >
        <div>
          <div className="py-3 px-5">
            <div className="flex justify-between items-center gap-2 mb-4">
              <div className="grow">
                <p className="font-bold text-3xl">
                  {getReportData?.summary_name}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {getReportData?.sections[0].sources.map((source, index) => (
                    <p key={index} className="text-[#084B8D] text-xl">
                      {source}
                    </p>
                  ))}
                </div>
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
            {getReportData?.sections.map((item, index) => (
              <div key={index} className="divide-y space-y-4 divide-black">
                <div className="">
                  <p className="font-bold text-xl">{item?.section_name}</p>
                  <div className="text-[#5C5C5C] text-xs mt-4">
                    <MarkDown2 content={item.section_report} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
    </div>
  );
};

export default Aggregator;
