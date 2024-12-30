import Loader from "@/app/assets/Images/pageLoader.png";
import Image from "next/image";
import { FC } from "react";

interface PageAnimationProps {}

const PageAnimation: FC<PageAnimationProps> = ({}) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <Image src={Loader} alt="" className="animate-spin w-[64px] h-auto" />
    </div>
  );
};

export default PageAnimation;
