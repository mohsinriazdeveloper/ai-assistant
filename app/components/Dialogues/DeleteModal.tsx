"use client";

import CancleIcon from "@/app/assets/icons/CancleIcon";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Loader from "../Loader/Loader";
import {
  useDeleteAgentMutation,
  useGetAllAgentsQuery,
} from "../ReduxToolKit/aiAssistantOtherApis";
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

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAgent(agent?.id).unwrap();
      setLoading(false);
      handleClose();
      return router.push("/dashboard/agents");
    } catch (error) {
      setLoading(false);
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
