"use client";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineShortText } from "react-icons/md";
import PreviousPage from "../PreviousPage/PreviousPage";
import { useGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import { userLogoutSuccess } from "../ReduxToolKit/authSlice";
import { useAppDispatch } from "../ReduxToolKit/hook";

type Content = {
  title: string;
  url: string;
};

interface NavBarProps {
  content: Content[];
  setCheckOption: Dispatch<SetStateAction<string>>;
  checkOption: string;
  setStopPlayingAudio?: Dispatch<SetStateAction<boolean>>;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const NavBar: FC<NavBarProps> = ({
  content,
  setCheckOption,
  checkOption,
  setIsMobile,
}) => {
  const { isLoading } = useGetAllAgentsQuery();

  const currentRoute = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [fixMargin, setFixMargin] = useState<boolean>(false);

  useEffect(() => {
    if (checkOption === "agent" || checkOption === "chatagent") {
      setFixMargin(true);
    } else {
      setFixMargin(false);
    }
  }, [checkOption]);

  const handleSignOut = () => {
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
    <div
      className={`pt-5 ${
        fixMargin ? "mb-5" : "mb-[57px]"
      } md:w-full sm:container sm:mx-auto sm:px-0 px-4`}
    >
      <div className="md:container md:mx-auto mx-5 flex justify-between items-center pb-5">
        {checkOption === "chatagent" ? (
          <HiOutlineDotsHorizontal
            className="text-2xl md:hidden block"
            onClick={() => setIsMobile(true)}
          />
        ) : (
          <PreviousPage />
        )}
        <div
          onClick={handleSignOut}
          className="font-medium rounded-md text-sm text-[#8A8A8A] md:hidden flex items-center lg:gap-2 gap-1 cursor-pointer"
        >
          Sign Out
          <MdOutlineShortText className="text-2xl transform scale-x-[-1] text-gray-900" />
        </div>
      </div>

      <div
        className={`${
          checkOption === "chatagent"
            ? "md:flex justify-between items-center"
            : "md:flex lg:gap-0 md:gap-3 "
        } overflow-x-auto`}
      >
        <div
          className={`overflow-hidden whitespace-nowrap ${
            checkOption === "chatagent"
              ? "md:w-[80%] sm:w-[100%] w-[565px]"
              : "lg:w-[62%] md:w-[80%] w-[565px] mx-auto"
          } border border-[#EDEDED] rounded-full bg-[#F7F7F7] grid ${
            currentRoute === "/dashboard/agents" ? "grid-cols-2" : "grid-cols-4"
          } lg:gap-7 gap-3 p-1`}
        >
          {content.map((item, index) => (
            <div
              key={index}
              className={`col-span-1 py-2 text-sm font-semibold text-center px-3 ${
                checkOption === item.url
                  ? "text-white bg-[#202020] rounded-full"
                  : "text-[#8A8A8A]"
              } ${isLoading ? "cursor-not-allowed" : " cursor-pointer"}`}
            >
              {isLoading ? (
                <p>{item.title}</p>
              ) : (
                <p onClick={() => handleChangeTab(item.url)}>{item.title}</p>
              )}
            </div>
          ))}
        </div>
        <div
          onClick={handleSignOut}
          className="font-medium rounded-md text-sm text-[#8A8A8A] md:flex items-center hidden lg:gap-2 gap-1 cursor-pointer"
        >
          Sign Out
          <MdOutlineShortText className="text-2xl transform scale-x-[-1] text-gray-900" />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
