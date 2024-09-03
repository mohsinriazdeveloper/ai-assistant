"use client";

import { FC, useState, useCallback } from "react";
import LeftBar from "../../LeftBar/LeftBar";
import FileInput from "./FileInput";
import RightBar from "../../RightBar/RightBar";
import { content } from "./content";
import { useCreateAgentMutation } from "../../ReduxToolKit/aiAssistantOtherApis";
import QAInput from "./QAInput";
import { usePathname, useRouter } from "next/navigation";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import Image from "next/image";
import PreviousPage from "../../PreviousPage/PreviousPage";
import toast, { Toaster } from "react-hot-toast";
import ImageTraining from "./ImageTraining";
import pdfToText from "react-pdftotext";
import mammoth from "mammoth";

type FileUrl = {
  file_url: string;
};

interface CreateNewAgentProps {
  agentId?: number;
}

interface QA {
  question: string;
  answer: string;
}

const CreateNewAgent: FC<CreateNewAgentProps> = ({ agentId }) => {
  const currentPage = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [checkOption, setCheckOption] = useState<string>("file");
  const [charCount, setCharCount] = useState<number>(0);
  const [fileCount, setFileCount] = useState<number>(files.length);
  const [qaChar, setQaChar] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const textChar = text.length;
  const [agentName, setAgentName] = useState<string>("");
  const [qaList, setQAList] = useState<QA[]>([]);
  const [creatingAgent] = useCreateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [agentNameError, setAgentNameError] = useState<string>("");
  const [totalImages, setTotalImage] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]); // State to store file URLs

  const handleCreateAgent = async () => {
    if (agentName) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", agentName);

      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      formData.append(`text`, text);
      formData.append(`qa`, JSON.stringify(qaList));
      try {
        const res = await creatingAgent(formData).unwrap();
        setLoading(false);
        router.push("/dashboard/new-chat");
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to create agent: ", error);
        if (error.status === 400) {
          toast.error(error.data);
        } else {
          const errorMessage = error.data.message;
          toast.error(errorMessage);
        }
      }
    } else {
      setAgentNameError("Agent Name is required");
    }
  };

  const handleDeleteFile = useCallback(
    (index: number) => {
      const fileToRemove = files[index];

      const updateStateAfterDeletion = (charCountToRemove: number) => {
        // Remove the file from the list and update the character count
        setFiles((prevFiles) => {
          const updatedFiles = prevFiles.filter((_, i) => i !== index);
          return updatedFiles;
        });
        setCharCount((prevCharCount) => prevCharCount - charCountToRemove);
        setFileCount((prevCount) => prevCount - 1);

        // Update the file URLs
        setFileUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
      };

      if (fileToRemove.type === "application/pdf") {
        pdfToText(fileToRemove)
          .then((text) => {
            updateStateAfterDeletion(text.length);
          })
          .catch((error) =>
            console.error("Failed to extract text from PDF", error)
          );
      } else if (fileToRemove.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          updateStateAfterDeletion(content.length);
        };
        reader.readAsText(fileToRemove);
      } else if (
        fileToRemove.type === "application/msword" ||
        fileToRemove.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          mammoth
            .extractRawText({ arrayBuffer })
            .then((result) => {
              updateStateAfterDeletion(result.value.length);
            })
            .catch((error) =>
              console.error("Failed to extract text from Word document", error)
            );
        };
        reader.readAsArrayBuffer(fileToRemove);
      } else {
        // If the file type is not supported, just remove it without adjusting the character count
        updateStateAfterDeletion(0);
      }
    },
    [files, setFiles, setCharCount, setFileCount, setFileUrls]
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 100000) {
      setText(newText);
    }
  };

  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length <= 100) {
      setAgentName(newName);
      setAgentNameError("");
    } else {
      setAgentNameError("Name cannot exceed 100 characters.");
    }
  };

  const handleOpenFile = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className={`md:container md:mx-auto mx-5 ${
          currentPage != "/dashboard/agent" && "py-10"
        }`}
      >
        {currentPage != "/dashboard/agent" && (
          <div className="">
            <PreviousPage />
          </div>
        )}
        <div className="mb-10">
          <p className="text-center font-bold text-3xl mb-2">Data Sources</p>
          <p className="text-gray-300 text-center">
            Add your data sources to train your chatbot
          </p>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="md:col-span-2 col-span-12">
            <div className="mb-2">
              <p className="text-sm font-semibold mb-1">
                Agent Name <span className="text-red-500">*</span>
              </p>
              <input
                placeholder="Add your agent name"
                type="text"
                className="w-full focus:outline-none border rounded text-sm py-2 px-3 "
                value={agentName}
                onChange={handleAgentNameChange}
              />
              {agentNameError && (
                <p className="text-xs text-red-500 italic ">{agentNameError}</p>
              )}
            </div>
            <LeftBar
              content={content.sideBarOptions}
              setCheckOption={setCheckOption}
              checkOption={checkOption}
            />
          </div>
          <div className="md:col-span-7 col-span-12">
            <div className="w-full border border-gray-200 py-7 px-6 rounded-lg">
              {checkOption === "file" && (
                <>
                  <div className="mb-10">
                    <p className="font-semibold text-2xl ">Files</p>
                    <div className="w-full mt-7 mb-2">
                      <FileInput
                        setFileUrls={setFileUrls}
                        files={files}
                        setFiles={setFiles}
                        setCharCount={setCharCount}
                        setFileCount={setFileCount}
                        handleDeleteFile={handleDeleteFile}
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      If you are uploading a PDF, make sure you can
                      select/highlight the text.
                    </p>
                  </div>
                  {files.length > 0 && (
                    <div className="">
                      <div className="flex justify-center items-center gap-2">
                        <div className="border-b w-[40%]"></div>
                        <div>
                          <p className="text-gray-300">Attached Files</p>
                        </div>
                        <div className="border-b w-[40%]"></div>
                      </div>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="mt-5 grid grid-cols-12 items-center"
                        >
                          <p
                            className="col-span-10 cursor-pointer text-blue-500"
                            onClick={() => handleOpenFile(fileUrls[index])}
                          >
                            {file.name.length > 30 ? (
                              <>{file.name.slice(0, 30) + " ..."}</>
                            ) : (
                              <>{file.name}</>
                            )}
                          </p>
                          <div className="col-span-2 flex justify-end">
                            <Image
                              src={DeleteIcon}
                              alt="Delete"
                              className="w-5 cursor-pointer"
                              onClick={() => handleDeleteFile(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {checkOption === "text" && (
                <div className="">
                  <p className="font-semibold text-2xl ">Text</p>
                  <div className="w-full mt-7 mb-2">
                    <textarea
                      className="focus:outline-none border border-gray-200 rounded w-full text-sm text-gray-700 px-3 py-2"
                      rows={20}
                      value={text}
                      onChange={handleTextChange}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    {textChar} Characters
                  </p>
                </div>
              )}
              {checkOption === "qa" && (
                <div className="">
                  <p className="font-semibold text-2xl ">Q&A</p>
                  <QAInput
                    setQaChar={setQaChar}
                    qaList={qaList}
                    setQAList={setQAList}
                  />
                </div>
              )}
              {checkOption === "image-train" && (
                <div className="">
                  <p className="font-semibold text-2xl ">Train With Image</p>
                  <ImageTraining
                    setTotalImage={setTotalImage}
                    setImagesFile={setImages}
                    imageFiles={images}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-3 col-span-12">
            <RightBar
              currentPage={currentPage}
              loading={loading}
              qaChar={qaChar}
              agentCreateFunc={handleCreateAgent}
              charCount={charCount}
              fileCount={fileCount}
              textChar={textChar}
              checkOption={checkOption}
              totalImages={totalImages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAgent;
