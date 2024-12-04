"use client";
import DownCarret from "@/app/assets/icons/DownCarret";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import { InstructionsType } from "../ReduxToolKit/types/agents.d";

interface InstructionsProps {
  agentId: any;
  setInsturctionContent: Dispatch<SetStateAction<string>>;
  instructionContent: string;
  setInstructionId: Dispatch<SetStateAction<number | undefined>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
}

const Instructions: FC<InstructionsProps> = ({
  agentId,
  setInsturctionContent,
  instructionContent,
  setInstructionId,
  setIsActive,
}) => {
  const { data: allAgents } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );

  const [instructionArr, setInstructionArr] = useState<InstructionsType[]>([]);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");

  useEffect(() => {
    if (agent?.instructions) {
      setInstructionArr(agent.instructions || []);
      const activeInstruction = agent.instructions.find(
        (item) => item.is_active === true
      );

      const defaultInstruction = activeInstruction
        ? activeInstruction
        : agent.instructions.find((item) => item.title === "Ai Agent");

      if (defaultInstruction) {
        setOption(defaultInstruction.title);
        setInsturctionContent(defaultInstruction.instructions);
        setInstructionId(defaultInstruction.id);
      }
    }
  }, [agent]);

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
              <p>{option}</p>
              <DownCarret />
            </div>
            {openOptions && (
              <div className="absolute w-[210px] border border-gray-200 rounded-md text-sm bg-white z-10 p-1 mt-1">
                {instructionArr.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setOpenOptions(!openOptions);
                      setOption(item.title);
                      setInsturctionContent(item.instructions);
                      setInstructionId(item.id);
                      setIsActive(true);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setOption("Ai Agent");
                const defaultInstruction = instructionArr.find(
                  (item) => item.title === "Ai Agent"
                );
                if (defaultInstruction) {
                  setInsturctionContent(defaultInstruction.instructions);
                  setInstructionId(defaultInstruction.id);
                }
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
