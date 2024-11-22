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
}

const ChatAgent: FC<ChatAgentProps> = ({
  setIsVoice,
  specificChatId,
  agentId,
  startNewChat,
  setStartNewChat,
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

  useEffect(() => {
    if (startNewChat) {
      setChat([]); // Clear all existing messages
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
      setChat((prevChat) => [...prevChat, userMessage]);
      setTextInput("");

      try {
        const response = await agentChat({
          agent_id,
          text_input: textInput,
        }).unwrap();

        const botMessage: AgentChatType = {
          id: specificChatId || null,
          role: "agent",
          message: response.response,
        };
        setChat((prevChat) => [...prevChat, botMessage]);
      } catch (error: any) {
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
          <p className="text-black text-5xl font-medium">
            Use Your <span className="text-[#9747FF]">AI</span> Now!
          </p>
          <p className="w-[53%] mx-auto mt-3 text-[#767676] leading-4">
            This AI is connected to your unique data sources and interacts with
            you according to your instructions, context, and model setup in the
            model tab.
          </p>
        </div>
      ) : (
        <ChatBox chat={chat} />
      )}
      <form
        onSubmit={handleSendMessage}
        className="w-full flex gap-4 items-center p-[6px] bg-[#181818] rounded-full"
      >
        <div className="flex justify-center items-center bg-[#343434] w-12 h-12 rounded-full cursor-not-allowed">
          <GoPaperclip className="text-white text-2xl mr-1" />
        </div>

        <input
          // ref={textareaRef}
          placeholder="Type your prompt here"
          className="text-lg text-white bg-transparent grow chatInput focus:outline-none"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          disabled={loading}

          // onKeyDown={handleKeyDown}
          // onInput={handleTextareaInput}
        />
        <FaMicrophone
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsVoice(true)}
        />
        <button
          type="submit"
          disabled={textInput === "" || loading}
          className={`flex justify-center items-center bg-white w-12 h-12 rounded-full ${
            textInput === "" || loading
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <HiArrowRight className="text-black text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatAgent;
