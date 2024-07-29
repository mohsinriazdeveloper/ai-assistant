import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import pdfToText from "react-pdftotext";
import mammoth from "mammoth";

interface FileInputProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setCharCount: Dispatch<SetStateAction<number>>;
  setFileCount: Dispatch<SetStateAction<number>>;
  handleDeleteFile: (index: number, id: number, isExisting: boolean) => void;
}

const FileInput: FC<FileInputProps> = ({
  files,
  setFiles,
  setCharCount,
  setFileCount,
  handleDeleteFile,
}) => {
  const maxFiles = 10;
  const maxSizeMB = 1; // Maximum file size in MB
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const totalSizeMB = selectedFiles.reduce(
        (acc, file) => acc + file.size / (1024 * 1024),
        0
      );

      if (totalSizeMB > maxSizeMB) {
        setErrorMessage("File size should not be larger than 5MB");
        return;
      }

      if (files.length + selectedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files in total.`);
        return;
      }

      setErrorMessage("");
      setUploading(true);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setFileCount(files.length + selectedFiles.length);
      processFiles([...files, ...selectedFiles]);
    }
  };

  const processFiles = useCallback(
    (selectedFiles: File[]) => {
      let totalCharCount = 0;
      const fileReaders = selectedFiles.map((file) => {
        return new Promise<void>((resolve) => {
          if (file.type === "application/pdf") {
            pdfToText(file)
              .then((text) => {
                totalCharCount += text.length;
                resolve();
              })
              .catch((error) =>
                console.error("Failed to extract text from PDF", error)
              );
          } else if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = (e) => {
              const content = e.target?.result as string;
              totalCharCount += content.length;
              resolve();
            };
            reader.readAsText(file);
          } else if (
            file.type === "application/msword" ||
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const arrayBuffer = e.target?.result as ArrayBuffer;
              mammoth
                .extractRawText({ arrayBuffer })
                .then((result) => {
                  totalCharCount += result.value.length;
                  resolve();
                })
                .catch((error) =>
                  console.error(
                    "Failed to extract text from Word document",
                    error
                  )
                );
            };
            reader.readAsArrayBuffer(file);
          } else {
            resolve();
          }
        });
      });

      Promise.all(fileReaders).then(() => {
        setCharCount(totalCharCount);
        setUploading(false);
      });
    },
    [setCharCount]
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const selectedFiles = Array.from(event.dataTransfer.files);
    const totalSizeMB = selectedFiles.reduce(
      (acc, file) => acc + file.size / (1024 * 1024),
      0
    );

    if (totalSizeMB > maxSizeMB) {
      setErrorMessage("File size should not be larger than 5MB");
      return;
    }

    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files in total.`);
      return;
    }

    setErrorMessage("");
    setUploading(true);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setFileCount(files.length + selectedFiles.length);
    processFiles([...files, ...selectedFiles]);
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
          {errorMessage && (
            <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
          )}
          {uploading && (
            <p className="mt-2 text-xs text-blue-500">File is uploading...</p>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileInput;
