"use client";
import Background from "@/app/components/Background/Background";
import ConnectionRawData from "@/app/components/Connect/ConnectionRawData";
import Aggregator from "@/app/components/Dashboard/Tools/Aggregator";
import SetupAggregrator from "@/app/components/Dashboard/Tools/SetupAggregrator";
import SetupApi from "@/app/components/Dashboard/Tools/SetupApi";
import ToolDashboardLayout from "@/app/components/Dashboard/Tools/ToolDashboardLayout";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar2";
import {
  useCreateResumeMutation,
  useGetResumeQuery,
  useUpdateReportMutation,
} from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { ReportType } from "@/app/components/ReduxToolKit/types/agents";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuChevronRight } from "react-icons/lu";
import { getContent, sideBarOptions } from "../content";

export type SectionData = {
  section_name: string;
  source: {
    file_id: number | null;
    agent_source_api_connection_id: number | null;
    agent_graph_api_connection_id: number | null;
  };
  display_source_links: boolean;
  instructions: string;
};
export type ResumeType = {
  section_name: string;
  section_report: string;
};
interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { access } = useAppSelector(selectAuth);
  const { id } = params;
  const [createResume, { isLoading: createResumeLoading }] =
    useCreateResumeMutation();
  const [updateResume, { isLoading: updateResumeLoading }] =
    useUpdateReportMutation();
  const { data: getReportData, error: reportError } = useGetResumeQuery(id);
  const [wholeReport, setWholeReport] = useState<ReportType | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("dashboard");
  const [isSetup, setIsSetup] = useState<string | boolean>("graph");
  const [aggregatorSetup, setAggregatorSetup] = useState<string>("summary");
  const [aggregatorOverlay1, setAggregatorOverlay1] = useState<boolean>();
  const [getRawDataId, setGetRawDataId] = useState<number>(0);
  const [summaryName1, setSummaryName1] = useState<string>("");
  const [sectionData1, setSectionData1] = useState<SectionData[]>([
    {
      section_name: "",
      source: {
        file_id: null,
        agent_source_api_connection_id: null,
        agent_graph_api_connection_id: null,
      },
      display_source_links: false,
      instructions: "",
    },
  ]);
  const [autoUpdate1, setAutoUpdate1] = useState<string>("manually");

  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const navContent = getContent(id);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  useEffect(() => {
    if (reportError) {
      setAggregatorOverlay1(true);
      setWholeReport(null);
      setUpdateFlag(false);
    } else if (getReportData) {
      setAggregatorOverlay1(false);
      setWholeReport(getReportData);
      setUpdateFlag(true);
    }
  }, [getReportData, reportError]);

  useEffect(() => {
    if (aggregatorSetup === "setup1" && wholeReport) {
      if (wholeReport.request_payload.summary_name) {
        setSummaryName1(wholeReport.request_payload.summary_name);
      }
      if (wholeReport.request_payload.auto_update) {
        setAutoUpdate1(wholeReport.request_payload.auto_update);
      }
      if (wholeReport.request_payload.sections) {
        setSectionData1(wholeReport.request_payload.sections);
      }
    }
  }, [wholeReport, aggregatorSetup]);

  if (!access) {
    return null;
  }

  const handleGenerateAggregator1 = async () => {
    if (!summaryName1) {
      toast.error("Please provide a summary name");
      return;
    }

    if (!sectionData1.length) {
      toast.error("Sections are required and cannot be empty");
      return;
    }

    for (let i = 0; i < sectionData1.length; i++) {
      const section = sectionData1[i];

      if (!section.section_name) {
        toast.error(`Section ${i + 1}: Please provide a section name`);
        return;
      }

      const {
        file_id,
        agent_graph_api_connection_id,
        agent_source_api_connection_id,
      } = section.source;

      const idCount = [
        file_id,
        agent_graph_api_connection_id,
        agent_source_api_connection_id,
      ].filter((id) => id !== null && id !== undefined).length;

      if (idCount !== 1) {
        toast.error(`Section ${i + 1}: Please select source`);
        return;
      }

      if (!section.instructions) {
        toast.error(`Section ${i + 1}: Please provide instructions`);
        return;
      }
    }

    const payload = {
      summary_name: summaryName1,
      auto_update: autoUpdate1,
      sections: sectionData1.map((section) => ({
        section_name: section.section_name,
        source: section.source,
        display_source_links: section.display_source_links,
        instructions: section.instructions,
      })),
    };

    console.log(payload);
    try {
      if (updateFlag) {
        const updateReport = await updateResume({ id, data: payload });

        setAggregatorOverlay1(false);
        setAggregatorSetup("summary");
        setSummaryName1("");
        setSectionData1([
          {
            section_name: "",
            source: {
              file_id: null,
              agent_graph_api_connection_id: null,
              agent_source_api_connection_id: null,
            },
            display_source_links: false,
            instructions: "",
          },
        ]);
        toast.success("Resume updated successfully");
      } else {
        const createReport = await createResume({ id, data: payload });
        console.log("report log error1: ", createReport.error);
        console.log("report error1: ", createReport.error);
        setAggregatorOverlay1(false);
        setAggregatorSetup("summary");
        setSummaryName1("");
        setSectionData1([
          {
            section_name: "",
            source: {
              file_id: null,
              agent_graph_api_connection_id: null,
              agent_source_api_connection_id: null,
            },
            display_source_links: false,
            instructions: "",
          },
        ]);
        toast.success("Resume created successfully");
      }
    } catch (error) {
      toast.error("Failed to create resume");
      console.error("Error:", error);
    }
  };

  return (
    <Background>
      <div className="flex w-full h-full">
        <div
          className={`${
            isMobile ? "hidden" : "block"
          } w-[22.7%] tab:relative absolute h-full tab:pb-0 pb-10 bg-[#101010] overflow-y-auto scrollbar-hide z-20`}
        >
          <SideBar
            agentId={id}
            setIsMobile={setIsMobile}
            tab={sideBarOptions.toolsTabs}
            setCheckOption={setCheckOption}
            checkOption={checkOption}
          />
        </div>
        <div
          className={`${
            isMobile ? "w-full" : "w-[77.3%]"
          } rounded-lg bg-[#101010] overflow-hidden h-full`}
        >
          <div className="flex items-center step-2">
            {isMobile && (
              <LuChevronRight
                className={`text-3xl cursor-pointer ml-3 mb-4 text-white`}
                onClick={() => setIsMobile(false)}
              />
            )}
            <NavBar content={navContent.navBar} />
          </div>
          <div className="h-full bg-white rounded-lg">
            <div
              className={`mb-5 px-10 h-[82vh] pt-11 ${
                !createResumeLoading &&
                " overflow-y-scroll primaryScroller mr-2"
              }`}
            >
              {checkOption === "dashboard" && (
                <>
                  {isSetup === "graph" && (
                    <ToolDashboardLayout
                      agentId={id}
                      setIsSetup={setIsSetup}
                      setGetRawDataId={setGetRawDataId}
                    />
                  )}
                  {isSetup === "setup" && (
                    <SetupApi agentId={id} setIsSetup={setIsSetup} />
                  )}
                  {isSetup === "rawData" && (
                    <ConnectionRawData
                      agentId={id}
                      setIsRawData={setIsSetup}
                      getRawDataId={getRawDataId}
                    />
                  )}
                </>
              )}
              {checkOption === "aggregator" && (
                <>
                  {aggregatorSetup === "summary" && (
                    <Aggregator
                      agentId={id}
                      wholeReport={wholeReport}
                      setWholeReport={setWholeReport}
                      aggregatorOverlay1={aggregatorOverlay1}
                      setAggregatorOverlay1={setAggregatorOverlay1}
                      setAggregatorSetup={setAggregatorSetup}
                      setUpdateFlag={setUpdateFlag}
                    />
                  )}
                  {aggregatorSetup === "setup1" && (
                    <SetupAggregrator
                      agentId={id}
                      updateFlag={updateFlag}
                      summaryName={summaryName1}
                      autoUpdate={autoUpdate1}
                      setAutoUpdate={setAutoUpdate1}
                      setSummaryName={setSummaryName1}
                      sectionData={sectionData1}
                      setSectionData={setSectionData1}
                      setAggregatorSetup={setAggregatorSetup}
                      handleGenerateAggregator={handleGenerateAggregator1}
                      createResumeLoading={createResumeLoading}
                      updateResumeLoading={updateResumeLoading}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Page;
