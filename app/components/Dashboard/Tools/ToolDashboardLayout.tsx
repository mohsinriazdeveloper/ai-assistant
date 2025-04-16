import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Loader from "../../Loader/Loader";
import Loader2 from "../../Loader/Loader2";
import {
  useDisConnectGraphMutation,
  useGetAllGraphsQuery,
  useResetGraphMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { ApiConnection } from "../../ReduxToolKit/types/agents";
import BCPIGraph from "./BCPIGraph";
import CPIGraph from "./CPIGraph";
import Graph from "./Graph";
import InterestGraph from "./InterestGraph";

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
  const { data: getGraphs, isLoading } = useGetAllGraphsQuery(agentId);
  const [disconnectGraph, { isLoading: disconnectLoading }] =
    useDisConnectGraphMutation();
  const [resetGraph, { isLoading: resetLoading }] = useResetGraphMutation();
  const [showDataBy, setShowDataBy] = useState<string>("spot");
  const [showWeek, setShowWeek] = useState<boolean>(false);
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const [fxDropDown, setFxDropDown] = useState<boolean>(false);
  const [cpiDropDown, setCpiDropDown] = useState<boolean>(false);
  const [UsInterestGraph, setUsInterestGraph] = useState<boolean>(false);
  const [interestGraphDropDown, setInterestGraphDropDown] =
    useState<boolean>(false);
  const [BcpiGraph, setBcpiGraph] = useState<boolean>(false);
  const [BcpiGraphDropDown, setBcpiGraphDropDown] = useState<boolean>(false);
  const [fxGraph, setFxGraph] = useState<ApiConnection | null>(null);
  const [cpiGraph, setCPIGraph] = useState<ApiConnection | null>(null);

  useEffect(() => {
    if (getGraphs && getGraphs?.length > 0) {
      const fx = getGraphs[0];
      // setShowFXgraph(fx.is_connected);
      setFxGraph(fx);

      const cpi = getGraphs[1];
      // setShowCPIgraph(cpi.is_connected);
      setCPIGraph(cpi);
    }
  }, [getGraphs]);

  const handleDisConnect = async (id: number) => {
    if (disconnectLoading) {
      setFxDropDown(false);
      setCpiDropDown(false);
      return;
    }
    try {
      await disconnectGraph({ id, agentId }).unwrap();
      setFxDropDown(false);
      setCpiDropDown(false);
      toast.success("Graph Disconnected Successfully");
    } catch (error) {
      setFxDropDown(false);
      setCpiDropDown(false);
      toast.error("Failed to disconnect graph");
    }
  };

  const handleReset = async (id: number) => {
    if (resetLoading) {
      setFxDropDown(false);
      return;
    }
    try {
      await resetGraph({ id, agentId }).unwrap();
      setFxDropDown(false);
      toast.success("Graph Reset Successfully");
    } catch (error) {
      setFxDropDown(false);
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
      {/* <div className="flex justify-end gap-4 w-full">
        <button
          onClick={() => setUsInterestGraph(true)}
          className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
        >
          Show US interest rate
        </button>
        <button
          onClick={() => setBcpiGraph(true)}
          className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
        >
          Show BCPI
        </button>
      </div> */}

      {/* {BcpiGraph && ( */}
      <div className="w-full rounded-md shadow-md my-4 py-4 divide-y">
        <div className="flex justify-between items-center px-4 relative">
          <h2 className="text-xl font-bold mb-4">BCPI</h2>

          <HiOutlineDotsHorizontal
            onClick={() => setBcpiGraphDropDown(!BcpiGraphDropDown)}
            className={`text-3xl cursor-pointer rotate-90 ml-5`}
          />
          {BcpiGraphDropDown && (
            <div
              onClick={() => {
                setBcpiGraph(false);
                setBcpiGraphDropDown(false);
              }}
              className="absolute border rounded-md bg-white p-1 text-xs mt-1 z-50 right-0 top-10"
            >
              <div className="hover:bg-gray-200 cursor-pointer py-1 px-3">
                Disconnect
              </div>
            </div>
          )}
        </div>
        <div className="pt-4">
          <BCPIGraph />
        </div>
      </div>
      {/* )} */}

      {/* {UsInterestGraph && ( */}
      {/* Us Interest rate static graph */}
      <div className="w-full rounded-md shadow-md my-4 py-4 divide-y">
        <div className="flex justify-between items-center px-4 relative">
          <h2 className="text-xl font-bold mb-4">US Interest Rate Trend</h2>

          <HiOutlineDotsHorizontal
            onClick={() => setInterestGraphDropDown(!interestGraphDropDown)}
            className={`text-3xl cursor-pointer rotate-90 ml-5`}
          />
          {interestGraphDropDown && (
            <div
              onClick={() => {
                setUsInterestGraph(false);
                setInterestGraphDropDown(false);
              }}
              className="absolute border rounded-md bg-white p-1 text-xs mt-1 z-50 right-0 top-10"
            >
              <div className="hover:bg-gray-200 cursor-pointer py-1 px-3">
                Disconnect
              </div>
            </div>
          )}
        </div>
        <div className="pt-4">
          <InterestGraph />
        </div>
      </div>
      {/* )} */}
      {/* FX GRAPH */}
      {fxGraph && (
        <div className="w-full rounded-md shadow-md relative">
          <div className="flex justify-between items-center p-5 border-b">
            <p className="text-xl font-bold">{fxGraph.name}</p>

            <div className="flex items-start">
              {/* {showWeek ||
                (showMonth && ( */}
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
              {/* ))} */}

              <div className="relative">
                <HiOutlineDotsHorizontal
                  onClick={() => setFxDropDown(!fxDropDown)}
                  className={`text-3xl cursor-pointer rotate-90 ml-5`}
                />
                {fxDropDown && (
                  <div className="absolute border rounded-md bg-white p-1 text-xs mt-1 z-50 w-[95px]">
                    <div
                      onClick={() => handleDisConnect(fxGraph.id)}
                      className="hover:bg-gray-200 cursor-pointer py-1 px-3"
                    >
                      {disconnectLoading ? <Loader /> : "Disconnect"}
                    </div>
                    <div
                      onClick={() =>
                        handleReset(fxGraph.agent_graph_api_connection_id)
                      }
                      className="hover:bg-gray-200 cursor-pointer py-1 px-3"
                    >
                      {resetLoading ? <Loader /> : "Reset"}
                    </div>
                    <div
                      onClick={() =>
                        handleRawData(fxGraph.agent_graph_api_connection_id)
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
          <div className="md:px-5 ">
            <div className="col-span-9 py-5">
              {fxGraph.is_connected ? (
                <Graph
                  agentId={agentId}
                  graphId={fxGraph.agent_graph_api_connection_id}
                  showDataBy={showDataBy}
                  setShowWeek={setShowWeek}
                  setShowMonth={setShowMonth}
                />
              ) : (
                <div className="w-full h-[350px] bg-slate-400"></div>
              )}
            </div>
            {/* <div className="col-span-3">
          <GraphSideBar /> 
        </div> */}
          </div>
          {!fxGraph.is_connected && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-full">
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
      )}

      {/* CPI GRAPH */}
      {cpiGraph && (
        <div className="w-full rounded-md shadow-md relative my-4">
          <div className="flex justify-between items-center p-5 border-b">
            <p className="text-xl font-bold">{cpiGraph.name}</p>

            <p className="text-xl font-bold">{cpiGraph.is_connected}</p>
            <div className="flex items-start">
              <div className="relative">
                <HiOutlineDotsHorizontal
                  onClick={() => setCpiDropDown(!cpiDropDown)}
                  className={`text-3xl cursor-pointer rotate-90 ml-5`}
                />
                {cpiDropDown && (
                  <div className="absolute border rounded-md bg-white p-1 text-xs mt-1 z-50">
                    <div
                      onClick={() => handleDisConnect(cpiGraph.id)}
                      className="hover:bg-gray-200 cursor-pointer py-1 px-3"
                    >
                      {disconnectLoading ? <Loader /> : "Disconnect"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <div className="px-5 grid grid-cols-12 "> */}
          <div className="md:px-5 ">
            <div className="col-span-9 py-5">
              {cpiGraph.is_connected ? (
                <CPIGraph
                  agentId={agentId}
                  graphId={cpiGraph.agent_graph_api_connection_id}
                />
              ) : (
                <div className="w-full h-[350px] bg-slate-400"></div>
              )}
            </div>
            {/* <div className="col-span-3">
          <GraphSideBar /> 
        </div> */}
          </div>
          {!cpiGraph.is_connected && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-full">
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
      )}
    </div>
  );
};

export default ToolDashboardLayout;
