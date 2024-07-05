import Image from "next/image";
import { FC } from "react";
import CopyIcon from "@/app/assets/icons/copyIcon.png";
import RangeBar from "../../RangeBar/RangeBar";
import VoiceAssistant from "../../VoiceAssistant/VoiceAssistant";
import { useGetAllAgentsQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
import Loader from "../../Loader/Loader";
import AgentVoice from "../../VoiceAssistant/AgentVoice";

interface QaItem {
  question: string;
  answer: string;
}

interface AgentOptionProps {
  agentId: number;
  checkOption: string;
}

const AgentOption: FC<AgentOptionProps> = ({ agentId, checkOption }) => {
  const { data: allAgents, isLoading } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );

  // let qaChar = 0;
  // if (agent?.qa) {
  //   if (Array.isArray(agent.qa)) {
  //     agent.qa.forEach((qa: QaItem) => {
  //       qaChar += qa.question.length + qa.answer.length;
  //     });
  //   }
  // }

  if (isLoading || !agent) {
    return (
      <div className="w-full mt-20 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[63%] mx-auto border border-gray-200 py-8 px-7 rounded-lg">
      <p className="text-xl font-bold mb-9">{agent.name}</p>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 flex flex-col gap-7">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-300 text-sm font-semibold">Agent ID</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-900 text-sm font-semibold">
                {agent.ran_id}
              </p>
              <Image
                src={CopyIcon}
                alt=""
                className="w-4 cursor-pointer"
                onClick={() => {
                  //@ts-ignore
                  navigator.clipboard.writeText(agent.ran_id);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
            <div className="col-span-1">
              <p className="text-gray-300">Status</p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    agent.status === "Trained" ? "bg-[#2DD4BF]" : "bg-red-500"
                  }`}
                ></div>
                <p className="text-gray-900">{agent.status}</p>
              </div>
            </div>
            <div className="col-span-1">
              <p className="text-gray-300">Model</p>
              <div>
                <p className="text-gray-900">{agent.model}</p>
              </div>
            </div>
          </div>
          <div className="text-sm font-semibold">
            <p className="text-gray-300">Visibility</p>
            <p className="text-gray-900">{agent.visibility}</p>
          </div>
          <div className="text-sm font-semibold">
            <p className="text-gray-300">Number of Characters</p>
            <p className="text-gray-900">{agent.text?.length}</p>
          </div>
          <div className="text-sm font-semibold">
            <p className="text-gray-300">Temperature</p>
            <div className="max-w-[184px]">
              <RangeBar temperature={agent.temperature} />
            </div>
          </div>
          <div className="text-sm font-semibold">
            <p className="text-gray-300">Last trained at</p>
            <p className="text-gray-900">June 28, 2024 at 08:44 AM</p>
          </div>
        </div>
        <div className="col-span-7 border border-gray-200 rounded-lg">
          {checkOption === "agent" && <VoiceAssistant agentId={agent.id} />}

          {checkOption === "chatagent" && <AgentVoice agentId={agent.id} />}
        </div>
      </div>
    </div>
  );
};

export default AgentOption;
