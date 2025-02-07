"use client";
import Background from "@/app/components/Background/Background";
// import { connectionContent } from "@/app/components/Connect/content";
import ConnectionRawData from "@/app/components/Connect/ConnectionRawData";
import Finance from "@/app/components/Connect/Finance";
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
  const [checkOption, setCheckOption] = useState<string>("finance");
  const [isRawData, setIsRawData] = useState<boolean | string>(false);
  const [getRawDataId, setGetRawDataId] = useState<number>(0);

  const content = getContent(id);

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
          } col-span-3 tab:relative absolute h-full tab:w-full sm:w-[40%] w-[50%] tab:pb-0 pb-10 bg-[#101010] overflow-y-auto scrollbar-hide`}
        >
          <SideBar
            agentId={id}
            setIsMobile={setIsMobile}
            tab={sideBarOptions.connectionsTabs}
            setCheckOption={setCheckOption}
            checkOption={checkOption}
          />
        </div>
        <div
          className={`${
            isMobile ? "col-span-12" : "col-span-9"
          } rounded-lg overflow-hidden bg-[#101010] h-full`}
        >
          <div className="flex items-center">
            {isMobile && (
              <LuChevronRight
                className={`text-3xl cursor-pointer ml-3 mb-4 text-white`}
                onClick={() => setIsMobile(false)}
              />
            )}
            <NavBar content={content.navBar} />
          </div>

          <div className="rounded-lg bg-white h-full tab:pt-14">
            {checkOption === "finance" && (
              <>
                {isRawData ? (
                  <div className="px-10 overflow-y-scroll primaryScroller mr-2">
                    <ConnectionRawData
                      agentId={id}
                      setIsRawData={setIsRawData}
                      getRawDataId={getRawDataId}
                    />
                  </div>
                ) : (
                  <div className="px-10">
                    <Finance
                      agentId={id}
                      setIsRawData={setIsRawData}
                      setGetRawDataId={setGetRawDataId}
                    />
                  </div>
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
