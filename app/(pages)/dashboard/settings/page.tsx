"use client";
import Background from "@/app/components/Background/Background";
import Settings from "@/app/components/Dashboard/NewChat/Settings/Settings";
import NavBar from "@/app/components/NavBar/NavBar";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { content } from "../agents/content";
interface PageProps {
  params: { id: number };
}

const Page: FC<PageProps> = ({ params }) => {
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
  return (
    <Background>
      <div className="pt-8">
        <NavBar content={content.navBar} />
        <Settings />
      </div>
    </Background>
  );
};

export default Page;
