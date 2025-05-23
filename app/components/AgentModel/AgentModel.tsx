"use client";
import DownCarret from "@/app/assets/icons/DownCarret";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import RangeBar from "../RangeBar/RangeBar";
import {
  useGetAgentByIdQuery,
  useUpdateAgentMutation,
  useUpdateInstructionsMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { selectIsConnect } from "../ReduxToolKit/connectSlice";
import { useAppSelector } from "../ReduxToolKit/hook";
import Instructions from "./Instructions";

interface AgentModelProps {
  agentId: any;
}
export type InstPayload = {
  id: number;
  content: string;
};

const AgentModel: FC<AgentModelProps> = ({ agentId }) => {
  const { data: agent, isLoading } = useGetAgentByIdQuery(agentId);

  const [updateInstructions] = useUpdateInstructionsMutation();
  const [updating] = useUpdateAgentMutation();

  //@ts-ignore
  const [temp, setTemp] = useState<any>(agent?.temperature || 0);
  const [tempBoolean] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [agentModel, setAgentModel] = useState<any>(agent?.model || "");
  const [openModels, setOpenModels] = useState<boolean>(false);
  const [instructionContent, setInsturctionContent] = useState<string>("");
  const [instructionId, setInstructionId] = useState<number>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const { updateConnectStatus } = useAppSelector(selectIsConnect);

  const handleUpdate = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const instData = new FormData();
    const id = instructionId;
    instData.append("instructions", instructionContent);
    //@ts-ignore
    instData.append("is_active", isActive);
    const formData = new FormData();
    formData.append("id", agentId);
    formData.append("temperature", temp.toString());
    formData.append("model", agentModel);
    formData.append("boc_connected", String(updateConnectStatus));
    try {
      const inst = await updateInstructions({
        //@ts-ignore
        id,
        data: instData,
      }).unwrap();
      const res = await updating(formData).unwrap();
      setLoading(false);
      toast.success("Successfully Updated");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to Updated");
    }
  };

  const formattedDate = agent?.updated_at
    ? new Date(agent.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const formattedTime = agent?.updated_at
    ? new Date(agent.updated_at).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "N/A";
  return (
    <div className="mb-5">
      <div className="w-full border border-gray-200 rounded-lg py-7 px-6 flex flex-col gap-5">
        <div>
          <p className="text-2xl font-medium">Model</p>
          <p className="text-gray-300 font-medium text-sm">{agent?.model}</p>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="relative mb-10">
            <div
              onClick={() => setOpenModels(!openModels)}
              className="cursor-pointer border border-gray-200 rounded-md text-sm p-4 flex justify-between items-center"
            >
              <p>{agentModel}</p>
              <DownCarret />
            </div>
            {openModels && (
              <div className="absolute mt-2 w-full border border-gray-200 rounded-md text-sm text-gray-300 bg-white p-1 z-20">
                <p
                  className="py-2 px-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setOpenModels(!openModels);
                    setAgentModel("gpt-4");
                  }}
                >
                  gpt-4
                </p>
                <p
                  className="py-2 px-5 hover:bg-gray-200 cursor-not-allowed"
                  onClick={() => {
                    setOpenModels(!openModels);
                  }}
                >
                  gpt-3.5
                </p>
              </div>
            )}
          </div>

          <Instructions
            agentId={agentId}
            setInsturctionContent={setInsturctionContent}
            instructionContent={instructionContent}
            setInstructionId={setInstructionId}
            setIsActive={setIsActive}
            isActive={isActive}
          />

          <div>
            <p className="text-sm text-gray-300 font-medium mt-5">Temprature</p>

            <RangeBar
              setTemp={setTemp}
              temperature={temp}
              tempBoolean={tempBoolean}
            />
          </div>
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
            >
              {loading ? <Loader /> : <>Save</>}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full border border-gray-200 rounded-lg py-7 px-6 flex flex-col gap-5 mt-5">
        <p className="text-2xl font-medium">Training</p>
        <div className="font-semibold text-sm">
          <p className="text-gray-300">Last Trained at</p>
          <p className="text-gray-900">
            {formattedDate} at {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentModel;
