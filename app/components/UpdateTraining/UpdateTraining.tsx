"use client";
import { FC, useState, useCallback } from "react";
import { content } from "./content";
import { usePathname, useRouter } from "next/navigation";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import Image from "next/image";
import {
  useDeleteFileMutation,
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import PreviousPage from "../PreviousPage/PreviousPage";
import LeftBar from "../LeftBar/LeftBar";
import FileInput from "../Dashboard/CreateNewAgent/FileInput";
import QAInput from "../Dashboard/CreateNewAgent/QAInput";
import RightBar from "../RightBar/RightBar";
import { FileUrl } from "../ReduxToolKit/types/agents.d";
import toast, { Toaster } from "react-hot-toast";
import ImageTraining from "../Dashboard/CreateNewAgent/ImageTraining";
import pdfToText from "react-pdftotext";
import mammoth from "mammoth";

interface UpdateTrainingProps {
  agentId: number;
}

interface QA {
  question: string;
  answer: string;
}

const UpdateTraining: FC<UpdateTrainingProps> = ({ agentId }) => {
  const { data: allAgents } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  const currentPage = usePathname();
  const [delExistingFile] = useDeleteFileMutation();
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<FileUrl[]>(
    //@ts-ignore
    agent?.file_urls.map((file) => file) || []
  );

  const nonImageFiles = existingFiles.filter(
    (file) => !/\.(png|PNG|jpg|JPG|JPEG|jpeg)$/i.test(file.file_name)
  );

  const [checkOption, setCheckOption] = useState<string>("file");
  const [charCount, setCharCount] = useState<number>(0);
  const [fileCount, setFileCount] = useState<number>(files.length);
  const [qaChar, setQaChar] = useState<number>(0);
  const [text, setText] = useState<string | undefined>(agent?.text || "");
  const textChar = text?.length || 0;
  const [agentName, setAgentName] = useState<string>(agent?.name || "");
  const [agentID] = useState<any>(agent?.id || "");
  //@ts-ignore
  const [qaList, setQAList] = useState<QA[]>(JSON.parse(agent?.qa) || []);
  const [updateAgent] = useUpdateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [agentNameError, setAgentNameError] = useState<string>("");
  const [totalImages, setTotalImage] = useState<number>(0);
  const [imagesFile, setImagesFile] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]); // State to store file URLs

  const handleUpdateAgent = async () => {
    if (agentName) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", agentName);
      formData.append("id", agentID);

      if (checkOption === "file") {
        files.forEach((file) => {
          formData.append("files", file);
        });
      } else if (checkOption === "text") {
        if (text) {
          formData.append("text", text);
        }
      } else if (checkOption === "qa") {
        formData.append("qa", JSON.stringify(qaList));
      } else if (checkOption === "image-train") {
        if (imagesFile) {
          imagesFile.forEach((image) => {
            formData.append("images", image);
          });
        }
      }

      try {
        const res = await updateAgent(formData).unwrap();
        setLoading(false);
        toast.success("Agent Updated");
      } catch (error: any) {
        setLoading(false);
        if (error.status === 400) {
          toast.error("File type not supported");
          return;
        }
        console.error("Failed to update agent: ", error);
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    } else {
      setAgentNameError("Agent Name is required");
    }
  };

  const handleDeleteFile = useCallback(
    (index: number, isExisting: boolean = false) => {
      if (isExisting) {
        // Handle deletion of existing files
        const fileToRemove = existingFiles[index];

        delExistingFile(fileToRemove.id)
          .then(() => {
            setExistingFiles((prevFiles) =>
              prevFiles.filter((_, i) => i !== index)
            );
            toast.success("File successfully deleted.");
          })
          .catch((error) => {
            console.error("Failed to delete file ", error);
            toast.error("Failed to delete file");
          });
      } else {
        // Handle deletion of new files
        const fileToRemove = files[index];

        const updateStateAfterDeletion = (charCountToRemove: number) => {
          setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
          setCharCount((prevCharCount) => prevCharCount - charCountToRemove);
          setFileCount((prevCount) => prevCount - 1);
          toast.success("File successfully deleted.");
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
                console.error(
                  "Failed to extract text from Word document",
                  error
                )
              );
          };
          reader.readAsArrayBuffer(fileToRemove);
        } else {
          updateStateAfterDeletion(0);
        }
      }
    },
    [
      existingFiles,
      files,
      delExistingFile,
      setFiles,
      setExistingFiles,
      setCharCount,
      setFileCount,
    ]
  );

  const updateCharCount = (files: File[]) => {
    let totalCharCount = 0;
    const fileReaders = files.map((file) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          totalCharCount += content.length;
          resolve();
        };
        reader.readAsText(file);
      });
    });

    Promise.all(fileReaders).then(() => {
      setCharCount(totalCharCount);
    });
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
      <div className="md:container md:mx-auto mx-5">
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
                className="w-full focus:outline-none border rounded text-sm py-2 px-3"
                value={agentName}
                onChange={handleAgentNameChange}
              />
              {agentNameError && (
                <p className="text-xs text-red-500 italic">{agentNameError}</p>
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
                    <p className="font-semibold text-2xl">Files</p>
                    <div className="w-full mt-7 mb-2">
                      <FileInput
                        files={files}
                        setFiles={setFiles}
                        setCharCount={setCharCount}
                        setFileCount={setFileCount}
                        handleDeleteFile={handleDeleteFile}
                        setFileUrls={setFileUrls} // Pass setFileUrls to FileInput
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      If you are uploading a PDF, make sure you can
                      select/highlight the text.
                    </p>
                  </div>
                  {nonImageFiles.length > 0 && (
                    <div>
                      <div className="flex justify-center items-center gap-2">
                        <div className="border-b w-[40%]"></div>
                        <div>
                          <p className="text-gray-300">Existing Files</p>
                        </div>
                        <div className="border-b w-[40%]"></div>
                      </div>
                      {nonImageFiles.map((item, index) => (
                        <div
                          key={index}
                          className="mt-5 grid grid-cols-12 items-center"
                        >
                          <p
                            className="col-span-10 cursor-pointer text-blue-500"
                            onClick={
                              // @ts-ignore
                              () => handleOpenFile(item.file_url)
                            }
                          >
                            {item.file_name.slice(0, 20) + " ..."}
                          </p>
                          <div className="col-span-2 flex justify-end">
                            <Image
                              src={DeleteIcon}
                              alt="Delete"
                              className="w-5 cursor-pointer"
                              onClick={() => handleDeleteFile(index, true)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {files.length > 0 && (
                    <div>
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
                            {file.name.slice(0, 20) + " ..."}
                          </p>
                          <div className="col-span-2 flex justify-end">
                            <Image
                              src={DeleteIcon}
                              alt="Delete"
                              className="w-5 cursor-pointer"
                              onClick={() => handleDeleteFile(index, false)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {checkOption === "text" && (
                <div>
                  <p className="font-semibold text-2xl">Text</p>
                  <div className="w-full mt-7 mb-2">
                    <textarea
                      className="focus:outline-none border border-gray-200 rounded w-full text-sm text-gray-700 px-3 py-2"
                      rows={20}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    {textChar} Characters
                  </p>
                </div>
              )}
              {checkOption === "qa" && (
                <div>
                  <p className="font-semibold text-2xl">Q&A</p>
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
                    agentId={agentId}
                    setTotalImage={setTotalImage}
                    agent={agent}
                    setImagesFile={setImagesFile}
                    imageFiles={imagesFile}
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
              agentCreateFunc={handleUpdateAgent}
              charCount={charCount}
              fileCount={fileCount}
              existingFiles={existingFiles}
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

export default UpdateTraining;
