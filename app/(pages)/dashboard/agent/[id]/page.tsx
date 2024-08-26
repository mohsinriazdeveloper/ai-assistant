"use client";
import Agent from "@/app/components/Dashboard/Agent/Agent";
import { FC, useEffect } from "react";
import { content } from "./content";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";

interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
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
  const { id } = params;
  return <Agent navBarContent={content.navBar} agentId={id} />;
};

export default Page;
