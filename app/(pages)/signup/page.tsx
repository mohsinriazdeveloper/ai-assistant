import Background from "@/app/components/Background/Background";
import SignUp from "@/app/components/SignUp/SignUp";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <Background>
      <SignUp />
    </Background>
  );
};

export default Page;
