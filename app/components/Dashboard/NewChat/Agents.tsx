// "use client";
// import AiImg from "@/app/assets/Images/aiImg.png";
// import Link from "next/link";
// import { FC, useEffect } from "react";
// import Loader from "../../Loader/Loader";
// import NewAgent from "../../NewAgent/NewAgent";
// import { useLazyGetAllAgentsQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
// import { useAppDispatch } from "../../ReduxToolKit/hook";
// import { voiceResponce } from "../../ReduxToolKit/voiceResSlice";

// interface AgentsProps {}

// const Agents: FC<AgentsProps> = () => {
//   const [trigger, { data: allAgents, isLoading }] = useLazyGetAllAgentsQuery();
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     trigger();
//   }, []);

//   const sortedAgents = allAgents?.length
//     ? allAgents
//         .slice()
//         //@ts-ignore
//         .sort((a, b) => a.name.localeCompare(b.name))
//     : [];

//   if (isLoading) {
//     dispatch(voiceResponce({ inText: "" }));
//   }
//   const hanldeChat = () => {
//     localStorage.setItem("myCustomChatId", "0");
//   };
//   return (
//     <div className="md:w-[795px] md:mx-auto mx-5">
//       {!isLoading ? (
//         <div className="mt-11">
//           {sortedAgents.length > 0 ? (
//             <>
//               <div className="flex justify-between items-center">
//                 <p className="text-3xl font-bold">My Agents</p>
//               </div>

//               <div className="grid sm:grid-cols-3 grid-cols-2 mt-10 gap-10 w-[90%]">
//                 {sortedAgents?.map((agent, index) => (
//                   <div key={index} className="col-span-1 cursor-pointer">
//                     <Link href={`/agent/${agent.id}/chat`} onClick={hanldeChat}>
//                       {agent.image_url ? (
//                         <div
//                           className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb]"
//                           style={{ backgroundImage: `url(${agent.image_url})` }}
//                         ></div>
//                       ) : (
//                         <div
//                           className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb]"
//                           style={{ backgroundImage: `url(${AiImg.src})` }}
//                         ></div>
//                       )}
//                       {agent?.name && (
//                         <>
//                           {agent?.name.length > 15 ? (
//                             <p className="text-lg font-medium text-center">
//                               {agent.name.slice(0, 15) + " ..."}
//                             </p>
//                           ) : (
//                             <p className="text-lg font-medium text-center">
//                               {agent?.name}
//                             </p>
//                           )}
//                         </>
//                       )}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center h-[70vh] pt-12">
//               <NewAgent />
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="w-full flex justify-center items-center mt-40">
//           <Loader height="14" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Agents;
"use client";
import AiImg from "@/app/assets/Images/aiImg.png";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
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
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    trigger()
      .then(() => setIsDataReady(true)) // Mark data as ready after fetch
      .catch(() => setIsDataReady(true)); // Handle error by marking data ready
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(voiceResponce({ inText: "" }));
    }
  }, [isLoading, dispatch]);

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
    <div className="md:w-[795px] md:mx-auto mx-5">
      {sortedAgents.length > 0 ? (
        <div className="mt-11">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">My Agents</p>
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-2 mt-10 gap-10 w-[90%]">
            {sortedAgents.map((agent, index) => (
              <div key={index} className="col-span-1 cursor-pointer">
                {/* <Link href={`/agent/${agent.id}/chat`} onClick={()=>hanldeChat(agent.id)}> */}
                {/* <div onClick={() => hanldeChat(agent.id)}>
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
                    <p className="text-lg font-medium text-center">
                      {agent.name.length > 15
                        ? `${agent.name.slice(0, 15)} ...`
                        : agent.name}
                    </p>
                  )}
                </div> */}
                <div onClick={() => hanldeChat(agent.id)}>
                  {loadingAgent === agent.id ? (
                    <div className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb] flex justify-center items-center">
                      <Loader2 />
                    </div>
                  ) : (
                    <div
                      className="bg-no-repeat bg-cover bg-center h-[210px] mb-6 rounded-lg border border-[#bbbbbb]"
                      style={{
                        backgroundImage: `url(${agent.image_url || AiImg.src})`,
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
  );
};

export default Agents;
