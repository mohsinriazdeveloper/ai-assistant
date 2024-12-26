import Background from "@/app/components/Background/Background";
import Login from "@/app/components/Login/Login";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <Background>
      <Login />
    </Background>
  );
};

export default Page;
