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
  const { access } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!access) {
      router.push("/"); // Redirect to login if access token is missing
    }
  }, [access, router]);

  if (!access) {
    return null; // Return null or a loading indicator while redirecting
  }
  return <NewChat navBarContent={content.navBar} />;
};

export default Page;
