import { FC } from "react";
import Loader from "../Loader/Loader";

interface RightBarProps {
  currentPage: string;
  agentCreateFunc: () => Promise<void>;
  charCount: number;
  fileCount: number;
  textChar: any;
  checkOption: string;
  qaChar: number;
  loading: boolean;
}

const RightBar: FC<RightBarProps> = ({
  currentPage,
  loading,
  qaChar,
  agentCreateFunc,
  charCount,
  fileCount,
  textChar,
  checkOption,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg py-5 px-4">
      <p className="text-lg font-medium text-center">Sources</p>
      <div>
        {checkOption === "file" && (
          <p className="font-light mb-4 text-sm">{fileCount} Files</p>
        )}
        <p className="font-medium text-sm">Total detected characters</p>
        <p className="text-sm text-center font-bold">
          {checkOption === "file" && <>{charCount}</>}
          {checkOption === "text" && <>{textChar}</>}
          {checkOption === "qa" && <>{qaChar}</>}
          <span className="text-gray-300 font-normal">/ 40000 limit</span>
        </p>
      </div>
      <div className="mt-2">
        <button
          className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm w-full"
          onClick={agentCreateFunc}
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
          {charCount > 40000 && (
            <p className="mt-2 text-xs text-red-500">
              Characters exceed the limit
            </p>
          )}
        </>
      )}
      {checkOption === "text" && (
        <>
          {textChar > 40000 && (
            <p className="mt-2 text-xs text-red-500">
              Characters exceed the limit
            </p>
          )}
        </>
      )}
      {/* {checkOption === "qa" && (
        <>
          {qaCount > 40000 && (
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
