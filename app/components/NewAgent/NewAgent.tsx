import AiStar from "@/app/assets/Images/aiStar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdLockOutline } from "react-icons/md";
import Loader from "../Loader/Loader";
import { useCreateAgentMutation } from "../ReduxToolKit/aiAssistantOtherApis";

interface NewAgentProps {}

const NewAgent: FC<NewAgentProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [creatingAgent] = useCreateAgentMutation();
  const [agentName, setagentName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
        // console.log({ res });
        inputRef.current?.blur();
        toast.success("Agent successfully created");
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
          toast.error(error.data);
        } else {
          const errorMessage = error.data.message;
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <div className="max-w-[426px] mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Image src={AiStar} alt="" />
        <p className="text-3xl font-bold">Enter Agent Name</p>
      </div>
      <div className="pl-2">
        <p className="text-[#8692A6] text-lg mb-7">
          For the purpose of industry regulation, your details are required.
        </p>
        <form onSubmit={handleRedirectNewAgent}>
          <p className="text-[#696F79] font-medium mb-3">
            Give your AI agent a Name
          </p>
          <div className="py-4 px-5 rounded-md border border-[#1565D8] bg-white  shadow-lg">
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
            } h-[50px] mt-10 w-full hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md`}
          >
            {loading ? <Loader /> : "Create my agent"}
          </button>
          <div className="text-[#8692A6] flex justify-center items-center gap-1 mt-4 text-xs">
            <MdLockOutline />
            <p>Your Info is safely secured</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAgent;
