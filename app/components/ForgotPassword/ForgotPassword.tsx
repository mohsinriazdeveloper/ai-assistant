"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserForgotMutation } from "../ReduxToolKit/aiAssistant";

type EmailPayload = {
  email: string;
};

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = ({}) => {
  const [userForgotPassword] = useUserForgotMutation();
  const router = useRouter();
  const [ForgotEmail, setForgotEmail] = useState<string>("");

  const emailValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    let payload: EmailPayload;
    if (ForgotEmail) {
      payload = {
        email: ForgotEmail,
      };
      try {
        const res = await userForgotPassword(payload).unwrap();
        alert("reset password link has been sent to you email");
        router.push(`/reset_password`);
      } catch (error: any) {
        console.error("Failed to forgot password:", error);
        if (error.status === 400) {
          alert(error.data.email);
        }
      }
    }
  };
  return (
    <div className="max-w-[360px] mx-auto py-12">
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
                onChange={(e) => setForgotEmail(e.target.value)}
                className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
              />
            </label>
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
export default ForgotPassword;
