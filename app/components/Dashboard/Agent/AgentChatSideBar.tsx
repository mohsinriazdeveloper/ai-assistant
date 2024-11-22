import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.css";
import { FiMessageSquare } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import {
  useDeleteChatMutation,
  useGetAgentChatQuery,
  useGetAllAgentsQuery,
  useRenameChatSessionMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import Loader from "../../Loader/Loader";
import RangeBar from "../../RangeBar/RangeBar";
import { MdContentCopy, MdSaveAlt } from "react-icons/md";
import toast from "react-hot-toast";
import PreviousPage from "../../PreviousPage/PreviousPage";
import NewChatModal from "../../Dialogues/NewChatModal";

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
  setStartNewChat: Dispatch<SetStateAction<boolean>>;
  setIsVoice: Dispatch<SetStateAction<boolean>>;
}

const AgentChatSideBar: FC<AgentChatSideBar> = ({
  agentId,
  checkOption,
  setSpecificChatId,
  setStartNewChat,
  setIsVoice,
}) => {
  const { data: AllChats } = useGetAgentChatQuery(agentId);
  const [deleteChatSession] = useDeleteChatMutation();
  const { data: allAgents, isLoading } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  const [renameChatSessionName] = useRenameChatSessionMutation();
  const [qaData, setQaData] = useState<QaItem[]>([]);
  const [qaCharacters, setqaCharacters] = useState<number>(0);

  const [fileData, setFileData] = useState<FileItem[]>([]);
  const [fileChar, setFileChar] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false); // State to manage the tooltip
  const [sessionChatDropDown, setSessionChatDropDown] = useState<number | null>(
    null
  );
  const [deleteChatLoading, setDeleteChatLoading] = useState<number | null>(
    null
  );
  const [isEditTitle, setIsEditTitle] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [searchChat, setSearchChat] = useState<string>("");
  const [newChatModal, setNewChatModal] = useState<boolean>(false);

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

  const handleDeleteChatSession = async (id: number) => {
    setDeleteChatLoading(id);
    setSessionChatDropDown(null);

    try {
      const res = await deleteChatSession(id).unwrap(); // Ensure the mutation is completed
      toast.success("Chat session deleted successfully");
    } catch (error) {
      toast.error("Failed to delete chat session");
    } finally {
      setDeleteChatLoading(null);
    }
  };
  const handleChangeTitle = async (id: number) => {
    setSessionChatDropDown(null);
    try {
      await renameChatSessionName({ id, data: { title } });
      setIsEditTitle(null);
    } catch (error) {
      setIsEditTitle(null);
      toast.error("unable to rename chat session");
    }
  };
  const handleDropdownToggle = (id: number) => {
    setSessionChatDropDown((prevId) => (prevId === id ? null : id));
  };
  const filteredItems = AllChats?.filter(
    (item) =>
      searchChat.trim() === "" ||
      item.title.toLowerCase().includes(searchChat.toLowerCase())
  );
  console.log(AllChats);
  return (
    <div className="pt-6 pb-4 text-white px-5 h-screen flex flex-col justify-between">
      <div>
        <div className="mb-6 flex justify-between">
          <PreviousPage arrowColor="white" />
          <HiOutlineDotsHorizontal className="text-2xl " />
        </div>
        <div className="flex flex-col gap-[10px] mb-9">
          <div
            // onClick={() => {
            //   setSpecificChatId(null), setStartNewChat(true);
            // }}
            onClick={() => setNewChatModal(true)}
            className="w-full px-[18px] text-sm py-4 border border-white rounded-xl flex justify-between items-center font-semibold cursor-pointer"
          >
            <p>Begin a New Chat</p>
            <GoPlus className="text-xl font-bold" />
          </div>
          <div className="bg-[#424242] text-[#BBBBBB] rounded-lg flex items-center gap-[10px] py-[10px] px-6">
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

        {filteredItems ? (
          <div className="text-white text-xs mb-5">
            <p className="font-medium">Recent Chats</p>
            <div
              className={`mt-[18px] max-h-[218px] flex flex-col gap-2 ${
                filteredItems?.length > 4 &&
                "overflow-hidden overflow-y-scroll recentChatScroller"
              } `}
            >
              {filteredItems?.map((chat, index) => (
                <div
                  key={index}
                  className="bg-[#424242] text-white rounded-lg flex items-center justify-between py-4 px-6 mr-2 relative cursor-pointer"
                  onClick={() => {
                    setSpecificChatId(chat.id);
                    setStartNewChat(false);
                  }}
                >
                  <FiMessageSquare />
                  {isEditTitle === chat.id ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="focus:outline-none bg-transparent grow mx-4 border"
                    />
                  ) : (
                    <div className="flex-1 mx-4 overflow-hidden text-fade">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {chat.title}
                      </p>
                    </div>
                  )}
                  {isEditTitle === chat.id ? (
                    <MdSaveAlt
                      className="cursor-pointer"
                      onClick={() => handleChangeTitle(chat.id)}
                    />
                  ) : (
                    <>
                      {deleteChatLoading === chat.id ? (
                        <Loader />
                      ) : (
                        <HiOutlineDotsHorizontal
                          className="cursor-pointer relative z-10"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleDropdownToggle(chat.id);
                          }}
                        />
                      )}
                    </>
                  )}
                  {sessionChatDropDown === chat.id && (
                    <div className="bg-[#181818] py-1 rounded-md w-[100px] absolute right-6 top-8 z-20">
                      <p
                        onClick={() => handleDeleteChatSession(chat.id)}
                        className="text-red-500 text-xs hover:bg-[#424242] duration-300 transition-colors cursor-pointer py-1 px-2"
                      >
                        Delete Chat
                      </p>
                      <p
                        onClick={() => {
                          setIsEditTitle(chat.id),
                            setSessionChatDropDown(null),
                            setTitle(chat.title);
                        }}
                        className="text-blue-500 text-xs hover:bg-[#424242] duration-300 transition-colors cursor-pointer py-1 px-2"
                      >
                        Edit title
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-white text-xs mb-5">
            <p className="font-medium">Recent Chats</p>
            <p>No recent chats found.</p>
          </div>
        )}
      </div>
      <div className="h-full flex items-end">
        <div className="border-t border-[#808080] pt-5 text-xs text-[#9A9A9A] w-full">
          <div className="grid grid-cols-12 mb-3 gap-2">
            <div className="col-span-8">
              <p className="text-white font-medium">Agent ID:</p>
              <div className="flex items-center gap-1 relative">
                <p>{agent.ran_id}</p>
                <MdContentCopy
                  className=" cursor-pointer"
                  onClick={handleCopy}
                />

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
                  checkOption={checkOption}
                  readOnly
                />{" "}
                {/* Pass the readOnly prop */}
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
      />
    </div>
  );
};

export default AgentChatSideBar;
