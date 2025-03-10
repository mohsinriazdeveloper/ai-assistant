"use client";
import Background from "@/app/components/Background/Background";
import ConnectionRawData from "@/app/components/Connect/ConnectionRawData";
import Aggregator from "@/app/components/Dashboard/Tools/Aggregator";
import SetupAggregrator from "@/app/components/Dashboard/Tools/SetupAggregrator";
import SetupApi from "@/app/components/Dashboard/Tools/SetupApi";
import ToolDashboardLayout from "@/app/components/Dashboard/Tools/ToolDashboardLayout";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar2";
import { useCreateResumeMutation } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuChevronRight } from "react-icons/lu";
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
  const [aggregatorOverlay1, setAggregatorOverlay1] = useState<boolean>(true);
  const [aggregatorOverlay2, setAggregatorOverlay2] = useState<boolean>(true);

  const [getRawDataId, setGetRawDataId] = useState<number>(0);

  const [summaryName1, setSummaryName1] = useState<string>("");
  const [sectionData1, setSectionData1] = useState<SectionData[]>([
    {
      section_name: "",
      source_id: 0,
      display_source_links: false,
      instructions: "",
    },
  ]);
  const [summaryName2, setSummaryName2] = useState<string>("");
  const [sectionData2, setSectionData2] = useState<SectionData[]>([
    {
      section_name: "",
      source_id: 0,
      display_source_links: false,
      instructions: "",
    },
  ]);

  const [resumeData1, setResumeData1] = useState<ResumeType[]>([]);
  const [resumeData2, setResumeData2] = useState<ResumeType[]>([]);

  const navContent = getContent(id);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

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
      summary_name: summaryName1,
      sections: sectionData1.map((section) => ({
        section_name: section.section_name,
        source_id: section.source_id,
        display_source_links: section.display_source_links,
        instructions: section.instructions,
      })),
    };

    try {
      const resumeRes = await createResume({ id, data: payload });
      setAggregatorOverlay1(false);
      setAggregatorSetup("summary");
      setResumeData1(resumeRes.data);
      setSummaryName1("");
      setSectionData1([
        {
          section_name: "",
          source_id: 0,
          display_source_links: false,
          instructions: "",
        },
      ]);
      toast.success("Resume created successfully");
    } catch (error) {
      toast.error("Failed to create resume");
      console.error("Error:", error);
    }
  };
  const handleGenerateAggregator2 = async () => {
    if (!summaryName2) {
      toast.error("Please provide a summary name");
      return;
    }
    if (!sectionData2.length) {
      toast.error("Sections are required and cannot be empty");
      return;
    }
    for (let i = 0; i < sectionData2.length; i++) {
      const section = sectionData2[i];

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
      summary_name: summaryName2,
      sections: sectionData2.map((section) => ({
        section_name: section.section_name,
        source_id: section.source_id,
        display_source_links: section.display_source_links,
        instructions: section.instructions,
      })),
    };

    try {
      const resumeRes = await createResume({ id, data: payload });
      setAggregatorOverlay2(false);
      setAggregatorSetup("summary");
      setResumeData2(resumeRes.data);
      setSummaryName2("");
      setSectionData2([
        {
          section_name: "",
          source_id: 0,
          display_source_links: false,
          instructions: "",
        },
      ]);
      toast.success("Resume created successfully");
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
                      resumeData1={resumeData1}
                      resumeData2={resumeData2}
                      setResumeData1={setResumeData1}
                      setResumeData2={setResumeData2}
                      aggregatorOverlay1={aggregatorOverlay1}
                      aggregatorOverlay2={aggregatorOverlay2}
                      setAggregatorOverlay1={setAggregatorOverlay1}
                      setAggregatorOverlay2={setAggregatorOverlay2}
                      setAggregatorSetup={setAggregatorSetup}
                    />
                  )}
                  {aggregatorSetup === "setup1" && (
                    <SetupAggregrator
                      agentId={id}
                      summaryName={summaryName1}
                      setSummaryName={setSummaryName1}
                      sectionData={sectionData1}
                      setSectionData={setSectionData1}
                      setAggregatorSetup={setAggregatorSetup}
                      handleGenerateAggregator={handleGenerateAggregator1}
                      createResumeLoading={createResumeLoading}
                    />
                  )}
                  {/* {aggregatorSetup === "setup2" && (
                    <SetupAggregrator
                      agentId={id}
                      summaryName={summaryName2}
                      setSummaryName={setSummaryName2}
                      sectionData={sectionData2}
                      setSectionData={setSectionData2}
                      setAggregatorSetup={setAggregatorSetup}
                      handleGenerateAggregator={handleGenerateAggregator2}
                      createResumeLoading={createResumeLoading}
                    />
                  )} */}
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
