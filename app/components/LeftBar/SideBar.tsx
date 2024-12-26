import MhsLogo from "@/app/assets/Images/MHSLogo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import Loader from "../Loader/Loader";
import RangeBar from "../RangeBar/RangeBar";
import { useGetAgentByIdQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import "./style.css";

type TabType = {
  heading: string;
  tabs: {
    title: string;
    url: string;
  }[];
};

interface QaItem {
  question: string;
  answer: string;
}
interface FileItem {
  file_url: string;
  text_content: string;
}
interface SideBarProps {
  agentId: number;
  tab: TabType;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
  setCheckOption: Dispatch<SetStateAction<string>>;
  checkOption: string;
}

const SideBar: FC<SideBarProps> = ({
  agentId,
  setIsMobile,
  tab,
  setCheckOption,
  checkOption,
}) => {
  const { data: agent, isLoading } = useGetAgentByIdQuery(agentId);

  const currentRoute = usePathname();
  const [qaData, setQaData] = useState<QaItem[]>([]);
  const [qaCharacters, setqaCharacters] = useState<number>(0);
  const [fileData, setFileData] = useState<FileItem[]>([]);
  const [fileChar, setFileChar] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

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
    }, 2000);
  };

  if (isLoading || !agent) {
    return (
      <div className="w-full mt-20 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const totalChar = qaCharacters + (agent.text?.length ?? 0) + fileChar;

  //@ts-ignore
  const formattedDate = new Date(agent.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //@ts-ignore
  const formattedTime = new Date(agent.updated_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className=" text-white pr-5 h-full flex flex-col justify-between relative z-50">
      <div className="h-full flex flex-col justify-between">
        <div>
          <HiOutlineDotsHorizontal
            className={`text-2xl cursor-pointer text-white ml-auto`}
            onClick={() => setIsMobile(true)}
          />
          {currentRoute.includes("tools") && (
            <Image src={MhsLogo} alt="" className="max-w-[170px] h-auto mt-4" />
          )}
        </div>
        <div>
          <p className="text-white font-medium mb-5">{tab.heading}</p>
          <div id="abc" className="w-full space-y-1 mb-10">
            {tab.tabs.map((option, index) => (
              <div
                key={index}
                className={`${
                  checkOption === option.url && "bg-[#424242]"
                } hover:bg-[#424242] text-white py-4 px-12 rounded-[10px] cursor-pointer duration-300 transition-colors`}
                onClick={() => setCheckOption(option.url)}
              >
                <p>{option.title}</p>
              </div>
            ))}
          </div>
          {currentRoute.includes("tools") ||
            (currentRoute.includes("model") && (
              <div className="h-16 md:block hidded"></div>
            ))}
          {/* <div className="rounded-[10px] w-[90%] mx-auto py-6 bg-gradient-to-r from-[#525252] via-[#252525] to-[#101010] mb-20"> */}
          {currentRoute.includes("connections") && (
            <div
              className="rounded-[10px] w-[90%] mx-auto pt-6 pb-8 mb-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top left, #525252, #252525 40%, #101010 60%)",
              }}
            >
              <div className="w-[80%] mx-auto">
                <p className="text-white font-bold text-2xl leading-9">
                  Looking for <br /> a specific API?
                </p>
                <p className="text-xs mt-2">We can setup the API you need.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-auto flex items-end">
        <div className="border-t border-[#808080] pt-5 text-xs text-[#9A9A9A] w-full">
          <div className="grid grid-cols-12 mb-3 gap-2">
            <div className="col-span-8">
              <p className="text-white font-medium">Agent ID:</p>
              <div className="flex items-center gap-1 relative">
                <p className="break-all">{agent.ran_id}</p>
                <div className="w-3">
                  <MdContentCopy
                    className="cursor-pointer"
                    onClick={handleCopy}
                  />
                </div>

                {isCopied && (
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 mt-2">
                    Copied!
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-4">
              <p className="text-white font-medium"># of characters:</p>
              <p>{totalChar}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-3 gap-2">
            <div className="col-span-8">
              <p className="text-white font-medium">
                Temperature: {agent.temperature}
              </p>
              <div className="max-w-[184px]">
                <RangeBar
                  temperature={agent.temperature}
                  // checkOption={checkOption}
                  readOnly
                />
              </div>
            </div>
            <div className="col-span-4">
              <p className="text-white font-medium">Status:</p>
              <div className="flex items-center gap-[2px]">
                <div
                  className={`w-[10px] h-[11px] rounded-full ${
                    agent.status === "Trained" ? "bg-[#34E50C]" : "bg-red-500"
                  }`}
                ></div>
                <p>{agent.status}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-3 gap-2">
            <div className="col-span-8">
              <p className="text-white font-medium">Last Trained:</p>
              <p>
                {formattedDate}, {formattedTime}
              </p>
            </div>
            <div className="col-span-4">
              <p className="text-white font-medium">Model:</p>
              <p className="capitalize">{agent.model}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
