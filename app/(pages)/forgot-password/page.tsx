import Background from "@/app/components/Background/Background";
import ForgotPassword from "@/app/components/ForgotPassword/ForgotPassword";
import Link from "next/link";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <Background>
      <div className="w-full h-full bg-white rounded-[20px]">
        <div className="pt-10 pl-10">
          <Link href="/" className="flex items-center cursor-pointer w-fit">
            <IoIosArrowBack className="text-3xl" />
            <p className="font-bold">Back</p>
          </Link>
        </div>
        <div className="flex justify-center items-center w-full h-full">
          <ForgotPassword />
        </div>
      </div>
    </Background>
  );
};

export default Page;
