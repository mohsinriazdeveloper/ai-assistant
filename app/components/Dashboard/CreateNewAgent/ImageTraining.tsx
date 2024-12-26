import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import {
  useDeleteFileMutation,
  useTrainByImageMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { AgentState } from "../../ReduxToolKit/types/agents";

interface ImageTrainingProps {
  setTotalImage: Dispatch<SetStateAction<number>>;
  agentId?: any;
  agent?: AgentState | undefined;
  setImagesFile: Dispatch<SetStateAction<File[]>>;
  imageFiles: File[];
}

const ImageTraining: FC<ImageTrainingProps> = ({
  setTotalImage,
  agentId,
  agent,
  setImagesFile,
  imageFiles,
}) => {
  const currentPage = usePathname();
  const [updateWithImg] = useTrainByImageMutation();
  const [delExistingFile] = useDeleteFileMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [imgLoader, setImgLoader] = useState<{ [key: number]: boolean }>({});
  const [existingImgs, setExistingImgs] = useState(
    agent?.file_urls?.filter((file) =>
      /\.(png|PNG|jpg|JPG|JPEG|jpeg)$/i.test(file.file_name)
    ) || []
  );
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const [isExistingImage, setIsExistingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTotalImage(imageFiles.length);
  }, [imageFiles, setTotalImage]);

  const processImage = (file: File) => {
    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

    if (!allowedExtensions.test(file.name)) {
      toast.error("Only .png, .jpg, .jpeg images are allowed");
      return;
    }
    if (file.size > 1048576) {
      toast.error("Image size should not exceed 1 MB");
      return;
    }

    if (imageFiles.some((img) => img.name === file.name)) {
      toast.error("Image Already Added");
    } else {
      setImagesFile((prevImages) => [...prevImages, file]);
    }
  };
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      processImage(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      processImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const submitImages = async () => {
    if (imageFiles.length === 0) {
      toast.error("First add Image");
      return;
    }

    const fd = new FormData();
    fd.append("id", agentId);

    imageFiles.forEach((imageFile) => {
      fd.append("images", imageFile);
    });

    try {
      setLoading(true);
      await updateWithImg(fd).unwrap();

      toast.success("Images uploaded successfully");
    } catch (error: any) {
      if (error.status === 400) {
        toast.error(error.data);
      } else {
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
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

  const handleDeleteNewImage = (index: number) => {
    setImagesFile((prevImages) => prevImages.filter((_, i) => i !== index));
    toast.success("Image successfully deleted");
  };

  const handleResizeImage = (index: number, isExisting: boolean) => {
    setEnlargedIndex(index);
    setIsExistingImage(isExisting);
  };

  const handleCloseEnlarged = () => {
    setEnlargedIndex(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl ">Train with image</p>
        <div
          onClick={triggerFileInput}
          className="w-8 h-8 bg-black rounded flex justify-center items-center text-white text-xs cursor-pointer"
        >
          <FaPlus />
        </div>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileInput}
        className="border border-gray-200 mt-3 p-6 rounded h-[165px] cursor-pointer flex flex-col items-center justify-center"
      >
        <div>
          <Image src={UploadIcon} alt="" className="max-w-4" />
        </div>
        <input
          ref={fileInputRef}
          id="addImage"
          type="file"
          className="hidden"
          accept=".png, .PNG, .jpg, .JPG, .JPEG, .jpeg"
          onChange={handleAddImage}
          onClick={(event) => event.stopPropagation()}
        />
        <label
          htmlFor="addImage"
          className="mt-4 text-xs text-gray-600 cursor-pointer"
        >
          Drag & drop image here, or click to select images
        </label>
        <p className="mt-2 text-[10px] text-gray-500">
          Supported Image Types: .png, .jpg, .jpeg
        </p>
      </div>

      {/* <div className=" mt-10 pb-5">
        {imageFiles.length > 0 && (
          <div className="flex justify-center items-center gap-2 mb-5">
            <div className="border-b w-[40%]"></div>
            <div>
              <p className="text-gray-300">Attached Images</p>
            </div>
            <div className="border-b w-[40%]"></div>
          </div>
        )}
        {imageFiles.map((image, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 mb-2">
            <div className="col-span-1 h-10">
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index}`}
                className="h-full w-auto mx-auto cursor-pointer"
                onClick={() => handleResizeImage(index, false)}
              />
            </div>
            <div className="col-span-10 my-auto text-sm text-gray-600">
              <p>
                {image.name.length > 30 ? (
                  <p
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() => handleResizeImage(index, false)}
                  >
                    {image.name.slice(0, 30) + " ..."}
                  </p>
                ) : (
                  <p
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() => handleResizeImage(index, false)}
                  >
                    {image.name}
                  </p>
                )}
              </p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Image
                src={DeleteIcon}
                alt="Delete"
                className="w-5 cursor-pointer"
                onClick={() => handleDeleteNewImage(index)}
              />
            </div>
          </div>
        ))}
      </div>
      {currentPage !== "/dashboard/create-new-agent" && (
        <div>
          {existingImgs.length > 0 && (
            <div className="flex justify-center items-center gap-2 mb-5">
              <div className="border-b w-[40%]"></div>
              <div>
                <p className="text-gray-300">Existing Images</p>
              </div>
              <div className="border-b w-[40%]"></div>
            </div>
          )}
          {existingImgs.map((image, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-1 h-10">
                <img
                  src={image.file_url}
                  alt={`Uploaded ${index}`}
                  className="h-full w-auto mx-auto cursor-pointer"
                  onClick={() => handleResizeImage(index, true)}
                />
              </div>
              <div className="col-span-10 my-auto text-sm text-gray-600">
                <p>
                  {image.file_name.length > 30 ? (
                    <p
                      className="cursor-pointer hover:text-blue-400"
                      onClick={() => handleResizeImage(index, true)}
                    >
                      {image.file_name.slice(0, 30) + " ..."}
                    </p>
                  ) : (
                    <p
                      className="cursor-pointer hover:text-blue-400"
                      onClick={() => handleResizeImage(index, true)}
                    >
                      {image.file_name}
                    </p>
                  )}
                </p>
              </div>

              <div className="col-span-1 flex justify-center items-center">
                <Image
                  src={DeleteIcon}
                  alt="Delete"
                  className="w-5 cursor-pointer"
                  onClick={() => handleDeleteFile(index, image.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex flex-col gap-10 mt-10">
        {enlargedIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="relative">
              <img
                src={
                  isExistingImage
                    ? existingImgs[enlargedIndex].file_url
                    : URL.createObjectURL(imageFiles[enlargedIndex])
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
      </div> */}
    </div>
  );
};

export default ImageTraining;
