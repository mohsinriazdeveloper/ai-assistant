import { useDeleteFileMutation } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FileUrl } from "@/app/components/ReduxToolKit/types/agents.d";
import mammoth from "mammoth";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import pdfToText from "react-pdftotext";

interface FileTagProps {
  fileName: string;
  fileUrl: string | undefined;
  existingFiles: FileUrl[];
  setExistingFiles: Dispatch<SetStateAction<FileUrl[]>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setfileCharCount: Dispatch<SetStateAction<number>>;
  setFileCount: Dispatch<SetStateAction<number>>;
  isNew: boolean;
  index: number;
}

const FileTag: FC<FileTagProps> = ({
  fileName,
  fileUrl,
  existingFiles,
  setExistingFiles,
  files,
  setFiles,
  setfileCharCount,
  setFileCount,
  isNew,
  index,
}) => {
  const [delExistingFile] = useDeleteFileMutation();

  const handleDeleteFile = useCallback(
    (index: number, isExisting: boolean = false) => {
      if (isExisting) {
        const fileToRemove = existingFiles[index];
        delExistingFile(fileToRemove.id)
          .then(() => {
            setExistingFiles((prevFiles) =>
              prevFiles.filter((_, i) => i !== index)
            );
            toast.success("File successfully deleted.");
          })
          .catch((error) => {
            console.error("Failed to delete file ", error);
            toast.error("Failed to delete file");
          });
      } else {
        const fileToRemove = files[index];
        const updateStateAfterDeletion = (filecharCountToRemove: number) => {
          setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
          setfileCharCount(
            (prevfileCharCount) => prevfileCharCount - filecharCountToRemove
          );
          setFileCount((prevCount) => prevCount - 1);
          toast.success("File successfully deleted.");
        };

        if (fileToRemove.type === "application/pdf") {
          pdfToText(fileToRemove)
            .then((text) => {
              updateStateAfterDeletion(text.length);
            })
            .catch((error) =>
              console.error("Failed to extract text from PDF", error)
            );
        } else if (fileToRemove.type === "text/plain") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            updateStateAfterDeletion(content.length);
          };
          reader.readAsText(fileToRemove);
        } else if (
          fileToRemove.type === "application/msword" ||
          fileToRemove.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            mammoth
              .extractRawText({ arrayBuffer })
              .then((result) => {
                updateStateAfterDeletion(result.value.length);
              })
              .catch((error) =>
                console.error(
                  "Failed to extract text from Word document",
                  error
                )
              );
          };
          reader.readAsArrayBuffer(fileToRemove);
        } else {
          updateStateAfterDeletion(0);
        }
      }
    },
    [existingFiles, files, delExistingFile]
  );

  const handleOpenFile = (url: string | undefined) => {
    window.open(url, "_blank");
  };
  return (
    <div className="w-full border border-gray-200 py-4 px-6 rounded-lg text-sm mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          <p
            className="text-blue-500 mb-5 underline cursor-pointer"
            onClick={() => handleOpenFile(fileUrl)}
          >
            {fileName.length > 30 ? (
              <>{fileName.slice(0, 30) + " ..."}</>
            ) : (
              <>{fileName}</>
            )}
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
        {isNew ? (
          <RiDeleteBinLine
            className="mb-1 cursor-pointer"
            onClick={() => handleDeleteFile(index)}
          />
        ) : (
          <RiDeleteBinLine
            className="mb-1 cursor-pointer"
            onClick={() => handleDeleteFile(index, true)}
          />
        )}
      </div>
    </div>
  );
};

export default FileTag;
