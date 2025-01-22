"use client";
import Background from "@/app/components/Background/Background";
import ConnectionRawData from "@/app/components/Connect/ConnectionRawData";
import Aggregator from "@/app/components/Dashboard/Tools/Aggregator";
import SetupAggregrator from "@/app/components/Dashboard/Tools/SetupAggregrator";
import SetupApi from "@/app/components/Dashboard/Tools/SetupApi";
import ToolDashboardLayout from "@/app/components/Dashboard/Tools/ToolDashboardLayout";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar";
import { useCreateResumeMutation } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { getContent, sideBarOptions } from "../content";

export type SectionData = {
  section_name: string;
  source_id: number;
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("dashboard");
  const [isSetup, setIsSetup] = useState<string | boolean>("graph");
  const [aggregatorSetup, setAggregatorSetup] = useState<string>("summary");
  const [aggregatorOverlay, setAggregatorOverlay] = useState<boolean>(true);
  const [getRawDataId, setGetRawDataId] = useState<number>(0);

  const [summaryName, setSummaryName] = useState<string>("");
  const [sectionData, setSectionData] = useState<SectionData[]>([
    {
      section_name: "",
      source_id: 0,
      display_source_links: false,
      instructions: "",
    },
  ]);

  const [resumeData, setResumeData] = useState<ResumeType[]>([]);

  const navContent = getContent(id);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  if (!access) {
    return null;
  }

  const handleGenerateAggregator = async () => {
    if (!summaryName) {
      toast.error("Please provide a summary name");
      return;
    }
    if (!sectionData.length) {
      toast.error("Sections are required and cannot be empty");
      return;
    }
    for (let i = 0; i < sectionData.length; i++) {
      const section = sectionData[i];

      if (!section.section_name) {
        toast.error(`Section ${i + 1}: Please provide a section name`);
        return;
      }

      if (!section.source_id) {
        toast.error(`Section ${i + 1}: Please select a valid source`);
        return;
      }

      if (!section.instructions) {
        toast.error(`Section ${i + 1}: Please provide instructions`);
        return;
      }
    }
    const payload = {
      summary_name: summaryName,
      sections: sectionData.map((section) => ({
        section_name: section.section_name,
        source_id: section.source_id,
        display_source_links: section.display_source_links,
        instructions: section.instructions,
      })),
    };

    try {
      const resumeRes = await createResume({ id, data: payload });
      setAggregatorOverlay(false);
      setAggregatorSetup("summary");
      setResumeData(resumeRes.data);
      toast.success("Resume created successfully");
    } catch (error) {
      toast.error("Failed to create resume");
      console.error("Error:", error);
    }
  };
  return (
    <Background>
      <div className="tab:grid grid-cols-12 w-full h-full">
        <div
          className={`${
            isMobile ? "hidden" : "block"
          } col-span-3 tab:relative absolute h-full tab:w-full sm:w-[40%] w-[50%] tab:pb-0 pb-10 bg-[#101010] overflow-y-auto scrollbar-hide z-20`}
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
            isMobile ? "col-span-12" : "col-span-9"
          } rounded-[20px] bg-white h-full`}
        >
          <div className="flex items-center pt-5 step-2">
            {isMobile && (
              <HiOutlineDotsHorizontal
                className={`text-2xl cursor-pointer ml-3`}
                onClick={() => setIsMobile(false)}
              />
            )}
            <NavBar content={navContent.navBar} />
          </div>

          <div
            className={`my-5 px-10 h-[78vh] ${
              !createResumeLoading && " overflow-y-scroll primaryScroller mr-2"
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
                    resumeData={resumeData}
                    aggregatorOverlay={aggregatorOverlay}
                    setAggregatorSetup={setAggregatorSetup}
                  />
                )}
                {aggregatorSetup === "setup" && (
                  <SetupAggregrator
                    agentId={id}
                    summaryName={summaryName}
                    setSummaryName={setSummaryName}
                    sectionData={sectionData}
                    setSectionData={setSectionData}
                    setAggregatorSetup={setAggregatorSetup}
                    handleGenerateAggregator={handleGenerateAggregator}
                    createResumeLoading={createResumeLoading}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Page;
