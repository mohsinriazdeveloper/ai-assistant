"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../ReduxToolKit/hook";
import { userLogoutSuccess } from "../ReduxToolKit/authSlice";
import PreviousPage from "../PreviousPage/PreviousPage";
import { voiceResponce } from "../ReduxToolKit/voiceResSlice";
import toast, { Toaster } from "react-hot-toast";

type Content = {
  title: string;
  url: string;
};

interface NavBarProps {
  content: Content[];
  setCheckOption: Dispatch<SetStateAction<string>>;
  checkOption: string;
  setStopPlayingAudio?: Dispatch<SetStateAction<boolean>>;
}

const NavBar: FC<NavBarProps> = ({ content, setCheckOption, checkOption }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    // const intext = dispatch(voiceResponce({ inText: "" }));
    setTimeout(() => {
      dispatch(
        userLogoutSuccess({
          refresh: "",
          access: "",
        })
      );
      router.push("/");
    }, 1000);
    toast.success("You have been logged out successfully");
  };
  const handleChangeTab = (item: string) => {
    setCheckOption(item);
  };
  return (
    <div className="pt-5 mb-[57px]">
      <div className="md:container md:mx-auto mx-5 flex justify-between items-center pb-5">
        <PreviousPage />
        <button
          onClick={handleSignOut}
          className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
        >
          Sign Out
        </button>
      </div>
      <div className="sm:overflow-hidden overflow-scroll w-full sm:border-b-0 border-b">
        <div className="sm:w-full w-[500px]">
          <div className="sm:border-b flex justify-center gap-7 ">
            {content.map((item, index) => (
              <div
                key={index}
                className={`${
                  checkOption === item.url
                    ? "border-b-2 border-[#8B5CF6] text-black"
                    : "mb-0.5 text-[#71717a]"
                } pb-1 hover:text-black text-sm font-medium cursor-pointer`}
              >
                <p onClick={() => handleChangeTab(item.url)}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
