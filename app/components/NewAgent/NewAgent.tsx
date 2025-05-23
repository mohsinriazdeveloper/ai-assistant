import AiStar from "@/app/assets/Images/aiStar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdLockOutline } from "react-icons/md";
import Loader from "../Loader/Loader";
import { useCreateAgentMutation } from "../ReduxToolKit/aiAssistantOtherApis";
import { useAppDispatch } from "../ReduxToolKit/hook";

interface NewAgentProps {}

const NewAgent: FC<NewAgentProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [creatingAgent] = useCreateAgentMutation();
  const [agentName, setagentName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const route = useRouter();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  const handleRedirectNewAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!agentName) {
      setNameError("Please enter agent name");
      setLoading(false);
      return;
    }
    if (agentName.trim() === "") {
      setNameError("Agent name must not be epmty");
      setagentName("");
      setLoading(false);
      return;
    }
    if (agentName) {
      try {
        const res = await creatingAgent({ name: agentName }).unwrap();
        inputRef.current?.blur();
        toast.success("Agent successfully created");
        localStorage.setItem("myCustomChatId", "0");
        route.push(`/agent/${res.id}/sources`);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to create agent: ", error);
        if (error.status === 401) {
          toast.error("Access token expired, need to login again");
          route.push("/");
          return;
        } else if (error.status === "FETCH_ERROR") {
          toast.error(
            "The uploaded files/data exceed the allowed size limit. Please reduce the file size or upload fewer files."
          );
          return;
        } else if (error.status === 400) {
          toast.error(error.data.message);
        } else {
          const errorMessage = error.data.message;
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <div className="max-w-[426px] mx-auto">
      <div className="flex items-center gap-[10px]  md:mb-6 mb-2">
        <Image src={AiStar} alt="" className="md:w-[69px] w-[50px]" />
        <p className="md:text-3xl text-2xl font-extrabold">Enter Agent Name</p>
      </div>
      <div className="">
        <p className="text-[#53627a] sm:text-lg md:mb-6 mb-3">
          Start building your first AI agents with your own unique data sources.
        </p>
        <form onSubmit={handleRedirectNewAgent}>
          <p className="text-[#696F79] font-medium md:mb-3 mb-1">
            Give your AI agent a Name
          </p>
          <div className="flex items-center h-[64px] px-7 rounded-md border border-[#1565D8] bg-white shadow-lg">
            <input
              type="text"
              ref={inputRef}
              value={agentName}
              onChange={(e) => {
                setagentName(e.target.value), setNameError("");
              }}
              className="focus:outline-none w-full text-sm font-medium text-[#494949]"
              placeholder="Agent Name"
            />
          </div>
          {nameError && <p className="text-sm text-red-500">{nameError}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading && "cursor-not-allowed"
            } h-[64px] mt-[27px] w-full hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md`}
          >
            {loading ? <Loader /> : "Create my agent"}
          </button>
          <div className="text-[#8692A6] flex justify-center items-center gap-1 mt-7 text-xs">
            <MdLockOutline />
            <p>Your Info is safely secured</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAgent;
