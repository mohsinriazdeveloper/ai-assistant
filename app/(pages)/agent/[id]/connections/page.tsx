"use client";
import Background from "@/app/components/Background/Background";
// import { connectionContent } from "@/app/components/Connect/content";
import ConnectionRawData from "@/app/components/Connect/ConnectionRawData";
import Finance from "@/app/components/Connect/Finance";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
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
  const [isRawData, setIsRawData] = useState<boolean>(false);
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
          } col-span-3 tab:relative absolute tab:w-full sm:w-[40%] w-[50%] bg-[#101010] overflow-y-auto primaryScroller `}
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
          } rounded-[20px] bg-white h-full`}
        >
          <div className="flex items-center pt-5">
            {isMobile && (
              <HiOutlineDotsHorizontal
                className={`text-2xl cursor-pointer ml-3`}
                onClick={() => setIsMobile(false)}
              />
            )}
            <NavBar content={content.navBar} />
          </div>

          <div>
            {checkOption === "finance" && (
              <>
                {isRawData ? (
                  <div className="my-5 px-10 h-[78vh] overflow-y-scroll primaryScroller mr-2">
                    <ConnectionRawData
                      setIsRawData={setIsRawData}
                      getRawDataId={getRawDataId}
                    />
                  </div>
                ) : (
                  <div className="my-5 px-10 h-[78vh]">
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
