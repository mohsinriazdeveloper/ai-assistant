"use client";
import { FC, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ShowIcon from "@/app/assets/icons/viewPassword.png";
import HideIcon from "@/app/assets/icons/hidePassword.png";
import {
  useUserForgotMutation,
  useUserPasswordResetMutation,
} from "../ReduxToolKit/aiAssistant";

type ResetPayload = {
  token?: string;
  new_password: string;
};

interface ResetPasswordProps {
  token?: string;
}

const ResetPassword: FC<ResetPasswordProps> = ({ token }) => {
  const [passwordReset] = useUserPasswordResetMutation();
  const router = useRouter();
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] =
    useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [ForgotPassword, setForgotPassword] = useState<string>("");
  const [ForgotConfirmPassword, setForgotConfirmPassword] =
    useState<string>("");
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);

  const redirectRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ForgotPassword === ForgotConfirmPassword) {
      const payLoad: ResetPayload = {
        token: token,
        new_password: ForgotPassword,
      };
      try {
        const res = await passwordReset(payLoad).unwrap();
        // dispatch(
        //   userLoginSuccess({
        //     refresh: res.refresh,
        //     access: res.access,
        //   })
        // );
        // alert("login");
        return router.push("/");
      } catch (err) {
        console.error("Failed to reset:", err);
      }
    } else {
      setIsPasswordMatch(true);
    }
  };
  return (
    <div className="max-w-[360px] mx-auto py-12">
      <div className="mb-8">
        <p className="text-center font-semibold text-2xl">Recover Password</p>
      </div>
      <div className="text-sm font-medium">
        <form onSubmit={redirectRoute}>
          <div className="mb-4">
            <div>
              <p>New Password</p>
            </div>
            <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
              <div className="w-full">
                <label htmlFor="">
                  <input
                    type={`${showForgotPassword ? "text" : "password"}`}
                    placeholder="Password"
                    value={ForgotPassword}
                    onChange={(e) => setForgotPassword(e.target.value)}
                    className="focus:outline-none w-full"
                  />
                </label>
              </div>
              <div>
                {showForgotPassword ? (
                  <Image
                    src={ShowIcon}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => setShowForgotPassword(false)}
                  />
                ) : (
                  <Image
                    src={HideIcon}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => setShowForgotPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div>
              <p>Confirm New Password</p>
            </div>
            <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
              <div className="w-full">
                <label htmlFor="">
                  <input
                    type={`${showForgotConfirmPassword ? "text" : "password"}`}
                    placeholder="Confirm Password"
                    value={ForgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    className="focus:outline-none w-full"
                  />
                </label>
              </div>
              <div>
                {showForgotConfirmPassword ? (
                  <Image
                    src={ShowIcon}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => setShowForgotConfirmPassword(false)}
                  />
                ) : (
                  <Image
                    src={HideIcon}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => setShowForgotConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
            {isPasswordMatch && (
              <div className="text-xs text-red-700">Password not match</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="py-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
