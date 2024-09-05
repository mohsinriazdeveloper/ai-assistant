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
  const { access } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!access) {
      router.push("/"); // Redirect to login if access token is missing
    }
  }, [access, router]);

  if (!access) {
    return null; // Return null or a loading indicator while redirecting
  }
  return <CreateNewAgent />;
};

export default Page;
