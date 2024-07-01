"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import AiImg from "@/app/assets/Images/aiImg.webp";
import Link from "next/link";
import {
  useGetAllAgentsQuery,
  useLazyGetAllAgentsQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";

interface AgentsProps {}

const Agents: FC<AgentsProps> = () => {
  const [trigger, { data: allAgents }] = useLazyGetAllAgentsQuery();
  // const { data: allAgents } = useGetAllAgentsQuery();
  console.log(allAgents);
  useEffect(() => {
    trigger();
  }, []);
  return (
    <div className="w-[795px] mx-auto mt-16">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">Agents</p>
        <Link href="/dashboard/create-new-agent">
          <button className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm">
            New Agent
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 mt-10 gap-5">
        {allAgents?.map((agent, index) => (
          <div key={index} className="col-span-1 cursor-pointer">
            <Link href={`/dashboard/agent/${agent.id}`}>
              <div
                className="bg-no-repeat bg-cover bg-center h-[120px] mb-1"
                style={{ backgroundImage: `url(${AiImg.src})` }}
              ></div>
              <p className="text-sm font-medium text-center">{agent?.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
