import { Dispatch, FC, SetStateAction, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SetupApiProps {
  agentId: Number;
  setIsSetup: Dispatch<SetStateAction<string>>;
  setIsOverlayVisible: Dispatch<SetStateAction<boolean>>;
}

const SetupApi: FC<SetupApiProps> = ({
  setIsSetup,
  setIsOverlayVisible,
  agentId,
}) => {
  const [sourceDropDown, setSourceDropDown] = useState<boolean>(false);
  const [dropDownValue, setDropDownValue] = useState<string>("");
  const handleDropDownValue = (value: string, close: boolean) => {
    setDropDownValue(value);
    setSourceDropDown(false);
  };
  const handleSetupApi = () => {
    setIsSetup("graph");
    setIsOverlayVisible(false);
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
      <div className="mt-7 border border-[#686868] w-[70%] py-5 px-4 space-y-4">
        <p>Graph Name</p>
        <input
          className="focus:outline-none w-[80%] rounded py-3 px-4 border border-[#c3c3c3]"
          type="text"
          placeholder="Enter graph name"
        />
        <div className=" w-[60%] relative">
          <div
            onClick={() => setSourceDropDown(!sourceDropDown)}
            className="border border-[#c3c3c3] rounded-full py-3 px-4 flex justify-between items-center font-medium cursor-pointer"
          >
            <p>
              {dropDownValue ? (
                <span>{dropDownValue}</span>
              ) : (
                <span className="text-gray-500">select</span>
              )}
            </p>
            <MdKeyboardArrowDown className="text-xl" />
          </div>
          {sourceDropDown && (
            <div className="w-full absolute bg-white rounded-md border border-[#c3c3c3] p-1 mt-1 text-sm text-gray-300">
              <p
                className="px-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropDownValue("Connect API Source", false)}
              >
                Connect API Source
              </p>
              <p
                className="px-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropDownValue("option 2", false)}
              >
                option 2
              </p>
              <p
                className="px-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropDownValue("option 3", false)}
              >
                option 3
              </p>
              <p
                className="px-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropDownValue("option 4", false)}
              >
                option 4
              </p>
            </div>
          )}
        </div>
        <div className="pt-3">
          <p>Auto Call</p>
          <div className="border border-[#c3c3c3] rounded py-3 px-4 w-full flex justify-between items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
              <p>Manually (default)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
              <p>Daily</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
              <p>Weekly</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
              <p>Monthly</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
              <p>Quarterly</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end gap-3 pt-7">
          <button className="py-1 px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max">
            Raw data
          </button>
          <button
            onClick={handleSetupApi}
            className="py-3 px-8 hover:bg-[#078fffc3] bg-[#0790FF] text-white font-medium rounded-lg text-sm"
          >
            Connect
          </button>
          <p className="text-[#AE1616]">Reset</p>
        </div>
      </div>
    </div>
  );
};
export default SetupApi;
