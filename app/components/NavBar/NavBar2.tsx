"use client";
import ProfileIcon from "@/app/assets/icons/profileIcon.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
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

interface NavBar2Props {
  content: Content[];
}

const NavBar2: FC<NavBar2Props> = ({ content }) => {
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
    dispatch(setCreateAgent({ createAgentStatus: false }));
    localStorage.clear();
    route.push("/");
    // }, 1000);
    toast.success("You have been logged out successfully");
  };
  const handleRedirect = (url: string, id: number) => {
    setLoading(id);
    route.push(url);
  };
  const handleRedirectDashboard = (url: string) => {
    dispatch(setCreateAgent({ createAgentStatus: false }));
    route.push(url);
  };
  return (
    <div className="w-full bg-[#101010] pb-6 flex justify-between items-center px-11">
      <div id="step-3" className="flex items-center gap-10">
        {content.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRedirect(item.url, item.id)}
            className={`border-b-4 pb-1 cursor-pointer ${
              currentRoute === item.url
                ? "text-white border-white font-bold text-2xl"
                : "text-[#B6B6B6] border-[#101010] hover:border-[#B6B6B6] text-xl"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center gap-3">
        <div
          onClick={() => handleRedirectDashboard("/dashboard/agents")}
          className="rounded-full flex justify-center items-center gap-2 w-[160px] h-[50px] bg-[#201f1f] text-[#c0d1f4] text-[13px] font-bold cursor-pointer"
        >
          <LiaGlobeAmericasSolid className="text-2xl" />
          <p>My Ai Agents</p>
        </div>
        <Link
          href="/dashboard/settings"
          className="w-[50px] h-[50px] bg-[#201f1f] rounded-full flex justify-center items-center cursor-pointer"
        >
          <Image src={ProfileIcon} alt="" />
        </Link>
        <p
          onClick={handleSignOut}
          className="cursor-pointer text-[#B6B6B6] text-[15px]"
        >
          Log Out
        </p>
      </div>
    </div>
  );
};
export default NavBar2;
