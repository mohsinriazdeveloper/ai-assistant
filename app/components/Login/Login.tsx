"use client";
import HideIcon from "@/app/assets/icons/hidePassword.png";
import ShowIcon from "@/app/assets/icons/viewPassword.png";
import Logo from "@/app/assets/Images/aiStar.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useUserLoginMutation } from "../ReduxToolKit/aiAssistant";
import { useGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import { userLoginSuccess } from "../ReduxToolKit/authSlice";
import { useAppDispatch } from "../ReduxToolKit/hook";

type LoginInputs = {
  email: string;
  password: string;
};

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");

  const [UserLogin] = useUserLoginMutation();
  const { data: allAgents } = useGetAllAgentsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    sessionStorage.clear();
    localStorage.clear();
    if (!loginEmail && !loginPassword) {
      setEmailError("Email is required");
      setPassError("Password is required");
      setLoading(false);
      return;
    }
    if (!loginEmail) {
      setEmailError("Email is required");
      setLoading(false);
      return;
    }
    if (!loginPassword) {
      setPassError("Password is required");
      setLoading(false);
      return;
    }

    const payLoad: LoginInputs = {
      email: loginEmail,
      password: loginPassword,
    };
    try {
      const res = await UserLogin(payLoad).unwrap();
      dispatch(
        userLoginSuccess({
          refresh: res.refresh,
          access: res.access,
        })
      );
      setLoading(false);
      toast.success("Welcome back! You have successfully signed in");
      return router.push("/dashboard/agents");
    } catch (err: any) {
      setLoading(false);
      console.error("Failed to login:", err);
      if (err.status === 400) {
        setWrongPassword(true);
      } else if (err.originalStatus === 500) {
        toast.error("Server Error!!! Failed to Sign-in");
      }
    }
  };

  return (
    <div className="py-12 h-full flex flex-col justify-center bg-white rounded-lg">
      <div className="max-w-[360px] mx-auto">
        <div className="flex justify-center mb-10">
          <div>
            <Image src={Logo} alt="" className="mx-auto mb-4" />
            {/* <div className="mx-auto w-[70px] h-[72px] border rounded-lg mb-4 flex justify-center items-center">
              <p>LOGO</p>
            </div> */}
            <p className="text-center">
              Create an AI assistant in minutes with no code
            </p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-center font-semibold text-2xl">Welcome Back</p>
        </div>
        <div>
          <form
            action=""
            onSubmit={handleLogin}
            className="text-sm font-medium"
          >
            <div className="mb-4">
              <div>
                <p>Email</p>
              </div>
              <label htmlFor="">
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value), setEmailError("");
                    setWrongPassword(false);
                  }}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
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
                      type={`${showLoginPassword ? "text" : "password"}`}
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value), setPassError("");
                        setWrongPassword(false);
                      }}
                      className="focus:outline-none w-full"
                    />
                  </label>
                </div>
                <div>
                  {showLoginPassword ? (
                    <Image
                      src={ShowIcon}
                      alt=""
                      className="w-6 cursor-pointer"
                      onClick={() => setShowLoginPassword(false)}
                    />
                  ) : (
                    <Image
                      src={HideIcon}
                      alt=""
                      className="w-6 cursor-pointer"
                      onClick={() => setShowLoginPassword(true)}
                    />
                  )}
                </div>
              </div>
              {passError && <p className="text-red-600">{passError}</p>}
              {wrongPassword && (
                <p className="text-red-600">Credentials are not correct</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-base font-semibold text-end">
                <Link
                  href="/forgot-password"
                  className=" cursor-pointer hover:text-[#9333ea]"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="py-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md w-full"
              >
                {loading ? <Loader /> : <>Sign in</>}
              </button>
            </div>
            <div className="mt-4">
              <p className="text-center text-base">
                Don&apos;t have an account?{" "}
                <span className="font-bold cursor-pointer hover:text-[#9333ea]">
                  <Link href="/signup">Sign Up</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
