"use client";

import { Dispatch, FC } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ImageUpload from "../ImageCropper/ImageCropper";
type ImageCropperModalProps = {
  openDialogue: boolean;
  handleClose: () => void;
  addImage: any;
  setAddImage: Dispatch<any>;
};

const ImageCropperModal: FC<ImageCropperModalProps> = ({
  openDialogue,
  handleClose,
  addImage,
  setAddImage,
}) => {
  return (
    <div>
      <Modal
        showCloseIcon={true}
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
        <ImageUpload
          addImg={addImage}
          setAddImage={setAddImage}
          closePopup={handleClose}
        />
      </Modal>
    </div>
  );
};

export default ImageCropperModal;
