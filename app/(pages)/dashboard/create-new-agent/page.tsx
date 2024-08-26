"use client";
import CreateNewAgent from "@/app/components/Dashboard/CreateNewAgent/CreateNewAgent";
import Join from "@/app/components/Dashboard/Join/Join";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

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
  return <CreateNewAgent />;
};

export default Page;
