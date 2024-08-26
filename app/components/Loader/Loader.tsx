import Image from "next/image";
import { FC } from "react";
import LoaderImg from "@/app/assets/icons/loader.png";

interface LoaderProps {
  height?: string;
}

const Loader: FC<LoaderProps> = ({ height }) => {
  return (
    <div className="flex justify-center">
      <Image
        src={LoaderImg}
        alt=""
        className={`animate-spin w-${height ? height : "5"} h-${
          height ? height : "5"
        }`}
      />
    </div>
  );
};
export default Loader;
