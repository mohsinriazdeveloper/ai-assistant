"use client";
import { FC, useEffect } from "react";
import AiImg from "@/app/assets/Images/aiImg.webp";
import Link from "next/link";
import { useLazyGetAllAgentsQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
import Loader from "../../Loader/Loader";
import { useAppDispatch } from "../../ReduxToolKit/hook";
import { voiceResponce } from "../../ReduxToolKit/voiceResSlice";

interface AgentsProps {}

const Agents: FC<AgentsProps> = () => {
  const [trigger, { data: allAgents, isLoading }] = useLazyGetAllAgentsQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    trigger();
  }, []);

  const sortedAgents = allAgents
    ?.slice()
    //@ts-ignore
    .sort((a, b) => a.name.localeCompare(b.name));

  if (isLoading) {
    dispatch(voiceResponce({ inText: "" }));
  }
  return (
    <div className="md:w-[795px] md:mx-auto mx-5 mt-16">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">Agents</p>
        <Link href="/dashboard/create-new-agent">
          <button className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm">
            New Agent
          </button>
        </Link>
      </div>
      {!isLoading && (
        <>
          {(!sortedAgents || sortedAgents.length === 0) && (
            <p className="my-10 text-center">
              No Agent Available. Create Your Own Agent to Start!
            </p>
          )}
        </>
      )}
      {!isLoading ? (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 mt-10 gap-5">
          {sortedAgents?.map((agent, index) => (
            <div key={index} className="col-span-1 cursor-pointer">
              <Link href={`/dashboard/agent/${agent.id}`}>
                {agent.image_url ? (
                  <div
                    className="bg-no-repeat bg-cover bg-center h-[120px] mb-1"
                    style={{ backgroundImage: `url(${agent.image_url})` }}
                  ></div>
                ) : (
                  <div
                    className="bg-no-repeat bg-cover bg-center h-[120px] mb-1"
                    style={{ backgroundImage: `url(${AiImg.src})` }}
                  ></div>
                )}
                {agent?.name && (
                  <>
                    {agent?.name.length > 15 ? (
                      <p className="text-sm font-medium text-center">
                        {agent.name.slice(0, 15) + " ..."}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-center">
                        {agent?.name}
                      </p>
                    )}
                  </>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-40">
          <Loader height="14" />
        </div>
      )}
    </div>
  );
};

export default Agents;
