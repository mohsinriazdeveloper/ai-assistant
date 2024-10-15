import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  useDeleteFileMutation,
  useTrainByImageMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { AgentState } from "../../ReduxToolKit/types/agents";
import Image from "next/image";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import UploadIcon from "@/app/assets/icons/uploadIcon.png";

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
  const [updateWithImg] = useTrainByImageMutation();
  const [delExistingFile] = useDeleteFileMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [existingImgs, setExistingImgs] = useState(
    agent?.file_urls?.filter((file) =>
      /\.(png|PNG|jpg|JPG|JPEG|jpeg)$/i.test(file.file_name)
    ) || []
  );
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

  const handleDeleteNewImage = (index: number) => {
    setImagesFile((prevImages) => prevImages.filter((_, i) => i !== index));
    toast.success("Image successfully deleted");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileInput}
        className="border border-gray-200 mt-10 p-6 rounded h-[200px] cursor-pointer flex flex-col items-center justify-center"
      >
        <div>
          <Image src={UploadIcon} alt="" className="max-w-5" />
        </div>
        <input
          ref={fileInputRef}
          id="addImage"
          type="file"
          className="hidden"
          accept=".png, .PNG, .jpg, .JPG, .JPEG, .jpeg"
          onChange={handleAddImage}
        />
        <label
          htmlFor="addImage"
          className="mt-4 text-sm text-gray-600 cursor-pointer"
        >
          Drag & drop image here, or click to select images
        </label>
        <p className="mt-2 text-xs text-gray-500">
          Supported Image Types: .png, .jpg, .jpeg
        </p>
      </div>

      <div className="mt-10 pb-5">
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
              />
            </div>
            <div className="col-span-10 my-auto text-sm text-gray-600">
              <p>
                {image.name.length > 30 ? (
                  <p>{image.name.slice(0, 30) + " ..."}</p>
                ) : (
                  <p>{image.name}</p>
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
    </div>
  );
};

export default ImageTraining;
