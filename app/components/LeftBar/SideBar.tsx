"use client";
import { usePathname } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import Loader from "../Loader/Loader";
import RangeBar from "../RangeBar/RangeBar";
import {
  useGetAgentByIdQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { QATypes } from "../UpdateTraining/trainingTypes.d";
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
  agentId: any;
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
  const [UpdateAgentLogo, { isLoading: agentLogoLoader }] =
    useUpdateAgentMutation();
  const currentRoute = usePathname();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [totalchar, setTotalchar] = useState<number>(0);
  const [qaData, setQaData] = useState<QATypes[]>([]);
  const [agentLogo, setAgentLogo] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (agentLogo && agentId) {
      const fd = new FormData();
      fd.append("id", agentId);
      fd.append("logo", agentLogo);
      UpdateAgentLogo(fd)
        .unwrap()
        .then((response) => {
          // Assuming the response contains the new image URL
          setLocalImageUrl(response.logo_url);
        })
        .catch((error) => {
          console.error("Error updating agent logo:", error);
        });
    }
  }, [agentLogo, agentId, UpdateAgentLogo]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check file type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .png, .jpeg, .jpg image files are allowed");
        event.target.value = ""; // Reset the file input field
        return;
      }

      setAgentLogo(file);
      setLocalImageUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    let char: number = 0;
    if (agent?.text) {
      char += agent.text.length;
    }
    if (agent?.qa) {
      const parsedQa =
        typeof agent.qa === "string" ? JSON.parse(agent.qa) : agent.qa;
      if (Array.isArray(parsedQa)) {
        setQaData(parsedQa);
      }
      const total = qaData.reduce(
        (acc, qa) => acc + qa.question.length + qa.answer.length,
        0
      );
      char += total;
    }
    if (agent?.files) {
      const filesChar = agent.files.reduce(
        (sum, file) => sum + (file.file_characters || 0),
        0
      );
      char += filesChar;
    }
    setTotalchar(char);
  }, [agent]);

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
    <div
      className={`text-white pr-5 h-full flex flex-col justify-between relative z-50`}
    >
      <div className="h-full">
        <div className="flex justify-between">
          <label htmlFor="sideBarImage">
            {localImageUrl || agent.logo_url ? (
              <div
                className="w-[100px] h-[100px] rounded-md flex justify-center items-center cursor-pointer overflow-hidden bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${localImageUrl || agent.logo_url})`,
                }}
              >
                {agentLogoLoader ? (
                  <Loader />
                ) : (
                  <input
                    id="sideBarImage"
                    type="file"
                    className="hidden"
                    accept=".png, .jpeg, .jpg"
                    onChange={handleFileChange}
                  />
                )}
              </div>
            ) : (
              <div className="w-[100px] h-[100px] border border-gray-200 rounded-md flex justify-center items-center cursor-pointer overflow-hidden">
                {agentLogoLoader ? (
                  <Loader />
                ) : (
                  <>
                    <IoMdAdd color="#e5e5e5" />
                    <input
                      id="sideBarImage"
                      type="file"
                      className="hidden"
                      accept=".png, .jpeg, .jpg"
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
            )}
          </label>
          <div className=" pt-4">
            <LuChevronRight
              className="text-3xl mb-6 ml-auto cursor-pointer rotate-180"
              onClick={() => setIsMobile(true)}
            />
          </div>
        </div>
        <div className="mt-[136px]">
          <div>
            <p className="text-white font-medium mb-5">{tab.heading}</p>
            <div id="step-1" className="w-full space-y-1 mb-10">
              {tab.tabs.map((option, index) => (
                <div
                  key={index}
                  className={`${
                    checkOption === option.url && "bg-[#424242]"
                  } hover:bg-[#424242] text-lg text-white h-[59px] flex items-center tab:px-12 px-10 rounded-[10px] cursor-pointer duration-300 transition-colors`}
                  onClick={() => setCheckOption(option.url)}
                >
                  <p>{option.title}</p>
                </div>
              ))}
            </div>
          </div>
          {/* {currentRoute.includes("tools") ||
            (currentRoute.includes("model") && (
              <div className="h-16 md:block hidded"></div>
            ))} */}
          {/* <div className="rounded-[10px] w-[90%] mx-auto py-6 bg-gradient-to-r from-[#525252] via-[#252525] to-[#101010] mb-20"> */}
          {/* {currentRoute.includes("connections") && (
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
          )} */}
        </div>
      </div>
      <div className="h-auto flex items-end">
        <div className="border-t border-[#808080] pt-5 text-xs text-[#9A9A9A] w-full">
          <div className="grid grid-cols-12 mb-3 gap-10">
            <div className="col-span-6">
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
              <p>{totalchar}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-3 gap-10">
            <div className="col-span-6">
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
          <div className="grid grid-cols-12 mb-3 gap-10">
            <div className="col-span-6">
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
