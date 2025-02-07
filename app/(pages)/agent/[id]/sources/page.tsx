"use client";
import Background from "@/app/components/Background/Background";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar2 from "@/app/components/NavBar/NavBar2";
import { useGetUserProfileQuery } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import TourGuide from "@/app/components/StepsGuide/TourGuide";
import UpdateTraining from "@/app/components/UpdateTraining/UpdateTraining";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { getContent, sideBarOptions } from "../content";
interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { data: userData } = useGetUserProfileQuery();
  const { access } = useAppSelector(selectAuth);
  const { id } = params;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("files");
  const [startTour, setStartTour] = useState<boolean>(false);
  const navContent = getContent(id);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  useEffect(() => {
    if (userData?.is_first_interaction_with_agent) {
      setStartTour(userData.is_first_interaction_with_agent);
    }
  }, [userData]);
  if (!access) {
    return null;
  }

  const handleTourEnd = () => {
    setStartTour(false);
  };
  return (
    <Background>
      <div className="w-full bg-black rounded-lg h-full">
        <TourGuide
          start={startTour}
          setStartTour={setStartTour}
          onTourEnd={handleTourEnd}
        />
        <div className="tab:grid grid-cols-12 w-full relative h-full">
          <div
            className={`${
              isMobile ? "hidden" : "block"
            } col-span-3 tab:relative absolute tab:w-full sm:w-[40%] w-[50%] tab:pb-0 pb-10 bg-[#101010] overflow-y-auto scrollbar-hide `}
          >
            <SideBar
              agentId={id}
              setIsMobile={setIsMobile}
              tab={sideBarOptions.sourcesTabs}
              setCheckOption={setCheckOption}
              checkOption={checkOption}
            />
          </div>
          <div
            className={`${
              isMobile ? "col-span-12" : "col-span-9"
            } rounded-lg overflow-hidden bg-[#101010] h-full`}
          >
            <div className="flex items-center step-2 ">
              {isMobile && (
                <LuChevronRight
                  className={`text-3xl cursor-pointer ml-3 mb-4 text-white`}
                  onClick={() => setIsMobile(false)}
                />
              )}
              <NavBar2 content={navContent.navBar} />
            </div>
            <div className="rounded-lg bg-white h-full">
              <div className=" bg-white rounded-lg h-[83vh] overflow-hidden overflow-y-auto primaryScroller px-10 mr-2">
                <UpdateTraining agentId={id} checkOption={checkOption} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Page;
