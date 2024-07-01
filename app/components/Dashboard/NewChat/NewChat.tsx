"use client";
import { FC, useState } from "react";
import Agents from "./Agents";
import Settings from "./Settings/Settings";
import NavBar from "../../NavBar/NavBar";

type NavContent = {
  title: string;
  url: string;
};
interface NewChatProps {
  navBarContent: NavContent[];
}

const NewChat: FC<NewChatProps> = ({ navBarContent }) => {
  const [checkOption, setCheckOption] = useState<string>("aiAgent");
  return (
    <div>
      <NavBar
        content={navBarContent}
        setCheckOption={setCheckOption}
        checkOption={checkOption}
      />
      {checkOption === "aiAgent" && <Agents />}
      {checkOption === "newChatSettings" && <Settings />}
    </div>
  );
};
export default NewChat;
