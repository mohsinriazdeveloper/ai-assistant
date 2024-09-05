"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserForgotMutation } from "../ReduxToolKit/aiAssistant";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

type EmailPayload = {
  email: string;
};

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = ({}) => {
  const [userForgotPassword] = useUserForgotMutation();
  const router = useRouter();
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
        toast.success("Check your email for the reset link.");
      } catch (error: any) {
        setLoading(false);
        console.error("Failed to forgot password:", error);
        if (error.status === 400) {
          setEmailIndication(error.data.email);
        }
      }
    } else {
      setLoading(false);
      setEmailIndication("email is required");
    }
  };
  return (
    <div className="max-w-[360px] mx-auto py-12">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mb-8">
        <p className="text-center font-semibold text-2xl">Recover Password</p>
      </div>
      <div className="text-sm font-medium">
        <form onSubmit={emailValidation}>
          <div className="mb-4">
            <div>
              <p>Email</p>
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
