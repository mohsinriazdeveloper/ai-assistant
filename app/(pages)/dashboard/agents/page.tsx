"use client";

import NewChat from "@/app/components/Dashboard/NewChat/NewChat";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { content } from "./content";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const router = useRouter();
  const { access } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, [access, router]);

  if (!access) {
    return null;
  }
  return <NewChat navBarContent={content.navBar} />;
};

export default Page;
