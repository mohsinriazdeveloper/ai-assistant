import Image from "next/image";
import { FC, useEffect, useState } from "react";
import CopyIcon from "@/app/assets/icons/copyIcon.png";
import RangeBar from "../../RangeBar/RangeBar";
import VoiceAssistant from "../../VoiceAssistant/VoiceAssistant";
import { useGetAllAgentsQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
import Loader from "../../Loader/Loader";
import AgentChat from "../../VoiceAssistant/AgentChat";

interface QaItem {
  question: string;
  answer: string;
}
interface FileItem {
  file_url: string;
  text_content: string;
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

  const [qaData, setQaData] = useState<QaItem[]>([]);
  const [qaCharacters, setqaCharacters] = useState<number>(0);

  const [fileData, setFileData] = useState<FileItem[]>([]);
  const [fileChar, setFileChar] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false); // State to manage the tooltip

  useEffect(() => {
    if (agent?.file_urls) {
      //@ts-ignore
      setFileData(agent?.file_urls);
    }
  }, [agent]);

  useEffect(() => {
    if (fileData.length > 0) {
      const total = fileData.reduce((acc, obj) => {
        return acc + obj.text_content.length;
      }, 0);
      setFileChar(total);
    }
  }, [fileData]);

  useEffect(() => {
    if (agent?.qa) {
      try {
        const parsedQa =
          typeof agent.qa === "string" ? JSON.parse(agent.qa) : agent.qa;
        if (Array.isArray(parsedQa)) {
          setQaData(parsedQa);
        }
      } catch (error) {
        console.error("Error parsing QA data:", error);
      }
    }
  }, [agent]);

  useEffect(() => {
    if (qaData.length > 0) {
      const total = qaData.reduce((acc, obj) => {
        return acc + obj.question.length + obj.answer.length;
      }, 0);
      setqaCharacters(total);
    }
  }, [qaData]);

  const handleCopy = () => {
    //@ts-ignore
    navigator.clipboard.writeText(agent.ran_id);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Tooltip will disappear after 2 seconds
  };

  if (isLoading || !agent) {
    return (
      <div className="w-full mt-20 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  //@ts-ignore
  const totalChar = qaCharacters + agent.text?.length + fileChar;
  return (
    <div className="md:w-[63%] md:mx-auto mx-5 border border-gray-200 py-8 px-7 rounded-lg">
      <p className="text-xl font-bold mb-9">{agent.name}</p>
      <div className="grid grid-cols-12 gap-6">
        <div className="sm:col-span-5 col-span-12 flex flex-col gap-7">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-300 text-sm font-semibold">Agent ID</p>
            </div>
            <div className="flex items-center gap-3 relative">
              <p className="text-gray-900 text-sm font-semibold">
                {agent.ran_id}
              </p>
              <Image
                src={CopyIcon}
                alt=""
                className="w-4 cursor-pointer"
                onClick={handleCopy}
              />
              {isCopied && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 mt-2">
                  Copied!
                </span>
              )}
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
            <p className="text-gray-900">{totalChar}</p>
          </div>
          <div className="text-sm font-semibold">
            <p className="text-gray-300">Temperature</p>
            <div className="max-w-[184px]">
              <RangeBar temperature={agent.temperature} readOnly />{" "}
              {/* Pass the readOnly prop */}
            </div>
          </div>
          <div className="text-sm font-semibold">
            <p className="text-gray-300">Last trained at</p>
            <p className="text-gray-900">{agent.updated_at}</p>
          </div>
        </div>
        <div className="sm:col-span-7 col-span-12 border border-gray-200 rounded-lg">
          {checkOption === "agent" && <VoiceAssistant agentId={agent.id} />}

          {checkOption === "chatagent" && <AgentChat agentId={agent.id} />}
        </div>
      </div>
    </div>
  );
};

export default AgentOption;
