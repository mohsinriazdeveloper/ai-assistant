"use client";
import { FC, useState } from "react";
import Background from "../../Background/Background";
import NavBar from "../../NavBar/NavBar";
import NewAgent from "../../NewAgent/NewAgent";
import { selectCreateAgent } from "../../ReduxToolKit/createAgentSlice";
import { useAppSelector } from "../../ReduxToolKit/hook";
import Agents from "./Agents";

type NavContent = {
  title: string;
  url: string;
};
interface NewChatProps {
  navBarContent: NavContent[];
}

const NewChat: FC<NewChatProps> = ({ navBarContent }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { createAgentStatus } = useAppSelector(selectCreateAgent);
  console.log({ createAgentStatus });
  return (
    <Background>
      <div className="pt-8">
        <NavBar
          content={navBarContent}
          // setCreateAgent={setCreateAgent}
          // createAgent={createAgent}
        />
        {createAgentStatus ? (
          <div className="flex items-center h-[70vh] pt-12">
            <NewAgent />
          </div>
        ) : (
          <Agents />
        )}
      </div>
    </Background>
  );
};
export default NewChat;
