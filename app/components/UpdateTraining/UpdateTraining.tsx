"use client";
import { FC, useState, useCallback, useEffect } from "react";
import { content } from "./content";
import { usePathname, useRouter } from "next/navigation";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import Image from "next/image";
import {
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import PreviousPage from "../PreviousPage/PreviousPage";
import LeftBar from "../LeftBar/LeftBar";
import FileInput from "../Dashboard/CreateNewAgent/FileInput";
import QAInput from "../Dashboard/CreateNewAgent/QAInput";
import RightBar from "../RightBar/RightBar";

interface UpdateTrainingProps {
  agentId: number;
}

interface QA {
  question: string;
  answer: string;
}

const UpdateTraining: FC<UpdateTrainingProps> = ({ agentId }) => {
  const { data: allAgents, isLoading } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  const currentPage = usePathname();
  const [files, setFiles] = useState<File[]>([] || agent?.file_urls);
  const [checkOption, setCheckOption] = useState<string>("file");
  const [charCount, setCharCount] = useState<number>(0);
  const [fileCount, setFileCount] = useState<number>(files.length);
  const [qaChar, setQaChar] = useState<number>(0);
  const [text, setText] = useState<string | undefined>("" || agent?.text);
  const textChar = text?.length || 0;
  const [agentName, setAgentName] = useState<string>(agent?.name || "");
  const [agentID, setAgentID] = useState<any>(agent?.id || "");
  //@ts-ignore
  const [qaList, setQAList] = useState<QA[]>(JSON.parse(agent?.qa) || []);
  const [updateAgent] = useUpdateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [agentNameError, setAgentNameError] = useState<boolean>(false);

  const handleUpdateAgent = async () => {
    if (agentName) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", agentName);
      formData.append("id", agentID);

      if (checkOption === "file") {
        files.forEach((file, index) => {
          formData.append("files", file);
        });
      } else if (checkOption === "text") {
        if (text) {
          formData.append("text", text);
        }
      } else if (checkOption === "qa") {
        formData.append("qa", JSON.stringify(qaList));
      }

      try {
        const res = await updateAgent(formData).unwrap();
        setLoading(false);
        router.push("/dashboard/new-chat");
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to create agent: ", error);
        const errorMessage = error.data.message;
        alert(errorMessage);
      }
    } else {
      setAgentNameError(true);
    }
  };

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter((_, i) => i !== index);
        updateCharCount(updatedFiles);
        return updatedFiles;
      });
      setFileCount((prevCount) => prevCount - 1);
    },
    [setFiles, setCharCount, setFileCount]
  );

  // const updateCharCount = (files: File[]) => {
  //   let totalCharCount = 0;
  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const content = e.target?.result as string;
  //       totalCharCount += content.length;
  //       setCharCount(totalCharCount);
  //     };
  //     reader.readAsText(file);
  //   });
  // };

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

  return (
    <div>
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
                onChange={(e) => {
                  setAgentName(e.target.value);
                  setAgentNameError(false);
                }}
              />
              {agentNameError && (
                <p className="text-xs text-red-500 italic">
                  Agent name is required
                </p>
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
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      If you are uploading a PDF, make sure you can
                      select/highlight the text.
                    </p>
                  </div>
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
                          <p className="col-span-10">{file.name}</p>
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
              textChar={textChar}
              checkOption={checkOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTraining;
