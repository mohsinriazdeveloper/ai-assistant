"use client";

import { Dispatch, FC, useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { base64ToFile } from "./utils";

interface ImageUploadProps {
  addImg: File | null;
  setAddImage: Dispatch<any>;
  closePopup: () => void;
}

const ImageUpload: FC<ImageUploadProps> = ({
  addImg,
  setAddImage,
  closePopup,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (addImg && ready) {
      const reader = new FileReader();
      reader.readAsDataURL(addImg);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    }
  }, [addImg, ready]);

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedImgBase64 = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      245,
      237
    );
    if (!croppedImgBase64) return;

    // Convert Base64 to File
    const croppedImgFile = base64ToFile(croppedImgBase64, "cropped-image.jpg");

    setAddImage(croppedImgFile);
    setReady(false);
    setImageSrc(null);
    closePopup();
  };

  return (
    <div>
      <p className="text-xl font-medium">Crop and adjust your agent image</p>
      <div className="flex flex-col items-center space-y-3 mt-3">
        {/* Zoom slider */}

        {/* Cropper container */}
        {imageSrc && (
          <div className="relative w-[300px] h-[300px] overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={245 / 237} // Ensures the aspect ratio matches the required size
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              initialCroppedAreaPercentages={{
                x: 9.2,
                y: 10.5,
                width: 81.6,
                height: 79,
              }} // Adjust x & y for correct positioning
            />
          </div>
        )}
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-32 accent-[#18181b] focus:outline-none"
        />

        {/* Crop & Save button */}
        <button
          onClick={handleCrop}
          className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
        >
          Crop & Save
        </button>
        {/* 
      {croppedImage && (
        <div className="w-[245px] h-[237px] border mt-2 overflow-hidden">
          <img
            src={croppedImage}
            alt="Cropped"
            className="w-full h-full object-cover"
          />
        </div>
      )} */}
      </div>
    </div>
  );
};

export default ImageUpload;
