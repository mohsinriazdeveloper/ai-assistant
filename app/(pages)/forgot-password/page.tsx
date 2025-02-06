import Background from "@/app/components/Background/Background";
import ForgotPassword from "@/app/components/ForgotPassword/ForgotPassword";
import Link from "next/link";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <Background>
      <div className="w-full h-full flex flex-col justify-center bg-white rounded-lg">
        <div className="pt-10 pl-10 z-50">
          <Link href="/" className="flex items-center cursor-pointer w-fit">
            <IoIosArrowBack className="text-3xl" />
            <p className="font-bold">Back</p>
          </Link>
        </div>
        <div className="flex grow justify-center items-center -mt-16">
          <ForgotPassword />
        </div>
      </div>
    </Background>
  );
};

export default Page;
