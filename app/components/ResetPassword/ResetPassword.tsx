"use client";
import HideIcon from "@/app/assets/icons/hidePassword.png";
import ShowIcon from "@/app/assets/icons/viewPassword.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useUserPasswordResetMutation } from "../ReduxToolKit/aiAssistant";

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
  const [errorsIndication, setErrorIndications] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [strength, setStrength] = useState<string>("");
  const [showPassStrenghtList, setShowPassStrengthList] =
    useState<boolean>(false);
  // Password Strength Logic
  const checkPasswordStrength = (password: string) => {
    let strength = "Weak";
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {
      strength = "Strong";
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      strength = "Medium";
    }
    setStrength(strength);
  };

  const redirectRoute = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (ForgotPassword === "") {
      setPasswordErr("Please enter the new password");
      setLoading(false);
      return;
    }
    if (strength !== "Strong") {
      setLoading(false);
      return;
    }
    if (ForgotPassword === ForgotConfirmPassword) {
      const payLoad: ResetPayload = {
        token: token,
        new_password: ForgotPassword,
      };
      try {
        const res = await passwordReset(payLoad).unwrap();
        setLoading(false);
        router.push("/");
        toast.success("Your password has been updated successfully");
        return;
      } catch (err: any) {
        if (err.status === 400) {
          setLoading(false);
          toast.error("Invalid or expired token. Please request a new one");
          router.push("/forgot-password");
          return;
        }
        setLoading(false);
        setErrorIndications(err);
      }
    } else {
      setLoading(false);
      setErrorIndications("Password do not match");
    }
  };

  return (
    <div className="max-w-[360px] mx-auto py-12">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}

      <div className="mb-8">
        <p className="text-center font-semibold text-2xl">Recover Password</p>
      </div>
      <div className="text-sm">
        <form onSubmit={redirectRoute}>
          <div className="mb-4">
            <div>
              <p className=" font-medium">New Password</p>
            </div>
            <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
              <div className="w-full">
                <label htmlFor="">
                  <input
                    type={`${showForgotPassword ? "text" : "password"}`}
                    placeholder="Password"
                    value={ForgotPassword}
                    onChange={(e) => {
                      setForgotPassword(e.target.value);
                      checkPasswordStrength(e.target.value);
                      setShowPassStrengthList(true);
                      setPasswordErr("");
                      setErrorIndications("");
                    }}
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
            {passwordErr && (
              <p className="text-sm text-red-500">{passwordErr}</p>
            )}
            {ForgotPassword && (
              <div
                className={`${strength === "Weak" ? "text-red-600" : ""} ${
                  strength === "Medium" ? "text-orange-600" : ""
                } ${strength === "Strong" ? "text-green-600" : ""}`}
              >
                {strength} Password
              </div>
            )}
            {showPassStrenghtList && (
              <div className="my-2 ml-4">
                <ul className="list-disc">
                  <li>Password must be at least 8 characters long</li>
                  <li>
                    Password must contain at least 1 uppercase letter (A-Z)
                  </li>
                  <li>Password must contain at least 1 number (0-9)</li>
                  <li>
                    Password must contain at least 1 special character (e.g.,
                    !@#$%^&*)
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div>
              <p className=" font-medium">Confirm New Password</p>
            </div>
            <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
              <div className="w-full">
                <label htmlFor="">
                  <input
                    type={`${showForgotConfirmPassword ? "text" : "password"}`}
                    placeholder="Confirm Password"
                    value={ForgotConfirmPassword}
                    onChange={(e) => {
                      setForgotConfirmPassword(e.target.value),
                        setErrorIndications("");
                    }}
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
            {errorsIndication && (
              <div className="text-xs text-red-500">{errorsIndication}</div>
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

export default ResetPassword;
