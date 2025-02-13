import Loader from "@/app/components/Loader/Loader";
import {
  useDeleteFileMutation,
  useUpdateFileMutation,
} from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { format } from "date-fns";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine, RiEdit2Fill, RiEdit2Line } from "react-icons/ri";
interface ExistingFileTagProps {
  id: number;
  fileName?: string;
  fileUrl?: string | undefined;
  source_Name: string;
  source_Context: string;
  source_Instructions: string;
  website_auto_update?: string | null;
  website_url?: string | null;
  setWebChar: Dispatch<SetStateAction<number>>;
  setFileChar: Dispatch<SetStateAction<number>>;
  setImgChar: Dispatch<SetStateAction<number>>;
  setUploadFlag: Dispatch<SetStateAction<boolean>>;
  updatedDate: string;
}

const ExistingFileTag: FC<ExistingFileTagProps> = ({
  id,
  fileName,
  fileUrl,
  source_Name,
  source_Context,
  source_Instructions,
  website_auto_update,
  website_url,
  setWebChar,
  setFileChar,
  setImgChar,
  setUploadFlag,
  updatedDate,
}) => {
  const [delExistingFile, { isLoading: deleteLoading }] =
    useDeleteFileMutation();
  const [updateFile, { isLoading: updateFileLoading }] =
    useUpdateFileMutation();
  const [file_Name, setFile_Name] = useState<string>("");
  const [fileNameError, setFileNameError] = useState<string>("");
  const [sourceName, setSourceName] = useState<string>("");
  const [sourceNameError, setSourceNameError] = useState<string>("");
  const [sourceContext, setSourceContext] = useState<string>("");
  const [sourceInstructions, setSourceInstructions] = useState<string>("");

  const [toggleFileName, setToggleFileName] = useState<boolean>(false);

  useEffect(() => {
    if (fileName) {
      setFile_Name(fileName);
    }
    if (source_Name) {
      setSourceName(source_Name);
    }
    if (source_Context) {
      setSourceContext(source_Context);
    }
    if (source_Instructions) {
      setSourceInstructions(source_Instructions);
    }
  }, [source_Name, source_Context, source_Instructions, fileName]);

  const handleDeleteFile = async () => {
    try {
      const res = await delExistingFile(id);
      setUploadFlag(false);
      toast.success(`${fileName} file deleted successfully`);
      setWebChar(0);
      setFileChar(0);
      setImgChar(0);
    } catch (error) {
      toast.error(`Unable to delete ${fileName} file`);
    }
  };

  const handleOpenFile = (url: string | undefined) => {
    window.open(url, "_blank");
  };

  const formatUpdatedDate = (updatedDate: string) => {
    return format(new Date(updatedDate), "MMM.dd, yyyy"); // "Aug.20, 2024"
  };

  const handleFileToggle = () => {
    if (file_Name.trim() === "") {
      setFileNameError("File name cannot be empty");
      return;
    } else {
      setToggleFileName(false);
    }
  };

  const updateFileChange = async () => {
    if (file_Name.trim() === "") {
      setFileNameError("File name cannot be empty");
      return;
    }
    if (sourceName.trim() === "") {
      setSourceNameError("Source name cannot be empty");
      return;
    }
    const data = {
      file_name: file_Name,
      source_name: sourceName,
      source_context: sourceContext,
      source_instructions: sourceInstructions,
    };
    setToggleFileName(false);
    try {
      await updateFile({ id, data });
    } catch (error) {
      toast.error("Unable to update file details");
    }
  };

  return (
    <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          {toggleFileName ? (
            <div className="flex items-center gap-2 w-[40%]">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="File Name"
                  value={file_Name}
                  onChange={(e) => {
                    setFile_Name(e.target.value);
                    setFileNameError("");
                  }}
                  className="border-b focus:outline-none w-full"
                />
                {fileNameError && (
                  <p className="text-sm text-red-500">{fileNameError}</p>
                )}
              </div>
              <RiEdit2Fill
                onClick={handleFileToggle}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <>
              {file_Name && (
                <div className="flex items-center gap-2">
                  <p
                    className="text-blue-500 underline cursor-pointer font-semibold"
                    onClick={() => handleOpenFile(fileUrl)}
                  >
                    {file_Name?.length > 30 ? (
                      <>{file_Name.slice(0, 30) + " ..."}</>
                    ) : (
                      <>{file_Name}</>
                    )}
                  </p>
                  <RiEdit2Line
                    onClick={() => setToggleFileName(true)}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </>
          )}

          {website_url && (
            <Link
              target="_blank"
              href={website_url}
              className="text-blue-500 underline cursor-pointer"
            >
              {website_url?.length > 30 ? (
                <>{website_url.slice(0, 30) + " ..."}</>
              ) : (
                <>{website_url}</>
              )}
            </Link>
          )}
          <div className="space-y-4 mt-5 w-[343px]">
            <div className="">
              <p className="text-sm">Name*</p>
              <div>
                <input
                  type="text"
                  placeholder="source name"
                  value={sourceName}
                  onChange={(e) => {
                    setSourceName(e.target.value);
                    setSourceNameError("");
                  }}
                  className="py-2 px-2 border border-[#667085] rounded mt-1 text-gray-700 font-light focus:outline-none"
                />
                {sourceNameError && (
                  <p className="text-sm text-red-500">{sourceNameError}</p>
                )}
              </div>
              {/* <div className="py-2 px-2 border border-[#667085] rounded mt-1 text-gray-700 font-light">
                <p>{sourceName}</p>
              </div> */}
            </div>
            <div className="">
              <p className="text-sm">Context / Clarifications</p>

              <textarea
                placeholder="context"
                rows={2}
                value={sourceContext}
                onChange={(e) => setSourceContext(e.target.value)}
                className="py-2 px-2 border border-[#667085] rounded mt-1 text-gray-700 font-light resize-none focus:outline-none"
              />
              {/* <div className="py-2 px-2 border border-[#667085] rounded mt-1 font-light">
                <p>{sourceContext}</p>
              </div> */}
            </div>
            <div className="">
              <p className="text-sm">Instructions</p>
              <textarea
                placeholder="instruction"
                rows={2}
                value={sourceInstructions}
                onChange={(e) => setSourceInstructions(e.target.value)}
                className="py-2 px-2 border border-[#667085] rounded mt-1 text-gray-700 font-light resize-none focus:outline-none"
              />
              {/* <div className="py-2 px-2 border border-[#667085] rounded mt-1 font-light">
                <p>{sourceInstructions}</p>
              </div> */}
            </div>
            {website_auto_update && (
              <div>
                <p className="text-sm">Daily Auto-Updates</p>
                <div className="border border-[#c3c3c3] rounded py-3 px-4 w-full space-y-2">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] flex justify-center items-center text-sm font-bold">
                      <p className="pb-1">x</p>
                    </div>
                    <p className="capitalize">{website_auto_update}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <button className="border border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468] rounded-lg px-3 py-1">
            Success
          </button>
          {updatedDate && (
            <p className="mt-2 text-[10px] font-bold">
              {formatUpdatedDate(updatedDate)}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end gap-3 mt-8">
        <button
          disabled={updateFileLoading}
          onClick={updateFileChange}
          className="hover:bg-[#078fffc7] bg-[#0790FF] text-white font-medium rounded-full text-[15px] h-[38px] w-[120px] flex justify-center items-center"
        >
          {updateFileLoading ? <Loader /> : "Save"}
        </button>
        {deleteLoading ? (
          <Loader />
        ) : (
          <RiDeleteBinLine
            className="mb-1 cursor-pointer"
            onClick={handleDeleteFile}
          />
        )}
      </div>
    </div>
  );
};

export default ExistingFileTag;
