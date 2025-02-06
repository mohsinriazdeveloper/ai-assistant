import {
  FileInfo,
  FileTags,
  Validation,
} from "@/app/components/UpdateTraining/trainingTypes";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

interface FileTagProps {
  fileId: number;
  fileName: string;
  fileUrl: string | undefined;
  fileError: string | null;
  fileWithTags: FileTags[];
  setFileWithTags: Dispatch<SetStateAction<FileTags[]>>;
  fileInfo: FileInfo[];
  setFileInfo: Dispatch<SetStateAction<FileInfo[] | null>>;
  index: number;
  setFileChar: Dispatch<SetStateAction<number>>;
  setValidations: Dispatch<SetStateAction<Validation[]>>;
  validations: Validation[];
}

const FileTag: FC<FileTagProps> = ({
  fileId,
  fileName,
  fileUrl,
  fileError,
  setFileWithTags,
  fileWithTags,
  fileInfo,
  setFileInfo,
  index,
  setFileChar,
  setValidations,
  validations,
}) => {
  const [sourceName, setSourceName] = useState<string>(
    fileWithTags[index]?.source_name || ""
  );
  const [sourceContext, setSourceContext] = useState<string>(
    fileWithTags[index]?.source_context || ""
  );
  const [sourceInstructions, setSourceInstructions] = useState<string>(
    fileWithTags[index]?.source_instructions || ""
  );

  useEffect(() => {
    setFileWithTags((prev) => {
      const updatedFiles = [...prev];
      updatedFiles[index] = {
        ...updatedFiles[index],
        file_id: fileId,
        source_name: sourceName,
        source_context: sourceContext,
        source_instructions: sourceInstructions,
      };
      return updatedFiles;
    });
  }, [sourceName, sourceContext, sourceInstructions, fileId, setFileWithTags]);

  const handleDeleteFile = (id: number) => {
    const fileToDelete = fileInfo.find((item) => item.file_id === id);
    if (fileToDelete) {
      setFileChar(
        (prevCharCount) => prevCharCount - fileToDelete.characters_count
      );
      const updatedItems = fileInfo.filter((item) => item.file_id !== id);
      const updatedFileTags = fileWithTags.filter(
        (item) => item.file_id !== id
      );
      setFileInfo(updatedItems);
      setFileWithTags(updatedFileTags);
      toast.success("File deleted successfully");
    } else {
      toast.error("File not found");
    }
  };
  const updateValidation = (field: keyof Validation, isValid: boolean) => {
    setValidations((prev) => {
      const updatedValidations = [...prev];
      if (updatedValidations[index]) {
        updatedValidations[index][field] = !isValid;
      }
      return updatedValidations;
    });
  };

  const handleSourceNameChange = (value: string) => {
    setSourceName(value);
    updateValidation(
      "sourceName",
      value.trim().length > 0 && value.length <= 100
    );
  };

  const handleSourceContextChange = (value: string) => {
    setSourceContext(value);
    updateValidation("sourceContext", value.trim().length > 0);
  };

  const handleSourceInstructionsChange = (value: string) => {
    setSourceInstructions(value);
    updateValidation("sourceInstructions", value.trim().length > 0);
  };
  const handleOpenFile = (url: string | undefined) => {
    window.open(url, "_blank");
  };
  return (
    <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          <p
            className="text-blue-500 mb-5 underline cursor-pointer font-semibold"
            onClick={() => handleOpenFile(fileUrl)}
          >
            {fileName.length > 30 ? (
              <>{fileName.slice(0, 30) + " ..."}</>
            ) : (
              <>{fileName}</>
            )}
          </p>
          <div className="space-y-4 w-[45%]">
            <div className="">
              <p className="text-sm">Name*</p>
              <div
                className={`py-2 px-2 border border-[#667085] rounded-lg mt-1 ${
                  validations[index]?.sourceName && "border-red-600"
                }`}
              >
                <input
                  type="text"
                  placeholder="Source Unique Label"
                  className="font-light focus:outline-none w-full"
                  value={sourceName}
                  onChange={(e) => handleSourceNameChange(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              {/* <div className="w-full grid grid-cols-12 gap-2 justify-between items-end"> */}
              <p className="col-span-5 text-sm">Context / Clarifications</p>
              {/* <p className="text-xs col-span-7">
                  Give more information and context to your AI about this data
                  source. This will help the AI to fetch this data appropriately
                </p>
              </div> */}

              <div
                className={`py-2 px-2 border border-[#667085] rounded-lg mt-1 ${
                  validations[index]?.sourceContext && "border-red-600"
                }`}
              >
                <textarea
                  rows={2}
                  placeholder="Enter Context"
                  className=" focus:outline-none font-light w-full resize-none"
                  value={sourceContext}
                  onChange={(e) => handleSourceContextChange(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              {/* <div className="w-full  grid grid-cols-12 gap-2 justify-between items-end"> */}
              <p className="col-span-5 text-sm">Instructions</p>
              {/* <p className="text-xs col-span-7">
                  Give instructions to your AI to help him understand how to use
                  your data source.
                </p>
              </div> */}

              <div
                className={`py-2 px-2 border border-[#667085] rounded-lg mt-1 ${
                  validations[index]?.sourceInstructions && "border-red-600"
                }`}
              >
                <textarea
                  rows={2}
                  placeholder="Enter Instructions"
                  className=" focus:outline-none font-light w-full resize-none"
                  value={sourceInstructions}
                  onChange={(e) =>
                    handleSourceInstructionsChange(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {fileError ? (
            <button className="border border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C] rounded-lg px-3 py-1">
              Failed
            </button>
          ) : (
            <button className="border border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468] rounded-lg px-3 py-1">
              Success
            </button>
          )}

          {/* <p className="text-end text-[10px] font-semibold">
            Jan 2024 - Aug 2024
          </p> */}
        </div>
      </div>
      <div className="flex justify-end items-end gap-3 mt-8">
        {/* <button className="py-1 px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max">
          Raw data
        </button>
        <button className="py-2 w-[120px] border border-[#0790FF] bg-[#0790FF] text-white hover:bg-transparent hover:text-[#0790FF] font-medium text-sm rounded-full">
          Save
        </button> */}

        <RiDeleteBinLine
          className="mb-1 cursor-pointer"
          onClick={() => handleDeleteFile(fileId)}
        />
      </div>
    </div>
  );
};

export default FileTag;
