// import AiStar from "@/app/assets/Images/bigAiStar.png";
// import Image from "next/image";
// import {
//   Dispatch,
//   FC,
//   RefObject,
//   SetStateAction,
//   useEffect,
//   useState,
// } from "react";
// import toast from "react-hot-toast";
// import { FaMicrophone } from "react-icons/fa";
// import { GoPaperclip } from "react-icons/go";
// import { HiArrowRight } from "react-icons/hi";
// import Loader from "../../Loader/Loader";
// import {
//   useAgentChatMutation,
//   useGetSpecificChatQuery,
// } from "../../ReduxToolKit/aiAssistantOtherApis";
// import { AgentChatType } from "../../ReduxToolKit/types/agents";
// import ChatBox from "./ChatBox";
// import "./style.css";

// interface ChatAgentProps {
//   setIsVoice: Dispatch<SetStateAction<boolean>>;
//   specificChatId: number | null;
//   agentId: number;
//   startNewChat: boolean | undefined;
//   setStartNewChat: Dispatch<SetStateAction<boolean | undefined>>;
//   setSpecificChatId: Dispatch<SetStateAction<number | null>>;
//   inputIdRef: RefObject<HTMLTextAreaElement>;
//   focusInputById: () => void;
// }

// const ChatAgent: FC<ChatAgentProps> = ({
//   setIsVoice,
//   specificChatId,
//   agentId,
//   startNewChat,
//   setStartNewChat,
//   setSpecificChatId,
//   inputIdRef,
//   focusInputById,
// }) => {
//   const {
//     data: getChat,
//     isLoading,
//     error,
//   } = useGetSpecificChatQuery(specificChatId);
//   const [agentChat] = useAgentChatMutation();
//   const [chat, setChat] = useState<AgentChatType[]>([]);
//   const [textInput, setTextInput] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (startNewChat) {
//       setSpecificChatId(null);
//     }
//   }, [startNewChat]);

//   useEffect(() => {
//     if (!isLoading) {
//       focusInputById();
//     }
//   }, [isLoading]);

//   useEffect(() => {
//     if (getChat) {
//       setChat(getChat);
//       focusInputById();
//     }
//   }, [getChat]);

//   useEffect(() => {
//     if (specificChatId !== null) {
//       const savedText = localStorage.getItem(`chat_${specificChatId}`);
//       setTextInput(savedText || "");
//     } else {
//       setTextInput("");
//     }
//   }, [specificChatId]);

//   const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const newText = e.target.value;
//     setTextInput(newText);

//     if (specificChatId !== null) {
//       localStorage.setItem(`chat_${specificChatId}`, newText);
//     }
//   };

// const handleSendMessage = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (textInput !== "" && !loading) {
//     setStartNewChat(false);
//     setLoading(true);

//     if (textInput.trim() === "") {
//       return;
//     }

//     const userMessage: AgentChatType = {
//       id: specificChatId || null,
//       role: "user",
//       message: textInput.trim(),
//     };

//     setChat((prevChat) => [...prevChat, userMessage]);

//     if (specificChatId !== null) {
//       localStorage.removeItem(`chat_${specificChatId}`);
//     }

//     setTextInput("");
//     setChat((prevChat) => [
//       ...prevChat,
//       { id: null, role: "agent", message: "loading" },
//     ]);

//     try {
//       const response = await agentChat({
//         agent_id: agentId,
//         text_input: textInput.trim(),
//         chat_session_id: specificChatId,
//       }).unwrap();
//       focusInputById();
//       setSpecificChatId(response.chat_session_id);
//       localStorage.setItem(
//         "specificChatId",
//         response.chat_session_id.toString()
//       );

//       setChat((prevChat) => {
//         const updatedChat = [...prevChat];
//         updatedChat[updatedChat.length - 1] = {
//           id: specificChatId || null,
//           role: "agent",
//           message: response.response,
//         };
//         return updatedChat;
//       });
//     } catch (error: any) {
//       setChat((prevChat) => prevChat.slice(0, -1));
//       toast.error("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }
// };
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage(e);
//     }
//   };

//   const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
//     const textarea = e.currentTarget;
//     textarea.style.height = "auto";
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 76.8)}px`;
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col justify-between items-center pb-[30px]">
//       {startNewChat ? (
//         <div className="grow flex flex-col justify-center items-center text-center  min-h-[67vh] max-h-[67vh]">
//           <Image src={AiStar} alt="" className="w-[60px]" />
//           <p className="text-black md:text-[40px] sm:text-4xl text-3xl font-bold mt-7">
//             Your Sources.
//           </p>
//           <p className="text-black md:text-[40px] sm:text-4xl text-3xl font-bold mt-2">
//             Your Ai.
//           </p>
//           <p className=" mx-auto mt-11 text-[#767676] text-[25px]">
//             This AI is connected to your unique data sources and interact{" "}
//             <br className="sm:block hidden" />
//             with you according to your instructions and context.
//           </p>
//         </div>
//       ) : (
//         <ChatBox chat={chat} loading={loading} />
//       )}
//       <form
//         onSubmit={handleSendMessage}
//         className="w-full flex gap-4 items-center p-[6px] bg-[#FBFBFB] rounded-full"
//       >
//         <div className="flex justify-center items-center bg-[#F2F2F2] sm:w-16 w-7 sm:h-16 h-7 sm:min-w-16 min-w-7 sm:min-h-16 min-h-7 rounded-full cursor-not-allowed">
//           <GoPaperclip className="text-black sm:text-3xl text-lg mr-1" />
//         </div>

//         <textarea
//           ref={inputIdRef}
//           rows={1}
//           placeholder="type your prompt here"
//           className="sm:text-xl bg-transparent grow chatInput focus:outline-none recentChatScroller"
//           value={textInput}
//           onChange={handleTextInputChange}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//         />
//         <div className="sm:min-w-6 min-w-4">
//           <FaMicrophone
//             className="text-black sm:text-3xl text-lg cursor-pointer"
//             onClick={() => setIsVoice(true)}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={textInput.trim() === "" || loading}
//           className={`flex justify-center items-center bg-white sm:w-16 w-7 sm:h-16 h-7 sm:min-w-16 min-w-7 sm:min-h-16 min-h-7 rounded-full border border-black ${
//             textInput.trim() === "" || loading
//               ? "cursor-not-allowed"
//               : "cursor-pointer"
//           }`}
//         >
//           <HiArrowRight className="text-black sm:text-3xl text-lg" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatAgent;
