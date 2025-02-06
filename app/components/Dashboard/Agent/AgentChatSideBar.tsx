import { format } from "date-fns";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import NewChatModal from "../../Dialogues/NewChatModal";
import Loader from "../../Loader/Loader";
import RangeBar from "../../RangeBar/RangeBar";
import {
  useGetAgentByIdQuery,
  useGetAgentChatQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { selectChats, setChats } from "../../ReduxToolKit/chatSessionSlice";
import { useAppDispatch, useAppSelector } from "../../ReduxToolKit/hook";
import { QATypes } from "../../UpdateTraining/trainingTypes.d";
import ChatSessions from "./ChatSessions";
import "./style.css";

interface QaItem {
  question: string;
  answer: string;
}
interface FileItem {
  file_url: string;
  text_content: string;
}

interface AgentChatSideBar {
  agentId: number;
  checkOption: string;
  setSpecificChatId: Dispatch<SetStateAction<number | null>>;
  setStartNewChat: Dispatch<SetStateAction<boolean | undefined>>;
  setIsVoice: Dispatch<SetStateAction<boolean>>;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
  focusInputById: () => void;
}

const AgentChatSideBar: FC<AgentChatSideBar> = ({
  agentId,
  checkOption,
  setSpecificChatId,
  setStartNewChat,
  setIsVoice,
  setIsMobile,
  focusInputById,
}) => {
  const { data: AllChats } = useGetAgentChatQuery(agentId);
  const { data: agent, isLoading } = useGetAgentByIdQuery(agentId);
  const dispatch = useAppDispatch();
  const chatSessions = useAppSelector(selectChats);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [searchChat, setSearchChat] = useState<string>("");
  const [newChatModal, setNewChatModal] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [totalchar, setTotalchar] = useState<number>(0);
  const [qaData, setQaData] = useState<QATypes[]>([]);
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

  useEffect(() => {
    if (AllChats) {
      dispatch(setChats(AllChats));
    } else {
      dispatch(setChats([]));
    }
  }, [AllChats, dispatch]);

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

  const filteredItems = chatSessions?.filter(
    (item) =>
      searchChat.trim() === "" ||
      item.title.toLowerCase().includes(searchChat.toLowerCase())
  );
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const todayChats = filteredItems.filter(
    (chat) => format(new Date(chat.updated_at), "yyyy-MM-dd") === currentDate
  );

  const previousChats = filteredItems.filter(
    (chat) => format(new Date(chat.updated_at), "yyyy-MM-dd") !== currentDate
  );

  return (
    <div className="text-white pr-5 h-full flex flex-col justify-between relative z-50 pt-4">
      <div>
        <HiOutlineDotsHorizontal
          className="text-2xl mb-6 ml-auto cursor-pointer"
          onClick={() => setIsMobile(true)}
        />
        <div>
          <label htmlFor="addImage">
            <div className="w-[125px] h-[125px] border border-gray-200 rounded-md flex justify-center items-center cursor-pointer overflow-hidden">
              {/* <div
                                  className="w-full h-full bg-center bg-cover bg-no-repeat flex justify-center items-center"
                                  // style={{ backgroundImage: `url(${preview})` }}
                                >
                                  
                                </div> */}

              <IoMdAdd color="#e5e5e5" />

              <input
                id="addImage"
                type="file"
                className="hidden"
                accept=".png, .jpeg, .jpg"
              />
            </div>
          </label>
        </div>
        {/* <div className="w-[125px] h-[125px] border-[10px] border-[#FF0000] bg-[#D9D9D9]"></div> */}
        <div className="flex flex-col gap-[10px] mt-[62px] mb-9">
          <div
            onClick={() => setNewChatModal(true)}
            className="w-full px-[18px] text-sm h-[65px] bg-[#242723] border border-white rounded-[15px] flex justify-between items-center font-semibold cursor-pointer"
          >
            <p>Begin a New Chat</p>
            <GoPlus className="text-xl font-bold" />
          </div>
          <div className="bg-[#424242] text-[#BBBBBB] rounded-[10px] flex items-center gap-[10px] px-6 h-12">
            <IoSearch />
            <input
              type="text"
              placeholder="Search"
              value={searchChat}
              onChange={(e) => setSearchChat(e.target.value)}
              className="w-full focus:outline-none bg-transparent text-sm chatSideBarSearch"
            />
          </div>
        </div>
        {filteredItems.length === 0 && (
          <div className="text-white text-sm mb-5 pt-2">
            <p className="font-medium">Recent Chats</p>
            <p>No recent chats found.</p>
          </div>
        )}
        <div
          className={`mt-[18px] 2xl:max-h-[280px] lg:max-h-[250px] tab:max-h-[230px] md:max-h-[200px] max-h-[180px] ${
            filteredItems?.length > 4 &&
            "overflow-hidden overflow-y-scroll recentChatScroller"
          } `}
        >
          {todayChats.length > 0 && (
            <div className="text-white text-xs">
              <p className="font-medium mb-3">Today</p>
              <ChatSessions
                session={todayChats}
                setSpecificChatId={setSpecificChatId}
                setStartNewChat={setStartNewChat}
                focusInputById={focusInputById}
                activeChat={activeChat} // Pass active chat
                setActiveChat={setActiveChat}
              />
            </div>
          )}
          {previousChats.length > 0 && (
            <div className="text-white text-xs">
              <p className="font-medium mb-3">Previous</p>
              <ChatSessions
                session={previousChats}
                setSpecificChatId={setSpecificChatId}
                setStartNewChat={setStartNewChat}
                focusInputById={focusInputById}
                activeChat={activeChat} // Pass active chat
                setActiveChat={setActiveChat}
              />
            </div>
          )}
        </div>
      </div>
      <div className="h-full flex items-end">
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
              <p>{totalchar}</p>
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
                  checkOption={checkOption}
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
      <NewChatModal
        openDialogue={newChatModal}
        handleClose={() => setNewChatModal(false)}
        setSpecificChatId={setSpecificChatId}
        setStartNewChat={setStartNewChat}
        setIsVoice={setIsVoice}
        focusInputById={focusInputById}
      />
    </div>
  );
};

export default AgentChatSideBar;
