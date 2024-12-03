"use client";
import { FC } from "react";
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
  cantAddMore: boolean;
  totalCharCount: number;
  totalFileLength?: number;
  websiteContentLength?: number;
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
  cantAddMore,
  totalCharCount,
  totalFileLength,
  websiteContentLength,
}) => {
  const totalFiles = fileCount + (existingFiles?.length || 0);
  const fileCharacterCount = charCount + (totalFileLength || 0);
  const websiteCharCount = websiteContentLength || 0;

  return (
    <div className="border border-gray-200 rounded-lg py-5 px-4">
      <p className="text-lg font-medium text-center">Sources</p>
      <div>
        <p className="font-light text-sm">{totalFiles} Files</p>
        <p className="font-light text-sm">
          {fileCharacterCount} Files Characters
        </p>
        <p className="font-light text-sm">{textChar} Text Characters</p>
        <p className="font-light text-sm">{qaChar} QA Characters</p>
        <p className="font-light text-sm">{totalImages || 0} Images</p>
        <p className="font-light text-sm">
          {websiteCharCount} Website Characters
        </p>

        <p className="font-medium mt-4 text-sm">Total detected characters</p>
        <p className="text-sm text-center font-bold">
          {totalCharCount}
          <span className="text-gray-300 font-normal">/ 400000 limit</span>
        </p>
      </div>
      <div className="mt-2">
        <button
          className={`py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm w-full ${
            cantAddMore && "bg-[#3C3C3F] opacity-70 cursor-not-allowed"
          }`}
          onClick={agentCreateFunc}
          disabled={loading || cantAddMore}
        >
          {loading ? (
            <Loader />
          ) : currentPage === "/dashboard/create-new-agent" ? (
            "Create Agent"
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
