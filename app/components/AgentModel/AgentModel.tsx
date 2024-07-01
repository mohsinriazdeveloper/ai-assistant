"use client";
import { FC, useState } from "react";
import {
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import RangeBar from "../RangeBar/RangeBar";
import Loader from "../Loader/Loader";

interface AgentModelProps {
  agentId: any;
}

const AgentModel: FC<AgentModelProps> = ({ agentId }) => {
  const { data: allAgents } = useGetAllAgentsQuery();
  const [updating] = useUpdateAgentMutation();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  //@ts-ignore
  const [temp, setTemp] = useState<any>(0 || agent?.temperature);
  const [tempBoolean] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("temp", temp);
  const handleUpdate = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", agentId);
    formData.append("temperature", temp);
    try {
      const res = await updating(formData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to update", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 mb-10">
      <div className="w-full border border-gray-200 rounded-lg py-7 px-6 flex flex-col gap-5">
        <div>
          <p className="text-2xl font-medium">Model</p>
          <p className="text-gray-300 font-medium text-sm">{agent?.model}</p>
        </div>
        <form onSubmit={handleUpdate}>
          <div>
            <p className="text-sm text-gray-300 font-medium">Temprature</p>

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
              {loading ? <Loader /> : <>save</>}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full border border-gray-200 rounded-lg py-7 px-6 flex flex-col gap-5">
        <p className="text-2xl font-medium">Training</p>
        <div className="font-semibold text-sm">
          <p className="text-gray-300">Last Trained at</p>
          <p className="text-gray-900">{agent?.updated_at}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentModel;
