"use client";
import Image from "next/image";
import ShowIcon from "@/app/assets/icons/viewPassword.png";
import HideIcon from "@/app/assets/icons/hidePassword.png";
import { FC, useState } from "react";
import Link from "next/link";
import { useUserLoginMutation } from "../ReduxToolKit/aiAssistant";
// import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../ReduxToolKit/authSlice";
import { useAppDispatch } from "../ReduxToolKit/hook";
import { useRouter } from "next/navigation";
import PreviousPage from "../PreviousPage/PreviousPage";
import Loader from "../Loader/Loader";
// import { clearDataSucces } from "../ReduxToolKit/clearStateData";
import { useGetAllAgentsQuery } from "../ReduxToolKit/aiAssistantOtherApis";
import toast, { Toaster } from "react-hot-toast";
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
  const [UserLogin] = useUserLoginMutation();
  const { data: allAgents } = useGetAllAgentsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    // if (allAgents) {
    sessionStorage.clear();
    // }
    e.preventDefault();
    const payLoad: LoginInputs = {
      email: loginEmail,
      password: loginPassword,
    };
    try {
      const res = await UserLogin(payLoad).unwrap();
      console.log(res);
      dispatch(
        userLoginSuccess({
          refresh: res.refresh,
          access: res.access,
        })
      );
      // alert("login");
      // return router.push("/dashboard/join");
      setLoading(false);
      toast.success("Successfully toasted!");
      return router.push("/dashboard/new-chat");
    } catch (err: any) {
      setLoading(false);
      console.error("Failed to login:", err);
      if (err.status === 400) {
        setWrongPassword(true);
      }
    }
  };

  return (
    <div className="md:container md:mx-auto mx-5 py-12">
      <Toaster position="top-right" reverseOrder={false} />
      <PreviousPage />
      <div className="max-w-[360px] mx-auto">
        <div className="flex justify-center mb-10">
          <div>
            <div className="mx-auto w-[70px] h-[72px] border rounded-lg mb-4 flex justify-center items-center">
              <p>LOGO</p>
            </div>
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
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
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
                        setLoginPassword(e.target.value),
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
              {wrongPassword && <p className="text-red-600">Wrong Password</p>}
            </div>
            <div className="mb-4">
              <p className="text-base font-semibold text-end cursor-pointer">
                <Link href="/forgot-password">Forgot password?</Link>
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
                <span className="font-bold cursor-pointer">
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
