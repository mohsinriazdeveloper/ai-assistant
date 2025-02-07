import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

interface QAInputProps {
  qaList: { question: string; answer: string }[];
  setQAList: Dispatch<SetStateAction<{ question: string; answer: string }[]>>;
}

const QAInput: FC<QAInputProps> = ({ qaList, setQAList }) => {
  const handleAddQA = useCallback(() => {
    // if (cantAddMore) {
    //   toast.error("You cannot add more questions or answers.");
    //   return;
    // }

    if (qaList.length > 0) {
      const lastQA = qaList[qaList.length - 1];
      if (lastQA.question.trim() === "" || lastQA.answer.trim() === "") {
        toast.error("Please fill the fields before adding a new one.");
        return;
      }
    }

    setQAList((prevQAList) => [...prevQAList, { question: "", answer: "" }]);
  }, [qaList, setQAList]);

  const handleQAChange = useCallback(
    (
      index: number,
      key: keyof { question: string; answer: string },
      value: string
    ) => {
      setQAList((prevQAList) => {
        const updatedQAList = [...prevQAList];
        updatedQAList[index] = { ...updatedQAList[index], [key]: value };
        return updatedQAList;
      });
    },
    [setQAList]
  );

  const handleDeleteAll = useCallback(() => {
    setQAList([]);
  }, [setQAList]);

  const handleDeleteQA = useCallback(
    (index: number) => {
      // if (cantAddMore) {
      //   toast.error("You cannot delete questions or answers.");
      //   return;
      // }
      setQAList((prevQAList) => prevQAList.filter((_, i) => i !== index));
    },
    [setQAList]
  );

  // Update the qaChar whenever qaList changes

  const qaItems = useMemo(
    () =>
      qaList.map((qa, index) => (
        <div
          key={index}
          className="w-full border border-gray-200 rounded mt-5 pt-7 pb-4 px-3 text-sm text-gray-900"
        >
          <div className="flex justify-between items-center">
            <p>Question {index + 1}</p>
            <Image
              src={DeleteIcon}
              alt="Delete"
              className="w-5 cursor-pointer"
              onClick={() => handleDeleteQA(index)}
            />
          </div>
          <textarea
            className={`w-full focus:outline-none border border-gray-200 rounded px-3 py-1 mt-3 mb-4 `}
            rows={3}
            value={qa.question}
            onChange={(e) => handleQAChange(index, "question", e.target.value)}
          ></textarea>
          <p>Answer {index + 1}</p>
          <textarea
            className={`w-full focus:outline-none border border-gray-200 rounded px-3 py-1 mt-3`}
            rows={8}
            value={qa.answer}
            onChange={(e) => handleQAChange(index, "answer", e.target.value)}
          ></textarea>
        </div>
      )),
    [qaList, handleQAChange, handleDeleteQA]
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="font-bold text-[40px]">Q&A</p>
        <div className="flex justify-end items-center gap-4">
          {qaList.length > 0 && (
            <p
              className="text-sm text-red-500 font-medium cursor-pointer"
              onClick={handleDeleteAll}
            >
              Delete All
            </p>
          )}
          <div
            className="w-8 h-8 bg-black rounded flex justify-center items-center text-white text-xs cursor-pointer"
            onClick={handleAddQA}
          >
            <FaPlus />
          </div>
        </div>
      </div>
      {qaItems}
    </div>
  );
};

export default QAInput;
