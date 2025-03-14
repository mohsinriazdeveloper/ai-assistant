import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import Loader from "../../Loader/Loader";
import {
  useConnectGraphMutation,
  useGetAllGraphsQuery,
} from "../../ReduxToolKit/aiAssistantOtherApis";

type GraphData = {
  id: number | null;
  name: string;
  auto_call: string;
};
interface SetupApiProps {
  agentId: number;
  setIsSetup: Dispatch<SetStateAction<string | boolean>>;
}

const SetupApi: FC<SetupApiProps> = ({ agentId, setIsSetup }) => {
  const { data: getGraphs, isLoading } = useGetAllGraphsQuery(agentId);
  const [connectGraph, { isLoading: connectionLoading }] =
    useConnectGraphMutation();
  const [sourceDropDown, setSourceDropDown] = useState<boolean>(false);
  const [dropDownValue, setDropDownValue] = useState<string>("");
  const [graphData, setGraphData] = useState<GraphData | null>({
    id: null,
    name: "",
    auto_call: "manually",
  });

  const [nameError, setNameError] = useState<string>("");
  const [autoCallError, setAutoCallError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const handleDropDownValue = (value: string, id: number, close: boolean) => {
    setDropDownValue(value);
    setSourceDropDown(false);
    setGraphData((prev) => {
      if (prev) {
        return { ...prev, id };
      }
      return { id, name: "", auto_call: "" };
    });
  };

  const handleSetupGraph = async () => {
    if (!graphData?.name) {
      setNameError("Graph name should not be empty");
      return;
    }
    if (!graphData?.name) {
      setNameError("Graph name should not be empty");
      return;
    }
    if (!graphData?.auto_call) {
      setAutoCallError("Please select an auto call for graph");
      return;
    }
    if (!graphData?.id) {
      setApiError("Please select an API");
      return;
    }

    const data = {
      name: graphData.name,
      auto_call: graphData.auto_call,
    };

    try {
      const res = await connectGraph({ id: graphData.id, agentId, data });
      toast.success("Api successfully connected");
      setIsSetup("graph");
    } catch (error) {
      toast.error("Unable to connect to Graph try again later");
    }
  };
  return (
    <div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsSetup("graph")}
      >
        <IoIosArrowBack className="text-3xl" />
        <p className="font-bold">Back</p>
      </div>
      <div className="mt-7 w-full py-5 px-4 space-y-4 bg-[#FAFAFA]">
        <p>Graph Name</p>
        <div>
          <input
            className="focus:outline-none w-[551px] rounded py-3 px-4 bg-white border border-[#f3f3f3]"
            type="text"
            value={graphData?.name}
            onChange={(e) => {
              setGraphData((prev) => {
                const name = e.target.value;
                if (prev) {
                  return { ...prev, name };
                }
                return { id: 0, name, auto_call: "" };
              });
              setNameError("");
            }}
            placeholder="Enter graph name"
          />
          {nameError && <p className="text-xs text-red-600">{nameError}</p>}{" "}
        </div>
        <div className=" w-[442px] relative">
          <div
            onClick={() => setSourceDropDown(!sourceDropDown)}
            className=" bg-white border border-[#b8b8b8] rounded-full py-2 px-4 flex justify-between items-center font-medium cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <HiOutlineCircleStack />

              <p>
                {dropDownValue ? (
                  <span>{dropDownValue}</span>
                ) : (
                  <span className="text-gray-500">select</span>
                )}
              </p>
            </div>
            <MdKeyboardArrowDown className="text-xl" />
          </div>
          {apiError && <p className="text-xs text-red-600">{apiError}</p>}
          {sourceDropDown && (
            <div className="w-full absolute bg-white border border-[#b8b8b8] rounded-md p-1 mt-1 text-sm text-gray-700">
              {getGraphs
                ?.filter((item) => !item.is_connected) // Filter items where is_connected is false
                .map((item, index) => (
                  <p
                    key={index}
                    className="px-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() =>
                      handleDropDownValue(item.name, item.id, false)
                    }
                  >
                    {item.name}
                  </p>
                ))}
            </div>
          )}
        </div>
        <div className="pt-3 w-[733px]">
          <p>Auto Call</p>
          <div className=" bg-white mt-2 h-[64px] border border-[#f3f3f3] rounded py-3 px-4 w-full flex justify-between items-center gap-3 flex-wrap">
            {["manually", "daily", "weekly", "monthly", "quarterly"].map(
              (option) => (
                <div
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setGraphData((prev) => {
                      if (prev) {
                        return { ...prev, auto_call: option };
                      }
                      return { id: null, name: "", auto_call: option };
                    });
                    setAutoCallError("");
                  }}
                >
                  <div className="w-5 h-5 rounded-[7px] border-[1.5px] border-[#ADA7A7] flex justify-center items-center text-sm font-bold">
                    <p className="pb-1">
                      {graphData?.auto_call === option ? "x" : ""}
                    </p>
                  </div>
                  <p className="capitalize">{option}</p>
                </div>
              )
            )}
          </div>
          {autoCallError && (
            <p className="text-xs text-red-600">{autoCallError}</p>
          )}{" "}
        </div>
        <div className="flex justify-center items-end gap-3 pt-7">
          {/* <button className="py-1 px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max">
            Raw data
          </button> */}
          <button
            onClick={handleSetupGraph}
            disabled={connectionLoading}
            className={`w-[143px] h-[39px] flex justify-center items-center shadow-lg py-3 px-8 hover:bg-[#078fffc3] bg-[#0790FF] text-white font-bold rounded-[15px] duration-300 transition-colors ${
              connectionLoading && "cursor-wait"
            }`}
          >
            {connectionLoading ? <Loader /> : "Connect"}
          </button>
          {/* <p className="text-[#AE1616]">Reset</p> */}
        </div>
      </div>
    </div>
  );
};
export default SetupApi;
