"use client";
import { FC } from "react";
import Head from "next/head";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import VoiceAssistant from "@/app/components/VoiceAssistant/VoiceAssistant";
import Link from "next/link";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const authState = useAppSelector(selectAuth);
  const { access } = authState;
  return (
    <></>
    // <div>
    //   <Head>
    //     <title>AI Voice Assistant</title>
    //   </Head>
    //   {access ? (
    //     <VoiceAssistant />
    //   ) : (
    //     <div className="h-screen flex justify-center items-center gap-4">
    //       <Link href="/auth/signin">
    //         <button className="w-[150px] rounded py-3 px-4 bg-slate-500 text-white text-2xl font-bold">
    //           Sign In
    //         </button>
    //       </Link>
    //       <Link href="/auth/signup">
    //         <button className="w-[150px] rounded py-3 px-4 bg-slate-500 text-white text-2xl font-bold">
    //           Sign Up
    //         </button>
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
};

export default Page;
