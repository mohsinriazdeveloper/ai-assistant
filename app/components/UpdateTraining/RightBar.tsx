"use client";
import { FC } from "react";
import Loader from "../Loader/Loader";

interface RightBarProps {
  fileChar: number;
  imgChar: number;
  agentCreateFunc: () => Promise<void>;
  websiteChar: number;
  textChar: number;
  qaChar: number;
  checkOption: string;
  filesLoader: boolean;
  imagesLoader: boolean;
  textQaLoader: boolean;
}

const RightBar: FC<RightBarProps> = ({
  fileChar,
  imgChar,
  agentCreateFunc,
  websiteChar,
  textChar,
  qaChar,
  filesLoader,
  imagesLoader,
  textQaLoader,
  checkOption,
}) => {
  const totalCharCount = fileChar + imgChar + websiteChar + textChar + qaChar;
  return (
    <div className="border border-gray-200 rounded-lg py-5 px-4 text-xs step-3">
      <p className="text-base font-medium text-center">Sources</p>
      <div>
        {/* <p className="font-light ">{totalFiles} Files</p> */}
        <p className="font-light ">{fileChar} Files Characters</p>
        <p className="font-light ">{textChar} Text Characters</p>
        <p className="font-light ">{qaChar} QA Characters</p>
        <p className="font-light ">{imgChar} Images</p>
        <p className="font-light ">{websiteChar} Website Characters</p>

        <p className="font-medium mt-4 ">Total detected characters</p>
        <p className=" text-center font-bold">
          {totalCharCount}
          <span className="text-gray-300 font-normal">/ 400000 limit</span>
        </p>
      </div>
      <div className="mt-2">
        <button
          id="step-2"
          className={`py-2 px-3 hover:bg-[#3C3C3F] text-white border border-transparent font-medium rounded-md w-full  ${
            filesLoader || imagesLoader || textQaLoader
              ? "bg-[#3C3C3F] cursor-wait"
              : "bg-[#18181b] cursor-pointer"
          }`}
          onClick={agentCreateFunc}
          disabled={totalCharCount > 400000}
        >
          {filesLoader || imagesLoader || textQaLoader ? (
            <Loader />
          ) : (
            "Retrain Agent"
          )}
        </button>
      </div>
      {totalCharCount >= 400000 && (
        <p className="mt-2 text-xs text-red-500">Characters exceed the limit</p>
      )}
    </div>
  );
};
export default RightBar;
