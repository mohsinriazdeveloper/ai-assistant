import Image from "next/image";
import { FC } from "react";
import LoaderImg from "@/app/assets/icons/loader.png";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="flex justify-center">
      <Image src={LoaderImg} alt="" className="animate-spin w-5 h-5" />
    </div>
  );
};
export default Loader;
