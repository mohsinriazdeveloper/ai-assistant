import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useCallback,
} from "react";
import { IoMdAdd } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Loader/Loader";
import {
  useDeleteFileMutation,
  useTrainByImageMutation,
} from "../../ReduxToolKit/aiAssistantOtherApis";
import { AgentState } from "../../ReduxToolKit/types/agents";
import Image from "next/image";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import ResizeIcon from "@/app/assets/icons/resize.png";
import { usePathname } from "next/navigation";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ImageTrainingProps {
  setTotalImage: Dispatch<SetStateAction<number>>;
  agentId?: any;
  agent?: AgentState | undefined;
  setImagesFile?: Dispatch<SetStateAction<File[]>>;
}

const ImageTraining: FC<ImageTrainingProps> = ({
  setTotalImage,
  agentId,
  agent,
  setImagesFile,
}) => {
  const currentPage = usePathname();
  const [updateWithImg] = useTrainByImageMutation();
  const [delExistingFile] = useDeleteFileMutation();
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgLoader, setImgLoader] = useState<{ [key: number]: boolean }>({});
  const [existingImgs, setExistingImgs] = useState(
    agent?.file_urls?.filter((file) =>
      /\.(png|PNG|jpg|JPG|JPEG|jpeg)$/i.test(file.file_name)
    ) || []
  );
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null); // State to track which image is enlarged

  setTotalImage(images.length);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Check if the file size is greater than 1 MB (1 MB = 1048576 bytes)
      if (file.size > 1048576) {
        toast.error("Image size should not exceed 1 MB");
        return;
      }

      if (setImagesFile) {
        setImagesFile((prevImages) => [...prevImages, file]);
      }

      // Check if the file is already added
      if (images.some((img) => img.name === file.name)) {
        toast.error("Image Already Added");
      } else {
        setImages((prevImages) => [...prevImages, file]);
      }
    }
  };

  const submitImages = async () => {
    if (images.length === 0) {
      toast.error("First add Image");
      return;
    }

    const fd = new FormData();
    fd.append("id", agentId);

    images.forEach((imageFile) => {
      fd.append("images", imageFile); // Appending each image file to the 'images' key
    });

    try {
      setLoading(true);
      await updateWithImg(fd).unwrap();

      // Handle successful response
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
        toast.success("File deleted");
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
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    toast.success("Image removed");
  };

  const handleResizeImage = (index: number) => {
    setEnlargedIndex(index); // Set the enlarged index to the clicked image
  };

  const handleCloseEnlarged = () => {
    setEnlargedIndex(null); // Reset the enlarged index to close the enlarged view
  };

  return (
    <div className="w-full flex flex-col gap-10 mt-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-start">
        <label htmlFor="addImage">
          <div className="w-[142px] h-[121px] border border-gray-200 rounded-md flex justify-center items-center cursor-pointer overflow-hidden">
            <IoMdAdd color="#3F3F46" />
            <input
              id="addImage"
              type="file"
              onChange={handleAddImage}
              className="hidden"
              accept=".png, .PNG, .jpg, .JPG, .JPEG, .jpeg"
            />
          </div>
        </label>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="grid-cols-1 w-full h-[121px] border rounded-md overflow-hidden relative group"
          >
            <div className="group-hover:opacity-50 group-hover:bg-white w-full h-full absolute"></div>

            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              className="object-cover w-full h-full"
            />
            <Image
              src={DeleteIcon}
              alt="Delete"
              className="w-5 cursor-pointer absolute top-[40%] right-[45%] opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDeleteNewImage(index)}
            />
          </div>
        ))}
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-500 text-center">
          Supported File Types: .png, .PNG, .jpg, .JPG, .JPEG, .jpeg
        </p>
      </div>
      {currentPage !== "/dashboard/create-new-agent" && (
        <div>
          <div className="flex justify-center items-center gap-2 mb-5">
            <div className="border-b w-[40%]"></div>
            <div>
              <p className="text-gray-300">Existing Images</p>
            </div>
            <div className="border-b w-[40%]"></div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {existingImgs.map((image, index) => (
              <div
                key={index}
                className="grid-cols-1 w-full h-[121px] border rounded-md overflow-hidden bg-cover bg-center bg-no-repeat relative group"
                style={{ backgroundImage: `url(${image.file_url})` }}
              >
                <div className="group-hover:opacity-50 group-hover:bg-white w-full h-full absolute"></div>
                {imgLoader[index] ? (
                  <div className="w-full h-full flex justify-center items-center ">
                    <Loader />
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center relative z-50 p-3">
                    <Image
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteFile(index, image.id)}
                    />
                    <Image
                      src={ResizeIcon}
                      alt="Resize"
                      className="w-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleResizeImage(index)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {enlargedIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="relative">
            <img
              src={existingImgs[enlargedIndex].file_url}
              alt={`Enlarged ${enlargedIndex}`}
              className="max-w-full max-h-full"
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
  );
};

export default ImageTraining;
