"use client";

import { FC, useEffect, useRef, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import AgentOption from "./AgentOption";
import CreateNewAgent from "../CreateNewAgent/CreateNewAgent";
import Connect from "../../Connect/Connect";
import AgentSettings from "../../AgentSettings/AgentSettings";
import UpdateTraining from "../../UpdateTraining/UpdateTraining";
import { useAppDispatch, useAppSelector } from "../../ReduxToolKit/hook";
import { voiceResponce } from "../../ReduxToolKit/voiceResSlice";
import ChatAgent from "./ChatAgent";
import AgentChatSideBar from "./AgentChatSideBar";
import VoiceAgent from "./VoiceAgent";
import VoiceAssistant from "../../VoiceAssistant/VoiceAssistant";

type NavContent = {
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
  const [startNewChat, setStartNewChat] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const inputIdRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      voiceResponce({
        inText: "",
      })
    );
    if (checkOption !== "agent") {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    }
  }, [checkOption]);

  const focusInputById = () => {
    inputIdRef.current?.focus();
  };

  return (
    <div
      className={` ${
        checkOption === "chatagent" ? "max-h-screen fixed w-full" : "mb-10"
      }`}
    >
      {checkOption !== "chatagent" && (
        <div className="">
          <NavBar
            content={navBarContent}
            setCheckOption={setCheckOption}
            checkOption={checkOption}
            setIsMobile={setIsMobile}
          />
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
                setIsMobile={setIsMobile}
              />
            ) : (
              <>
                <NavBar
                  content={navBarContent}
                  setCheckOption={setCheckOption}
                  checkOption={checkOption}
                  setIsMobile={setIsMobile}
                />
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
      {checkOption === "sources" && <UpdateTraining agentId={agentId} />}
      {checkOption === "connect" && <Connect agentId={agentId} />}
      {checkOption === "settings" && <AgentSettings agentId={agentId} />}
    </div>
  );
};

export default Agent;
