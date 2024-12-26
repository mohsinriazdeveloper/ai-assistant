"use client";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FileInput from "../Dashboard/CreateNewAgent/FileInput";
import ImageTraining from "../Dashboard/CreateNewAgent/ImageTraining";
import QAInput from "../Dashboard/CreateNewAgent/QAInput";
import FileTag from "../Dashboard/CreateNewAgent/SourceTags/FileTag";
import ImageTag from "../Dashboard/CreateNewAgent/SourceTags/ImageTag";
import WebsiteTraining from "../Dashboard/CreateNewAgent/WebsiteTraining";
import {
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { selectIsConnect } from "../ReduxToolKit/connectSlice";
import { useAppSelector } from "../ReduxToolKit/hook";
import { FileUrl } from "../ReduxToolKit/types/agents.d";
import RightBar from "../RightBar/RightBar";

interface UpdateTrainingProps {
  agentId: number;
  checkOption: string;
}

interface QA {
  question: string;
  answer: string;
}

const MAX_TOTAL_CHARS = 400000;

const UpdateTraining: FC<UpdateTrainingProps> = ({ agentId, checkOption }) => {
  const { data: allAgents } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  const currentPage = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  // @ts-ignore
  const [existingFiles, setExistingFiles] = useState<FileUrl[]>(
    agent?.file_urls?.map((file) => file) || []
  );
  const nonImageFiles = existingFiles.filter(
    (file) => !/\.(png|PNG|jpg|JPG|JPEG|jpeg)$/i.test(file.file_name)
  );

  const [existingImgs, setExistingImgs] = useState(
    agent?.file_urls?.filter((file) =>
      /\.(png|PNG|jpg|JPG|JPEG|jpeg)$/i.test(file.file_name)
    ) || []
  );

  const [filecharCount, setfileCharCount] = useState<number>(0);
  const [fileCount, setFileCount] = useState<number>(files.length);
  const [qaChar, setQaChar] = useState<number>(0);
  const [text, setText] = useState<string | undefined>(agent?.text || "");
  const textChar = text?.length || 0;
  const [agentID] = useState<any>(agent?.id || "");
  const [qaList, setQAList] = useState<QA[]>(
    agent?.qa ? JSON.parse(agent.qa) : []
  );
  const [updateAgent] = useUpdateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalImages, setTotalImage] = useState<number>(0);
  const [imagesFile, setImagesFile] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const [totalCharCount, settotalCharCount] = useState<number>(0);
  const [cantAddMore, setCantAddMore] = useState<boolean>(false);
  const [totalFileLength, setTotalFileLength] = useState<number>(0);

  const [newLinks, setNewLinks] = useState<
    {
      id: number;
      url: string;
      content: string;
      isValid: boolean;
      isLoading: boolean;
      isScraped: boolean;
      isExisting?: boolean;
    }[]
  >([]);

  const [websiteContentLength, setWebsiteContentLength] = useState<number>(0);
  const { updateConnectStatus } = useAppSelector(selectIsConnect);

  useEffect(() => {
    if (agent?.file_urls) {
      const newExistingFiles: FileUrl[] = [];
      const updatedNewLinks: {
        id: number;
        url: string;
        content: string;
        isValid: boolean;
        isLoading: boolean;
        isScraped: boolean;
        isExisting?: boolean;
      }[] = [];

      agent.file_urls.forEach((file) => {
        if (file.website_url) {
          updatedNewLinks.push({
            id: file.id,
            url: file.website_url,
            content: file.text_content || "",
            isValid: true,
            isLoading: false,
            isScraped: true,
            isExisting: true,
          });
        } else {
          newExistingFiles.push(file);
        }
      });

      setExistingFiles(newExistingFiles);
      setNewLinks(updatedNewLinks);

      const totalWebsiteContentLength = updatedNewLinks.reduce(
        (total, data) => {
          return total + data.content.length;
        },
        0
      );

      setWebsiteContentLength(totalWebsiteContentLength);
    }
  }, [agent?.file_urls]);

  useEffect(() => {
    if (existingFiles) {
      const totalLength = existingFiles.reduce((sum, file) => {
        if (!file.website_url) {
          return sum + (file.text_content?.length || 0);
        }
        return sum;
      }, 0);
      setTotalFileLength(totalLength);
    }
  }, [existingFiles]);

  useEffect(() => {
    let newTotalCharCount =
      qaChar +
      textChar +
      filecharCount +
      totalFileLength +
      newLinks.reduce((sum, data) => sum + data.content.length, 0);

    settotalCharCount(newTotalCharCount);

    if (newTotalCharCount <= MAX_TOTAL_CHARS) {
      setCantAddMore(false);
    } else {
      toast.error("You have reached the maximum character limit");
      setCantAddMore(true);
    }
  }, [text, qaChar, filecharCount, totalFileLength, newLinks]);

  const handleUpdateAgent = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", agentID);
    formData.append("boc_connected", String(updateConnectStatus));
    newLinks.forEach((link, index) => {
      if (!link?.isExisting) {
        formData.append(`website_data[${index}][website_url]`, link.url);
        formData.append(
          `website_data[${index}][website_content]`,
          link.content
        );
      }
    });
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (text) {
      formData.append("text", text);
    } else {
      formData.append("text", "temp");
    }

    formData.append("qa", JSON.stringify(qaList));

    imagesFile.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await updateAgent(formData).unwrap();
      setLoading(false);
      toast.success("Agent successfully updated");
      setFiles([]);
    } catch (error: any) {
      setLoading(false);
      if (error.status === 400) {
        toast.error(error.data[0]);
        return;
      }
      console.error("Failed to update agent: ", error);
      toast.error(error.data?.message || "Failed to update agent");
    }
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-9 col-span-12">
          {checkOption === "files" && (
            <>
              <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-5">
                <div className="mb-10">
                  <div className="w-full mb-2">
                    <FileInput
                      files={files}
                      setFiles={setFiles}
                      setCharCount={setfileCharCount}
                      setFileCount={setFileCount}
                      setFileUrls={setFileUrls}
                      cantAddMore={cantAddMore}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    If you are uploading a PDF, make sure you can
                    select/highlight the text.
                  </p>
                </div>
              </div>
              {files.length > 0 && (
                <>
                  {files.map((file, index) => (
                    <div key={index}>
                      <FileTag
                        fileName={file.name}
                        fileUrl={fileUrls[index]}
                        existingFiles={existingFiles}
                        setExistingFiles={setExistingFiles}
                        files={files}
                        setFiles={setFiles}
                        setfileCharCount={setfileCharCount}
                        setFileCount={setFileCount}
                        isNew={true}
                        index={index}
                      />
                    </div>
                  ))}
                </>
              )}
              {nonImageFiles.length > 0 && (
                <>
                  {nonImageFiles.map((item, index) => (
                    <div key={index}>
                      <FileTag
                        fileName={item.file_name}
                        fileUrl={item.file_url}
                        existingFiles={existingFiles}
                        setExistingFiles={setExistingFiles}
                        files={files}
                        setFiles={setFiles}
                        setfileCharCount={setfileCharCount}
                        setFileCount={setFileCount}
                        isNew={false}
                        index={index}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
          {checkOption === "text" && (
            <div className="">
              <p className="font-bold text-2xl ">Text</p>
              <div className="w-full mt-5 mb-2">
                <textarea
                  className="focus:outline-none border border-gray-200 rounded-md w-full text-sm text-gray-700 px-3 py-2"
                  rows={18}
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
              <QAInput
                setQaChar={setQaChar}
                qaList={qaList}
                setQAList={setQAList}
                cantAddMore={cantAddMore}
              />
            </div>
          )}
          {checkOption === "imageTraining" && (
            <>
              <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-5">
                <div className="mb-10">
                  <div className="w-full mb-2">
                    <ImageTraining
                      agentId={agentId}
                      setTotalImage={setTotalImage}
                      agent={agent}
                      setImagesFile={setImagesFile}
                      imageFiles={imagesFile}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Make sure the image should not be blur and only contains
                    text.
                  </p>
                </div>
              </div>
              {imagesFile.length > 0 && (
                <>
                  {imagesFile.map((image, index) => (
                    <div key={index}>
                      <ImageTag
                        imageId={0}
                        imageUrl={undefined}
                        imageName={image.name}
                        index={index}
                        imageFiles={imagesFile}
                        setImagesFile={setImagesFile}
                        existingImgs={existingImgs}
                        setExistingImgs={setExistingImgs}
                        isNew={true}
                      />
                    </div>
                  ))}
                </>
              )}
              {existingImgs.length > 0 && (
                <>
                  {existingImgs.map((image, index) => (
                    <div key={index}>
                      <ImageTag
                        imageId={image.id}
                        imageName={image.file_name}
                        imageUrl={image.file_url}
                        index={index}
                        imageFiles={imagesFile}
                        setImagesFile={setImagesFile}
                        existingImgs={existingImgs}
                        setExistingImgs={setExistingImgs}
                        isNew={false}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
          {checkOption === "website" && (
            <WebsiteTraining
              setNewLinks={setNewLinks}
              setWebsiteContentLength={setWebsiteContentLength}
              newLinks={newLinks}
            />
          )}
        </div>
        <div className="md:col-span-3 col-span-12">
          <RightBar
            currentPage={currentPage}
            loading={loading}
            qaChar={qaChar}
            agentCreateFunc={handleUpdateAgent}
            charCount={filecharCount}
            fileCount={fileCount}
            existingFiles={existingFiles}
            textChar={textChar}
            checkOption={checkOption}
            totalImages={totalImages}
            totalCharCount={totalCharCount}
            cantAddMore={cantAddMore}
            totalFileLength={totalFileLength}
            websiteContentLength={websiteContentLength}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTraining;
