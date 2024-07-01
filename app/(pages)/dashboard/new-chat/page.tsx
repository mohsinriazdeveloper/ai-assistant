import Join from "@/app/components/Dashboard/Join/Join";
import NewChat from "@/app/components/Dashboard/NewChat/NewChat";
import { FC } from "react";
import { content } from "./content";

interface PageProps {}

const Page: FC<PageProps> = () => {
  return <NewChat navBarContent={content.navBar} />;
};

export default Page;
