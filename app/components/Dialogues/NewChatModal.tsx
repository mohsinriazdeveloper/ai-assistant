"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import CancleIcon from "@/app/assets/icons/CancleIcon";

type NewChatModalProps = {
  openDialogue: boolean;
  handleClose: () => void;
  setSpecificChatId: Dispatch<SetStateAction<number | null>>;
  setStartNewChat: Dispatch<SetStateAction<boolean>>;
  setIsVoice: Dispatch<SetStateAction<boolean>>;
};

const NewChatModal: FC<NewChatModalProps> = ({
  openDialogue,
  handleClose,
  setSpecificChatId,
  setStartNewChat,
  setIsVoice,
}) => {
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
            minWidth: "40%",
            padding: "30px 30px 30px 30px",
            borderRadius: "10px",
          },
        }}
      >
        <div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Begin a New Chat</p>

            <div onClick={handleClose} className="cursor-pointer">
              <CancleIcon />
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center items-center">
            <p className="text-center text-xl">
              Do you really want to start a new chat?
            </p>
            <div className="flex gap-8 mt-4 items-center">
              <button
                onClick={() => {
                  setSpecificChatId(null),
                    setStartNewChat(true),
                    setIsVoice(false),
                    handleClose();
                }}
                className="py-2 px-5 hover:bg-[#3C3C3F] bg-black text-white font-medium rounded-md text-sm"
              >
                Yes
              </button>
              <button
                onClick={handleClose}
                className="py-2 px-5 hover:bg-[#3C3C3F] bg-black text-white font-medium rounded-md text-sm"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewChatModal;
