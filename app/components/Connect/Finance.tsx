import Image from "next/image";
import { FC, useEffect, useState } from "react";
import BankOfCanadaImg from "@/app/assets/Images/bankOfCanada.png";
import {
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { MdCheck } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

interface FinanceProps {
  agentId: number;
}

const Finance: FC<FinanceProps> = ({ agentId }) => {
  const { data: allAgents } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  const [agentID] = useState<any>(agent?.id);
  const [updating] = useUpdateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>();

  useEffect(() => {
    if (agent) {
      setIsConnected(agent?.boc_connected);
    }
  }, [agent]);

  // const handleConnectBOC = async () => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("id", agentID);
  //   // @ts-ignore
  //   formData.append("boc_connected", !isConnected);
  //   try {
  //     const res = await updating(formData);
  //     if (!isConnected) {
  //       toast.success("Connected to bank of Canada FX");
  //     } else {
  //       toast.success("Successfully disconnected from bank of Canada FX");
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Failed to update");
  //     console.error("Failed to update", error);
  //   }
  // };
  // const handleConnectBOC = async () => {
  //   setLoading(true);
  //   const updatedConnectionStatus = !isConnected;
  //   setIsConnected(updatedConnectionStatus); // Optimistically update the state

  //   const formData = new FormData();
  //   formData.append("id", agentID);
  //   // @ts-ignore
  //   formData.append("boc_connected", updatedConnectionStatus);
  //   try {
  //     await updating(formData);

  //     if (updatedConnectionStatus) {
  //       toast.success("Connected to bank of Canada FX");
  //     } else {
  //       toast.success("Successfully disconnected from bank of Canada FX");
  //     }
  //   } catch (error) {
  //     // Revert optimistic update if API call fails
  //     setIsConnected(!updatedConnectionStatus);
  //     toast.error("Failed to update");
  //     console.error("Failed to update", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleConnectBOC = async () => {
    setLoading(true);
    const previousState = isConnected; // Save the current state
    const updatedConnectionStatus = !isConnected;

    // Temporarily update the UI state
    setIsConnected(updatedConnectionStatus);

    const formData = new FormData();
    formData.append("id", agentID);
    // @ts-ignore
    formData.append("boc_connected", updatedConnectionStatus);

    try {
      // Make the API call
      await updating(formData);

      // Success: Notify the user
      if (updatedConnectionStatus) {
        toast.success("Connected to Bank of Canada FX");
      } else {
        toast.success("Successfully disconnected from Bank of Canada FX");
      }
    } catch (error) {
      // Revert to the previous state if the API call fails
      setIsConnected(previousState);
      toast.error("Failed to update. Please try again.");
      console.error("Failed to update", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:col-span-10 col-span-12 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      <div className="col-span-1 p-6 border border-gray-200 rounded-lg">
        <Image src={BankOfCanadaImg} alt="" className="w-20 mb-5" />
        <p className="font-bold text-xl mb-2">Bank Of Canada (FX)</p>
        <p className="text-sm">
          {isConnected
            ? "You are connected to bank of Canada FX for real-time data on foreign exchange rates"
            : "Connect to bank of Canada FX to get real-time data on foreign exchange rates"}
        </p>
        <div className="flex items-center gap-3 mt-8">
          <div
            onClick={handleConnectBOC}
            className={`cursor-pointer w-full border border-black rounded-full py-1 text-lg hover:bg-black hover:text-white duration-300 transition-colors ${
              isConnected && "bg-black text-white"
            }`}
          >
            {loading ? (
              <Loader height="7" />
            ) : (
              <>
                {isConnected ? (
                  <div className="grid grid-cols-12 items-center px-3">
                    <div className="col-span-3">
                      <MdCheck className="text-[#418a46] text-2xl" />
                    </div>
                    <p className="col-span-9">Connected</p>
                  </div>
                ) : (
                  <p className="text-center">Connect</p>
                )}
              </>
            )}
          </div>
          {isConnected && (
            <BsThreeDotsVertical
              className="text-2xl cursor-pointer"
              onClick={handleConnectBOC}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Finance;
