import { useDeleteFileMutation } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FileUrl } from "@/app/components/ReduxToolKit/types/agents.d";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

interface ImageTagProps {
  imageId: number;
  imageName: string;
  imageUrl: string | undefined;
  index: number;
  imageFiles: File[];
  setImagesFile: Dispatch<SetStateAction<File[]>>;
  existingImgs: FileUrl[];
  setExistingImgs: Dispatch<SetStateAction<FileUrl[]>>;
  isNew: boolean;
}

const ImageTag: FC<ImageTagProps> = ({
  imageId,
  imageName,
  index,
  imageFiles,
  setImagesFile,
  existingImgs,
  setExistingImgs,
  isNew,
}) => {
  const [delExistingFile] = useDeleteFileMutation();
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const [isExistingImage, setIsExistingImage] = useState<boolean>(false);
  const [imgLoader, setImgLoader] = useState<{ [key: number]: boolean }>({});

  const handleResizeImage = (index: number, isExisting: boolean) => {
    setEnlargedIndex(index);
    setIsExistingImage(isExisting);
  };
  const handleCloseEnlarged = () => {
    setEnlargedIndex(null);
  };
  const handleDeleteNewImage = (index: number) => {
    setImagesFile((prevImages) => prevImages.filter((_, i) => i !== index));
    toast.success("Image successfully deleted");
  };
  const handleDeleteFile = useCallback(
    async (index: number, id: number) => {
      setImgLoader((prev) => ({ ...prev, [index]: true }));
      try {
        await delExistingFile(id).unwrap();
        setExistingImgs((prevFiles) => prevFiles.filter((_, i) => i !== index));
        toast.success("Image successfully deleted");
      } catch (error) {
        console.error("Failed to delete file: ", error);
        toast.error("Unable to delete File");
      } finally {
        setImgLoader((prev) => ({ ...prev, [index]: false }));
      }
    },
    [delExistingFile]
  );

  return (
    <div className="w-full border border-gray-200 py-4 px-6 rounded-lg text-sm mb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-10 pt-1">
          <p className="text-blue-500 mb-5 underline cursor-pointer">
            {imageName.length > 30 ? (
              <p
                className="cursor-pointer hover:text-blue-400"
                onClick={() => handleResizeImage(index, isNew)}
              >
                {imageName.slice(0, 30) + " ..."}
              </p>
            ) : (
              <p
                className="cursor-pointer hover:text-blue-400"
                onClick={() => handleResizeImage(index, isNew)}
              >
                {imageName}
              </p>
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
            onClick={() => handleDeleteNewImage(index)}
          />
        ) : (
          <RiDeleteBinLine
            className="mb-1 cursor-pointer"
            onClick={() => handleDeleteFile(index, imageId)}
          />
        )}
      </div>
      <div className="absolute w-full flex flex-col gap-10 mt-10">
        {enlargedIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="relative">
              <img
                src={
                  isNew
                    ? URL.createObjectURL(imageFiles[enlargedIndex])
                    : existingImgs[enlargedIndex].file_url
                }
                alt={`Enlarged ${enlargedIndex}`}
                className="max-w-full max-h-screen"
              />
              <div className="bg-gray-700 rounded-full w-5 h-5 flex justify-center items-center absolute top-2 right-2">
                <button
                  onClick={handleCloseEnlarged}
                  className="text-white text-xl mb-1"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageTag;
