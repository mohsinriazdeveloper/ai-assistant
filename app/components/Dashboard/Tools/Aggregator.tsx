import MarkDown2 from "@/app/components/MarkDown/MarkDown2";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import Loader from "../../Loader/Loader";
import {
  useDeleteResumeMutation,
  useUpdateReportMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { ReportType } from "../../ReduxToolKit/types/agents";
import Loader2 from "../../Loader/Loader2";

type RequestPayload = {
  summary_name: string;
  auto_update: string;
  sections: [
    {
      display_source_links: boolean;
      instructions: string;
      section_name: string;
      source: {
        agent_graph_api_connection_id: number | null;
        agent_source_api_connection_id: number | null;
        file_ids: number[] | null;
      };
    }
  ];
};
interface AggregatorProps {
  agentId: number;
  wholeReport: ReportType | null;
  setWholeReport: Dispatch<SetStateAction<ReportType | null>>;
  aggregatorOverlay1: boolean | undefined;
  setAggregatorOverlay1: Dispatch<SetStateAction<boolean | undefined>>;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
  setUpdateFlag: Dispatch<SetStateAction<boolean>>;
}

const Aggregator: FC<AggregatorProps> = ({
  agentId,
  wholeReport,
  setWholeReport,
  aggregatorOverlay1,
  setAggregatorOverlay1,
  setAggregatorSetup,
  setUpdateFlag,
}) => {
  const [updateResume, { isLoading: updateResumeLoading }] =
    useUpdateReportMutation();
  const [deleteReport, { isLoading: deleteLoader }] = useDeleteResumeMutation();
  const [dropDown1, setDropDown1] = useState<boolean>(false);
  const [regeneratePrompt, setRegeneratePrompt] = useState<RequestPayload>();

  useEffect(() => {
    if (wholeReport?.request_payload) {
      setRegeneratePrompt(wholeReport.request_payload);
    }
  }, [wholeReport]);

  const deleteData1 = async () => {
    const id = agentId;
    try {
      await deleteReport(id);
      setWholeReport(null);
      setDropDown1(false);
      setUpdateFlag(false);
      setAggregatorOverlay1(true);
      toast.success("Report deleted successfully");
    } catch (error) {
      toast.error("Failed to delete report");
    }
  };
  const handleRegenerate = async () => {
    try {
      const updateReport = await updateResume({
        id: agentId,
        data: regeneratePrompt,
      });
      toast.success("Resume updated successfully");
    } catch (error) {
      toast.error("Try Again Later");
    }
  };
  console.log("wholeReport: ", wholeReport?.request_payload);
  return (
    <div className="w-full">
      <div
        className={`col-span-1 border border-[#A8A8A8] rounded-lg relative pt-11 pb-7 pl-12 pr-7 min-h-[70vh]
        }`}
      >
        {wholeReport && (
          <div>
            <div className="py-3 px-5">
              <div
                className="flex justify-between items-start
             gap-2 mb-4"
              >
                <div className="grow">
                  <p className="font-bold text-3xl">
                    {wholeReport?.summary_name}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {wholeReport?.sections[0].sources.map((source, index) => {
                      const colonIndex = source.indexOf(":"); // Find the first colon
                      const firstPart = source.slice(0, colonIndex); // Text before the first colon
                      const secondPart = source.slice(colonIndex + 1); // Text after the first colon (URL)
                      function isValidUrl(): boolean {
                        try {
                          new URL(secondPart);
                          return true;
                        } catch (error) {
                          return false;
                        }
                      }
                      return (
                        <div key={index} className="text-[#084B8D] text-xl">
                          {isValidUrl() ? (
                            <Link
                              href={secondPart}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {firstPart}
                            </Link>
                          ) : (
                            <p>{firstPart}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <button
                      disabled={updateResumeLoading}
                      onClick={handleRegenerate}
                      className={`${
                        updateResumeLoading
                          ? "cursor-progress bg-black"
                          : "cursor-pointer bg-[#3C3C3F] hover:bg-gray-200 hover:text-black text-white font-medium text-sm "
                      } py-2 px-5  border border-[#3C3C3F] rounded-md transition-colors duration-500`}
                    >
                      {updateResumeLoading ? <Loader /> : "Re-Generate"}
                    </button>
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
                        <div
                          onClick={() => setAggregatorSetup("setup1")}
                          className="w-full h-[68px] flex justify-center items-center bg-[#F9F9F9] rounded-[5px] mb-4 cursor-pointer"
                        >
                          <p className="text-sm font-semibold">Edit Prompt</p>
                        </div>
                        <div
                          onClick={deleteData1}
                          className="w-full h-[38px] flex justify-center items-center bg-[#FFE8E8] rounded-[5px] cursor-pointer"
                        >
                          {deleteLoader ? (
                            <Loader />
                          ) : (
                            <p className="text-sm font-semibold">Remove</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {wholeReport?.sections.map((item, index) => (
                <div key={index} className="divide-y space-y-4 divide-black">
                  <div className="">
                    <p className="font-bold text-[22px]">
                      {item?.section_name}
                    </p>
                    <div className="mt-4">
                      <MarkDown2 content={item.section_report} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aggregatorOverlay1 && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-full">
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
