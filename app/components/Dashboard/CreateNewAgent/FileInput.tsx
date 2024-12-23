import UploadIcon from "@/app/assets/icons/uploadIcon.png";
import mammoth from "mammoth";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import pdfToText from "react-pdftotext";
import Loader from "../../Loader/Loader";

interface FileInputProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setCharCount: Dispatch<SetStateAction<number>>;
  setFileCount: Dispatch<SetStateAction<number>>;
  handleDeleteFile: (index: number) => void;
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  cantAddMore: boolean;
}

const FileInput: FC<FileInputProps> = ({
  files,
  setFiles,
  setCharCount,
  setFileCount,
  handleDeleteFile,
  setFileUrls,
  cantAddMore,
}) => {
  const maxFiles = 1000;
  const maxSizeMB = 10;
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const allowedFileTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (cantAddMore) return;
    event.preventDefault();

    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      const invalidFiles = selectedFiles.filter(
        (file) => !allowedFileTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        showError(
          "Invalid file type. Only .pdf, .docx, and .txt files are allowed."
        );
        return;
      }

      const totalSizeMB = selectedFiles.reduce(
        (acc, file) => acc + file.size / (1024 * 1024),
        0
      );

      if (totalSizeMB > maxSizeMB) {
        showError("File size should not be larger than 10MB");
        return;
      }

      if (files.length + selectedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files in total.`);
        return;
      }

      setErrorMessage("");
      setUploading(true);

      setTimeout(() => {
        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        setFileCount(newFiles.length);

        const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));
        setFileUrls((prevUrls) => [...prevUrls, ...newUrls]);

        setUploading(false);
        processFiles(newFiles);
      }, 3000);
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
      });
    },
    [setCharCount]
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (cantAddMore) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const selectedFiles = Array.from(event.dataTransfer.files);

    const invalidFiles = selectedFiles.filter(
      (file) => !allowedFileTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      showError(
        "Invalid file type. Only .pdf, .docx, and .txt files are allowed."
      );
      return;
    }

    const totalSizeMB = selectedFiles.reduce(
      (acc, file) => acc + file.size / (1024 * 1024),
      0
    );

    if (totalSizeMB > maxSizeMB) {
      showError("File size should not be larger than 10MB");
      return;
    }

    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files in total.`);
      return;
    }

    setErrorMessage("");
    setUploading(true);

    setTimeout(() => {
      const newFiles = [...files, ...selectedFiles];
      setFiles(newFiles);
      setFileCount(newFiles.length);

      const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setFileUrls((prevUrls) => [...prevUrls, ...newUrls]);

      setUploading(false);
      processFiles(newFiles);
    }, 3000);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (cantAddMore) return;
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
          } p-6 rounded h-[200px] cursor-pointer ${
            cantAddMore ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div>
            <Image src={UploadIcon} alt="" className="max-w-5" />
          </div>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            accept=".pdf, .docx, .txt"
            onChange={handleFileChange}
            disabled={cantAddMore}
          />
          <label
            htmlFor="file-upload"
            className="mt-4 text-sm text-gray-600 cursor-pointer"
          >
            Drag & drop files here, or click to select files
          </label>
          <p className="mt-2 text-xs text-gray-500">
            Supported File Types: .pdf, .docx, .txt
          </p>
          {errorMessage && (
            <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
          )}
          {uploading && (
            <div className="flex items-center mt-5 text-sm text-gray-500">
              <p>Uploading </p> <Loader />
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileInput;
