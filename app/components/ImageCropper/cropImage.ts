import { createImage } from "./utils";

export default async function getCroppedImg(
  imageSrc: string,
  croppedAreaPixels: { x: number; y: number; width: number; height: number },
  targetWidth: number = 245,
  targetHeight: number = 237
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  // Set the canvas dimensions to the target crop size
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.drawImage(
    image,
    croppedAreaPixels.x, // Source X
    croppedAreaPixels.y, // Source Y
    croppedAreaPixels.width, // Source Width
    croppedAreaPixels.height, // Source Height
    0, // Destination X
    0, // Destination Y
    targetWidth, // Destination Width (final output width)
    targetHeight // Destination Height (final output height)
  );

  return canvas.toDataURL("image/jpeg");
}
