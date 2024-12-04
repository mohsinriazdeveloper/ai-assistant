"use client";
import { FC, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import Agents from "./Agents";
import Settings from "./Settings/Settings";

type NavContent = {
  title: string;
  url: string;
};
interface NewChatProps {
  navBarContent: NavContent[];
}

const NewChat: FC<NewChatProps> = ({ navBarContent }) => {
  const [checkOption, setCheckOption] = useState<string>("aiAgent");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  return (
    <div>
      <NavBar
        content={navBarContent}
        setCheckOption={setCheckOption}
        checkOption={checkOption}
        setIsMobile={setIsMobile}
      />
      {checkOption === "aiAgent" && <Agents />}
      {checkOption === "newChatSettings" && <Settings />}
    </div>
  );
};
export default NewChat;
