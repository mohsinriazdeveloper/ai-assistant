"use client";
import CreateNewAgent from "@/app/components/Dashboard/CreateNewAgent/CreateNewAgent";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

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
  return <CreateNewAgent />;
};

export default Page;
