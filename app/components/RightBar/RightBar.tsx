"use client";
import { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FileUrl } from "../ReduxToolKit/types/agents.d";

interface RightBarProps {
  currentPage: string;
  agentCreateFunc: () => Promise<void>;
  charCount: number;
  fileCount: number;
  existingFiles?: FileUrl[];
  textChar: any;
  checkOption: string;
  qaChar: number;
  loading: boolean;
  totalImages?: number;
}

const RightBar: FC<RightBarProps> = ({
  currentPage,
  loading,
  qaChar,
  agentCreateFunc,
  charCount,
  fileCount,
  existingFiles,
  textChar,
  checkOption,
  totalImages,
}) => {
  const [totalFileLength, setTotalFileLength] = useState<number>(0);
  useEffect(() => {
    if (existingFiles) {
      const totalLength = existingFiles.reduce(
        (sum, file) => sum + (file.text_content?.length || 0),
        0
      );
      setTotalFileLength(totalLength);
    }
  }, [existingFiles]);

  const totalChar = totalFileLength + charCount + textChar + qaChar;

  return (
    <div className="border border-gray-200 rounded-lg py-5 px-4">
      <p className="text-lg font-medium text-center">Sources</p>
      <div>
        {existingFiles ? (
          <p className="font-light text-sm">
            {fileCount + existingFiles.length} Files
          </p>
        ) : (
          <p className="font-light text-sm">{fileCount} Files</p>
        )}
        {totalFileLength ? (
          <p className="font-light text-sm">
            {charCount + totalFileLength} Files Characters
          </p>
        ) : (
          <p className="font-light text-sm">{charCount} Files Characters</p>
        )}
        <p className="font-light text-sm">{textChar} Text Characters</p>
        <p className="font-light text-sm">{qaChar} QA Characters</p>
        <p className="font-light text-sm">{totalImages} Images</p>
        <p className="font-medium mt-4 text-sm">Total detected characters</p>
        <p className="text-sm text-center font-bold">
          {totalChar}
          <span className="text-gray-300 font-normal">/ 100000 limit</span>
        </p>
      </div>
      <div className="mt-2">
        <button
          className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm w-full"
          onClick={agentCreateFunc}
          disabled={loading}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              {" "}
              {currentPage === "/dashboard/create-new-agent" ? (
                <>Create Agent</>
              ) : (
                <>Retrain Agent</>
              )}
            </>
          )}
        </button>
      </div>
      {checkOption === "file" && (
        <>
          {charCount > 100000 && (
            <p className="mt-2 text-xs text-red-500">
              Characters exceed the limit
            </p>
          )}
        </>
      )}
      {checkOption === "text" && (
        <>
          {textChar > 100000 && (
            <p className="mt-2 text-xs text-red-500">
              Characters exceed the limit
            </p>
          )}
        </>
      )}
      {/* {checkOption === "qa" && (
        <>
          {qaCount > 100000 && (
            <p className="mt-2 text-xs text-red-500">
              Characters exceed the limit
            </p>
          )}
        </>
      )} */}
    </div>
  );
};
export default RightBar;
