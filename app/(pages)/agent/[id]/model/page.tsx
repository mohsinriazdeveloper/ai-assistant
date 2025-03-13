"use client";
import AgentSettings from "@/app/components/AgentSettings/AgentSettings";
import Background from "@/app/components/Background/Background";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar2";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { getContent, sideBarOptions } from "../content";
interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { access } = useAppSelector(selectAuth);
  const { id } = params;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("model");
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
      <div className="flex w-full h-full">
        <div
          className={`${
            isMobile ? "hidden" : "block"
          } w-[22.7%] tab:relative absolute h-full tab:pb-0 pb-10 bg-[#101010] overflow-y-auto scrollbar-hide z-20`}
        >
          <SideBar
            agentId={id}
            setIsMobile={setIsMobile}
            tab={sideBarOptions.modelTabs}
            setCheckOption={setCheckOption}
            checkOption={checkOption}
          />
        </div>
        <div
          className={`${
            isMobile ? "w-full" : "w-[77.3%]"
          }  overflow-hidden bg-[#101010] h-full rounded-lg`}
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
            <div className="h-[82vh] mb-5 px-10 overflow-y-scroll primaryScroller mr-2 md:pb-0 pb-5 pt-5">
              <AgentSettings agentId={id} checkOption={checkOption} />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Page;
