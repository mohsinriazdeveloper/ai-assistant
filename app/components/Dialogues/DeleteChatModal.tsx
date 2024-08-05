"use client";

import React, { FC, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import CancleIcon from "@/app/assets/icons/CancleIcon";
import { useDeleteChatMutation } from "../ReduxToolKit/aiAssistantOtherApis";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
type DeleteChatModalProps = {
  agentId: any;
  openDialogue: boolean;
  handleClose: () => void;
};

const DeleteChatModal: FC<DeleteChatModalProps> = ({
  openDialogue,
  handleClose,
  agentId,
}) => {
  const [deleteChat] = useDeleteChatMutation();

  const [loading, setLoading] = useState<boolean>(false);
  const restChat = async () => {
    setLoading(true);
    try {
      const res = await deleteChat(agentId);
      toast.success("Chat Reset Successfully");
      setLoading(false);
      if (loading === false) {
        handleClose();
      }
      return;
    } catch (error) {
      toast.error("Failed to Reset Chat \n Try again later");
      setLoading(false);
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
            minWidth: "50%",
            padding: "30px 30px 30px 30px",
            borderRadius: "10px",
          },
        }}
      >
        <div>
          <div className="flex justify-end mb-5">
            <div onClick={handleClose} className="cursor-pointer">
              <CancleIcon />
            </div>
          </div>

          <p className="text-xl font-medium">
            Are you sure you want to reset this chat?
            <br />
            You will lose the historical conversation in this chat
          </p>
          <div className="flex justify-end mt-5 gap-4">
            <button
              onClick={restChat}
              className="py-1 px-3 hover:bg-[#3C3C3F] bg-black text-white font-medium rounded-md text-sm"
            >
              {loading ? <Loader /> : <>YES</>}
            </button>
            <button
              onClick={handleClose}
              className="py-1 px-3 hover:bg-[#3C3C3F] bg-green-500 text-white font-medium rounded-md text-sm"
            >
              NO
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteChatModal;
