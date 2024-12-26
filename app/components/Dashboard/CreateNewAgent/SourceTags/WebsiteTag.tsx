import { FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

interface WebsiteTagProps {}

const WebsiteTag: FC<WebsiteTagProps> = ({}) => {
  return (
    <div className="w-full border border-gray-200 py-4 px-6 rounded-lg text-sm mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          <p className="text-blue-500 mb-5 underline cursor-pointer">
            {/* {fileName.length > 30 ? (
              <>{fileName.slice(0, 30) + " ..."}</>
            ) : (
              <>{fileName}</>
            )} */}
            website name
          </p>
          <div className="space-y-4">
            <div className="">
              <p>Source Name</p>
              <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                <input
                  type="text"
                  placeholder="Source Unique Label"
                  className="font-light focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="">
              <div className="w-full flex justify-between items-end">
                <p>Context/clarifications</p>
                <p className="text-xs max-w-[345px]">
                  Give more information and context to your AI about this data
                  source. This will help the AI to fetch this data appropriately
                </p>
              </div>

              <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                <textarea
                  rows={2}
                  placeholder="Enter Context"
                  className=" focus:outline-none font-light w-full resize-none"
                />
              </div>
            </div>
            <div className="">
              <div className="w-full flex justify-between items-end">
                <p>Instructions</p>
                <p className="text-xs max-w-[345px]">
                  Give instructions to your AI to help him understand how to use
                  your data source.
                </p>
              </div>

              <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                <textarea
                  rows={2}
                  placeholder="Enter Instructions"
                  className=" focus:outline-none font-light w-full resize-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <button className="border border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468] rounded-lg px-3 py-1">
            Success
          </button>
          <p className="text-end text-[10px] font-semibold">
            Jan 2024 - Aug 2024
          </p>
        </div>
      </div>
      <div className="flex justify-end items-end gap-3 mt-8">
        <button className="py-1 px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max">
          Raw data
        </button>
        <button className="py-2 w-[120px] border border-[#0790FF] bg-[#0790FF] text-white hover:bg-transparent hover:text-[#0790FF] font-medium text-sm rounded-full">
          Save
        </button>
        <RiDeleteBinLine className="mb-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default WebsiteTag;
