import { Dispatch, FC, SetStateAction } from "react";

interface DeleteAgentProps {
  setOpenDialogue: Dispatch<SetStateAction<boolean>>;
}

const DeleteAgent: FC<DeleteAgentProps> = ({ setOpenDialogue }) => {
  return (
    <div className="border border-red-500 rounded-lg py-7 px-6 flex flex-col gap-7">
      <p className="text-2xl font-semibold text-red-500">Delete Chatbot</p>
      <div>
        <p className="">
          Once you delete your Agent, there is no going back. Please be certain.
        </p>
        <p className="">
          All your uploaded data will be deleted.{" "}
          <span className="font-bold">This action is not reversible</span>
        </p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setOpenDialogue(true)}
          className="py-2 px-5 hover:bg-red-400 bg-red-500 text-white font-medium rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteAgent;
