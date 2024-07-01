"use client";
import Agent from "@/app/components/Dashboard/Agent/Agent";
import { FC } from "react";
import { content } from "./content";

interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
  const { id } = params;
  return <Agent navBarContent={content.navBar} agentId={id} />;
};

export default Page;
