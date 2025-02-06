"use client";

import { FC, useEffect, useRef, useState } from "react";
import NavBar from "../../NavBar/NavBar2";
import { useAppDispatch } from "../../ReduxToolKit/hook";
import { voiceResponce } from "../../ReduxToolKit/voiceResSlice";
import AgentChatSideBar from "./AgentChatSideBar";
import ChatAgent from "./ChatAgent";
import VoiceAgent from "./VoiceAgent";

type NavContent = {
  id: number;
  title: string;
  url: string;
};
interface AgentProps {
  navBarContent: NavContent[];
  agentId: number;
}

const Agent: FC<AgentProps> = ({ navBarContent, agentId }) => {
  const [checkOption, setCheckOption] = useState<string>("chatagent");
  const [IsVoice, setIsVoice] = useState<boolean>(false);
  const [specificChatId, setSpecificChatId] = useState<number | null>(null);
  const [startNewChat, setStartNewChat] = useState<boolean>();
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const inputIdRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checkOption !== "agent") {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    }
    dispatch(
      voiceResponce({
        inText: "",
      })
    );
  }, [checkOption, dispatch]);

  const focusInputById = () => {
    inputIdRef.current?.focus();
  };

  useEffect(() => {
    const savedChatId = localStorage.getItem("myCustomChatId");
    if (savedChatId !== null) {
      setSpecificChatId(Number(savedChatId));
      setStartNewChat(false);
    } else {
      setSpecificChatId(null);
      setStartNewChat(true);
    }
  }, []);
  useEffect(() => {
    if (specificChatId !== null) {
      localStorage.setItem("myCustomChatId", specificChatId.toString());
    }
  }, [specificChatId]);
  useEffect(() => {
    const savedChatId = localStorage.getItem("myCustomChatId");
    if (savedChatId === "0") {
      setStartNewChat(true);
      setSpecificChatId(null);
    }
  }, []);
  return (
    <div
      className={` ${
        checkOption === "chatagent" ? "max-h-screen fixed w-full" : "mb-10"
      }`}
    >
      {checkOption !== "chatagent" && (
        <div className="">
          <NavBar content={navBarContent} />
        </div>
      )}
      {checkOption === "chatagent" && (
        <div className="md:grid grid-cols-12 relative">
          <div
            className={`lg:col-span-3 col-span-4 bg-[#181818] md:relative absolute z-50 ${
              isMobile ? "block" : "hidden"
            }`}
          >
            <AgentChatSideBar
              agentId={agentId}
              checkOption="chatagent"
              setSpecificChatId={setSpecificChatId}
              setStartNewChat={setStartNewChat}
              setIsVoice={setIsVoice}
              setIsMobile={setIsMobile}
              focusInputById={focusInputById}
            />
          </div>
          <div
            className={`lg:col-span-9 col-span-8 px-6 ${IsVoice && "bg-black"}`}
          >
            {IsVoice ? (
              <VoiceAgent
                agentId={agentId}
                specificChatId={specificChatId}
                setIsVoice={setIsVoice}
              />
            ) : (
              <>
                <NavBar content={navBarContent} />
                <ChatAgent
                  setIsVoice={setIsVoice}
                  specificChatId={specificChatId}
                  agentId={agentId}
                  startNewChat={startNewChat}
                  setStartNewChat={setStartNewChat}
                  setSpecificChatId={setSpecificChatId}
                  inputIdRef={inputIdRef}
                  focusInputById={focusInputById}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;
