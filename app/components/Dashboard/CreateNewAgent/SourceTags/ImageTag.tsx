// import Loader from "@/app/components/Loader/Loader";
// import { FileTags } from "@/app/components/UpdateTraining/trainingTypes";
// import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { RiDeleteBinLine } from "react-icons/ri";

// interface ImageTagProps {
//   imgName: string;
//   imgUrl: string | undefined;
//   imgError: string | null;
//   isNew: boolean;
//   index: number;
//   images: File[];
//   setImgs: Dispatch<SetStateAction<File[]>>;
//   imgsWithTags: FileTags[];
//   setImgsWithTags: Dispatch<SetStateAction<FileTags[]>>;
//   // imageId: number;
//   // imageName: string;
//   // imageUrl: string | undefined;
//   // index: number;
//   // imageFiles: File[];
//   // setImagesFile: Dispatch<SetStateAction<File[]>>;
//   // existingImgs: FileUrl[];
//   // setExistingImgs: Dispatch<SetStateAction<FileUrl[]>>;
//   // isNew: boolean;
// }

// const ImageTag: FC<ImageTagProps> = ({
//   imgName,
//   imgUrl,
//   imgError,
//   isNew,
//   index,
//   images,
//   setImgs,
//   imgsWithTags,
//   setImgsWithTags,
//   // imageId,
//   // imageName,
//   // index,
//   // imageFiles,
//   // setImagesFile,
//   // existingImgs,
//   // setExistingImgs,
//   // isNew,
// }) => {
//   const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
//   // const [sourceName, setSourceName] = useState<string>("");
//   // const [sourceContext, setSourceContext] = useState<string>("");
//   // const [sourceInstructions, setSourceInstructions] = useState<string>("");
//   const [sourceName, setSourceName] = useState<string>(
//     imgsWithTags[index]?.source_name || ""
//   );
//   const [sourceContext, setSourceContext] = useState<string>(
//     imgsWithTags[index]?.source_context || ""
//   );
//   const [sourceInstructions, setSourceInstructions] = useState<string>(
//     imgsWithTags[index]?.source_instructions || ""
//   );

//   useEffect(() => {
//     setImgsWithTags((prev) => {
//       const updatedImgs = [...prev];
//       if (images?.[index]) {
//         // Update existing file with the new source details
//         updatedImgs[index] = {
//           ...updatedImgs[index],
//           file: images[index],
//           source_name: sourceName,
//           source_context: sourceContext,
//           source_instructions: sourceInstructions,
//         };
//       }
//       return updatedImgs;
//     });
//   }, [
//     sourceName,
//     sourceContext,
//     sourceInstructions,
//     images,
//     index,
//     setImgsWithTags,
//   ]);

//   const handleDeleteNewImage = (index: number) => {
//     if (images) {
//       const fileToRemove = images[index];

//       setImgs((prevFiles) => {
//         const newFiles = prevFiles.filter((_, i) => i !== index);

//         // If there's only one file left, handle state correctly.
//         if (newFiles.length < 1) {
//           // Additional logic if needed, for example, reset some state.
//           setImgs([]);
//         }
//         return newFiles;
//       });
//       setImgsWithTags((prevTags) => prevTags.filter((_, i) => i !== index));
//       setTimeout(() => {
//         toast.success("File successfully deleted.");
//         setDeleteLoader(false);
//       }, 2000);
//     }
//   };

//   // const handleDeleteFile = async (index: number, id: number) => {
//   //   setImgLoader((prev) => ({ ...prev, [index]: true }));
//   //   try {
//   //     await delExistingFile(id).unwrap();
//   //     setExistingImgs((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   //     toast.success("Image successfully deleted");
//   //   } catch (error) {
//   //     console.error("Failed to delete file: ", error);
//   //     toast.error("Unable to delete File");
//   //   } finally {
//   //     setImgLoader((prev) => ({ ...prev, [index]: false }));
//   //   }
//   // };

//   const handleOpenImg = (url: string | undefined) => {
//     window.open(url, "_blank");
//   };
//   return (
//     <div className="w-full border border-gray-200 py-4 px-6 rounded-lg text-sm mb-4">
//       <div className="grid grid-cols-12 gap-3">
//         <div className="col-span-10 pt-1">
//           <p
//             className="text-blue-500 mb-5 underline cursor-pointer"
//             onClick={() => handleOpenImg(imgUrl)}
//           >
//             {imgName.length > 30 ? (
//               <>{imgName.slice(0, 30) + " ..."}</>
//             ) : (
//               <>{imgName}</>
//             )}
//           </p>
//           <div className="space-y-4">
//             <div>
//               <p>Source Name *</p>
//               <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
//                 <input
//                   type="text"
//                   placeholder="Source Unique Label"
//                   className="font-light focus:outline-none w-full"
//                   value={sourceName}
//                   onChange={(e) => setSourceName(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="w-full flex justify-between items-end">
//                 <p>Context/clarifications *</p>
//                 <p className="text-xs max-w-[345px]">
//                   Give more information and context to your AI about this data
//                   source. This will help the AI to fetch this data
//                   appropriately.
//                 </p>
//               </div>
//               <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
//                 <textarea
//                   rows={2}
//                   placeholder="Enter Context"
//                   className="focus:outline-none font-light w-full resize-none"
//                   value={sourceContext}
//                   onChange={(e) => setSourceContext(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="w-full flex justify-between items-end">
//                 <p>Instructions *</p>
//                 <p className="text-xs max-w-[345px]">
//                   Give instructions to your AI to help it understand how to use
//                   your data source.
//                 </p>
//               </div>
//               <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
//                 <textarea
//                   rows={2}
//                   placeholder="Enter Instructions"
//                   className="focus:outline-none font-light w-full resize-none"
//                   value={sourceInstructions}
//                   onChange={(e) => setSourceInstructions(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-span-2">
//           {imgError ? (
//             <button className="border border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C] rounded-lg px-3 py-1">
//               Failed
//             </button>
//           ) : (
//             <button className="border border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468] rounded-lg px-3 py-1">
//               Success
//             </button>
//           )}
//           {/* <p className="text-end text-[10px] font-semibold">
//             Jan 2024 - Aug 2024
//           </p> */}
//         </div>
//       </div>
//       <div className="flex justify-end items-end gap-3 mt-8">
//         {/* <button className="py-1 px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max">
//           Raw data
//         </button>
//         <button className="py-2 w-[120px] border border-[#0790FF] bg-[#0790FF] text-white hover:bg-transparent hover:text-[#0790FF] font-medium text-sm rounded-full">
//           Save
//         </button> */}

//         {deleteLoader ? (
//           <Loader />
//         ) : (
//           <>
//             {isNew ? (
//               <RiDeleteBinLine
//                 className="mb-1 cursor-pointer"
//                 onClick={() => handleDeleteNewImage(index)}
//               />
//             ) : (
//               <RiDeleteBinLine
//                 className="mb-1 cursor-pointer"
//                 // onClick={() => handleDeleteFile(index, imageId)}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageTag;
