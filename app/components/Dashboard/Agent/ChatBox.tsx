import { FC, useEffect, useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import MarkDown from "../../MarkDown/MarkDown";
import { AgentChatType } from "../../ReduxToolKit/types/agents";
import StreamingText from "./StreamingText";

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
  const [isCopied, setIsCopied] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Find the index of the last agent message
  const lastAgentMessageIndex = chat.reduce(
    (lastIndex, message, currentIndex) => {
      return message.role === "agent" ? currentIndex : lastIndex;
    },
    -1
  );

  // Auto-scroll to bottom when chat updates
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
    }, 1000);
  };

  const renderMessageContent = (
    message: AgentChatType,
    isLatestAgentMsg: boolean
  ) => {
    if (message.message === "loading") {
      return (
        <div className="space-y-3 animate-pulse">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      );
    }

    return isLatestAgentMsg ? (
      <StreamingText
        text={message.message}
        speed={20}
        className="text-gray-800"
        renderText={(text) => <MarkDown content={text} />}
        onComplete={() => console.log("Streaming complete")}
      />
    ) : (
      <MarkDown content={message.message} />
    );
  };

  return (
    <div
      className="w-full pr-5 min-h-[67vh] max-h-[67vh] overflow-hidden overflow-y-scroll scrollbar-hide"
      ref={chatContainerRef}
    >
      {chat.map((message, index) => {
        const isLatestAgentMsg =
          message.role === "agent" && index === lastAgentMessageIndex;

        return (
          <div key={index} className="mb-4 last:mb-0">
            {message.role === "user" ? (
              <div>
                <div className="flex gap-2 items-start">
                  <div className="w-8 h-9 rounded-lg bg-no-repeat bg-center bg-cover relative z-10 bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-[#1E1F22]">
                    <p className="text-xs font-semibold">
                      {message.sender_name || "You"}
                    </p>
                    <p className="text-[8px]">
                      {message.created_at ? (
                        formatDate(message.created_at)
                      ) : (
                        <div className="h-1 bg-slate-700 rounded col-span-1 animate-pulse w-10"></div>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative -top-5 -right-5">
                  <div className="py-4 px-5 bg-[#f6f6f6] rounded-2xl text-[#1E1F22] w-fit">
                    <MarkDown content={message.message} />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 items-start relative z-10">
                  <div className="w-8 h-9 rounded-lg bg-gradient-to-b from-black via-[#2E2E2E] to-black"></div>
                  <div className="flex items-center gap-2 text-[#1E1F22]">
                    <p className="text-xs font-semibold">Response</p>
                    <p className="text-[8px]">
                      {message.created_at ? (
                        formatDate(message.created_at)
                      ) : (
                        <div className="h-1 bg-slate-700 rounded col-span-1 animate-pulse w-10"></div>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative -top-5 -right-5">
                  <div
                    className={`py-4 px-5 bg-white rounded-lg text-[#1E1F22] text-[17px] ${
                      message.message === "loading" ? "w-[50%]" : "w-[98%]"
                    }`}
                  >
                    {renderMessageContent(message, isLatestAgentMsg)}

                    {message.message !== "loading" && (
                      <div className="flex justify-end items-center mt-2">
                        <div className="flex items-center gap-3">
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
