import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";

interface FileInputProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setCharCount: Dispatch<SetStateAction<number>>;
  setFileCount: Dispatch<SetStateAction<number>>;
  handleDeleteFile: (index: number) => void;
}

const FileInput: FC<FileInputProps> = ({
  files,
  setFiles,
  setCharCount,
  setFileCount,
  handleDeleteFile,
}) => {
  const maxFiles = 10;
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (files.length + selectedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files in total.`);
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setFileCount(files.length + selectedFiles.length);
      processFiles(selectedFiles);
    }
  };

  const processFiles = useCallback(
    (selectedFiles: File[]) => {
      let totalCharCount = 0;
      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          // const content = JSON.stringify(e.target?.result);
          console.log(content);
          totalCharCount += content.length;
          setCharCount((prevCount) => prevCount + content.length); // Incrementally update char count
        };
        reader.readAsText(file);
      });
    },
    [setCharCount]
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const selectedFiles = Array.from(event.dataTransfer.files);
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files in total.`);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setFileCount(files.length + selectedFiles.length);
    processFiles(selectedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div>
      <label htmlFor="file-upload">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center border ${
            isDragging ? "border-blue-400" : "border-gray-200"
          } p-6 rounded h-[200px] cursor-pointer`}
        >
          <div>
            <Image src={UploadIcon} alt="" className="max-w-5" />
          </div>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            accept=".pdf, .doc, .docx, .txt"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="mt-4 text-sm text-gray-600 cursor-pointer"
          >
            Drag & drop files here, or click to select files
          </label>
          <p className="mt-2 text-xs text-gray-500">
            Supported File Types: .pdf, .doc, .docx, .txt
          </p>
        </div>
      </label>
    </div>
  );
};

export default FileInput;
