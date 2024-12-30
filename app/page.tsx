"use client";

import { selectAuth } from "@/app/components/ReduxToolKit/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Background from "./components/Background/Background";
import PageAnimation from "./components/Loader/PageAnimation";
import Login from "./components/Login/Login";
import { useAppSelector } from "./components/ReduxToolKit/hook";

export default function Home() {
  const router = useRouter();
  const { access } = useAppSelector(selectAuth);
  useEffect(() => {
    if (access) {
      router.push("/dashboard/agents");

      return;
    }
  }, [access, router]);
  return <Background>{access ? <PageAnimation /> : <Login />}</Background>;
}
