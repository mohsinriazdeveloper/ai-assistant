import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
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
          totalCharCount += content.length;
          setCharCount((prevCount) => prevCount + content.length); // Incrementally update char count
        };
        reader.readAsText(file);
      });
    },
    [setCharCount]
  );

  return (
    <div>
      <label htmlFor="file-upload">
        <div className="flex flex-col items-center justify-center border border-gray-200 p-6 rounded h-[200px] cursor-pointer">
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
          {/* {files.length > 0 && (
        <div className="w-full mt-5">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-700">{file.name}</p>
              <Image
                src={DeleteIcon}
                alt="Delete"
                className="w-5 cursor-pointer"
                onClick={() => handleDeleteFile(index)}
              />
            </div>
          ))}
        </div>
      )} */}
        </div>
      </label>
    </div>
  );
};

export default FileInput;
