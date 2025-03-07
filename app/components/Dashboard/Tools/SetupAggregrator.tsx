import { SectionData } from "@/app/(pages)/agent/[id]/tools/page";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader2 from "../../Loader/Loader2";
import {
  useGetAgentByIdQuery,
  useGetAllGraphsQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { ApiConnection, Files } from "../../ReduxToolKit/types/agents";

interface SetupAggregratorProps {
  agentId: number;
  summaryName: string;
  setSummaryName: Dispatch<SetStateAction<string>>;
  sectionData: SectionData[];
  setSectionData: Dispatch<SetStateAction<SectionData[]>>;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
  handleGenerateAggregator: () => Promise<void>;
  createResumeLoading: boolean;
}

const SetupAggregrator: FC<SetupAggregratorProps> = ({
  agentId,
  summaryName,
  setSummaryName,
  sectionData,
  setSectionData,
  setAggregatorSetup,
  handleGenerateAggregator,
  createResumeLoading,
}) => {
  const { data: getGraphs, isLoading } = useGetAllGraphsQuery(agentId);
  const { data: agent, isLoading: agentDataoading } =
    useGetAgentByIdQuery(agentId);
  const [sourceDropDownIndex, setSourceDropDownIndex] = useState<number | null>(
    null
  ); // Track which section's dropdown is open
  const [sections, setSections] = useState<number[]>([1]); // Array to track sections
  const [sourceList, setSourceList] = useState<Files[]>([]);
  const [graphList, setGraphList] = useState<ApiConnection[]>([]);

  useEffect(() => {
    if (getGraphs) {
      setGraphList(getGraphs);
    } else {
      setGraphList([]);
    }
  }, [getGraphs]);

  useEffect(() => {
    if (agent?.files) {
      // const filteredFiles = agent?.files.filter(
      //   (item) => item.file_category === "image" || "file"
      // );
      // setSourceList(filteredFiles);
      setSourceList(agent.files);
    } else {
      setSourceList([]);
    }
  }, [agent]);

  const sourceGraph = [...graphList, ...sourceList];

  const handleAddSection = () => {
    setSections((prev) => [...prev, prev.length + 1]);
    setSectionData((prev) => [
      ...prev,
      {
        section_name: "",
        source_id: 0,
        display_source_links: false,
        instructions: "",
      },
    ]);
  };

  const handleDeleteSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
    setSectionData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSectionDataChange = (
    index: number,
    key: keyof SectionData,
    value: any
  ) => {
    setSectionData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };
  console.log(sourceList);
  return (
    <div className="relative ">
      <div className="tab:w-[70%] md:w-[90%] w-[100%]">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setAggregatorSetup("summary")}
        >
          <IoIosArrowBack className="text-3xl" />
          <p className="font-bold">Back</p>
        </div>
        <div className="mt-7 border border-[#686868] py-5 px-4 space-y-4">
          <p>Summary Name</p>
          <input
            className="focus:outline-none w-[80%] rounded py-3 px-4 border border-[#c3c3c3]"
            type="text"
            placeholder="Enter summary name"
            value={summaryName}
            onChange={(e) => setSummaryName(e.target.value)}
          />
        </div>

        {/* Render multiple sections */}
        {sections.map((section, index) => (
          <div
            key={section}
            className="mt-4 border border-[#686868] py-5 px-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <p>Section {index + 1} Name</p>
              <RiDeleteBinLine
                onClick={() => handleDeleteSection(index)}
                className="mb-1 cursor-pointer hover:text-red-500 duration-300 transition-colors"
              />
            </div>
            <input
              className="focus:outline-none rounded w-full py-3 px-4 border border-[#c3c3c3]"
              type="text"
              placeholder={`Enter Section ${index + 1} name`}
              value={sectionData[index]?.section_name || ""}
              onChange={(e) =>
                handleSectionDataChange(index, "section_name", e.target.value)
              }
            />
            <div className="md:flex flex-wrap justify-between gap-3">
              <div className="w-[60%] relative">
                <div
                  onClick={() =>
                    setSourceDropDownIndex(
                      sourceDropDownIndex === index ? null : index
                    )
                  }
                  className="border border-[#c3c3c3] rounded-full py-3 px-4 flex justify-between items-center font-medium cursor-pointer"
                >
                  <p>
                    {(() => {
                      const graphName = getGraphs?.find(
                        (item) => item.id === sectionData[index]?.source_id
                      )?.name;

                      const fileName = sourceList?.find(
                        (item) => item.id === sectionData[index]?.source_id
                      )?.file_name;

                      return graphName || fileName ? (
                        <>
                          {graphName && <span>{graphName}</span>}
                          {fileName && <span>{fileName}</span>}
                        </>
                      ) : (
                        <span className="text-gray-500">Select Source</span>
                      );
                    })()}
                  </p>
                  <MdKeyboardArrowDown className="text-xl" />
                </div>
                {sourceDropDownIndex === index && (
                  <div className="w-full overflow-x-hidden absolute bg-white rounded-md border border-[#c3c3c3] p-1 mt-1 text-sm text-gray-700 z-10">
                    {getGraphs?.map((item) => (
                      <p
                        key={item.id}
                        className="px-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          handleSectionDataChange(index, "source_id", item.id);
                          setSourceDropDownIndex(null);
                        }}
                      >
                        {item.name}
                      </p>
                    ))}
                    {sourceList?.map((item) => (
                      <p
                        key={item.id}
                        className="px-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          handleSectionDataChange(index, "source_id", item.id);
                          setSourceDropDownIndex(null);
                        }}
                      >
                        {item.file_name && item.file_name}
                        {item.website_url && item.website_url}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={() =>
                  handleSectionDataChange(
                    index,
                    "display_source_links",
                    !sectionData[index]?.display_source_links
                  )
                }
                className="flex items-center gap-2 pr-5 md:mt-0 mt-2"
              >
                <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] flex justify-center items-center text-sm font-bold cursor-pointer">
                  <p className="pb-1">
                    {sectionData[index]?.display_source_links ? "x" : ""}
                  </p>
                </div>
                <p>Display Source link(s)</p>
              </div>
            </div>
            <div>
              <p>Instructions</p>
              <textarea
                rows={2}
                className="focus:outline-none rounded w-full py-3 px-4 border border-[#c3c3c3] resize-none"
                placeholder={`Ex: Instructions for Section ${index + 1}`}
                value={sectionData[index]?.instructions || ""}
                onChange={(e) =>
                  handleSectionDataChange(index, "instructions", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 pl-4 mt-4">
          <div
            className="w-12 h-9 bg-[#f5f5f5] rounded flex justify-center items-center text-black text-[10px] cursor-pointer"
            onClick={handleAddSection}
          >
            <FaPlus />
          </div>
          <p>Add Sections</p>
        </div>
        <div className="flex justify-end items-end gap-3 pt-10">
          <button
            onClick={handleGenerateAggregator}
            className="py-2 px-11 hover:bg-[#078fffc3] bg-[#0790FF] text-white font-medium rounded-full text-sm"
          >
            Generate
          </button>
        </div>
      </div>
      {createResumeLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-[78vh]">
          <Loader2 />
        </div>
      )}
    </div>
  );
};

export default SetupAggregrator;
