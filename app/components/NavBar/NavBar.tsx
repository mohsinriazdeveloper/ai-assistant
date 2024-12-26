"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { setAgentName } from "../ReduxToolKit/agentNameSlice";
import { useLazyGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import { userLogoutSuccess } from "../ReduxToolKit/authSlice";
import {
  selectCreateAgent,
  setCreateAgent,
} from "../ReduxToolKit/createAgentSlice";
import { useAppDispatch, useAppSelector } from "../ReduxToolKit/hook";

type Content = {
  title: string;
  url: string;
};

interface NavBarProps {
  content: Content[];
  // setCreateAgent: Dispatch<SetStateAction<boolean>>;
  // createAgent: boolean;
}

const NavBar: FC<NavBarProps> = ({ content }) => {
  const [trigger, { data: allAgents }] = useLazyGetAllAgentsQuery();
  useEffect(() => {
    trigger();
  }, []);
  const currentRoute = usePathname();
  const route = useRouter();
  const { createAgentStatus } = useAppSelector(selectCreateAgent);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    // setTimeout(() => {
    dispatch(
      userLogoutSuccess({
        refresh: "",
        access: "",
      })
    );
    localStorage.clear();
    route.push("/");
    // }, 1000);
    toast.success("You have been logged out successfully");
  };

  return (
    <div
      className={`${
        currentRoute.includes("/dashboard")
          ? "tab:w-[80%] ml-auto"
          : "w-full pl-10"
      } grid grid-cols-12 overflow-x-scroll scrollbar-hide`}
    >
      <div className="tab:col-span-9 col-span-12 tab:order-1 order-2 flex justify-between items-center tab:pr-0 pr-2 md:w-full w-[650px]">
        <div className="">
          <div
            id="step-3"
            className={`bg-[#FBFBFB] border border-[#EDEDED] p-1 rounded-full text-sm font-semibold text-center grid ${
              !currentRoute.includes("/dashboard/")
                ? "grid-cols-5"
                : "grid-cols-2"
            }`}
          >
            {content.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className={`col-span-1 rounded-full py-2 px-6 ${
                  currentRoute === item.url
                    ? "bg-[#424242] text-white"
                    : "bg-transparent text-[#8A8A8A]"
                }`}
              >
                <p>{item.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {currentRoute === "/dashboard/agents" && (
          <>
            {createAgentStatus ? (
              <button
                onClick={() =>
                  dispatch(setCreateAgent({ createAgentStatus: false }))
                }
                className="py-2 px-4 border border-[#3C3C3F] text-[#18181b] bg-white font-medium rounded-md text-sm"
              >
                Home
              </button>
            ) : (
              <>
                {allAgents && allAgents.length > 0 && (
                  <button
                    onClick={() =>
                      dispatch(
                        setCreateAgent({ createAgentStatus: true }),
                        setAgentName({
                          agentName: "",
                        })
                      )
                    }
                    // onClick={() => setCreateAgent(true)}
                    className="py-3 px-4 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
                  >
                    Create New Agent
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div
        className={`tab:col-span-3 col-span-12 tab:order-2 order-1 font-medium rounded-md text-sm text-[#8A8A8A] flex ml-2 ${
          !currentRoute.includes("/dashboard") &&
          "tab:justify-center justify-between tab:mb-0 mb-2 tab:pr-0 pr-2 "
        } items-center lg:gap-2 gap-1 cursor-pointer`}
      >
        {!currentRoute.includes("/dashboard") && (
          <button
            onClick={() => {
              dispatch(setCreateAgent({ createAgentStatus: false }));
              route.push("/dashboard/agents");
            }}
            className="py-2 px-4 border border-[#3C3C3F] text-[#18181b] bg-white font-medium rounded-md text-sm"
          >
            Home
          </button>
        )}
        <p onClick={handleSignOut}>Sign Out</p>
      </div>
    </div>
  );
};
export default NavBar;
