// import React, { useState, useEffect, FC, useRef } from "react";
// import { IoMdSend } from "react-icons/io";
// import Image from "next/image";
// import {
//   useAgentChatMutation,
//   useGetAgentChatQuery,
// } from "../ReduxToolKit/aiAssistantOtherApis";
// import RefreshIcon from "@/app/assets/icons/reload.png";
// import LoaderImg from "@/app/assets/icons/loading.png";
// import { AgentChatType } from "../ReduxToolKit/types/agents";
// import toast, { Toaster } from "react-hot-toast";
// import DeleteChatModal from "../Dialogues/DeleteChatModal";
// import "katex/dist/katex.min.css";
// import katex from "katex";
// import MathFormat from "./MathFormat";
// import MarkDown from "@/app/components/MarkDown/MarkDown";

// interface AgentChatProps {
//   agentId: number;
// }

// const AgentChat: FC<AgentChatProps> = ({ agentId }) => {
//   const id = Number(agentId);
//   const { data: wholeChat, isLoading, error } = useGetAgentChatQuery(id);
//   const [agentChat] = useAgentChatMutation();
//   const [textInput, setTextInput] = useState<string>("");
//   const [chat, setChat] = useState<AgentChatType[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const [openDialogue, setOpenDialogue] = useState<boolean>(false);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (textareaRef.current && isLoading === false) {
//       console.log("timeout");
//       textareaRef.current.focus();
//     }
//   }, [isLoading]);

//   useEffect(() => {
//     if (wholeChat) {
//       //@ts-ignore
//       setChat(wholeChat);
//     }
//   }, [wholeChat]);

//   // useEffect(() => {
//   //   // Add initial message when the component first loads
//   //   const initialMessage = "How can I help you?";
//   //   addMessageToChat({ role: "agent", message: initialMessage });
//   // }, []);

//   useEffect(() => {
//     // Scroll to bottom when chat updates
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [chat]);

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (textInput !== "" && !loading) {
//       // Prevent sending when loading is true
//       setLoading(true);
//       const agent_id = Number(agentId);
//       if (textInput.trim() === "") return;

//       const userMessage: AgentChatType = { role: "user", message: textInput };
//       setChat((prevChat) => [...prevChat, userMessage]);
//       setTextInput("");

//       try {
//         const response = await agentChat({
//           agent_id,
//           text_input: textInput,
//         }).unwrap();

//         const botMessage: AgentChatType = {
//           role: "agent",
//           message: response.response, // Set the entire message at once
//         };
//         setChat((prevChat) => [...prevChat, botMessage]);
//       } catch (error: any) {
//         if (error.status === 429) {
//           toast.error(error.data.error);
//           return;
//         }
//         toast.error("Failed to send message. Please try again.");
//         console.error("Failed to send message: ", error);
//       } finally {
//         setLoading(false); // Enable sending new messages after the response is received
//       }
//     }
//   };

//   const addMessageToChat = (message: AgentChatType) => {
//     setChat((prevChat) => [...prevChat, message]);
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <p>Error loading chat.</p>;
//   }
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault(); // Prevent newline
//       handleSendMessage(e); // Call submit function
//     }
//   };
//   const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
//     const textarea = e.currentTarget;

//     // Reset the height so that it can shrink on content removal
//     textarea.style.height = "auto";

//     // Set the height to the scrollHeight but not more than maxHeight (5 rows)
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 76.8)}px`; // 128px equals around 5 rows
//   };
//   return (
//     <div>
//       <div className="container mx-auto flex flex-col justify-between">
//         {/* <Toaster position="top-right" reverseOrder={false} /> */}
//         <div className="p-3 ">
//           <div className="flex justify-end">
//             <Image
//               src={RefreshIcon}
//               alt=""
//               className="w-6 cursor-pointer hover:rotate-180 transition-all duration-500"
//               onClick={() => setOpenDialogue(true)}
//             />
//           </div>
//           <div className="border-b border-gray-200 w-full my-3"></div>
//           <div
//             // className="overflow-y-scroll scrollbar-hide "
//             className="overflow-y-scroll scrollbar-hide "
//             ref={chatContainerRef}
//           >
//             <div className="flex flex-col gap-2 h-[370px]">
//               {chat.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={` w-fit py-4 px-[14px] rounded-lg whitespace-break-spaces ${
//                     msg.role === "agent"
//                       ? "bg-gray-200"
//                       : "bg-[#3B81F6] text-white self-end"
//                   }`}
//                 >
//                   <MarkDown content={msg.message} />
//                 </div>
//               ))}
//               {loading && (
//                 <div className="w-fit py-4 px-[14px] rounded-lg bg-gray-200">
//                   <div className="flex justify-center">
//                     <Image
//                       src={LoaderImg}
//                       alt=""
//                       className="animate-spin w-5 h-5"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <form onSubmit={handleSendMessage}>
//           <div className="flex items-end gap-2 border-t border-gray-200 p-3">
//             <textarea
//               ref={textareaRef}
//               rows={1}
//               placeholder="Message..."
//               className="w-full focus:outline-none text-gray-900 resize-none"
//               value={textInput}
//               onChange={(e) => setTextInput(e.target.value)}
//               disabled={loading} // Disable input when loading is true
//               onKeyDown={handleKeyDown}
//               onInput={handleTextareaInput}
//             />

//             <button
//               type="submit"
//               className={`bg-transparent ${
//                 textInput === "" || loading
//                   ? "cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               disabled={textInput === "" || loading} // Disable button when loading is true
//             >
//               <IoMdSend color="#71717A" width={90} />
//             </button>
//           </div>
//         </form>
//       </div>
//       <DeleteChatModal
//         agentId={agentId}
//         openDialogue={openDialogue}
//         handleClose={() => setOpenDialogue(false)}
//       />
//     </div>
//   );
// };

// export default AgentChat;
