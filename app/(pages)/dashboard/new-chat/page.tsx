"use client";

import Join from "@/app/components/Dashboard/Join/Join";
import NewChat from "@/app/components/Dashboard/NewChat/NewChat";
import { FC, useEffect } from "react";
import { content } from "./content";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const router = useRouter();
  const { refresh } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!refresh) {
      router.push("/"); // Redirect to login if refresh token is missing
    }
  }, [refresh, router]);

  if (!refresh) {
    return null; // Return null or a loading indicator while redirecting
  }
  return <NewChat navBarContent={content.navBar} />;
};

export default Page;
