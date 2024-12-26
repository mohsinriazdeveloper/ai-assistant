"use client";
import Background from "@/app/components/Background/Background";
import SideBar from "@/app/components/LeftBar/SideBar";
import NavBar from "@/app/components/NavBar/NavBar";
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
  const { access } = useAppSelector(selectAuth);
  const { id } = params;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("files");
  const [startTour, setStartTour] = useState(true);
  const navContent = getContent(id);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  if (!access) {
    return null;
  }
  const handleTourEnd = () => {
    setStartTour(false);
  };
  return (
    <Background>
      <TourGuide
        start={startTour}
        setStartTour={setStartTour}
        onTourEnd={handleTourEnd}
      />
      <div className="grid grid-cols-12 h-full">
        <div className={`${isMobile ? "hidden" : "block"} col-span-3 step-1`}>
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
            <UpdateTraining agentId={id} checkOption={checkOption} />
          </div>
        </div>
      </div>
      {/* <TrainingStepsModal
        openDialogue={openDialogue}
        handleClose={() => setOpenDialogue(false)}
      /> */}
    </Background>
  );
};

export default Page;
