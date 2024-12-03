import { Dispatch, FC, SetStateAction, useState } from "react";
import { ChatSession, deleteChat } from "../../ReduxToolKit/chatSessionSlice";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import {
  useDeleteChatMutation,
  useRenameChatSessionMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { useAppDispatch } from "../../ReduxToolKit/hook";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface ChatSessionsProps {
  session: ChatSession[];
  setSpecificChatId: Dispatch<SetStateAction<number | null>>;
  setStartNewChat: Dispatch<SetStateAction<boolean>>;
  focusInputById: () => void;
}

const ChatSessions: FC<ChatSessionsProps> = ({
  session,
  setSpecificChatId,
  setStartNewChat,
  focusInputById,
}) => {
  const [deleteChatSession] = useDeleteChatMutation();
  const [renameChatSessionName] = useRenameChatSessionMutation();
  const dispatch = useAppDispatch();
  const [isEditTitle, setIsEditTitle] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [deleteChatLoading, setDeleteChatLoading] = useState<number | null>(
    null
  );
  const [sessionChatDropDown, setSessionChatDropDown] = useState<number | null>(
    null
  );

  const handleDeleteChatSession = async (id: number) => {
    setDeleteChatLoading(id);
    setSessionChatDropDown(null);
    setStartNewChat(true);

    try {
      const res = await deleteChatSession(id).unwrap(); // API call to delete chat session
      dispatch(deleteChat(id)); // Update Redux store
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
  return (
    <div className=" flex flex-col gap-2 mb-5">
      {session?.map((chat, index) => (
        <div
          key={index}
          className="bg-[#424242] text-white rounded-lg flex items-center justify-between pr-6 mr-2 relative"
        >
          <div
            className="h-full w-full flex items-center justify-between py-4 pl-6 cursor-pointer"
            onClick={() => {
              setSpecificChatId(chat.id);
              setStartNewChat(false);
              focusInputById();
            }}
          >
            <FiMessageSquare />
            {isEditTitle === chat.id ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:outline-none bg-transparent grow mx-4 border px-2"
              />
            ) : (
              <div className="flex-1 mx-4 overflow-hidden text-fade">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                  {chat.title}
                </p>
              </div>
            )}
          </div>
          {isEditTitle === chat.id ? (
            <FaRegSave
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
  );
};

export default ChatSessions;
