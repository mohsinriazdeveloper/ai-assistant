import { Dispatch, FC, SetStateAction, useCallback, useMemo } from "react";
import PlusIcon from "@/app/assets/icons/plus.png";
import Image from "next/image";
import DeleteIcon from "@/app/assets/icons/recyclebin.png";
import toast from "react-hot-toast";

interface QAInputProps {
  qaList: { question: string; answer: string }[];
  setQAList: Dispatch<SetStateAction<{ question: string; answer: string }[]>>;
  setQaChar: Dispatch<SetStateAction<number>>;
  cantAddMore: boolean;
}

const QAInput: FC<QAInputProps> = ({
  qaList,
  setQAList,
  setQaChar,
  cantAddMore,
}) => {
  const handleAddQA = useCallback(() => {
    if (cantAddMore) {
      toast.error("You cannot add more questions or answers.");
      return;
    }

    if (qaList.length > 0) {
      const lastQA = qaList[qaList.length - 1];
      if (lastQA.question.trim() === "" || lastQA.answer.trim() === "") {
        toast.error("Please fill the fields before adding a new one.");
        return;
      }
    }

    setQAList((prevQAList) => [...prevQAList, { question: "", answer: "" }]);
  }, [qaList, setQAList, cantAddMore]);

  const handleQAChange = useCallback(
    (
      index: number,
      key: keyof { question: string; answer: string },
      value: string
    ) => {
      // if (cantAddMore) {
      //   toast.error("You cannot edit questions or answers.");
      //   return;
      // }

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
      if (cantAddMore) {
        toast.error("You cannot delete questions or answers.");
        return;
      }
      setQAList((prevQAList) => prevQAList.filter((_, i) => i !== index));
    },
    [setQAList, cantAddMore]
  );

  setQaChar(
    useMemo(() => {
      const total = qaList.reduce(
        (acc, qa) => acc + qa.question.length + qa.answer.length,
        0
      );
      return total;
    }, [qaList])
  );

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
            className={`w-full focus:outline-none border border-gray-200 rounded px-3 py-1 mt-3 mb-4 ${
              cantAddMore ? "bg-gray-200" : ""
            }`}
            rows={3}
            value={qa.question}
            onChange={(e) => handleQAChange(index, "question", e.target.value)}
          ></textarea>
          <p>Answer {index + 1}</p>
          <textarea
            className={`w-full focus:outline-none border border-gray-200 rounded px-3 py-1 mt-3 ${
              cantAddMore ? "bg-gray-200" : ""
            }`}
            rows={8}
            value={qa.answer}
            onChange={(e) => handleQAChange(index, "answer", e.target.value)}
          ></textarea>
        </div>
      )),
    [qaList, handleQAChange, handleDeleteQA, cantAddMore]
  );

  return (
    <div className="w-full">
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
          className="w-9 h-9 bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer"
          onClick={handleAddQA}
        >
          <Image src={PlusIcon} alt="Add" className="w-3" />
        </div>
      </div>
      {qaItems}
    </div>
  );
};

export default QAInput;
