"use client";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FileInput from "../Dashboard/CreateNewAgent/FileInput";
import ImageTraining from "../Dashboard/CreateNewAgent/ImageTraining";
import QAInput from "../Dashboard/CreateNewAgent/QAInput";
import ExistingFileTag from "../Dashboard/CreateNewAgent/SourceTags/ExistingFileTag";
import FileTag from "../Dashboard/CreateNewAgent/SourceTags/FileTag";
import WebsiteTraining from "../Dashboard/CreateNewAgent/WebsiteTraining";
import {
  useFileCharCountMutation,
  useGetAgentByIdQuery,
  useTrainByFilesMutation,
  useTrainByImagesMutation,
  useTrainByWebsiteMutation,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { Files } from "../ReduxToolKit/types/agents";
import RightBar from "./RightBar";
import {
  FileInfo,
  FileTags,
  QATypes,
  Validation,
  WebsiteTags,
} from "./trainingTypes";

interface UpdateTrainingProps {
  agentId: number;
  checkOption: string;
}

const UpdateTraining: FC<UpdateTrainingProps> = ({ agentId, checkOption }) => {
  const { data: agent, isLoading: agentDataoading } =
    useGetAgentByIdQuery(agentId);

  const [postGetFileImgChar, { isLoading: fileCharLoading }] =
    useFileCharCountMutation();
  const [trainByFiles, { isLoading: filesLoader }] = useTrainByFilesMutation();
  const [trainByImages, { isLoading: imagesLoader }] =
    useTrainByImagesMutation();
  const [trainByTextQa, { isLoading: textQaLoader }] = useUpdateAgentMutation();
  const [trainByWebsite, { isLoading: webLoader }] =
    useTrainByWebsiteMutation();

  const [fileInfo, setFileInfo] = useState<FileInfo[] | null>([]);
  const [imageInfo, setImageInfo] = useState<FileInfo[] | null>([]);

  const [fileChar, setFileChar] = useState<number>(0);
  const [imgChar, setImgChar] = useState<number>(0);
  const [websiteChar, setWebsiteChar] = useState<number>(0);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [UploadedImgs, setUploadedImgs] = useState<File[]>([]);

  const [fileWithTags, setFileWithTags] = useState<FileTags[]>([]);
  const [imgWithTags, setImgWithTags] = useState<FileTags[]>([]);
  const [webWithTags, setWebWithTags] = useState<WebsiteTags[]>([]);

  const [existingFiles, setExistingFiles] = useState<Files[]>([]);
  const [existingImgs, setExistingImgs] = useState<Files[]>([]);
  const [existingWebsites, setExistingWebsites] = useState<Files[]>([]);

  const [text, setText] = useState<string>("");
  const [qaList, setQaList] = useState<QATypes[]>([]);
  const [qaChar, setQaChar] = useState<number>(0);

  const [uploadFlag, setUploadFlag] = useState<boolean>(false);
  const [prevText, setPrevText] = useState<string | null>(null);
  const [prevQaList, setPrevQaList] = useState<QATypes[] | null>(null);

  const [webLinkError, setWebLinkError] = useState<boolean>(true);

  const [fileValidations, setFileValidations] = useState<Validation[]>(
    fileWithTags.map(() => ({
      sourceName: false,
      sourceContext: false,
      sourceInstructions: false,
    }))
  );
  const [imageValidations, setImageValidations] = useState<Validation[]>(
    imgWithTags.map(() => ({
      sourceName: false,
      sourceContext: false,
      sourceInstructions: false,
    }))
  );
  const [webValidations, setWebValidations] = useState<Validation[]>(
    webWithTags.map(() => ({
      webUrl: false,
      sourceName: false,
      sourceContext: false,
      sourceInstructions: false,
    }))
  );

  const allowedFiles = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const allowedImgs = ["image/png", "image/jpeg", "image/jpg"];
  const filterByExtension = (list: FileInfo[], extensions: string[]) =>
    list.filter((file) =>
      extensions.includes(file.file_name.split(".").pop()?.toLowerCase() || "")
    );

  useEffect(() => {
    const total = qaList.reduce(
      (acc, qa) => acc + qa.question.length + qa.answer.length,
      0
    );
    setQaChar(total);
  }, [qaList, setQaChar]);
  useEffect(() => {
    const totalCharacters = fileInfo?.reduce(
      (sum, file) => sum + file.characters_count,
      0
    );

    if (totalCharacters !== undefined) {
      setFileChar((prevFileChar) => prevFileChar + totalCharacters);
    }
  }, [fileInfo]);
  useEffect(() => {
    const totalCharacters = imageInfo?.reduce(
      (sum, file) => sum + file.characters_count,
      0
    );

    if (totalCharacters !== undefined) {
      setImgChar((prevFileChar) => prevFileChar + totalCharacters);
    }
  }, [imageInfo]);

  useEffect(() => {
    updateCharCount();
  }, [agent]);
  useEffect(() => {
    if (uploadFlag) {
      uploadFiles(uploadedFiles);
    }
  }, [uploadedFiles, uploadFlag]);
  useEffect(() => {
    if (uploadFlag) {
      uploadFiles(UploadedImgs);
    }
  }, [UploadedImgs, uploadFlag]);

  const updateCharCount = () => {
    if (agent?.text) {
      setText(agent.text);
    }
    if (agent?.qa) {
      setQaList(JSON.parse(agent?.qa));
    }
    if (agent?.files) {
      const files = agent.files.filter((file) => file.file_category === "file");
      const images = agent.files.filter(
        (file) => file.file_category === "image"
      );
      const websites = agent.files.filter(
        (file) => file.file_category === "website"
      );
      const filesChar = files.reduce(
        (sum, file) => sum + (file.file_characters || 0),
        0
      );
      const imagesChar = images.reduce(
        (sum, file) => sum + (file.file_characters || 0),
        0
      );
      const websiteChar = websites.reduce(
        (sum, file) => sum + (file.file_characters || 0),
        0
      );
      // setTimeout(() => {
      setExistingFiles(files);
      setExistingImgs(images);
      setExistingWebsites(websites);
      setFileChar((prevValue) => prevValue + filesChar);
      setImgChar((prevValue) => prevValue + imagesChar);
      setWebsiteChar((prevValue) => prevValue + websiteChar);
      // }, 1000);
    }
  };
  const mergeFileInfo = (newFiles: FileInfo[]) => {
    console.log("here we go again");
    setFileInfo((prevFiles) => {
      // If `prevFiles` is null or empty, initialize with new files
      if (!prevFiles || prevFiles.length === 0) {
        return newFiles;
      }

      // Create a new merged array, avoiding direct mutations
      const mergedFiles = [...prevFiles];

      newFiles.forEach((newFile) => {
        const isDuplicate = mergedFiles.some(
          (file) => file.file_id === newFile.file_id
        );
        if (!isDuplicate) {
          mergedFiles.push(newFile);
        }
      });

      return mergedFiles;
    });
  };
  const mergeImgInfo = (newImgs: FileInfo[]) => {
    setImageInfo((prevImgs) => {
      // If `prevFiles` is null or empty, initialize with new files
      if (!prevImgs || prevImgs.length === 0) {
        return newImgs;
      }

      // Create a new merged array, avoiding direct mutations
      const mergedImgs = [...prevImgs];

      newImgs.forEach((newImg) => {
        const isDuplicate = mergedImgs.some(
          (img) => img.file_id === newImg.file_id
        );
        if (!isDuplicate) {
          mergedImgs.push(newImg);
        }
      });

      return mergedImgs;
    });
  };

  // Usage inside uploadFiles
  const uploadFiles = async (files: File[]) => {
    const fd = new FormData();
    if (files.length > 0) {
      files.forEach((file) => {
        if (allowedFiles.includes(file.type)) {
          fd.append("files", file);
        } else if (allowedImgs.includes(file.type)) {
          fd.append("images", file);
        }
      });

      try {
        const fileUploadRes = await postGetFileImgChar({
          id: agentId,
          data: fd,
        }).unwrap();
        fileUploadRes.forEach((item: any) => {
          if (item.error_message) {
            toast.error(` ${item.error_message}`);
          }
        });
        const documents = filterByExtension(fileUploadRes, [
          "pdf",
          "txt",
          "docx",
        ]);
        const images = filterByExtension(fileUploadRes, ["png", "jpg", "jpeg"]);
        setUploadFlag(false);
        setUploadedFiles([]);
        setUploadedImgs([]);
        if (images.length > 0) {
          mergeImgInfo(images);
        }
        if (documents.length > 0) {
          mergeFileInfo(documents);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };
  const handleUpdateAgent = async () => {
    const isError: any[] = [];
    const isSuccess: any[] = [];
    const fileChange = fileWithTags.length > 0;
    const imgChange = imgWithTags.length > 0;
    const textChange = text !== prevText;
    console.log(textChange);
    console.log(text);
    const webChange = webWithTags.length > 0;
    const qaListChange =
      qaList && JSON.stringify(qaList) !== JSON.stringify(prevQaList);

    if (fileChange) {
      setFileValidations(
        fileWithTags.map((file) => ({
          sourceName: !file.source_name || file.source_name.length > 100,
          sourceContext: !file.source_context,
          sourceInstructions: !file.source_instructions,
        }))
      );
      const validationErrors = fileWithTags.some((file, index) => {
        if (!file.source_name) {
          toast.error("Source Name is required in file");

          return true;
        }
        if (file.source_name.length > 100) {
          toast.error(
            "Ensure source name has no more than 100 characters in file"
          );
          return true;
        }
        if (!file.source_context) {
          toast.error("Context is required in file");
          return true;
        }
        if (!file.source_instructions) {
          toast.error("Instructions is required in file");
          return true;
        }
        return false;
      });

      if (validationErrors) {
        return;
      }
      try {
        await trainByFiles(fileWithTags).unwrap();
        setFileWithTags([]);
        setFileInfo([]);
        setFileChar(0);
        setWebsiteChar(0);
        setImgChar(0);
        isSuccess.push("success");
      } catch (error) {
        isError.push({ error, msg: ", files" });
      }
    }
    if (imgChange) {
      setImageValidations(
        imgWithTags.map((img) => ({
          sourceName: !img.source_name || img.source_name.length > 100,
          sourceContext: !img.source_context,
          sourceInstructions: !img.source_instructions,
        }))
      );
      const validationErrors = imgWithTags.some((image) => {
        if (!image.source_name) {
          toast.error("Source Name is required in image");
          return true;
        }
        if (image.source_name.length > 100) {
          toast.error(
            "Ensure source name has no more than 100 characters in image"
          );
          return true;
        }
        if (!image.source_context) {
          toast.error("Context is required in image");
          return true;
        }
        if (!image.source_instructions) {
          toast.error("Instructions is required in image");
          return true;
        }
        return false;
      });

      if (validationErrors) {
        return;
      }
      try {
        await trainByImages(imgWithTags).unwrap();
        setImgWithTags([]);
        setImageInfo([]);
        setFileChar(0);
        setWebsiteChar(0);
        setImgChar(0);
        isSuccess.push("success");
      } catch (error) {
        isError.push({ error, msg: ", images" });
      }
    }
    if (textChange || qaListChange) {
      const textQAData = new FormData();
      textQAData.append("id", agentId.toString());

      if (text === "") textQAData.append("text", `""`);
      if (textChange && text !== "") textQAData.append("text", text);
      if (qaListChange) textQAData.append("qa", JSON.stringify(qaList));

      try {
        const textQaRes = await trainByTextQa(textQAData).unwrap();
        setFileChar(0);
        setWebsiteChar(0);
        setImgChar(0);

        // Update previous states
        setPrevText(text);
        setPrevQaList(qaList);
        isSuccess.push("success");
      } catch (error) {
        console.error("Error text training agent:", error);
        isError.push({ error, msg: ", text or QA" });
      }
    }
    if (webChange) {
      if (webLinkError) {
        toast.error("Please enter a valid web url");
        return;
      }
      setWebValidations(
        webWithTags.map((file) => ({
          sourceName: !file.source_name || file.source_name.length > 100,
          sourceContext: !file.source_context,
          sourceInstructions: !file.source_instructions,
        }))
      );
      const validationErrors = webWithTags.some((item) => {
        if (!item.source_name) {
          toast.error("Source Name is required in website");
          return true;
        }
        if (item.source_name.length > 100) {
          toast.error(
            "Ensure source name has no more than 100 characters in website"
          );
          return true;
        }
        if (!item.source_context) {
          toast.error("Context is required in website");
          return true;
        }
        if (!item.source_instructions) {
          toast.error("Instructions is required in website");
          return true;
        }
        return false;
      });

      if (validationErrors) {
        return;
      }

      for (const web of webWithTags) {
        const webData = new FormData();
        webData.append("website_url", web.website_url);
        webData.append("source_name", web.source_name);
        webData.append("source_context", web.source_context);
        webData.append("source_instructions", web.source_instructions);
        webData.append("website_auto_update", web.website_auto_update);
        try {
          const fileRes = await trainByWebsite({ id: agentId, data: webData });
          setWebWithTags([]);
          console.log(fileRes);
          setFileChar(0);
          setWebsiteChar(0);
          setImgChar(0);
          if (fileRes.error) {
            toast.error(
              //@ts-ignore
              `${fileRes.error.data.error_message}, ${fileRes.error.data.website_url}`
            );
          }
          console.log(fileRes);
          isSuccess.push("success");
        } catch (error) {
          isError.push({ error, msg: ", web scrapping" });
        }
      }
    }

    if (isSuccess.length > 0) {
      toast.success("Agent trained successfully");
    }
    if (isError.length > 0) {
      toast.error(
        `Failed to train agent: ${isError.map((err) => err.msg).join(", ")}`
      );
    }
  };

  console.log("filechar: ", fileChar);
  console.log("imagechar: ", imgChar);
  return (
    <div className="h-[80vh] my-5 px-10 overflow-hidden overflow-y-auto primaryScroller mr-2">
      <div className="mt-10 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-9 col-span-12">
            {checkOption === "files" && (
              <>
                <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-5">
                  <div className="mb-10">
                    <div className="w-full mb-2">
                      <FileInput
                        files={uploadedFiles}
                        setFiles={setUploadedFiles}
                        fileCharLoading={fileCharLoading}
                        setUploadFlag={setUploadFlag}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      If you are uploading a PDF, make sure you can
                      select/highlight the text.
                    </p>
                  </div>
                </div>
                {fileInfo && fileInfo.length > 0 && (
                  <>
                    {fileInfo.map((info, index) => (
                      <div key={index}>
                        <FileTag
                          fileId={info.file_id}
                          fileName={info.file_name}
                          fileUrl={info.file_url}
                          fileError={info.error_message}
                          fileWithTags={fileWithTags}
                          setFileWithTags={setFileWithTags}
                          fileInfo={fileInfo}
                          setFileInfo={setFileInfo}
                          index={index}
                          setFileChar={setFileChar}
                          setValidations={setFileValidations}
                          validations={fileValidations}
                        />
                      </div>
                    ))}
                  </>
                )}
                {existingFiles.length > 0 && (
                  <div>
                    <div className="flex justify-center items-center gap-2 my-2 w-full ">
                      <div className="border-b border-gray-700 w-full"></div>
                      <p className="min-w-max">Existing Files</p>
                      <div className="border-b border-gray-700 w-full"></div>
                    </div>
                    {existingFiles.map((item, index) => (
                      <div key={index}>
                        <ExistingFileTag
                          setUploadFlag={setUploadFlag}
                          id={item.id}
                          fileName={item.file_name}
                          fileUrl={item.file_url}
                          source_Name={item.source_name}
                          source_Context={item.source_context}
                          source_Instructions={item.source_instructions}
                          setWebChar={setWebsiteChar}
                          setFileChar={setFileChar}
                          setImgChar={setImgChar}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {checkOption === "imageTraining" && (
              <>
                <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-5">
                  <div className="mb-10">
                    <div className="w-full mb-2">
                      <ImageTraining
                        setImagesFile={setUploadedImgs}
                        imageFiles={UploadedImgs}
                        fileCharLoading={fileCharLoading}
                        setUploadFlag={setUploadFlag}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Make sure the image should not be blur and only contains
                      text.
                    </p>
                  </div>
                </div>
                {imageInfo && imageInfo.length > 0 && (
                  <>
                    {imageInfo.map((image, index) => (
                      <div key={index}>
                        <FileTag
                          fileId={image.file_id}
                          fileName={image.file_name}
                          fileUrl={image.file_url}
                          fileError={image.error_message}
                          fileWithTags={imgWithTags}
                          setFileWithTags={setImgWithTags}
                          fileInfo={imageInfo}
                          setFileInfo={setImageInfo}
                          index={index}
                          setFileChar={setImgChar}
                          setValidations={setImageValidations}
                          validations={imageValidations}
                        />
                      </div>
                    ))}
                  </>
                )}
                {existingImgs.length > 0 && (
                  <div>
                    <div className="flex justify-center items-center gap-2 my-2 w-full ">
                      <div className="border-b border-gray-700 w-full"></div>
                      <p className="min-w-max">Existing Images</p>
                      <div className="border-b border-gray-700 w-full"></div>
                    </div>
                    {existingImgs.map((item, index) => (
                      <div key={index}>
                        <ExistingFileTag
                          setUploadFlag={setUploadFlag}
                          id={item.id}
                          fileName={item.file_name}
                          fileUrl={item.file_url}
                          source_Name={item.source_name}
                          source_Context={item.source_context}
                          source_Instructions={item.source_instructions}
                          setWebChar={setWebsiteChar}
                          setFileChar={setFileChar}
                          setImgChar={setImgChar}
                        />
                      </div>
                    ))}
                  </div>
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
                  {text.length} Characters
                </p>
              </div>
            )}
            {checkOption === "qa" && (
              <div>
                <QAInput qaList={qaList} setQAList={setQaList} />
              </div>
            )}
            {checkOption === "website" && (
              <div>
                <WebsiteTraining
                  webWithTags={webWithTags}
                  setWebWithTags={setWebWithTags}
                  setWebValidations={setWebValidations}
                  webValidations={webValidations}
                  setWebLinkError={setWebLinkError}
                />
                {existingWebsites.length > 0 && (
                  <div>
                    <div className="flex justify-center items-center gap-2 my-2 w-full ">
                      <div className="border-b border-gray-700 w-full"></div>
                      <p className="min-w-max">Existing Websites</p>
                      <div className="border-b border-gray-700 w-full"></div>
                    </div>
                    {existingWebsites.map((item, index) => (
                      <div key={index}>
                        <ExistingFileTag
                          setUploadFlag={setUploadFlag}
                          id={item.id}
                          fileName={item.file_name}
                          fileUrl={item.file_url}
                          source_Name={item.source_name}
                          source_Context={item.source_context}
                          source_Instructions={item.source_instructions}
                          setWebChar={setWebsiteChar}
                          setFileChar={setFileChar}
                          setImgChar={setImgChar}
                          website_url={item.website_url}
                          website_auto_update={item.website_auto_update}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="md:col-span-3 col-span-12">
            <RightBar
              fileChar={fileChar}
              imgChar={imgChar}
              agentCreateFunc={handleUpdateAgent}
              websiteChar={websiteChar}
              textChar={text.length}
              qaChar={qaChar}
              checkOption={checkOption}
              filesLoader={filesLoader}
              imagesLoader={imagesLoader}
              textQaLoader={textQaLoader}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTraining;
