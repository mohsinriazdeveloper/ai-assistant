import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import dummyImg from "@/app/assets/Images/chatImgPerson.png";
import { LiaEditSolid } from "react-icons/lia";
import { GrPowerReset } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import SmileyFill from "@/app/assets/icons/SmileyFill.png";
import Smiley from "@/app/assets/icons/Smiley.png";
import SadFill from "@/app/assets/icons/SadFill.png";
import Sad from "@/app/assets/icons/Sad.png";
import { AgentChatType } from "../../ReduxToolKit/types/agents";
import MarkDown from "../../MarkDown/MarkDown";
import Loader from "../../Loader/Loader";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace(",", " ▪");
};
interface ChatBoxProps {
  chat: AgentChatType[];
  loading: boolean;
}

const ChatBox: FC<ChatBoxProps> = ({ chat, loading }) => {
  const [isSmile, setIsSmile] = useState<boolean>(false);
  const [isSad, setIsSad] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState<number | null>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);
  const handleCopyResponse = (message: string, id: number | null) => {
    setIsCopied(id);
    navigator.clipboard.writeText(message);
    setTimeout(() => {
      setIsCopied(null);
    }, 1000); // Tooltip will disappear after 2 seconds
  };
  return (
    <div
      className="w-full pr-5 max-h-[70vh] overflow-hidden overflow-y-scroll scrollbar-hide"
      ref={chatContainerRef}
    >
      {chat.map((message, index) => (
        <div key={index}>
          {message.role === "user" && (
            <div>
              <div className="flex gap-2 items-start">
                <div
                  className="w-8 h-9 rounded-lg bg-no-repeat bg-center bg-cover"
                  style={{ backgroundImage: `url(${dummyImg.src})` }}
                ></div>
                <div className="flex items-center gap-2 text-[#1E1F22]">
                  <p className="text-xs font-semibold ">You</p>
                  <p className="text-[8px]">
                    {message.created_at
                      ? formatDate(message.created_at)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative -top-5 -right-5 -z-10">
                <div className="py-4 px-5 bg-white rounded-lg shadow-md text-sm text-[#1E1F22] w-fit ">
                  <MarkDown content={message.message} />
                </div>
                {/* <LiaEditSolid className="text-[#9B9DA6] text-lg cursor-pointer" /> */}
              </div>
            </div>
          )}
          {message.role === "agent" && (
            <div>
              <div className="flex gap-2 items-start relative z-10">
                <div className="w-8 h-9 rounded-lg bg-gradient-to-b from-black via-[#2E2E2E] to-black"></div>
                <div className="flex items-center gap-2 text-[#1E1F22]">
                  <p className="text-xs font-semibold ">Response</p>
                  <p className="text-[8px]">
                    {message.created_at
                      ? formatDate(message.created_at)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative -top-5 -right-5 ">
                <div
                  className={`py-4 px-5 bg-white rounded-lg shadow-md text-sm text-[#1E1F22] ${
                    message.message === "loading" ? "w-[50%]" : "w-fit"
                  }  `}
                >
                  {message.message === "loading" ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  ) : (
                    <MarkDown content={message.message} />
                  )}

                  <div className="flex justify-end items-center mt-2">
                    {/* <div className="p-[2px] rounded-full flex items-center gap-2 bg-[#F1F1F1]">
                      <div>
                        {isSmile ? (
                          <Image
                            src={SmileyFill}
                            alt=""
                            className="cursor-pointer"
                            onClick={() => setIsSmile(false)}
                          />
                        ) : (
                          <Image
                            src={Smiley}
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {
                              setIsSmile(true), setIsSad(false);
                            }}
                          />
                        )}
                      </div>

                      <div>
                        {isSad ? (
                          <Image
                            src={SadFill}
                            alt=""
                            className="cursor-pointer"
                            onClick={() => setIsSad(false)}
                          />
                        ) : (
                          <Image
                            src={Sad}
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {
                              setIsSad(true), setIsSmile(false);
                            }}
                          />
                        )}
                      </div>
                    </div> */}
                    {message.message !== "loading" && (
                      <div className="flex items-center gap-3">
                        {/* <div className="flex items-center gap-[5px] py-[2px] px-2 border border-[#8B8A8A] rounded-md text-[10px]">
                        <GrPowerReset />
                        <p>Generate Response</p>
                      </div> */}
                        <div
                          onClick={() =>
                            handleCopyResponse(message.message, message.id)
                          }
                          className={`flex items-center gap-[5px] py-[2px] px-2 border border-[#8B8A8A] rounded-md text-[10px] cursor-pointer ${
                            isCopied === message.id && "bg-black text-white"
                          }`}
                        >
                          <MdContentCopy />
                          <p>{isCopied === message.id ? "Copied" : "Copy"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ChatBox;
