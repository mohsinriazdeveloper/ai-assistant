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
  const { access } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!access) {
      router.push("/"); // Redirect to login if access token is missing
    }
  }, [access, router]);

  if (!access) {
    return null; // Return null or a loading indicator while redirecting
  }
  const { id } = params;
  return <Agent navBarContent={content.navBar} agentId={id} />;
};

export default Page;
