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
import { usePathname } from "next/navigation";

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

  setTotalImage(images.length);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (currentPage === "/dashboard/create-new-agent") {
        //@ts-ignore
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
      const res = await updateWithImg(fd).unwrap();

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
        {currentPage !== "/dashboard/create-new-agent" && (
          <button
            onClick={submitImages}
            className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
          >
            {loading ? <Loader /> : <>Train with Image</>}
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="grid-cols-1 w-full h-[121px] border rounded-md overflow-hidden"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              className="object-cover w-full h-full"
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
                className=" grid-cols-1 w-full h-[121px] border rounded-md overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center items-center relative group"
                style={{ backgroundImage: `url(${image.file_url})` }}
              >
                <div className="group-hover:opacity-50 group-hover:bg-white w-full h-full absolute"></div>
                {imgLoader[index] ? (
                  <Loader />
                ) : (
                  <Image
                    src={DeleteIcon}
                    alt="Delete"
                    className="w-5 cursor-pointer absolute opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteFile(index, image.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTraining;
