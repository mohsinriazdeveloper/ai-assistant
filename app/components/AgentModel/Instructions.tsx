"use client";
import DownCarret from "@/app/assets/icons/DownCarret";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { content } from "./content";
import { useGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";

interface InstructionsProps {
  agentId: any;
  setInsturctionContent: Dispatch<SetStateAction<string>>;
  instructionContent: string;
}

const Instructions: FC<InstructionsProps> = ({
  agentId,
  setInsturctionContent,
  instructionContent,
}) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [instructionValue, setInstructionValue] = useState<string>("Ai Agent");
  const [instructions, setInstructions] = useState<string>("");
  // const { data: allAgents } = useGetAllAgentsQuery();
  // const agent = allAgents?.find(
  //   (agent) => agent.id.toString() === agentId.toString()
  // );
  // const [instructionContent, setInsturctionContent] = useState<string>(
  //   //@ts-ignore
  //   "" || agent?.text
  // );
  // Function to find the description based on the selected option
  const findDescription = (option: string) => {
    const selected = content.instructionContent.find(
      (item) => item.title === option
    );
    return selected ? selected.description : "";
  };

  // Set the initial instruction description
  useEffect(() => {
    setInstructions(findDescription(instructionValue));
  }, [instructionValue]);

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-300 font-medium">Instructions</p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              onClick={() => setOpenOptions(!openOptions)}
              className="cursor-pointer border border-gray-200 rounded-md text-sm px-3 py-2 flex justify-between items-center gap-2 min-w-fit"
            >
              <p>{instructionValue}</p>
              <DownCarret />
            </div>
            {openOptions && (
              <div className="absolute w-[210px] border border-gray-200 rounded-md text-sm bg-white z-10 p-1 mt-1">
                {content.instructionOptions.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setOpenOptions(!openOptions);
                      setInstructionValue(item);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              onClick={() => {
                setInstructionValue("Ai Agent");
                setInstructions(findDescription("Ai Agent"));
              }}
              className="py-2 px-5 hover:bg-[#3C3C3F] bg-gray-200 text-black hover:text-white font-medium rounded-md text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 border border-gray-200 rounded-md text-sm px-3 py-2">
        <textarea
          name=""
          id=""
          value={instructionContent}
          onChange={(e) => setInsturctionContent(e.target.value)}
          rows={16}
          className="focus:outline-none w-full "
        />
      </div>
      <div>
        <p className="text-gray-900">
          The instructions allow you to customize your agent personality and
          style. Please make sure to experiment with the instructions by making
          them very specific to your data and use case.
        </p>
      </div>
    </div>
  );
};

export default Instructions;
