import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Loader from "../../Loader/Loader";

interface ImageTrainingProps {
  setImagesFile: Dispatch<SetStateAction<File[]>>;
  imageFiles: File[];
  fileCharLoading: boolean;
  setUploadFlag: Dispatch<SetStateAction<boolean>>;
}

const ImageTraining: FC<ImageTrainingProps> = ({
  setImagesFile,
  imageFiles,
  fileCharLoading,
  setUploadFlag,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

  const processImages = (files: File[]) => {
    // Check for invalid file extensions
    const invalidFiles = files.filter(
      (file) => !allowedExtensions.test(file.name)
    );

    if (invalidFiles.length > 0) {
      setErrorMessage("Only .png, .jpg, .jpeg images are allowed.");
      return;
    }

    // Check for duplicate files
    const duplicateFiles = files.filter((file) =>
      imageFiles.some((img) => img.name === file.name)
    );

    if (duplicateFiles.length > 0) {
      setErrorMessage("Some images are already added.");
      return;
    }

    setErrorMessage(""); // Clear any previous errors
    setUploadFlag(true);
    setImagesFile((prevImages) => [...prevImages, ...files]); // Add all valid files
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files); // Convert FileList to Array
    processImages(selectedFiles);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = Array.from(event.dataTransfer.files); // Convert FileList to Array
    processImages(droppedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl">Train with image</p>
        <div
          onClick={triggerFileInput}
          className="w-8 h-8 bg-black rounded flex justify-center items-center text-white text-xs cursor-pointer"
        >
          <FaPlus />
        </div>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={triggerFileInput}
        className="border border-gray-200 mt-3 p-6 rounded h-[165px] cursor-pointer flex flex-col items-center justify-center"
      >
        <Image src={UploadIcon} alt="Upload Icon" className="max-w-4" />
        <input
          ref={fileInputRef}
          id="addImage"
          type="file"
          className="hidden"
          accept=".png, .jpg, .jpeg"
          onChange={handleAddImage}
          onClick={(e) => e.stopPropagation()}
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
        {fileCharLoading && (
          <div className="mt-2">
            <Loader />
          </div>
        )}
        {errorMessage && (
          <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ImageTraining;
