import Background from "@/app/components/Background/Background";
import ForgotPassword from "@/app/components/ForgotPassword/ForgotPassword";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <Background>
      <div className="flex justify-center items-center w-full h-full bg-white">
        <ForgotPassword />
      </div>
    </Background>
  );
};

export default Page;
