"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setAgentName } from "../ReduxToolKit/agentNameSlice";
import { useLazyGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import { userLoginSuccess, userLogoutSuccess } from "../ReduxToolKit/authSlice";
import {
  selectCreateAgent,
  setCreateAgent,
} from "../ReduxToolKit/createAgentSlice";
import { useAppDispatch, useAppSelector } from "../ReduxToolKit/hook";

type Content = {
  id: number;
  title: string;
  url: string;
};

interface NavBarProps {
  content: Content[];
}

const NavBar: FC<NavBarProps> = ({ content }) => {
  const [trigger, { data: allAgents, error }] = useLazyGetAllAgentsQuery();
  const currentRoute = usePathname();
  const route = useRouter();

  useEffect(() => {
    const fetchAgents = async () => {
      const result = await trigger();

      if (
        // @ts-ignore
        (result?.error?.data?.code as any) === "token_not_valid" &&
        // @ts-ignore
        (result?.error?.status as any) === 401
      ) {
        toast.error("Token expired, please login again");
        dispatch(
          userLoginSuccess({
            refresh: "",
            access: "",
          })
        );
        route.push("/");
        // Handle the 401 error
      } else if (result.error) {
        console.error("An error occurred:", result.error);
      } else {
        // console.log("Agents fetched successfully:", result.data);
      }
    };

    fetchAgents();
  }, []);
  useEffect(() => {
    trigger();
  }, []);

  const { createAgentStatus } = useAppSelector(selectCreateAgent);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<number | null>(null);

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
  const handleRedirect = (url: string, id: number) => {
    setLoading(id);
    route.push(url);
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
            {/* {content.map((item, index) => (
              <div
                onClick={() => handleRedirect(item.url, item.id)}
                // href={item.url}
                key={index}
                className={`col-span-1 rounded-full py-2 px-6 cursor-pointer hover:bg-[#424242] hover:text-white ${
                  loading === item.id && "bg-[#c2c2c2]"
                } ${
                  currentRoute === item.url
                    ? "bg-[#424242] text-white"
                    : "bg-transparent text-[#8A8A8A]"
                }`}
              >
                <p>{item.title}</p>
              </div>
            ))} */}
            {content.map((item, index) => (
              <div
                onClick={() => handleRedirect(item.url, item.id)}
                key={index}
                className={`col-span-1 rounded-full py-2 px-6 cursor-pointer border border-transparent hover:border-[#424242] ${
                  currentRoute === item.url
                    ? "bg-[#424242] border-[#424242] text-white" // Keep the selected item style
                    : loading === item.id
                    ? "bg-[#c2c2c2] border-[#c2c2c2] text-white" // Show loading style only if not already selected
                    : "bg-transparent text-[#8A8A8A] border-transparent"
                }`}
              >
                <p>{item.title}</p>
              </div>
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
                className={`${
                  allAgents?.length === 0 ? "hidden" : "block"
                } py-2 px-4 border border-[#3C3C3F] text-[#18181b] bg-white font-medium rounded-md text-sm`}
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
        className={`tab:col-span-3 col-span-12 tab:order-2 order-1 font-medium rounded-md text-sm text-[#8A8A8A] flex duration-300 transition-all ${
          !currentRoute.includes("/dashboard") &&
          "tab:justify-center justify-between tab:mb-0 tab:pr-0 pr-2 "
        } items-center lg:gap-2 gap-1 cursor-pointer mb-2`}
      >
        {!currentRoute.includes("/dashboard") && (
          <button
            onClick={() => {
              dispatch(setCreateAgent({ createAgentStatus: false }));
              route.push("/dashboard/agents");
            }}
            className="py-2 px-4 border hover:bg-gray-100 border-[#3C3C3F] text-[#18181b] bg-white font-medium rounded-md text-sm duration-300 transition-colors"
          >
            Home
          </button>
        )}
        <p onClick={handleSignOut} className="ml-5">
          Sign Out
        </p>
      </div>
    </div>
  );
};
export default NavBar;
