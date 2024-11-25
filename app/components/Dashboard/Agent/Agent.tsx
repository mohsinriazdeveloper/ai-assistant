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
  console.log({ IsVoice });
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
          />
        </div>
      )}
      {checkOption === "chatagent" && (
        <div className="grid grid-cols-12">
          <div className="col-span-3 bg-[#181818]">
            <AgentChatSideBar
              agentId={agentId}
              checkOption="chatagent"
              setSpecificChatId={setSpecificChatId}
              setStartNewChat={setStartNewChat}
              setIsVoice={setIsVoice}
            />
          </div>
          <div className={`col-span-9 px-6 ${IsVoice && "bg-black"}`}>
            {IsVoice ? (
              <VoiceAgent
                agentId={agentId}
                specificChatId={specificChatId}
                setIsVoice={setIsVoice}
              />
            ) : (
              // <VoiceAssistant
              //   agentId={agentId}
              //   specificChatId={specificChatId}
              // />
              <>
                <NavBar
                  content={navBarContent}
                  setCheckOption={setCheckOption}
                  checkOption={checkOption}
                />
                <ChatAgent
                  setIsVoice={setIsVoice}
                  specificChatId={specificChatId}
                  agentId={agentId}
                  startNewChat={startNewChat}
                  setStartNewChat={setStartNewChat}
                  setSpecificChatId={setSpecificChatId}
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
