import Loader from "@/app/assets/Images/pageLoader.png";
import Image from "next/image";
import { FC } from "react";

interface LoaderProps {
  height?: string;
}

const Loader2: FC<LoaderProps> = ({ height }) => {
  return (
    <div className="flex justify-center">
      <Image src={Loader} alt="" className="animate-spin w-10 h-auto" />
    </div>
  );
};
export default Loader2;
