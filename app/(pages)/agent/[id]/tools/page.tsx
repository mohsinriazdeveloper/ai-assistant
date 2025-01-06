"use client";
import Background from "@/app/components/Background/Background";
import Aggregator from "@/app/components/Dashboard/Tools/Aggregator";
import SetupAggregrator from "@/app/components/Dashboard/Tools/SetupAggregrator";
import SetupApi from "@/app/components/Dashboard/Tools/SetupApi";
import ToolDashboardLayout from "@/app/components/Dashboard/Tools/ToolDashboardLayout";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { getContent, sideBarOptions } from "../content";

// export type Connect = {
//   index: number;
//   is_connected: boolean;
// };
interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { access } = useAppSelector(selectAuth);
  const { id } = params;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("dashboard");
  const [isSetup, setIsSetup] = useState<string>("graph");
  const [aggregatorSetup, setAggregatorSetup] = useState<string>("summary");
  const [aggregatorOverlay, setAggregatorOverlay] = useState<boolean>(true);

  const navContent = getContent(id);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  if (!access) {
    return null;
  }
  return (
    <Background>
      <div className="tab:grid grid-cols-12 w-full h-full">
        <div
          className={`${
            isMobile ? "hidden" : "block"
          } col-span-3 tab:relative absolute tab:w-full sm:w-[40%] w-[50%] bg-[#101010] overflow-y-auto scrollbar-hide `}
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

          <div className="my-5 px-10 h-[78vh] overflow-y-scroll scrollbar-hide">
            {checkOption === "dashboard" && (
              <>
                {isSetup === "graph" && (
                  <ToolDashboardLayout setIsSetup={setIsSetup} />
                )}
                {isSetup === "setup" && <SetupApi setIsSetup={setIsSetup} />}
              </>
            )}
            {checkOption === "aggregator" && (
              <>
                {aggregatorSetup === "summary" && (
                  <Aggregator
                    agentId={id}
                    aggregatorOverlay={aggregatorOverlay}
                    setAggregatorSetup={setAggregatorSetup}
                  />
                )}
                {aggregatorSetup === "setup" && (
                  <SetupAggregrator
                    agentId={id}
                    setAggregatorSetup={setAggregatorSetup}
                    setAggregatorOverlay={setAggregatorOverlay}
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
