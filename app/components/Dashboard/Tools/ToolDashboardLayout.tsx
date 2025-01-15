import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Loader from "../../Loader/Loader";
import Loader2 from "../../Loader/Loader2";
import {
  useDisConnectGraphMutation,
  useGetAllGraphsQuery,
  useResetGraphMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import Graph from "./Graph";

interface ToolDashboardLayoutProps {
  agentId: number;
  setIsSetup: Dispatch<SetStateAction<string | boolean>>;
  setGetRawDataId: Dispatch<SetStateAction<number>>;
}

const ToolDashboardLayout: FC<ToolDashboardLayoutProps> = ({
  agentId,
  setIsSetup,
  setGetRawDataId,
}) => {
  const { data: getGraphs, isLoading } = useGetAllGraphsQuery();
  const [disconnectGraph, { isLoading: disconnectLoading }] =
    useDisConnectGraphMutation();
  const [resetGraph, { isLoading: resetLoading }] = useResetGraphMutation();
  const [showDataBy, setShowDataBy] = useState<string>("spot");
  const [showWeek, setShowWeek] = useState<boolean>(false);
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);

  const handleDisConnect = async (id: number) => {
    if (disconnectLoading) {
      setDropDown(false);
      return;
    }
    try {
      await disconnectGraph(id).unwrap();
      setDropDown(false);
      toast.success("Graph Disconnected Successfully");
    } catch (error) {
      setDropDown(false);
      toast.error("Failed to disconnect graph");
    }
  };

  const handleReset = async (id: number) => {
    if (resetLoading) {
      setDropDown(false);
      return;
    }
    try {
      await resetGraph(id).unwrap();
      setDropDown(false);
      toast.success("Graph Reset Successfully");
    } catch (error) {
      setDropDown(false);
      toast.error("Failed to reset graph");
    }
  };
  const handleRawData = (id: number) => {
    setIsSetup("rawData");
    setGetRawDataId(id);
  };
  return (
    <div>
      {isLoading && <Loader2 />}
      {getGraphs?.map((graph, index) => (
        <div key={index} className="w-full rounded-md shadow-md relative">
          <div className="flex justify-between items-center p-5 border-b">
            <p className="text-xl font-bold">{graph.name}</p>

            <div className="flex items-start">
              {showWeek ||
                (showMonth && (
                  <div className="flex items-start">
                    <div
                      onClick={() => setShowDataBy("spot")}
                      className={`hover:bg-[#F5F7FB] hover:text-[#017EFA] py-2 px-4 rounded duration-300 transition-colors cursor-pointer ${
                        showDataBy === "spot"
                          ? "bg-[#F5F7FB] text-[#017EFA]"
                          : "text-[#A9ABB0]"
                      }`}
                    >
                      <p>Spot</p>
                    </div>
                    {showWeek && (
                      <div
                        onClick={() => setShowDataBy("week")}
                        className={`hover:bg-[#F5F7FB] hover:text-[#017EFA] py-2 px-4 rounded duration-300 transition-colors cursor-pointer ${
                          showDataBy === "week"
                            ? "bg-[#F5F7FB] text-[#017EFA]"
                            : "text-[#A9ABB0]"
                        }`}
                      >
                        <p>Week</p>
                      </div>
                    )}
                    {showMonth && (
                      <div
                        onClick={() => setShowDataBy("month")}
                        className={`hover:bg-[#F5F7FB] hover:text-[#017EFA] py-2 px-4 rounded duration-300 transition-colors cursor-pointer ${
                          showDataBy === "Month"
                            ? "bg-[#F5F7FB] text-[#017EFA]"
                            : "text-[#A9ABB0]"
                        }`}
                      >
                        <p>Month</p>
                      </div>
                    )}
                  </div>
                ))}

              <div className="relative">
                <HiOutlineDotsHorizontal
                  onClick={() => setDropDown(!dropDown)}
                  className={`text-3xl cursor-pointer rotate-90 ml-5`}
                />
                {dropDown && (
                  <div className="absolute border rounded-md bg-white p-1 text-xs mt-1 z-50">
                    <div
                      onClick={() => handleDisConnect(graph.id)}
                      className="hover:bg-gray-200 cursor-pointer py-1 px-3"
                    >
                      {disconnectLoading ? <Loader /> : "Disconnect"}
                    </div>
                    <div
                      onClick={() =>
                        handleReset(graph.agent_graph_api_connection_id)
                      }
                      className="hover:bg-gray-200 cursor-pointer py-1 px-3"
                    >
                      {resetLoading ? <Loader /> : "Reset"}
                    </div>
                    <div
                      onClick={() =>
                        handleRawData(graph.agent_graph_api_connection_id)
                      }
                      className="hover:bg-gray-200 cursor-pointer py-1 px-3"
                    >
                      Raw Data
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <div className="px-5 grid grid-cols-12 "> */}
          <div className="px-5 ">
            <div className="col-span-9 py-5">
              <Graph
                graphId={graph.agent_graph_api_connection_id}
                showDataBy={showDataBy}
                setShowWeek={setShowWeek}
                setShowMonth={setShowMonth}
              />
            </div>
            {/* <div className="col-span-3">
          <GraphSideBar /> 
        </div> */}
          </div>
          {!graph.is_connected && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-[70vh]">
              <button
                onClick={() => {
                  setIsSetup("setup");
                }}
                className="py-2 px-6 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-full text-sm"
              >
                Setup
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToolDashboardLayout;
