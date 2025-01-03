"use client";
import Background from "@/app/components/Background/Background";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar";
import { useGetUserProfileQuery } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import TourGuide from "@/app/components/StepsGuide/TourGuide";
import UpdateTraining from "@/app/components/UpdateTraining/UpdateTraining";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
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
      <div className=" w-full bg-white rounded-[20px]">
        <TourGuide
          start={startTour}
          setStartTour={setStartTour}
          onTourEnd={handleTourEnd}
        />
        <div className="tab:grid grid-cols-12 w-full">
          <div
            className={`${
              isMobile ? "hidden" : "block"
            } col-span-3 tab:relative absolute tab:w-full sm:w-[40%] w-[50%] bg-[#101010] overflow-y-auto scrollbar-hide `}
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
            } rounded-[20px] bg-white h-full`}
          >
            <div className="flex items-center pt-5 step-2 ">
              {isMobile && (
                <HiOutlineDotsHorizontal
                  className={`text-2xl cursor-pointer ml-3`}
                  onClick={() => setIsMobile(false)}
                />
              )}
              <NavBar content={navContent.navBar} />
            </div>
            <div className=" ">
              <div className="my-5 px-10">
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
