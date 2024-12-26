"use client";

import QuestionMarkIcon from "@/app/assets/icons/stepsQuestionMark.png";
import Image from "next/image";
import { FC } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

type TrainingStepsModalProps = {
  openDialogue: boolean;
  handleClose: () => void;
};

const TrainingStepsModal: FC<TrainingStepsModalProps> = ({
  openDialogue,
  handleClose,
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
            // backgroundColor: "#FFFFFF",
            minWidth: "80%",
            padding: "0",
            // borderRadius: "10px",
          },
        }}
      >
        <div className="bg-red-500 h-[80vh] w-full relative text-white">
          <div className="absolute w-[235px] pt-5 border left-[24%]">
            <Image
              src={QuestionMarkIcon}
              alt=""
              className="w-10 h-10 absolute right-[42%] top-[3px]"
            />
            <div className="bg-[#343434] rounded-lg h-full pt-7 px-4 pb-5">
              <p className="text-center text-xl font-medium mb-2">3</p>
              <p className="text-center font-medium mb-2">Test Your AI</p>
              <p className="text-center text-xs font-medium mb-4">
                Test your chatbot using text or voice by moving to the “Chat”
                tab.
              </p>
              <button className="w-full text-white bg-[#7D7D7D] py-2 rounded-md text-sm">
                Got it
              </button>
            </div>
          </div>
          <div className="absolute w-[235px] pt-5 border left-[24%]">
            <Image
              src={QuestionMarkIcon}
              alt=""
              className="w-10 h-10 absolute right-[42%] top-[3px]"
            />
            <div className="bg-[#343434] rounded-lg h-full pt-7 px-4 pb-5">
              <p className="text-center text-xl font-medium mb-2">1</p>
              <p className="text-center font-medium mb-2">
                Upload Data Sources
              </p>
              <p className="text-center text-xs font-medium mb-4">
                Use the tabs of the left to upload unique data source to your AI
              </p>
              <button className="w-full text-white bg-[#7D7D7D] py-2 rounded-md text-sm">
                Got it
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrainingStepsModal;
