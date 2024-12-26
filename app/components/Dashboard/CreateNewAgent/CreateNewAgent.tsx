"use client";

import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import mammoth from "mammoth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { useDispatch } from "react-redux";
import LeftBar from "../../LeftBar/LeftBar";
import PreviousPage from "../../PreviousPage/PreviousPage";
import {
  selectAgentName,
  setAgentName,
} from "../../ReduxToolKit/agentNameSlice";
import { useCreateAgentMutation } from "../../ReduxToolKit/aiAssistantOtherApis";
import { setCreateAgent } from "../../ReduxToolKit/createAgentSlice";
import { useAppSelector } from "../../ReduxToolKit/hook";
import RightBar from "../../RightBar/RightBar";
import { content } from "./content";
import FileInput from "./FileInput";
import ImageTraining from "./ImageTraining";
import QAInput from "./QAInput";
import WebsiteTraining from "./WebsiteTraining";

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

const MAX_TOTAL_CHARS = 400000;

const CreateNewAgent: FC<CreateNewAgentProps> = ({ agentId }) => {
  const { agentName } = useAppSelector(selectAgentName);
  const dispatch = useDispatch();
  const [newLinks, setNewLinks] = useState<
    {
      id: number;
      url: string;
      content: string;
      isValid: boolean;
      isLoading: boolean;
      isScraped: boolean;
    }[]
  >([]);
  const currentPage = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [checkOption, setCheckOption] = useState<string>("file");
  const [fileCount, setFileCount] = useState<number>(files.length);
  const [text, setText] = useState<string>("");
  // const [agentName, setAgentName] = useState<string>("");
  const [qaList, setQAList] = useState<QA[]>([]);
  const [creatingAgent] = useCreateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [agentNameError, setAgentNameError] = useState<string>("");
  const [totalImages, setTotalImage] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const [qaChar, setQaChar] = useState<number>(0);
  const [filecharCount, setfileCharCount] = useState<number>(0);
  const textChar = text.length;

  const [totalCharCount, settotalCharCount] = useState<number>(0);
  const [cantAddMore, setCantAddMore] = useState<boolean>(false);
  const [websiteContentLength, setWebsiteContentLength] = useState<number>(0);

  useEffect(() => {
    dispatch(setCreateAgent({ createAgentStatus: false }));
  }, [dispatch]);

  useEffect(() => {
    const newTotalCharCount =
      qaChar + textChar + filecharCount + websiteContentLength;
    settotalCharCount(newTotalCharCount);
    if (newTotalCharCount <= MAX_TOTAL_CHARS) {
      setCantAddMore(false);
    } else {
      toast.error("You have reached the maximum character limit");
      setCantAddMore(true);
    }
  }, [text, qaChar, filecharCount, websiteContentLength]);

  const handleCreateAgent = async () => {
    if (totalCharCount > MAX_TOTAL_CHARS) {
      toast.error("Reduce the characters");
      return;
    }
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

      newLinks.forEach((website, index) => {
        formData.append(`website_data[${index}][website_url]`, website.url);
        formData.append(
          `website_data[${index}][website_content]`,
          website.content
        );
      });

      formData.append(`qa`, JSON.stringify(qaList));
      try {
        const res = await creatingAgent(formData).unwrap();
        dispatch(
          setAgentName({
            agentName: "",
          })
        );
        setLoading(false);
        toast.success("Agent successfully created");

        router.push("/dashboard/agents");
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to create agent: ", error);
        if (error.status === 401) {
          toast.error("Access token expired, need to login again");
          router.push("/");
          return;
        } else if (error.status === "FETCH_ERROR") {
          toast.error(
            "The uploaded files/data exceed the allowed size limit. Please reduce the file size or upload fewer files."
          );
          return;
        } else if (error.status === 400) {
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

      const updateStateAfterDeletion = (filecharCountToRemove: number) => {
        setFiles((prevFiles) => {
          const updatedFiles = prevFiles.filter((_, i) => i !== index);
          return updatedFiles;
        });
        setfileCharCount(
          (prevfileCharCount) => prevfileCharCount - filecharCountToRemove
        );
        setFileCount((prevCount) => prevCount - 1);

        setFileUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
        toast.success("File Successfully deleted");
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
        updateStateAfterDeletion(0);
      }
    },
    [files, setFiles, setfileCharCount, setFileCount, setFileUrls]
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (cantAddMore) {
      toast.error("You have reached the maximum character limit");
    }
  };

  // const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newName = e.target.value;
  //   if (newName.length <= 100) {
  //     setAgentName(newName);
  //     setAgentNameError("");
  //   } else {
  //     setAgentNameError("Name cannot exceed 100 characters.");
  //   }
  // };

  const handleOpenFile = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div>
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
            {/* <div className="mb-2">
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
            </div> */}
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
                        setCharCount={setfileCharCount}
                        setFileCount={setFileCount}
                        // handleDeleteFile={handleDeleteFile}
                        cantAddMore={cantAddMore}
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
                    cantAddMore={cantAddMore}
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
              {checkOption === "website" && (
                <div className="">
                  <WebsiteTraining
                    setWebsiteContentLength={setWebsiteContentLength}
                    newLinks={newLinks}
                    setNewLinks={setNewLinks}
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
              charCount={filecharCount}
              fileCount={fileCount}
              textChar={textChar}
              checkOption={checkOption}
              totalImages={totalImages}
              totalCharCount={totalCharCount}
              cantAddMore={cantAddMore}
              websiteContentLength={websiteContentLength}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAgent;
