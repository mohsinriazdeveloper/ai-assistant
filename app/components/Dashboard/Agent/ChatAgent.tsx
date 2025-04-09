import AiStar from "@/app/assets/Images/bigAiStar.png";
import Image from "next/image";
import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FaMicrophone } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { HiArrowRight } from "react-icons/hi";
import Loader from "../../Loader/Loader";
import {
  useGetAgentChatQuery,
  // useAgentChatQuery,
  useGetOrganizationQuery,
  useGetSpecificChatQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { AgentChatType } from "../../ReduxToolKit/types/agents";
import ChatBox from "./ChatBox";
import "./style.css";

export type ChatType = {
  agent_id: number;
  text_input: string;
  user_id: number | null;
  chat_session_id: number | null;
};

interface ChatAgentProps {
  setIsVoice: Dispatch<SetStateAction<boolean>>;
  specificChatId: number | null;
  agentId: number;
  startNewChat: boolean | undefined;
  setStartNewChat: Dispatch<SetStateAction<boolean | undefined>>;
  setSpecificChatId: Dispatch<SetStateAction<number | null>>;
  inputIdRef: RefObject<HTMLTextAreaElement>;
  focusInputById: () => void;
}

const ChatAgent: FC<ChatAgentProps> = ({
  setIsVoice,
  specificChatId,
  agentId,
  startNewChat,
  setStartNewChat,
  setSpecificChatId,
  inputIdRef,
  focusInputById,
}) => {
  const {
    data: getChat,
    refetch: refetchSpecificChat,
    isLoading,
    error,
  } = useGetSpecificChatQuery(specificChatId);
  const { data: getOrg } = useGetOrganizationQuery();
  const { refetch: AllChatsSession } = useGetAgentChatQuery(agentId);
  const [chat, setChat] = useState<AgentChatType[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (getOrg) {
      setUserId(getOrg.id);
    } else {
      setUserId(null);
    }
  }, [getOrg]);

  useEffect(() => {
    if (startNewChat) {
      setSpecificChatId(null);
    }
  }, [startNewChat]);

  useEffect(() => {
    if (!isLoading) {
      focusInputById();
    }
  }, [isLoading]);

  useEffect(() => {
    if (getChat) {
      setChat(getChat);
      focusInputById();
    }
  }, [getChat]);

  useEffect(() => {
    if (specificChatId !== null) {
      const savedText = localStorage.getItem(`chat_${specificChatId}`);
      setTextInput(savedText || "");
    } else {
      setTextInput("");
    }
  }, [specificChatId]);
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);
  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 76.8)}px`;
  };
  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleTextareaInput(e);
    const newText = e.target.value;
    setTextInput(newText);

    if (specificChatId !== null) {
      localStorage.setItem(`chat_${specificChatId}`, newText);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput !== "" && !loading) {
      setStartNewChat(false);
      setLoading(true);

      // Create user message
      const userMessage: AgentChatType = {
        user_id: userId,
        id: specificChatId || null,
        role: "user",
        message: textInput.trim(),
        created_at: new Date().toISOString(),
      };

      // Clear input and storage
      if (specificChatId !== null) {
        localStorage.removeItem(`chat_${specificChatId}`);
      }
      setTextInput("");
      if (inputIdRef.current) {
        inputIdRef.current.style.height = "auto";
      }
      // Create a new chat array with both messages (user and empty agent)
      const newChatArray = [
        ...chat,
        userMessage,
        {
          user_id: userId,
          id: null,
          role: "agent",
          message: "", // Start with empty message
          created_at: new Date().toISOString(),
        },
      ];

      // Update the chat state with both messages at once
      setChat(newChatArray);

      // Create a promise that resolves when the stream is done
      const streamCompletion = new Promise<void>((resolve, reject) => {
        try {
          const fetchUrl = `${
            process.env.NEXT_PUBLIC_API_URL
          }/voice/process_text/?agent_id=${agentId}&text_input=${encodeURIComponent(
            textInput.trim()
          )}&user_id=${userId}&${
            specificChatId
              ? `chat_session_id=${specificChatId}`
              : `chat_session_id=null`
          }`;

          // Close any existing connection
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
          }

          // Create new EventSource connection
          eventSourceRef.current = new EventSource(fetchUrl);

          eventSourceRef.current.onmessage = (event) => {
            if (event.data === "[DONE]") {
              resolve();
              return;
            }

            try {
              const data = JSON.parse(event.data);
              let newChatSessionId: any;

              // Handle chat session ID immediately when received
              if (data.chat_session_id) {
                newChatSessionId = data.chat_session_id;
                setSpecificChatId(newChatSessionId);
                localStorage.setItem(
                  "specificChatId",
                  newChatSessionId.toString()
                );
                localStorage.setItem(
                  "myCustomChatId",
                  newChatSessionId.toString()
                );
              }

              // Handle message chunks - only update if we have a message
              if (data.message !== undefined) {
                // Changed from if (data.message)
                setChat((prevChat) => {
                  const newChat = [...prevChat];
                  const lastAgentMessageIndex = newChat.findLastIndex(
                    (msg) => msg.role === "agent"
                  );

                  if (lastAgentMessageIndex !== -1) {
                    newChat[lastAgentMessageIndex] = {
                      ...newChat[lastAgentMessageIndex],
                      message:
                        (newChat[lastAgentMessageIndex].message || "") +
                        (data.message || ""),
                      id: newChatSessionId,
                    };
                  } else {
                    // This case shouldn't happen since we add the empty agent message at start
                    newChat.push({
                      user_id: userId,
                      id: newChatSessionId,
                      role: "agent",
                      message: data.message || "",
                      created_at: new Date().toISOString(),
                    });
                  }

                  return newChat;
                });
              }

              // Handle completion
              if (data.done) {
                resolve();
              }

              // Handle errors
              if (data.error) {
                toast.error(data.error);
                reject(new Error(data.error));
              }
            } catch (err) {
              console.error("Error parsing event data:", err);
              reject(err);
            }
          };

          eventSourceRef.current.onerror = (error) => {
            console.error("EventSource error:", error);
            reject(new Error("EventSource failed"));
          };
        } catch (err) {
          reject(err);
        }
      });

      try {
        await streamCompletion;
      } catch (error: any) {
        console.error("Error:", error);
        setChat((prevChat) => prevChat.slice(0, -1));
        toast.error("Failed to send message. Please try again.");
      } finally {
        eventSourceRef.current?.close();
        setLoading(false);
        AllChatsSession();
        refetchSpecificChat();
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between items-center pb-[30px]">
      {startNewChat ? (
        <div className="grow flex flex-col justify-center items-center text-center  min-h-[67vh] max-h-[67vh]">
          <Image src={AiStar} alt="" className="w-[60px]" />
          <p className="text-black md:text-[40px] sm:text-4xl text-3xl font-bold mt-7">
            Your Sources.
          </p>
          <p className="text-black md:text-[40px] sm:text-4xl text-3xl font-bold mt-2">
            Your Ai.
          </p>
          <p className=" mx-auto mt-11 text-[#767676] text-[25px]">
            This AI is connected to your unique data sources and interact{" "}
            <br className="sm:block hidden" />
            with you according to your instructions and context.
          </p>
        </div>
      ) : (
        <ChatBox chat={chat} loading={loading} />
      )}
      <form
        onSubmit={handleSendMessage}
        className="w-full flex gap-4 items-center p-[6px] bg-[#FBFBFB] rounded-full"
      >
        <div className="flex justify-center items-center bg-[#F2F2F2] sm:w-16 w-7 sm:h-16 h-7 sm:min-w-16 min-w-7 sm:min-h-16 min-h-7 rounded-full cursor-not-allowed">
          <GoPaperclip className="text-black sm:text-3xl text-lg mr-1" />
        </div>

        <textarea
          ref={inputIdRef}
          rows={1}
          placeholder="type your prompt here"
          className="sm:text-xl bg-transparent grow chatInput focus:outline-none recentChatScroller"
          value={textInput}
          onChange={handleTextInputChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <div className="sm:min-w-6 min-w-4">
          <FaMicrophone
            className="text-black sm:text-3xl text-lg cursor-pointer"
            onClick={() => setIsVoice(true)}
          />
        </div>
        <button
          type="submit"
          disabled={textInput.trim() === "" || loading}
          className={`flex justify-center items-center bg-white sm:w-16 w-7 sm:h-16 h-7 sm:min-w-16 min-w-7 sm:min-h-16 min-h-7 rounded-full border border-black ${
            textInput.trim() === "" || loading
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <HiArrowRight className="text-black sm:text-3xl text-lg" />
        </button>
      </form>
    </div>
  );
};

export default ChatAgent;
