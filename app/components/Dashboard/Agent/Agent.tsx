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

type NavContent = {
  title: string;
  url: string;
};
interface AgentProps {
  navBarContent: NavContent[];
  agentId: number;
}

const Agent: FC<AgentProps> = ({ navBarContent, agentId }) => {
  const [checkOption, setCheckOption] = useState<string>("agent");
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

  return (
    <div className={`mb-10 ${checkOption === "chatagent" && "max-h-screen"}`}>
      <div className="">
        <NavBar
          content={navBarContent}
          setCheckOption={setCheckOption}
          checkOption={checkOption}
        />
      </div>
      {checkOption === "agent" && (
        <AgentOption agentId={agentId} checkOption="agent" />
      )}
      {checkOption === "chatagent" && (
        <AgentOption agentId={agentId} checkOption="chatagent" />
      )}
      {checkOption === "sources" && <UpdateTraining agentId={agentId} />}
      {checkOption === "connect" && <Connect />}
      {checkOption === "settings" && <AgentSettings agentId={agentId} />}
    </div>
  );
};

export default Agent;
