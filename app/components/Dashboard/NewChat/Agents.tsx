"use client";
import AiImg from "@/app/assets/Images/aiImg.png";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import Loader2 from "../../Loader/Loader2";
import PageAnimation from "../../Loader/PageAnimation";
import NewAgent from "../../NewAgent/NewAgent";
import { useLazyGetAllAgentsQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
import { useAppDispatch } from "../../ReduxToolKit/hook";
import { voiceResponce } from "../../ReduxToolKit/voiceResSlice";

interface AgentsProps {}

const Agents: FC<AgentsProps> = () => {
  const [trigger, { data: allAgents, isLoading }] = useLazyGetAllAgentsQuery();
  const [isDataReady, setIsDataReady] = useState(false);
  const [loadingAgent, setLoadingAgent] = useState<number | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    trigger()
      .then(() => setIsDataReady(true))
      .catch(() => setIsDataReady(true));
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(voiceResponce({ inText: "" }));
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    const checkOverflow = () => {
      if (gridRef.current) {
        const { scrollHeight, clientHeight } = gridRef.current;
        console.log("Scroll Height:", scrollHeight);
        console.log("Client Height:", clientHeight);
        setIsOverflow(scrollHeight > clientHeight);
      }
    };

    const timeout = setTimeout(checkOverflow, 100); // Delay to account for rendering
    return () => clearTimeout(timeout);
  }, [allAgents]);

  const sortedAgents = allAgents?.length
    ? allAgents
        .slice()
        // @ts-ignore
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const hanldeChat = (id: number) => {
    setLoadingAgent(id); // Set the clicked agent as loading
    localStorage.setItem("myCustomChatId", "0");
    router.push(`/agent/${id}/chat`);
  };

  // Show loader while data is being fetched or not ready
  if (!isDataReady) {
    return <PageAnimation />;
  }

  return (
    <div
      ref={gridRef}
      className={`${isOverflow ? "primaryScroller" : ""}`}
      style={{ maxHeight: "75vh", overflowY: "auto" }}
    >
      <div className="md:w-[795px] md:mx-auto mx-5 ">
        {sortedAgents.length > 0 ? (
          <div className="mt-11">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">My Agents</p>
            </div>

            <div className="grid sm:grid-cols-3 grid-cols-2 mt-10 gap-10 w-[90%]">
              {sortedAgents.map((agent, index) => (
                <div key={index} className="col-span-1 cursor-pointer">
                  <div onClick={() => hanldeChat(agent.id)}>
                    {loadingAgent === agent.id ? (
                      <div className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb] flex justify-center items-center">
                        <Loader2 />
                      </div>
                    ) : (
                      <div
                        className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb]"
                        style={{
                          backgroundImage: `url(${
                            agent.image_url || AiImg.src
                          })`,
                        }}
                      ></div>
                    )}
                    {agent?.name && (
                      <p className="text-lg font-medium text-center">
                        {agent.name.length > 15
                          ? `${agent.name.slice(0, 15)} ...`
                          : agent.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center h-[70vh] pt-12">
            <NewAgent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
