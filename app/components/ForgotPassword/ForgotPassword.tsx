"use client";
import Logo from "@/app/assets/Images/aiStar.png";
import Image from "next/image";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useUserForgotMutation } from "../ReduxToolKit/aiAssistant";

type EmailPayload = {
  email: string;
};

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = ({}) => {
  const [userForgotPassword] = useUserForgotMutation();
  const [ForgotEmail, setForgotEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailIndication, setEmailIndication] = useState<string>("");

  const emailValidation = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    let payload: EmailPayload;
    if (ForgotEmail) {
      payload = {
        email: ForgotEmail,
      };
      try {
        const res = await userForgotPassword(payload).unwrap();
        setLoading(false);
        toast.success("Check your email to reset your password.");
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to forgot password:", error);
        if (error.status === 400) {
          setEmailIndication(error.data.email);
        }
      }
    } else {
      setLoading(false);
      setEmailIndication("Email is required");
    }
  };
  return (
    <div className="w-[360px]">
      <Image src={Logo} alt="" className="mx-auto mb-4" />
      <div className="mb-8">
        <p className="text-center font-semibold text-2xl">Recover Password</p>
      </div>
      <div className="text-sm">
        <form onSubmit={emailValidation}>
          <div className="mb-4">
            <div>
              <p className="font-medium">Email</p>
            </div>
            <label htmlFor="">
              <input
                type="email"
                placeholder="email@gmail.com"
                value={ForgotEmail}
                onChange={(e) => {
                  setForgotEmail(e.target.value);
                  setEmailIndication("");
                }}
                className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
              />
            </label>
            {emailIndication && (
              <p className="text-sm text-red-500">{emailIndication}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="py-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md w-full"
            >
              {loading ? <Loader /> : <>Submit</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
