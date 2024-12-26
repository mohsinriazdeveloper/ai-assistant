import AiStars from "@/app/assets/Images/aiStar.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SetupAggregratorProps {
  agentId: Number;
  setAggregatorSetup: Dispatch<SetStateAction<string>>;
  setAggregatorOverlay: Dispatch<SetStateAction<boolean>>;
}

const SetupAggregrator: FC<SetupAggregratorProps> = ({
  agentId,
  setAggregatorSetup,
  setAggregatorOverlay,
}) => {
  const [sourceDropDown, setSourceDropDown] = useState<boolean>(false);
  const [dropDownValue, setDropDownValue] = useState<string>("");
  const handleDropDownValue = (value: string, close: boolean) => {
    setDropDownValue(value);
    setSourceDropDown(false);
  };
  const handleSetupAggregrator = () => {
    setAggregatorSetup("summary");
    setAggregatorOverlay(false);
  };

  return (
    <div>
      <div className=" w-[70%]">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setAggregatorSetup("summary")}
        >
          <IoIosArrowBack className="text-3xl" />
          <p className="font-bold">Back</p>
        </div>
        <div className="mt-7 border border-[#686868] py-5 px-4 space-y-4">
          <p>Summary Name</p>
          <input
            className="focus:outline-none w-[80%] rounded py-3 px-4 border border-[#c3c3c3]"
            type="text"
            placeholder="Enter summary name"
          />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
            <p>Display Source link(s)</p>
          </div>
          <div className="pt-3">
            <p>Auto AI-Generate</p>
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
        </div>
        <div className="mt-4 border border-[#686868] py-5 px-4 space-y-4">
          <p>Section Name</p>
          <input
            className="focus:outline-none rounded w-full py-3 px-4 border border-[#c3c3c3]"
            type="text"
            placeholder="Enter summary name"
          />
          <div className="flex justify-between">
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
                    onClick={() =>
                      handleDropDownValue("Connect API Source", false)
                    }
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
            <div className="flex items-center gap-2 pr-5">
              <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] "></div>
              <p>Display Source link(s)</p>
            </div>
          </div>
          <div>
            <p>Instructions</p>
            <textarea
              rows={2}
              className="focus:outline-none rounded w-full py-3 px-4 border border-[#c3c3c3] resize-none"
              placeholder="Ex: Find the 5 most important highlights / facts of this data source."
            />
          </div>
          <div>
            <div className="flex justify-between items-end">
              <p>Text</p>
              <div className="flex justify-center items-center gap-1 py-3 px-2 bg-[#E7F3FF] cursor-pointer rounded text-sm">
                <Image src={AiStars} alt="" className="w-6" />
                <p>AI Generate</p>
              </div>
            </div>
            <textarea
              rows={4}
              className="focus:outline-none rounded w-full py-3 px-4 border border-[#c3c3c3] resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end items-end gap-3 pt-10">
          <button
            onClick={handleSetupAggregrator}
            className="py-2 px-11 hover:bg-[#078fffc3] bg-[#0790FF] text-white font-medium rounded-full text-sm"
          >
            Generate
          </button>
          <p className="text-[#AE1616]">Reset</p>
        </div>
      </div>
    </div>
  );
};
export default SetupAggregrator;
