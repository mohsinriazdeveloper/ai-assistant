"use client";
import React, { useState, FC } from "react";
import { IoMdSend } from "react-icons/io";
import RefreshIcon from "@/app/assets/icons/reload.png";
import Image from "next/image";
import {
  useAgentChatMutation,
  useGetAllAgentsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";
import LoaderImg from "@/app/assets/icons/loading.png";

interface AgentChatProps {
  agentId: number;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const AgentChat: FC<AgentChatProps> = ({ agentId }) => {
  const { data: allAgents } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  const [agentChat] = useAgentChatMutation();
  const [textInput, setTextInput] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([
    { sender: "bot", text: "Hi, How may I help You?" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const agent_id = Number(agentId);
    if (textInput.trim() === "") return;

    const userMessage: Message = { sender: "user", text: textInput };
    setChat((prevChat) => [...prevChat, userMessage]);
    setTextInput("");

    try {
      const response = await agentChat({
        agent_id,
        text_input: textInput,
      }).unwrap();
      const botMessage: Message = { sender: "bot", text: response.response };
      setChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error("Failed to send message: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto h-[500px] flex flex-col justify-between ">
      <div className="p-3">
        <div className="flex justify-end">
          <Image
            src={RefreshIcon}
            alt=""
            className="w-6 cursor-pointer hover:rotate-180 transition-all duration-500"
          />
        </div>
        <div className="border-b border-gray-200 w-full my-3"></div>
        <div className=" overflow-y-scroll  scrollbar-hide">
          <div className="flex flex-col gap-2 h-[370px]">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`w-fit py-4 px-[14px] rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-200"
                    : "bg-[#3B81F6] text-white self-end"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="w-fit py-4 px-[14px] rounded-lg bg-gray-200">
                <div className="flex justify-center">
                  <Image
                    src={LoaderImg}
                    alt=""
                    className="animate-spin w-5 h-5"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="flex items-center gap-2 border-t border-gray-200 p-3">
          <input
            type="text"
            placeholder="Message..."
            className="w-full focus:outline-none text-gray-900"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <div className="cursor-pointer">
            <button type="submit" className="bg-transparent">
              <IoMdSend color="#71717A" width={90} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgentChat;
