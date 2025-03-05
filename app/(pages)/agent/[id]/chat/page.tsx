"use client";
import Background from "@/app/components/Background/Background";
import AgentChatSideBar from "@/app/components/Dashboard/Agent/AgentChatSideBar";
import ChatAgent from "@/app/components/Dashboard/Agent/ChatAgent";
import VoiceAgent from "@/app/components/Dashboard/Agent/VoiceAgent";
import NavBar2 from "@/app/components/NavBar/NavBar2";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/components/ReduxToolKit/hook";
import { voiceResponce } from "@/app/components/ReduxToolKit/voiceResSlice";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { getContent } from "../content";
interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { access } = useAppSelector(selectAuth);
  const [checkOption, setCheckOption] = useState<string>("chatagent");
  const [IsVoice, setIsVoice] = useState<boolean>(false);
  const [specificChatId, setSpecificChatId] = useState<number | null>(null);
  const [startNewChat, setStartNewChat] = useState<boolean>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const inputIdRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const content = getContent(id);
  // Redirect if no access
  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  // Reset voice response and handle speech synthesis
  useEffect(() => {
    dispatch(
      voiceResponce({
        inText: "",
      })
    );
    if (checkOption !== "agent" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }, [checkOption, dispatch]);

  // Retrieve saved chat ID from localStorage
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

  // Save chat ID to localStorage whenever it changes
  useEffect(() => {
    if (specificChatId !== null) {
      localStorage.setItem("myCustomChatId", specificChatId.toString());
    }
  }, [specificChatId]);

  // Handle case where chat ID is reset to 0
  useEffect(() => {
    const savedChatId = localStorage.getItem("myCustomChatId");
    if (savedChatId === "0") {
      setStartNewChat(true);
      setSpecificChatId(null);
    }
  }, []);

  if (!access) {
    return null;
  }

  const focusInputById = () => {
    inputIdRef.current?.focus();
  };

  return (
    <Background>
      <div className="flex w-full h-full">
        <div
          className={`${
            isMobile ? "hidden" : "block"
          } w-[22.7%] tab:relative absolute bg-[#101010] max-h-full z-50`}
        >
          <AgentChatSideBar
            agentId={id}
            checkOption="chatagent"
            setSpecificChatId={setSpecificChatId}
            setStartNewChat={setStartNewChat}
            setIsVoice={setIsVoice}
            setIsMobile={setIsMobile}
            focusInputById={focusInputById}
          />
        </div>
        <div
          className={`${
            isMobile ? "w-full" : "w-[77.3%]"
          } rounded-lg bg-[#101010] overflow-hidden h-full flex flex-col`}
        >
          <div className="flex items-center">
            {isMobile && (
              <LuChevronRight
                className={`text-3xl cursor-pointer ml-3 mb-4 text-white`}
                onClick={() => setIsMobile(false)}
              />
            )}
            {!IsVoice && <NavBar2 content={content.navBar} />}
          </div>
          {IsVoice ? (
            <VoiceAgent
              agentId={id}
              specificChatId={specificChatId}
              setIsVoice={setIsVoice}
            />
          ) : (
            <div className="bg-[#101010] h-full rounded-lg">
              <div className="px-10 bg-white h-full rounded-lg pb-[45px] pt-[60px]">
                <ChatAgent
                  setIsVoice={setIsVoice}
                  specificChatId={specificChatId}
                  agentId={id}
                  startNewChat={startNewChat}
                  setStartNewChat={setStartNewChat}
                  setSpecificChatId={setSpecificChatId}
                  inputIdRef={inputIdRef}
                  focusInputById={focusInputById}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
};

export default Page;

// return <Agent navBarContent={content.navBar} agentId={id} />;
