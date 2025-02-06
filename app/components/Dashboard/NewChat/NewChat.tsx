"use client";
import { FC, useState } from "react";
import Background from "../../Background/Background";
import NavBar1 from "../../NavBar/NavBar1";
import NewAgent from "../../NewAgent/NewAgent";
import { selectCreateAgent } from "../../ReduxToolKit/createAgentSlice";
import { useAppSelector } from "../../ReduxToolKit/hook";
import Agents from "./Agents";

type NavContent = {
  id: number;
  title: string;
  url: string;
};
interface NewChatProps {
  navBarContent: NavContent[];
}

const NewChat: FC<NewChatProps> = ({ navBarContent }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { createAgentStatus } = useAppSelector(selectCreateAgent);

  console.log(createAgentStatus);
  return (
    <Background>
      <div className="py-[51px] px-5 bg-white rounded-lg h-full">
        <div className="w-full mb-20">
          <div className="w-[80%] fixed">
            <NavBar1 />
          </div>
        </div>
        {createAgentStatus ? (
          <div className="flex items-center h-[70vh] mt-12">
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
