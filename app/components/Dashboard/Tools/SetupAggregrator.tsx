import { SectionData } from "@/app/(pages)/agent/[id]/tools/page";
import BtnIcon from "@/app/assets/Images/btnStars.png";
import Image from "next/image";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Loader2 from "../../Loader/Loader2";
import {
  useGetAgentByIdQuery,
  useGetAllGraphsQuery,
  useGetSourceApiConnectionsQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { Files } from "../../ReduxToolKit/types/agents";

// Add interface for selected sources
interface SelectedSource {
  id: string;
  name: string;
  type: "graph" | "api" | "file";
  data: {
    file_ids?: number | null;
    agent_source_api_connection_id?: number | null;
    agent_graph_api_connection_id?: number | null;
  };
}

interface SetupAggregratorProps {
  agentId: number;
  updateFlag: boolean;
  summaryName: string;
  autoUpdate: string;
  setAutoUpdate: Dispatch<SetStateAction<string>>;
  setSummaryName: Dispatch<SetStateAction<string>>;
  sectionData: SectionData[];
  setSectionData: Dispatch<SetStateAction<SectionData[]>>;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
  handleGenerateAggregator: () => Promise<void>;
  createResumeLoading: boolean;
  updateResumeLoading: boolean;
}

const SetupAggregrator: FC<SetupAggregratorProps> = ({
  agentId,
  updateFlag,
  summaryName,
  autoUpdate,
  setAutoUpdate,
  setSummaryName,
  sectionData,
  setSectionData,
  setAggregatorSetup,
  handleGenerateAggregator,
  createResumeLoading,
  updateResumeLoading,
}) => {
  const { data: getGraphs, isLoading } = useGetAllGraphsQuery(agentId);
  const { data: apiConnectionData } = useGetSourceApiConnectionsQuery(agentId);
  const { data: agent, isLoading: agentDataoading } =
    useGetAgentByIdQuery(agentId);
  const [sourceDropDownIndex, setSourceDropDownIndex] = useState<number | null>(
    null
  );
  const [sections, setSections] = useState<number[]>([1]);
  const [sourceList, setSourceList] = useState<Files[]>([]);

  // Add state for selected sources for each section
  const [selectedSources, setSelectedSources] = useState<SelectedSource[][]>(
    []
  );

  // Add a flag to track if data has been initialized
  const [isDataInitialized, setIsDataInitialized] = useState<boolean>(false);

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (agent?.files) {
      setSourceList(agent.files);
    } else {
      setSourceList([]);
    }
  }, [agent]);

  // Initialize selectedSources and sections when sectionData changes
  useEffect(() => {
    if (
      sectionData.length > 0 &&
      !isDataInitialized &&
      getGraphs &&
      apiConnectionData &&
      sourceList.length > 0
    ) {
      console.log("Initializing data with sectionData:", sectionData);

      // Set sections based on sectionData length
      setSections(Array.from({ length: sectionData.length }, (_, i) => i + 1));

      // Initialize selectedSources with existing data
      const initialSelectedSources: SelectedSource[][] = sectionData.map(
        (section) => {
          const sources: SelectedSource[] = [];

          // Add file sources
          if (section.source.file_ids && section.source.file_ids.length > 0) {
            section.source.file_ids.forEach((fileId) => {
              const file = sourceList.find((f) => f.id === fileId);
              if (file) {
                sources.push({
                  id: `file-${fileId}`,
                  name: file.file_name || file.website_url || "Unknown",
                  type: "file",
                  data: {
                    file_ids: fileId,
                    agent_source_api_connection_id: null,
                    agent_graph_api_connection_id: null,
                  },
                });
              }
            });
          }

          // Add graph source
          if (section.source.agent_graph_api_connection_id) {
            const graph = getGraphs?.find(
              (g) =>
                g.agent_graph_api_connection_id ===
                section.source.agent_graph_api_connection_id
            );
            if (graph) {
              sources.push({
                id: `graph-${section.source.agent_graph_api_connection_id}`,
                name: graph.name,
                type: "graph",
                data: {
                  file_ids: null,
                  agent_source_api_connection_id: null,
                  agent_graph_api_connection_id:
                    section.source.agent_graph_api_connection_id,
                },
              });
            }
          }

          // Add API source
          if (section.source.agent_source_api_connection_id) {
            const api = apiConnectionData?.find(
              (a) =>
                a.agent_source_api_connection_id ===
                section.source.agent_source_api_connection_id
            );
            if (api) {
              sources.push({
                id: `api-${section.source.agent_source_api_connection_id}`,
                name: api.name,
                type: "api",
                data: {
                  file_ids: null,
                  agent_source_api_connection_id:
                    section.source.agent_source_api_connection_id,
                  agent_graph_api_connection_id: null,
                },
              });
            }
          }

          return sources;
        }
      );

      setSelectedSources(initialSelectedSources);
      setIsDataInitialized(true);
      console.log("Initialized selectedSources:", initialSelectedSources);
    }
  }, [
    sectionData,
    getGraphs,
    apiConnectionData,
    sourceList,
    isDataInitialized,
  ]);

  // Reset initialization flag when sectionData changes externally (new data loaded)
  useEffect(() => {
    setIsDataInitialized(false);
  }, [sectionData]);

  // Handle adding new sections
  useEffect(() => {
    if (sectionData.length > selectedSources.length && isDataInitialized) {
      setSections(Array.from({ length: sectionData.length }, (_, i) => i + 1));
      setSelectedSources((prev) => [...prev, []]);
    }
  }, [sectionData, selectedSources.length, isDataInitialized]);

  const handleAddSection = () => {
    setSections((prev) => [...prev, prev.length + 1]);
    setSectionData((prev) => [
      ...prev,
      {
        section_name: "",
        source: {
          file_ids: [],
          agent_source_api_connection_id: null,
          agent_graph_api_connection_id: null,
        },
        display_source_links: false,
        instructions: "",
      },
    ]);
    // Add empty array for new section's selected sources
    setSelectedSources((prev) => [...prev, []]);
  };

  const handleDeleteSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
    setSectionData((prev) => prev.filter((_, i) => i !== index));
    setSelectedSources((prev) => prev.filter((_, i) => i !== index));
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

  // Function to add selected source
  const handleSourceSelect = (sectionIndex: number, source: SelectedSource) => {
    setSelectedSources((prev) =>
      prev.map((sources, i) =>
        i === sectionIndex ? [...sources, source] : sources
      )
    );

    // Update sectionData accordingly
    const prevSource = sectionData[sectionIndex].source;
    if (source.type === "file") {
      handleSectionDataChange(sectionIndex, "source", {
        ...prevSource,
        file_ids: [...(prevSource.file_ids || []), source.data.file_ids].filter(
          (id, idx, arr) => typeof id === "number" && arr.indexOf(id) === idx
        ), // unique
      });
    } else if (source.type === "api") {
      handleSectionDataChange(sectionIndex, "source", {
        ...prevSource,
        agent_source_api_connection_id:
          source.data.agent_source_api_connection_id,
      });
    } else if (source.type === "graph") {
      handleSectionDataChange(sectionIndex, "source", {
        ...prevSource,
        agent_graph_api_connection_id:
          source.data.agent_graph_api_connection_id,
      });
    }
  };

  // Function to remove selected source
  const handleSourceRemove = (sectionIndex: number, sourceId: string) => {
    setSelectedSources((prev) =>
      prev.map((sources, i) =>
        i === sectionIndex ? sources.filter((s) => s.id !== sourceId) : sources
      )
    );

    const prevSource = sectionData[sectionIndex].source;
    const removedSource = selectedSources[sectionIndex].find(
      (s) => s.id === sourceId
    );
    if (!removedSource) return;

    if (removedSource.type === "file") {
      handleSectionDataChange(sectionIndex, "source", {
        ...prevSource,
        file_ids: (prevSource.file_ids || []).filter(
          (id) => id !== removedSource.data.file_ids
        ),
      });
    } else if (removedSource.type === "api") {
      handleSectionDataChange(sectionIndex, "source", {
        ...prevSource,
        agent_source_api_connection_id: null,
      });
    } else if (removedSource.type === "graph") {
      handleSectionDataChange(sectionIndex, "source", {
        ...prevSource,
        agent_graph_api_connection_id: null,
      });
    }
  };

  // Function to check if source is already selected
  const isSourceSelected = (sectionIndex: number, sourceId: string) => {
    return (
      selectedSources[sectionIndex]?.some((s) => s.id === sourceId) || false
    );
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 30) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Remove the old useEffect that was causing issues
  // useEffect(() => {
  //   selectedSources.forEach((sources, idx) => {
  //     const hasFile = sources.some((s) => s.type === "file");
  //     if (hasFile) {
  //       handleSectionDataChange(idx, "source", {
  //         ...sectionData[idx].source,
  //         file_ids: sources
  //           .filter((s) => s.type === "file")
  //           .map((s) => s.data.file_ids)
  //           .filter((id) => typeof id === "number"),
  //       });
  //     }
  //   });
  // }, [selectedSources]);

  useEffect(() => {
    if (sourceDropDownIndex === null) return;

    function handleClickOutside(event: MouseEvent) {
      const idx = sourceDropDownIndex ?? undefined;
      if (typeof idx === "number") {
        const ref = dropdownRefs.current[idx];
        if (ref && !ref.contains(event.target as Node)) {
          setSourceDropDownIndex(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sourceDropDownIndex]);

  return (
    <div className="relative ">
      <div className="w-full">
        <div
          className="flex items-center cursor-pointer max-w-fit"
          onClick={() => setAggregatorSetup("summary")}
        >
          <IoIosArrowBack className="text-3xl" />
          <p className="font-bold">Back</p>
        </div>
        <div className="mt-7 bg-[#FAFAFA] pt-5 pb-11 px-4 space-y-4">
          <p>Summary Name</p>
          <input
            className="focus:outline-none w-[42%] rounded-[10px] py-3 px-4 border border-[#f3f3f3]"
            type="text"
            placeholder="Enter summary name"
            value={summaryName}
            onChange={(e) => setSummaryName(e.target.value)}
          />
          <div className="w-[50%]">
            <p>Auto Call</p>
            <div className=" bg-white mt-2 h-[64px] border border-[#f3f3f3] rounded-[10px] py-3 px-4 w-full flex justify-between items-center gap-3 flex-wrap">
              {["manually", "daily", "weekly", "monthly", "quarterly"].map(
                (option) => (
                  <div
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setAutoUpdate(option)}
                  >
                    <div className="w-5 h-5 rounded-[7px] border-[1.5px] border-[#ADA7A7] flex justify-center items-center text-sm font-bold">
                      <p className="pb-1">{autoUpdate === option ? "x" : ""}</p>
                    </div>
                    <p className="capitalize">{option}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Render multiple sections */}
        {sections.map((section, index) => (
          <div key={section} className="bg-[#FAFAFA] mt-4 py-5 px-4 space-y-4">
            <div className="flex justify-between items-center">
              <p>Section {index + 1} Name</p>
              {sections.length > 1 && (
                <RiDeleteBinLine
                  onClick={() => handleDeleteSection(index)}
                  className="mb-1 cursor-pointer hover:text-red-500 duration-300 transition-colors"
                />
              )}
            </div>
            <input
              className="focus:outline-none rounded py-3 px-4 border border-[#f3f3f3] w-[701px]"
              type="text"
              placeholder={`Enter Section ${index + 1} name`}
              value={sectionData[index]?.section_name || ""}
              onChange={(e) =>
                handleSectionDataChange(index, "section_name", e.target.value)
              }
            />
            <div className="w-[701px] md:flex flex-wrap justify-between gap-3">
              <div className="w-[60%] relative">
                <div
                  onClick={() =>
                    setSourceDropDownIndex(
                      sourceDropDownIndex === index ? null : index
                    )
                  }
                  className="border border-[#c3c3c3] rounded-full py-3 px-4 flex justify-between items-center font-medium cursor-pointer overflow-hidden min-h-[48px]"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <HiOutlineCircleStack className="flex-shrink-0" />

                    {selectedSources[index]?.length > 0 ? (
                      <div className="flex flex-wrap gap-1 flex-1">
                        {selectedSources[index].map((source) => (
                          <div
                            key={source.id}
                            className="bg-gray-100 rounded-full px-2 py-1 text-xs flex items-center gap-1 max-w-[150px]"
                          >
                            <span className="truncate">
                              {truncateText(source.name)}
                            </span>
                            <IoClose
                              className="cursor-pointer hover:text-red-500 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSourceRemove(index, source.id);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Select Sources</p>
                    )}
                  </div>
                  <MdKeyboardArrowDown className="text-xl flex-shrink-0" />
                </div>

                {sourceDropDownIndex === index && (
                  <div
                    ref={(el) => {
                      dropdownRefs.current[index] = el;
                    }}
                    className="w-full overflow-x-hidden absolute bg-white rounded-md border border-[#c3c3c3] p-1 mt-1 text-sm text-gray-700 z-10"
                  >
                    {getGraphs?.slice(1).map(
                      (item, graphIndex) =>
                        item.is_connected &&
                        !isSourceSelected(
                          index,
                          `graph-${item.agent_graph_api_connection_id}`
                        ) && (
                          <p
                            key={graphIndex}
                            className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              const newSource: SelectedSource = {
                                id: `graph-${item.agent_graph_api_connection_id}`,
                                name: item.name,
                                type: "graph",
                                data: {
                                  file_ids: null,
                                  agent_source_api_connection_id: null,
                                  agent_graph_api_connection_id:
                                    item.agent_graph_api_connection_id,
                                },
                              };
                              handleSourceSelect(index, newSource);
                            }}
                          >
                            {item.name}
                          </p>
                        )
                    )}
                    {apiConnectionData?.map(
                      (item, apiIndex) =>
                        item.is_connected &&
                        !isSourceSelected(
                          index,
                          `api-${item.agent_source_api_connection_id}`
                        ) && (
                          <p
                            key={apiIndex}
                            className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              const newSource: SelectedSource = {
                                id: `api-${item.agent_source_api_connection_id}`,
                                name: item.name,
                                type: "api",
                                data: {
                                  file_ids: null,
                                  agent_source_api_connection_id:
                                    item.agent_source_api_connection_id,
                                  agent_graph_api_connection_id: null,
                                },
                              };
                              handleSourceSelect(index, newSource);
                            }}
                          >
                            {item.name}
                          </p>
                        )
                    )}
                    {sourceList?.map(
                      (item) =>
                        !isSourceSelected(index, `file-${item.id}`) && (
                          <p
                            key={item.id}
                            className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              const fileName =
                                item.file_name || item.website_url || "Unknown";
                              const newSource: SelectedSource = {
                                id: `file-${item.id}`,
                                name: fileName,
                                type: "file",
                                data: {
                                  file_ids: item.id,
                                  agent_source_api_connection_id: null,
                                  agent_graph_api_connection_id: null,
                                },
                              };
                              handleSourceSelect(index, newSource);
                            }}
                          >
                            {item.file_name && item.file_name}
                            {item.website_url && item.website_url}
                          </p>
                        )
                    )}
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
            <div className="w-[701px]">
              <p>Instructions</p>
              <textarea
                rows={2}
                className="focus:outline-none rounded-[10px] w-full py-3 px-4 border border-[#f3f3f3] resize-none"
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
            className="w-[214px] h-[39px] flex justify-center items-center gap-2 font-bold hover:bg-[#3c3c3f] bg-[#000000] text-white rounded-[15px]"
          >
            <Image src={BtnIcon} alt="" />
            <p>{updateFlag ? "Update" : "Generate"}</p>
          </button>
        </div>
      </div>

      {createResumeLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-full">
          <Loader2 />
        </div>
      )}
      {updateResumeLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-full">
          <Loader2 />
        </div>
      )}
    </div>
  );
};

export default SetupAggregrator;
