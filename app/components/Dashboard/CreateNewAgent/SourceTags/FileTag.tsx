import Loader from "@/app/components/Loader/Loader";
import { useDeleteFileMutation } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FileTags } from "@/app/components/UpdateTraining/trainingTypes";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

interface FileTagProps {
  fileName: string;
  fileUrl: string | undefined;
  fileError: string | null;
  isNew: boolean;
  index: number;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  fileWithTags: FileTags[];
  setFileWithTags: Dispatch<SetStateAction<FileTags[]>>;

  // existingFiles: FileUrl[];
  // setExistingFiles: Dispatch<SetStateAction<FileUrl[]>>;

  // setfileCharCount: Dispatch<SetStateAction<number>>;
  // setFileCount: Dispatch<SetStateAction<number>>;
}

const FileTag: FC<FileTagProps> = ({
  fileName,
  fileUrl,
  fileError,
  isNew,
  index,
  files,
  setFiles,
  setFileWithTags,
  fileWithTags,
}) => {
  const [delExistingFile] = useDeleteFileMutation();
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
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
      if (files?.[index]) {
        // Update existing file with the new source details
        updatedFiles[index] = {
          ...updatedFiles[index],
          file: files[index],
          source_name: sourceName,
          source_context: sourceContext,
          source_instructions: sourceInstructions,
        };
      }
      return updatedFiles;
    });
  }, [
    sourceName,
    sourceContext,
    sourceInstructions,
    files,
    index,
    setFileWithTags,
  ]);

  const handleDeleteFile = useCallback(
    (index: number, isExisting: boolean = false) => {
      setDeleteLoader(true);
      if (files) {
        const fileToRemove = files[index];

        setFiles((prevFiles) => {
          const newFiles = prevFiles.filter((_, i) => i !== index);

          if (newFiles.length < 1) {
            setFiles([]);
          }
          return newFiles;
        });
        setFileWithTags((prevTags) => prevTags.filter((_, i) => i !== index));
        setTimeout(() => {
          toast.success("File successfully deleted.");
          setDeleteLoader(false);
        }, 2000);
      }
      // }
    },
    // [existingFiles, files, delExistingFile]
    [files, delExistingFile]
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
              <p>Source Name *</p>
              <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                <input
                  type="text"
                  placeholder="Source Unique Label"
                  className="font-light focus:outline-none w-full"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <div className="w-full flex justify-between items-end">
                <p>Context/clarifications *</p>
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
                  value={sourceContext}
                  onChange={(e) => setSourceContext(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <div className="w-full flex justify-between items-end">
                <p>Instructions *</p>
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
                  value={sourceInstructions}
                  onChange={(e) => setSourceInstructions(e.target.value)}
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

        {deleteLoader ? (
          <Loader />
        ) : (
          <>
            {isNew ? (
              <RiDeleteBinLine
                className="mb-1 cursor-pointer"
                onClick={() => handleDeleteFile(index)}
              />
            ) : (
              <RiDeleteBinLine
                className="mb-1 cursor-pointer"
                // onClick={() => handleDeleteFile(index, true)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileTag;
