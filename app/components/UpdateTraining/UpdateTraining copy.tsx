// "use client";
// import { FC, useEffect, useState } from "react";
// import FileInput from "../Dashboard/CreateNewAgent/FileInput";
// import ImageTraining from "../Dashboard/CreateNewAgent/ImageTraining";
// import QAInput from "../Dashboard/CreateNewAgent/QAInput";
// import ExistingFileTag from "../Dashboard/CreateNewAgent/SourceTags/ExistingFileTag";
// import FileTag from "../Dashboard/CreateNewAgent/SourceTags/FileTag";
// import ImageTag from "../Dashboard/CreateNewAgent/SourceTags/ImageTag";
// import WebsiteTraining from "../Dashboard/CreateNewAgent/WebsiteTraining";
// import {
//   useFileCharCountMutation,
//   useGetAgentByIdQuery,
//   useTrainByFilesMutation,
//   useTrainByImagesMutation,
//   useUpdateAgentMutation,
// } from "../ReduxToolKit/aiAssistantOtherApis";
// import { Files } from "../ReduxToolKit/types/agents";
// import RightBar from "./RightBar";
// import { FileInfo, FileTags, QATypes } from "./trainingTypes.d";

// interface UpdateTrainingProps {
//   agentId: number;
//   checkOption: string;
// }

// const MAX_TOTAL_CHARS = 400000;

// const UpdateTraining: FC<UpdateTrainingProps> = ({ agentId, checkOption }) => {
//   const [postGetFileImgChar, { isLoading: fileCharLoading }] =
//     useFileCharCountMutation();
//   const [trainByFiles, { isLoading: filesLoader }] = useTrainByFilesMutation();
//   const [trainByImages, { isLoading: imagesLoader }] =
//     useTrainByImagesMutation();
//   const [trainByTextQa, { isLoading: textQaLoader }] = useUpdateAgentMutation();
//   const { data: agent, isLoading: agentDataoading } =
//     useGetAgentByIdQuery(agentId);

//   const [filesToGetInfo, setFilesToGetInfo] = useState<File[]>([]);
//   const [fileInfo, setFileInfo] = useState<FileInfo[] | null>([]);
//   const [imageInfo, setImageInfo] = useState<FileInfo[] | null>([]);
//   const [fileChar, setFileChar] = useState<number>(0);
//   const [fileWithTags, setFileWithTags] = useState<FileTags[]>([]);
//   const [imgWithTags, setImgWithTags] = useState<FileTags[]>([]);
//   const [imgChar, setImgChar] = useState<number>(0);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [UploadedImgs, setUploadedImgs] = useState<File[]>([]);
//   const [websiteChar, setWebsiteChar] = useState<number>(0);
//   const [text, setText] = useState<string>("");
//   const [qaList, setQaList] = useState<QATypes[]>([]);
//   const [qaChar, setQaChar] = useState<number>(0);

//   const [existingFiles, setExistingFiles] = useState<Files[]>([]);
//   const [existingImgs, setExistingImgs] = useState<Files[]>([]);
//   const [existingWebsites, setExistingWebsites] = useState<Files[]>([]);

//   const allowedFiles = [
//     "application/pdf",
//     "text/plain",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];
//   const allowedImgs = ["image/png", "image/jpeg", "image/jpg"];
//   const filterByExtension = (list: FileInfo[], extensions: string[]) =>
//     list.filter((file) =>
//       extensions.includes(file.file_name.split(".").pop()?.toLowerCase() || "")
//     );

//   useEffect(() => {
//     updateCharCount();
//   }, [agent]);
//   useEffect(() => {
//     const total = qaList.reduce(
//       (acc, qa) => acc + qa.question.length + qa.answer.length,
//       0
//     );
//     setQaChar(total);
//   }, [qaList, setQaChar]);
//   useEffect(() => {
//     uploadFiles([...uploadedFiles, ...UploadedImgs]);
//   }, [uploadedFiles, UploadedImgs]);

//   const uploadFiles = async (files: File[]) => {
//     const fd = new FormData();
//     if (files.length >= 0) {
//       files.forEach((file) => {
//         if (allowedFiles.includes(file.type)) {
//           fd.append("files", file);
//         } else if (allowedImgs.includes(file.type)) {
//           fd.append("images", file);
//         }
//       });

//       try {
//         const fileUploadRes = await postGetFileImgChar({
//           id: agentId,
//           data: fd,
//         }).unwrap();

//         const images = filterByExtension(fileUploadRes, ["png", "jpg", "jpeg"]);
//         const documents = filterByExtension(fileUploadRes, [
//           "pdf",
//           "txt",
//           "docx",
//         ]);

//         const calculateCharCount = (list: FileInfo[]) =>
//           list.reduce((sum, file) => sum + file.characters_count, 0);

//         const imgCharSum = calculateCharCount(images);
//         const docCharSum = calculateCharCount(documents);

//         setImageInfo(images);
//         setFileInfo(documents);
//         setImgChar(imgCharSum);
//         setFileChar(docCharSum);
//       } catch (error) {
//         console.error("Error uploading files:", error);
//       }
//     }
//   };

//   const updateCharCount = () => {
//     if (agent?.text) {
//       setText(agent.text);
//     }
//     if (agent?.qa) {
//       setQaList(JSON.parse(agent?.qa));
//     }
//     if (agent?.files) {
//       const files = agent.files.filter((file) => file.file_category === "file");
//       const images = agent.files.filter(
//         (file) => file.file_category === "image"
//       );
//       const websites = agent.files.filter(
//         (file) => file.file_category === "website"
//       );
//       const filesChar = files.reduce(
//         (sum, file) => sum + (file.file_characters || 0),
//         0
//       );
//       const imagesChar = images.reduce(
//         (sum, file) => sum + (file.file_characters || 0),
//         0
//       );
//       const websiteChar = websites.reduce(
//         (sum, file) => sum + (file.file_characters || 0),
//         0
//       );
//       setTimeout(() => {
//         setExistingFiles(files);
//         setExistingImgs(images);
//         setExistingWebsites(websites);
//         setFileChar((prevValue) => prevValue + filesChar);
//         setImgChar((prevValue) => prevValue + imagesChar);
//         setWebsiteChar((prevValue) => prevValue + websiteChar);
//       }, 1000);
//     }
//   };

//   // const handleUpdateAgent = async () => {
//   //   if (!agentId) {
//   //     toast.error("Agent not found");
//   //     return;
//   //   }

//   //   // Flags to track changes
//   //   const fileChange = fileWithTags.length > 0;
//   //   const imgChange = imgWithTags.length > 0;
//   //   const textChange = !!text;
//   //   const qaListChange = qaList && qaList.length > 0;

//   //   // Handle file changes
//   //   if (fileChange) {
//   //     // Validate all files first
//   //     const validationErrors = fileWithTags.some((file) => {
//   //       if (!file.source_name) {
//   //         toast.error("Source Name is required");
//   //         return true;
//   //       }
//   //       if (file.source_name.length > 100) {
//   //         toast.error("Ensure source name has no more than 100 characters");
//   //         return true;
//   //       }
//   //       if (!file.source_context) {
//   //         toast.error("Context is required");
//   //         return true;
//   //       }
//   //       if (!file.source_instructions) {
//   //         toast.error("Instructions is required");
//   //         return true;
//   //       }
//   //       return false;
//   //     });

//   //     if (validationErrors) {
//   //       return;
//   //     }

//   //     const retrainErrors: any[] = [];

//   //     // Call the API for each valid file
//   //     for (const file of fileWithTags) {
//   //       const fileData = new FormData();
//   //       fileData.append("file", file.file);
//   //       fileData.append("source_name", file.source_name);
//   //       fileData.append("source_context", file.source_context);
//   //       fileData.append("source_instructions", file.source_instructions);

//   //       try {
//   //         const fileRes = await trainByFiles({ id: agentId, data: fileData });
//   //       } catch (error) {
//   //         retrainErrors.push(error);
//   //       }
//   //     }

//   //     // Show appropriate success or error messages
//   //     if (retrainErrors.length) {
//   //       toast.error("Error in training one or more files");
//   //     } else {
//   //       toast.success("All files successfully trained");
//   //     }

//   //     // Reset file-related state

//   //     setFileInfo([]);
//   //     setFileWithTags([]);
//   //     setUploadedFiles([]);
//   //   }
//   //   if (imgChange) {
//   //     // Validate all images first
//   //     const validationErrors = imgWithTags.some((image) => {
//   //       if (!image.source_name) {
//   //         toast.error("Source Name is required");
//   //         return true;
//   //       }
//   //       if (image.source_name.length > 100) {
//   //         toast.error("Ensure source name has no more than 100 characters");
//   //         return true;
//   //       }
//   //       if (!image.source_context) {
//   //         toast.error("Context is required");
//   //         return true;
//   //       }
//   //       if (!image.source_instructions) {
//   //         toast.error("Instructions is required");
//   //         return true;
//   //       }
//   //       return false;
//   //     });

//   //     if (validationErrors) {
//   //       return;
//   //     }

//   //     const retrainErrors: any[] = [];

//   //     // Call the API for each valid image
//   //     for (const image of imgWithTags) {
//   //       const imageData = new FormData();
//   //       imageData.append("image", image.file);
//   //       imageData.append("source_name", image.source_name);
//   //       imageData.append("source_context", image.source_context);
//   //       imageData.append("source_instructions", image.source_instructions);

//   //       try {
//   //         const imageRes = await trainByImages({
//   //           id: agentId,
//   //           data: imageData,
//   //         });
//   //       } catch (error) {
//   //         retrainErrors.push(error);
//   //       }
//   //     }

//   //     // Show appropriate success or error messages
//   //     if (retrainErrors.length) {
//   //       toast.error("Error in training one or more images");
//   //     } else {
//   //       toast.success("All images successfully trained");
//   //     }

//   //     setImgWithTags([]);
//   //     setUploadedImgs([]);
//   //     setImageInfo([]);
//   //   }

//   //   // Handle text changes
//   //   if (textChange || qaListChange) {
//   //     const textQAData = new FormData();
//   //     textQAData.append("id", agentId.toString());
//   //     if (textChange) textQAData.append("text", text);
//   //     if (qaListChange) textQAData.append("qa", JSON.stringify(qaList));

//   //     try {
//   //       const textQaRes = await trainByTextQa(textQAData).unwrap();
//   //       toast.success("Successfully trained by text");
//   //     } catch (error) {
//   //       console.error("Error text training agent:", error);
//   //       toast.error("Error in text upload");
//   //     }
//   //   }
//   // };
//   const handleUpdateAgent = async () => {};
//   return (
//     <div className="h-[80vh] my-5 px-10 overflow-hidden overflow-y-auto primaryScroller mr-2">
//       <div className="mt-10 ">
//         <div className="grid grid-cols-12 gap-4">
//           <div className="md:col-span-9 col-span-12">
//             {checkOption === "files" && (
//               <>
//                 <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-5">
//                   <div className="mb-10">
//                     <div className="w-full mb-2">
//                       <FileInput
//                         files={uploadedFiles}
//                         setFiles={setUploadedFiles}
//                         fileCharLoading={fileCharLoading}
//                       />
//                     </div>
//                     <p className="text-xs text-gray-500 text-center">
//                       If you are uploading a PDF, make sure you can
//                       select/highlight the text.
//                     </p>
//                   </div>
//                 </div>
//                 {fileInfo && fileInfo.length > 0 && (
//                   <>
//                     {fileInfo.map((info, index) => (
//                       <div key={index}>
//                         <FileTag
//                           fileName={info.file_name}
//                           fileUrl={info.file_url}
//                           fileError={info.error_message}
//                           isNew={true}
//                           index={index}
//                           files={uploadedFiles}
//                           setFiles={setUploadedFiles}
//                           fileWithTags={fileWithTags}
//                           setFileWithTags={setFileWithTags}
//                         />
//                       </div>
//                     ))}
//                   </>
//                 )}
//                 {existingFiles.length > 0 && (
//                   <div>
//                     <div className="flex justify-center items-center gap-2 my-2 w-full ">
//                       <div className="border-b border-gray-700 w-full"></div>
//                       <p className="min-w-max">Existing Files</p>
//                       <div className="border-b border-gray-700 w-full"></div>
//                     </div>
//                     {existingFiles.map((item, index) => (
//                       <div key={index}>
//                         <ExistingFileTag
//                           id={item.id}
//                           fileName={item.file_name}
//                           fileUrl={item.file_url}
//                           source_Name={item.source_name}
//                           source_Context={item.source_context}
//                           source_Instructions={item.source_instructions}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//             {checkOption === "text" && (
//               <div className="">
//                 <p className="font-bold text-2xl ">Text</p>
//                 <div className="w-full mt-5 mb-2">
//                   <textarea
//                     className="focus:outline-none border border-gray-200 rounded-md w-full text-sm text-gray-700 px-3 py-2"
//                     rows={18}
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                   />
//                 </div>
//                 <p className="text-center text-sm text-gray-500">
//                   {text.length} Characters
//                 </p>
//               </div>
//             )}
//             {checkOption === "qa" && (
//               <div>
//                 <QAInput qaList={qaList} setQAList={setQaList} />
//               </div>
//             )}
//             {checkOption === "imageTraining" && (
//               <>
//                 <div className="w-full border border-gray-200 py-4 px-6 rounded-lg mb-5">
//                   <div className="mb-10">
//                     <div className="w-full mb-2">
//                       <ImageTraining
//                         setImagesFile={setUploadedImgs}
//                         imageFiles={UploadedImgs}
//                         fileCharLoading={fileCharLoading}
//                       />
//                     </div>
//                     <p className="text-xs text-gray-500 text-center">
//                       Make sure the image should not be blur and only contains
//                       text.
//                     </p>
//                   </div>
//                 </div>
//                 {imageInfo && imageInfo.length > 0 && (
//                   <>
//                     {imageInfo.map((image, index) => (
//                       <div key={index}>
//                         <ImageTag
//                           imgName={image.file_name}
//                           imgUrl={image.file_url}
//                           imgError={image.error_message}
//                           isNew={true}
//                           index={index}
//                           images={UploadedImgs}
//                           setImgs={setUploadedImgs}
//                           imgsWithTags={imgWithTags}
//                           setImgsWithTags={setImgWithTags}
//                         />
//                       </div>
//                     ))}
//                   </>
//                 )}
//                 {existingImgs.length > 0 && (
//                   <div>
//                     <div className="flex justify-center items-center gap-2 my-2 w-full ">
//                       <div className="border-b border-gray-700 w-full"></div>
//                       <p className="min-w-max">Existing Images</p>
//                       <div className="border-b border-gray-700 w-full"></div>
//                     </div>
//                     {existingImgs.map((item, index) => (
//                       <div key={index}>
//                         <ExistingFileTag
//                           id={item.id}
//                           fileName={item.file_name}
//                           fileUrl={item.file_url}
//                           source_Name={item.source_name}
//                           source_Context={item.source_context}
//                           source_Instructions={item.source_instructions}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//             {checkOption === "website" && (
//               <div>
//                 <WebsiteTraining
//                   agentId={agentId}
//                   setWebsiteChar={setWebsiteChar}
//                 />
//                 {existingWebsites.length > 0 && (
//                   <div>
//                     <div className="flex justify-center items-center gap-2 my-2 w-full ">
//                       <div className="border-b border-gray-700 w-full"></div>
//                       <p className="min-w-max">Existing Websites</p>
//                       <div className="border-b border-gray-700 w-full"></div>
//                     </div>
//                     {existingWebsites.map((item, index) => (
//                       <div key={index}>
//                         <ExistingFileTag
//                           id={item.id}
//                           source_Name={item.source_name}
//                           source_Context={item.source_context}
//                           source_Instructions={item.source_instructions}
//                           website_auto_update={item.website_auto_update}
//                           website_url={item.website_url}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//           <div className="md:col-span-3 col-span-12">
//             <RightBar
//               fileChar={fileChar}
//               imgChar={imgChar}
//               agentCreateFunc={handleUpdateAgent}
//               websiteChar={websiteChar}
//               textChar={text.length}
//               qaChar={qaChar}
//               checkOption={checkOption}
//               filesLoader={filesLoader}
//               imagesLoader={imagesLoader}
//               textQaLoader={textQaLoader}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateTraining;
