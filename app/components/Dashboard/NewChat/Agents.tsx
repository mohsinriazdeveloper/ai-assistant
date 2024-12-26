"use client";
import AiImg from "@/app/assets/Images/aiImg.png";
import Link from "next/link";
import { FC, useEffect } from "react";
import Loader from "../../Loader/Loader";
import NewAgent from "../../NewAgent/NewAgent";
import { useLazyGetAllAgentsQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
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
  const hanldeChat = () => {
    localStorage.setItem("myCustomChatId", "0");
  };
  return (
    <div className="md:w-[795px] md:mx-auto mx-5">
      {!isLoading && (
        <>
          {(!sortedAgents || sortedAgents.length === 0) && (
            <div className="flex items-center h-[70vh] pt-12">
              <NewAgent />
            </div>
          )}
        </>
      )}
      {!isLoading ? (
        <div className="mt-11">
          {sortedAgents && sortedAgents.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">My Agents</p>
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-2 mt-10 gap-10 w-[90%]">
                {sortedAgents?.map((agent, index) => (
                  <div key={index} className="col-span-1 cursor-pointer">
                    <Link href={`/agent/${agent.id}/chat`} onClick={hanldeChat}>
                      {agent.image_url ? (
                        <div
                          className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb]"
                          style={{ backgroundImage: `url(${agent.image_url})` }}
                        ></div>
                      ) : (
                        <div
                          className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb]"
                          style={{ backgroundImage: `url(${AiImg.src})` }}
                        ></div>
                      )}
                      {agent?.name && (
                        <>
                          {agent?.name.length > 15 ? (
                            <p className="text-lg font-medium text-center">
                              {agent.name.slice(0, 15) + " ..."}
                            </p>
                          ) : (
                            <p className="text-lg font-medium text-center">
                              {agent?.name}
                            </p>
                          )}
                        </>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
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
