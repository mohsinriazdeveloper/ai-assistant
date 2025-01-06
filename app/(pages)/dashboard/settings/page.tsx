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
      <div className="py-8 px-5 bg-white rounded-[20px] h-full">
        <div className="fixed w-full">
          <NavBar content={content.navBar} />
          <Settings />
        </div>
      </div>
    </Background>
  );
};

export default Page;
