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
  const isImage = [".png", ".jpg", ".jpeg"].some((ext) =>
    fileName.toLowerCase().endsWith(ext)
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
    <div className="w-full bg-[#FAFAFA] py-4 px-6 rounded-lg mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          <div
            className={`${
              isImage && "flex items-center gap-2 p-2 bg-white w-fit"
            } mb-5`}
          >
            {isImage && (
              <div>
                <img src={fileUrl} alt="Dynamic Image" className="w-10" />
              </div>
            )}
            <p
              className="text-blue-500 underline cursor-pointer font-semibold"
              onClick={() => handleOpenFile(fileUrl)}
            >
              {fileName.length > 30 ? (
                <>{fileName.slice(0, 30) + " ..."}</>
              ) : (
                <>{fileName}</>
              )}
            </p>
          </div>
          <div className="space-y-4 w-[97%]">
            <div className="">
              <p className="text-sm">Name*</p>
              <div
                className={`py-2 px-2 bg-white rounded-lg mt-1 ${
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
              <p className="col-span-5 text-sm">Context / Clarifications</p>
              <div className={`py-2 px-2 bg-white rounded-lg mt-1`}>
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
              <p className="col-span-5 text-sm">Instructions</p>
              <div className={`py-2 px-2 h-[80px] bg-white rounded-lg mt-1`}>
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
            <button className="border border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C] rounded-lg w-[91px] h-[38px] flex justify-center items-center">
              Failed
            </button>
          ) : (
            <button className="border border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468] rounded-lg w-[91px] h-[38px] flex justify-center items-center">
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
