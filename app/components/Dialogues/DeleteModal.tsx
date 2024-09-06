"use client";

import React, { FC, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import CancleIcon from "@/app/assets/icons/CancleIcon";
import {
  useDeleteAgentMutation,
  useGetAllAgentsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
type DeleteModalProps = {
  agentId: any;
  openDialogue: boolean;
  handleClose: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({
  openDialogue,
  handleClose,
  agentId,
}) => {
  const [deleteAgent] = useDeleteAgentMutation();
  const { data: allAgents } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );

  // const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAgent(agent?.id).unwrap();
      setLoading(false);
      handleClose();
      return router.push("/dashboard/agents");
      // handle successful deletion, e.g., refresh the agent list
    } catch (error) {
      setLoading(false);
      // handle error
      console.error("unable to delete agent", error);
    }
  };

  return (
    <div>
      <Modal
        showCloseIcon={false}
        open={openDialogue}
        onClose={handleClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        center
        classNames={{
          modalContainer: "bg-[#00000061]",
        }}
        styles={{
          modal: {
            backgroundColor: "#FFFFFF",
            minWidth: "70%",
            padding: "30px 30px 30px 30px",
            borderRadius: "10px",
          },
        }}
      >
        <div>
          <div className="flex justify-end">
            <div onClick={handleClose} className="cursor-pointer">
              <CancleIcon />
            </div>
          </div>
          <p className="text-2xl font-bold">Delete</p>

          <div className="flex flex-col gap-3 mt-5">
            <div className="flex flex-col gap-1">
              <p>Agent ID</p>
              <div className="focus:outline-none w-full border border-red-500 px-4 py-3 text-gray-300 rounded-md">
                {agent?.ran_id}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Agent Name</p>
              <div className="focus:outline-none w-full border border-red-500 px-4 py-3 text-gray-300 rounded-md">
                {agent?.name}
              </div>
            </div>
          </div>
          {/* <input
            type="text"
            placeholder="Agent"
            className="focus:outline-none w-full border border-red-500 px-4 py-3 text-red-500 rounded-md mt-3"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          /> */}
          <div className="flex justify-end mt-5">
            <button
              onClick={handleDelete}
              className="py-2 px-3 hover:bg-[#3C3C3F] bg-red-500 text-white font-medium rounded-md text-sm"
            >
              {loading ? <Loader /> : <>Delete</>}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
