"use client";
import Background from "@/app/components/Background/Background";
import Settings from "@/app/components/Dashboard/NewChat/Settings/Settings";
import NavBar1 from "@/app/components/NavBar/NavBar1";
import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useAppSelector } from "@/app/components/ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
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
      <div className="py-[51px] px-5 bg-white rounded-lg h-full overflow-hidden">
        <div className="fixed w-full overflow-hidden">
          <div className="w-[80%] fixed">
            <NavBar1
            // setCreateAgent={setCreateAgent}
            // createAgent={createAgent}
            />
          </div>
          {/* <NavBar1 content={content.navBar} /> */}
          <Settings />
        </div>
      </div>
    </Background>
  );
};

export default Page;
