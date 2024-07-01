import Login from "@/app/components/Login/Login";
import SignUp from "@/app/components/SignUp/SignUp";
import Head from "next/head";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return <SignUp />;
};

export default Page;
