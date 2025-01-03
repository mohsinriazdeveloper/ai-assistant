import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Loader from "../../Loader/Loader";

interface FileInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  fileCharLoading: boolean;
  // setCharCount: React.Dispatch<React.SetStateAction<number>>; // can be unused, left here for compatibility
  // setFileCount: React.Dispatch<React.SetStateAction<number>>; // can be unused, left here for compatibility
  // setFileUrls: React.Dispatch<React.SetStateAction<string[]>>; // can be unused, left here for compatibility
}

const FileInput: FC<FileInputProps> = ({
  files,
  setFiles,
  fileCharLoading,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allowedFileTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files).filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    if (selectedFiles.length === 0) {
      setErrorMessage(
        "Invalid file type. Only .pdf, .docx, and .txt files are allowed."
      );
      return;
    }

    setErrorMessage("");
    setFiles([...files, ...selectedFiles]); // Update the files array
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const selectedFiles = Array.from(event.dataTransfer.files).filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    if (selectedFiles.length === 0) {
      setErrorMessage(
        "Invalid file type. Only .pdf, .docx, and .txt files are allowed."
      );
      return;
    }

    setErrorMessage("");

    setFiles([...files, ...selectedFiles]); // Update the files array
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl">Files</p>
        <div
          onClick={handleDivClick}
          className="w-8 h-8 bg-black rounded flex justify-center items-center text-white text-xs cursor-pointer"
        >
          <FaPlus />
        </div>
      </div>
      <label htmlFor="file-upload">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex mt-3 flex-col items-center justify-center border ${
            isDragging ? "border-blue-400" : "border-gray-200"
          } px-6 rounded h-[165px] cursor-pointer`}
        >
          <div>
            <Image src={UploadIcon} alt="" className="max-w-4" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            id="file-upload"
            multiple
            accept=".pdf, .docx, .txt"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="mt-4 text-xs text-gray-600 cursor-pointer"
          >
            Drag & drop files here, or click to select files
          </label>
          <p className="mt-2 text-[10px] text-gray-500">
            Supported File Types: .pdf, .docx, .txt
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
      </label>
    </div>
  );
};

export default FileInput;
