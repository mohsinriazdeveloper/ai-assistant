import BankOfCanadaImg from "@/app/assets/Images/bankOfCanada.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";
import { MdCheck } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "../Loader/Loader";
import {
  useApiConnectionMutation,
  useDisconnectApiConnectionMutation,
  useGetSourceApiConnectionsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";

interface FinanceProps {
  agentId: number;
  setIsRawData: Dispatch<SetStateAction<boolean>>;
  setGetRawDataId: Dispatch<SetStateAction<number>>;
}

const Finance: FC<FinanceProps> = ({
  agentId,
  setIsRawData,
  setGetRawDataId,
}) => {
  // const { data: agent, isLoading } = useGetAgentByIdQuery(agentId);
  const { data: apiConnectionData, isLoading: getDataLoading } =
    useGetSourceApiConnectionsQuery();

  const [disconnect, { isLoading: disconnectLoading }] =
    useDisconnectApiConnectionMutation();
  const [connect, { isLoading: connectLoading }] = useApiConnectionMutation();

  const handleDisconnect = async (id: number) => {
    try {
      const res = await disconnect(id);
      toast.success("Disconnected successfully");
    } catch (error) {
      toast.error("Failed to disconnect");
    }
  };
  const handleConnect = async (id: number, connection: boolean) => {
    if (connection) {
      return;
    }
    try {
      const res = await connect(id);
      toast.success("Connected successfully");
    } catch (error) {
      toast.error("Failed to connect");
    }
  };

  return (
    <div className="w-full pt-10">
      <p className="text-2xl font-black">Connetions</p>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
        {apiConnectionData?.map((bank, index) => (
          <div
            key={index}
            className="col-span-1 p-6 border-2 border-gray-200 rounded-lg"
          >
            <div
              className="w-20 h-auto border border-[#bfbfbf] rounded-lg bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${bank.image_url})` }}
            ></div>
            <Image src={BankOfCanadaImg} alt="" className="w-20 mb-5" />
            <p className="font-black text-lg mb-2">{bank.name}</p>
            <p className="text-sm font-light">{bank.description}</p>
            <div className="flex items-center gap-1 mt-8">
              <div
                onClick={() => handleConnect(bank.id, bank.is_connected)}
                className={`cursor-pointer w-full border border-black rounded-md py-1 text-lg hover:bg-black hover:text-white duration-300 transition-colors ${
                  bank.is_connected && "bg-black text-white"
                }`}
              >
                {connectLoading ? (
                  <Loader height="7" />
                ) : (
                  <>
                    {bank.is_connected ? (
                      <div className="grid grid-cols-12 items-center px-3">
                        <div className="col-span-3">
                          <div className="text-white text-sm p-1 w-fit rounded-full bg-[#08AD36]">
                            <MdCheck />
                          </div>
                        </div>
                        <p className="col-span-9">Connected</p>
                      </div>
                    ) : (
                      <p className="text-center">Connect</p>
                    )}
                  </>
                )}
              </div>
              {bank.is_connected && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setIsRawData(true);
                      setGetRawDataId(bank.agent_source_api_connection_id);
                    }}
                    className="py-[10px] px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max"
                  >
                    Raw data
                  </button>
                  <div className="w-5 h-5">
                    {disconnectLoading ? (
                      <Loader />
                    ) : (
                      <RiDeleteBin6Line
                        className="text-base cursor-pointer"
                        onClick={() => handleDisconnect(bank.id)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Finance;
