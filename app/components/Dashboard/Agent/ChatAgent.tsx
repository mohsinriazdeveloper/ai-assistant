import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FaMicrophone } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { HiArrowRight } from "react-icons/hi";
import Loader from "../../Loader/Loader";
import {
  useAgentChatMutation,
  useGetSpecificChatQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { AgentChatType } from "../../ReduxToolKit/types/agents";
import ChatBox from "./ChatBox";
import "./style.css";

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
    isLoading,
    error,
  } = useGetSpecificChatQuery(specificChatId);
  const [agentChat] = useAgentChatMutation();
  const [chat, setChat] = useState<AgentChatType[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

      if (textInput.trim() === "") return;

      const userMessage: AgentChatType = {
        id: specificChatId || null,
        role: "user",
        message: textInput.trim(),
      };

      setChat((prevChat) => [...prevChat, userMessage]);

      if (specificChatId !== null) {
        localStorage.removeItem(`chat_${specificChatId}`);
      }

      setTextInput("");
      setChat((prevChat) => [
        ...prevChat,
        { id: null, role: "agent", message: "loading" },
      ]);

      try {
        const response = await agentChat({
          agent_id: agentId,
          text_input: textInput.trim(),
          chat_session_id: specificChatId,
        }).unwrap();
        focusInputById();
        setSpecificChatId(response.chat_session_id);
        localStorage.setItem(
          "specificChatId",
          response.chat_session_id.toString()
        );

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
        setChat((prevChat) => prevChat.slice(0, -1));
        toast.error("Failed to send message. Please try again.");
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
    textarea.style.height = `${Math.min(textarea.scrollHeight, 76.8)}px`;
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
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

        <textarea
          ref={inputIdRef}
          rows={1}
          placeholder="Type your prompt here"
          className="sm:text-lg text-white bg-transparent grow chatInput focus:outline-none recentChatScroller"
          value={textInput}
          onChange={handleTextInputChange}
          onKeyDown={handleKeyDown}
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
