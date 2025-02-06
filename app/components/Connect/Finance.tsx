import BankOfCanadaImg from "@/app/assets/Images/bankOfCanada.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";
// import { FaPlus } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCheckmarkOutline } from "react-icons/io5";
import Loader from "../Loader/Loader";
import Loader2 from "../Loader/Loader2";
import {
  useApiConnectionMutation,
  useDisconnectApiConnectionMutation,
  useGetSourceApiConnectionsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";
import "./style.css";
interface FinanceProps {
  agentId: number;
  setIsRawData: Dispatch<SetStateAction<boolean | string>>;
  setGetRawDataId: Dispatch<SetStateAction<number>>;
}

const Finance: FC<FinanceProps> = ({
  agentId,
  setIsRawData,
  setGetRawDataId,
}) => {
  // const { data: agent, isLoading } = useGetAgentByIdQuery(agentId);
  const { data: apiConnectionData, isLoading: getDataLoading } =
    useGetSourceApiConnectionsQuery(agentId);

  const [disconnect, { isLoading: disconnectLoading }] =
    useDisconnectApiConnectionMutation();
  const [connect, { isLoading: connectLoading }] = useApiConnectionMutation();

  const handleDisconnect = async (id: number) => {
    try {
      const res = await disconnect({ id, agentId });
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
      const res = await connect({ id, agentId });
      toast.success("Connected successfully");
    } catch (error) {
      toast.error("Failed to connect");
    }
  };

  return (
    <div className="w-full tab:pt-14 pt-5 px-9">
      <p className="tab:text-[40px] text-xl font-black">Connections (API)</p>
      {getDataLoading && <Loader2 />}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 tab:mt-20 mt-5">
        {apiConnectionData?.map((bank, index) => (
          <div
            key={index}
            className="col-span-1 p-6 border-2 border-gray-200 rounded-lg"
          >
            <div className="flex justify-between">
              <div>
                <div
                  className="w-24 h-auto border border-[#bfbfbf] rounded-lg bg-cover bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${bank.image_url})` }}
                ></div>
                <Image src={BankOfCanadaImg} alt="" className="w-24 mb-5" />
              </div>
              <div>
                {bank.is_connected && (
                  <button
                    onClick={() => {
                      setIsRawData(true);
                      setGetRawDataId(bank.agent_source_api_connection_id);
                    }}
                    className=" grow py-[10px] px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max"
                  >
                    Raw data
                  </button>
                )}
              </div>
            </div>
            <p className="font-black tab:text-xl mb-2">{bank.name}</p>
            <p className="text-[15px] font-light">{bank.description}</p>
            <div className="xl:flex lg:block lg:flex-none flex items-center gap-1 mt-8">
              <div
                onClick={() => handleConnect(bank.id, bank.is_connected)}
                className={`cursor-pointer `}
              >
                {connectLoading ? (
                  <Loader height="7" />
                ) : (
                  <>
                    {bank.is_connected ? (
                      <div className="grid grid-cols-12 items-center px-3 connectBtn">
                        <div className="col-span-3">
                          <IoCheckmarkOutline className="text-[#08AD36] text-xl" />
                        </div>
                        <p className="col-span-9 font-bold">Connected</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <AiOutlinePlus className="text-[#818181]" />
                        <p className="text-center">Connect</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              {bank.is_connected && (
                <div className="ml-auto">
                  {disconnectLoading ? (
                    <Loader />
                  ) : (
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleDisconnect(bank.id)}
                    >
                      <p className="text-center text-red-500">Disconnect</p>
                      <AiOutlinePlus className="text-[#818181] rotate-45 text-2xl" />
                    </div>
                  )}
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
