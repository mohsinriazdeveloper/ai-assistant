"use client";
import ProfileIcon from "@/app/assets/icons/profileIcon.png";
import Image from "next/image";
import Link from "next/link";
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

interface NavBar1Props {}

const NavBar1: FC<NavBar1Props> = () => {
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
  const handleRedirect = (url: string) => {
    route.push(url);
  };
  return (
    <div className="flex justify-end items-center gap-3">
      {!createAgentStatus && (
        <div
          onClick={() => {
            dispatch(
              setCreateAgent({ createAgentStatus: true }),
              setAgentName({
                agentName: "",
              })
            );
            route.push(
              `${
                currentRoute === "/dashboard/settings"
                  ? "/dashboard/agents"
                  : "/dashboard/agents"
              }`
            );
          }}
          className="rounded-full flex justify-center items-center w-[160px] h-[50px] bg-[#201f1f] text-[#c0d1f4] text-[13px] font-bold cursor-pointer"
        >
          <p>+ Create New Agent</p>
        </div>
      )}
      <Link
        href={
          currentRoute === "/dashboard/agents"
            ? "/dashboard/settings"
            : "/dashboard/agents"
        }
        onClick={() =>
          dispatch(
            setCreateAgent({ createAgentStatus: false }),
            setAgentName({
              agentName: "",
            })
          )
        }
        className="w-[50px] h-[50px] bg-[#201f1f] rounded-full flex justify-center items-center cursor-pointer"
      >
        <Image src={ProfileIcon} alt="" />
      </Link>

      <p onClick={handleSignOut} className="cursor-pointer">
        Log Out
      </p>
    </div>
  );
};
export default NavBar1;
