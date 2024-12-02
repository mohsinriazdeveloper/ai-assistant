import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaMicrophone } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { HiArrowRight } from "react-icons/hi";
import "./style.css";
import ChatBox from "./ChatBox";
import {
  useAgentChatMutation,
  useGetSpecificChatQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { AgentChatType } from "../../ReduxToolKit/types/agents";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { skipToken } from "@reduxjs/toolkit/query";

interface ChatAgentProps {
  setIsVoice: Dispatch<SetStateAction<boolean>>;
  specificChatId: number | null;
  agentId: number;
  startNewChat: boolean;
  setStartNewChat: Dispatch<SetStateAction<boolean>>;
  setSpecificChatId: Dispatch<SetStateAction<number | null>>;
}

const ChatAgent: FC<ChatAgentProps> = ({
  setIsVoice,
  specificChatId,
  agentId,
  startNewChat,
  setStartNewChat,
  setSpecificChatId,
}) => {
  const {
    data: getChat,
    isLoading,
    error,
  } = useGetSpecificChatQuery(specificChatId ?? skipToken); // Skip query when specificChatId is null

  const [agentChat] = useAgentChatMutation();
  const [chat, setChat] = useState<AgentChatType[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [chatSessionId, setChatSessionId] = useState<number | null>(null);

  useEffect(() => {
    if (startNewChat) {
      setChat([]);
      setSpecificChatId(null);
    }
  }, [startNewChat]);

  useEffect(() => {
    if (textareaRef.current && isLoading === false) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (getChat) {
      setChat(getChat);
    }
  }, [getChat]);

  // const handleSendMessage = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (textInput !== "" && !loading) {
  //     setStartNewChat(false);
  //     setLoading(true);
  //     const agent_id = agentId;
  //     if (textInput.trim() === "") return;

  //     const userMessage: AgentChatType = {
  //       id: specificChatId || null,
  //       role: "user",
  //       message: textInput,
  //     };
  //     setChat((prevChat) => [...prevChat, userMessage]);
  //     setTextInput("");

  //     try {
  //       const response = await agentChat({
  //         agent_id,
  //         text_input: textInput,
  //         chat_session_id: specificChatId,
  //       }).unwrap();
  //       setSpecificChatId(response.chat_session_id);
  //       const botMessage: AgentChatType = {
  //         id: specificChatId || null,
  //         role: "agent",
  //         message: response.response,
  //       };
  //       setChat((prevChat) => [...prevChat, botMessage]);
  //     } catch (error: any) {
  //       if (error.status === 429) {
  //         toast.error(error.data.error);
  //       } else {
  //         toast.error("Failed to send message. Please try again.");
  //         console.error("Failed to send message: ", error);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput !== "" && !loading) {
      setStartNewChat(false);
      setLoading(true);
      const agent_id = agentId;
      if (textInput.trim() === "") return;

      const userMessage: AgentChatType = {
        id: specificChatId || null,
        role: "user",
        message: textInput,
      };

      // Add the user's message to the chat
      setChat((prevChat) => [...prevChat, userMessage]);

      // Add a placeholder for the upcoming response with a loader
      const loadingMessage: AgentChatType = {
        id: null,
        role: "agent",
        message: "loading", // Placeholder for the loader
      };
      setChat((prevChat) => [...prevChat, loadingMessage]);

      setTextInput("");

      try {
        const response = await agentChat({
          agent_id,
          text_input: textInput,
          chat_session_id: specificChatId,
        }).unwrap();

        setSpecificChatId(response.chat_session_id);

        // Replace the loading placeholder with the actual response
        setChat((prevChat) => {
          const updatedChat = [...prevChat];
          updatedChat[updatedChat.length - 1] = {
            id: specificChatId || null,
            role: "agent",
            message: response.response,
          };
          return updatedChat;
        });
      } catch (error: any) {
        // Remove the loading message and show error
        setChat((prevChat) => prevChat.slice(0, -1));
        if (error.status === 429) {
          toast.error(error.data.error);
        } else {
          toast.error("Failed to send message. Please try again.");
          console.error("Failed to send message: ", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 76.8)}px`; // 76.8px equals around 5 rows
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-[80vh] flex flex-col justify-between items-center">
      {startNewChat ? (
        <div className="grow flex flex-col justify-center items-center text-center">
          <p className="text-black md:text-5xl sm:text-4xl text-3xl font-medium">
            Use Your <span className="text-[#9747FF]">AI</span> Now!
          </p>
          <p className="md:w-[53%] sm:w-[70%] mx-auto mt-3 text-[#767676] leading-4">
            This AI is connected to your unique data sources and interacts with
            you according to your instructions, context, and model setup in the
            model tab.
          </p>
        </div>
      ) : (
        <ChatBox chat={chat} loading={loading} />
      )}
      <form
        onSubmit={handleSendMessage}
        className="w-full flex gap-4 items-center p-[6px] bg-[#181818] rounded-full"
      >
        <div className="flex justify-center items-center bg-[#343434] sm:w-12 w-7 sm:h-12 h-7 sm:min-w-12 min-w-7 sm:min-h-12 min-h-7 rounded-full cursor-not-allowed">
          <GoPaperclip className="text-white sm:text-2xl text-lg mr-1" />
        </div>

        <input
          placeholder="Type your prompt here"
          className="sm:text-lg text-white bg-transparent grow chatInput focus:outline-none"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          disabled={loading}
        />
        <div className="sm:min-w-6 min-w-4">
          <FaMicrophone
            className="text-white sm:text-2xl text-lg cursor-pointer"
            onClick={() => setIsVoice(true)}
          />
        </div>
        <button
          type="submit"
          disabled={textInput === "" || loading}
          className={`flex justify-center items-center bg-white sm:w-12 w-7 sm:h-12 h-7 sm:min-w-12 min-w-7 sm:min-h-12 min-h-7 rounded-full ${
            textInput === "" || loading
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <HiArrowRight className="text-black sm:text-2xl text-lg" />
        </button>
      </form>
    </div>
  );
};

export default ChatAgent;
