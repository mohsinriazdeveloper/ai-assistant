import Loader from "@/app/components/Loader/Loader";
import { useDeleteFileMutation } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { format } from "date-fns";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
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
  const [sourceName, setSourceName] = useState<string>("");
  const [sourceContext, setSourceContext] = useState<string>("");
  const [sourceInstructions, setSourceInstructions] = useState<string>("");

  useEffect(() => {
    if (source_Name) {
      setSourceName(source_Name);
    }
    if (source_Context) {
      setSourceContext(source_Context);
    }
    if (source_Instructions) {
      setSourceInstructions(source_Instructions);
    }
  }, [source_Name, source_Context, source_Instructions]);

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
  console.log(updatedDate);

  const formatUpdatedDate = (updatedDate: string) => {
    return format(new Date(updatedDate), "MMM.dd, yyyy"); // "Aug.20, 2024"
  };

  return (
    <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          {fileName && (
            <p
              className="text-blue-500 underline cursor-pointer font-semibold"
              onClick={() => handleOpenFile(fileUrl)}
            >
              {fileName?.length > 30 ? (
                <>{fileName.slice(0, 30) + " ..."}</>
              ) : (
                <>{fileName}</>
              )}
            </p>
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
            {sourceName && (
              <div className="">
                <p className="text-sm">Name</p>
                <div className="py-2 px-2 border border-[#667085] rounded mt-1 text-gray-700 font-light">
                  <p>{sourceName}</p>
                </div>
              </div>
            )}
            {sourceContext && (
              <div className="">
                <p className="text-sm">Context / Clarifications</p>

                <div className="py-2 px-2 border border-[#667085] rounded mt-1 font-light">
                  <p>{sourceContext}</p>
                </div>
              </div>
            )}
            {sourceInstructions && (
              <div className="">
                <p className="text-sm">Instructions</p>

                <div className="py-2 px-2 border border-[#667085] rounded mt-1 font-light">
                  <p>{sourceInstructions}</p>
                </div>
              </div>
            )}
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
