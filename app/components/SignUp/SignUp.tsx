"use client";
import Image from "next/image";
import ShowIcon from "@/app/assets/icons/viewPassword.png";
import HideIcon from "@/app/assets/icons/hidePassword.png";
import { FC, useState } from "react";
import Link from "next/link";
import { useUserSignUpMutation } from "../ReduxToolKit/aiAssistant";
import { useRouter } from "next/navigation";
import PreviousPage from "../PreviousPage/PreviousPage";
import Loader from "../Loader/Loader";

type SignUpInputs = {
  organization_name: string;
  username: string;
  email: string;
  password: string;
};

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [SignUpOrganizationName, setSignUpOrganizationName] =
    useState<string>("");
  const [SignUpName, setSignUpName] = useState<string>("");
  const [SignUpEmail, setSignUpEmail] = useState<string>("");
  const [SignUpPassword, setSignUpPassword] = useState<string>("");
  const [SignUpConfirmPassword, setSignUpConfirmPassword] =
    useState<string>("");
  const [showSignUpPassword, setShowSignUpPassword] = useState<boolean>(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] =
    useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [usernameAlreadyExists, setUsernameAlreadyExists] =
    useState<boolean>(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState<boolean>(false);
  const router = useRouter();
  const [UserSignUp] = useUserSignUpMutation();
  const [strength, setStrength] = useState("");
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (SignUpPassword !== SignUpConfirmPassword) {
      setIsPasswordMatch(true);
      setLoading(false);
      return;
    }

    setIsPasswordMatch(false);
    const payLoad: SignUpInputs = {
      organization_name: SignUpOrganizationName,
      username: SignUpName,
      email: SignUpEmail,
      password: SignUpPassword,
    };

    try {
      const res = await UserSignUp(payLoad).unwrap();
      setLoading(false);
      return router.push("/");
    } catch (err: any) {
      setLoading(false);
      console.error("Failed to sign-up:", err);
      if (err.status === 400) {
        setUsernameAlreadyExists(true);
      } else if (err.originalStatus === 500) {
        setEmailAlreadyExists(true);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsernameAlreadyExists(false);
    if (/\s/.test(value)) {
      setUsernameError(
        "username may contain only letters, numbers, and @/./+/-/_ characters."
      );
    } else {
      setUsernameError("");
    }
    setSignUpName(value);
  };

  return (
    <div className="container mx-auto py-12">
      <PreviousPage />
      <div className="max-w-[360px] mx-auto">
        <div className="flex justify-center mb-10">
          <div>
            <div className="mx-auto w-[70px] h-[72px] border rounded-lg mb-4 flex justify-center items-center">
              <p>LOGO</p>
            </div>
            <p>Create an AI assistant in minutes with no code</p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-center font-semibold text-2xl">
            Get started for free
          </p>
        </div>
        <div>
          <form onSubmit={handleSignUp} className="text-sm font-medium">
            <div className="mb-4">
              <div>
                <p>Organization Name</p>
              </div>
              <label htmlFor="">
                <input
                  type="text"
                  placeholder="Organization Name"
                  value={SignUpOrganizationName}
                  onChange={(e) => setSignUpOrganizationName(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <div>
                <p>Username</p>
              </div>
              <label htmlFor="">
                <input
                  type="text"
                  placeholder="Username"
                  value={SignUpName}
                  onChange={handleUsernameChange}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
              {usernameAlreadyExists && (
                <div className="text-xs text-red-700">
                  A user with this username already exists
                </div>
              )}
              {usernameError && (
                <div className="text-xs text-red-700">{usernameError}</div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <p>Email</p>
              </div>
              <label htmlFor="">
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={SignUpEmail}
                  onChange={(e) => {
                    setSignUpEmail(e.target.value);
                    setEmailAlreadyExists(false);
                  }}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
              {emailAlreadyExists && (
                <div className="text-xs text-red-700">
                  A user with this email already exists
                </div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <p>Password</p>
              </div>
              <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
                <div className="w-full">
                  <label htmlFor="">
                    <input
                      type={`${showSignUpPassword ? "text" : "password"}`}
                      placeholder="Password"
                      value={SignUpPassword}
                      onChange={(e) => {
                        setSignUpPassword(e.target.value);
                        checkPasswordStrength(e.target.value);
                      }}
                      className="focus:outline-none w-full"
                    />
                  </label>
                </div>
                <div>
                  {showSignUpPassword ? (
                    <Image
                      src={ShowIcon}
                      alt=""
                      className="w-6 cursor-pointer"
                      onClick={() => setShowSignUpPassword(false)}
                    />
                  ) : (
                    <Image
                      src={HideIcon}
                      alt=""
                      className="w-6 cursor-pointer"
                      onClick={() => setShowSignUpPassword(true)}
                    />
                  )}
                </div>
              </div>
              {SignUpPassword && (
                <div
                  className={`${strength === "Weak" && "text-red-600"} ${
                    strength === "Medium" && "text-orange-600"
                  } ${strength === "Strong" && "text-green-600"}`}
                >
                  {strength}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <p>Confirm Password</p>
              </div>
              <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
                <div className="w-full">
                  <label htmlFor="">
                    <input
                      type={`${
                        showSignUpConfirmPassword ? "text" : "password"
                      }`}
                      placeholder="Confirm Password"
                      value={SignUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className="focus:outline-none w-full"
                    />
                  </label>
                </div>
                <div>
                  {showSignUpConfirmPassword ? (
                    <Image
                      src={ShowIcon}
                      alt=""
                      className="w-6 cursor-pointer"
                      onClick={() => setShowSignUpConfirmPassword(false)}
                    />
                  ) : (
                    <Image
                      src={HideIcon}
                      alt=""
                      className="w-6 cursor-pointer"
                      onClick={() => setShowSignUpConfirmPassword(true)}
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
                disabled={loading}
                className="py-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md w-full"
              >
                {loading ? <Loader /> : <>Sign up</>}
              </button>
            </div>
            <div className="mt-4">
              <p className="text-center text-base">
                Already have an account?{" "}
                <span className="font-bold cursor-pointer">
                  <Link href="/auth/signin">Sign In</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
