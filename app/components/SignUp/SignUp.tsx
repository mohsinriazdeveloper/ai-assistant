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
import { useUserSignUpMutation } from "../ReduxToolKit/aiAssistant";
import { userLoginSuccess } from "../ReduxToolKit/authSlice";
import { useAppDispatch } from "../ReduxToolKit/hook";

type SignUpInputs = {
  organization_name: string;
  first_name: string;
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
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [usernameAlreadyExists, setUsernameAlreadyExists] =
    useState<boolean>(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState<boolean>(false);
  const [emailErrors, setEmailErrors] = useState<string>("");
  const [orgError, setOrgError] = useState<string>("");

  const router = useRouter();
  const [UserSignUp] = useUserSignUpMutation();
  const [strength, setStrength] = useState("");
  const [showPassStrenghtList, setShowPassStrengthList] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const checkPasswordStrength = (password: string) => {
    let strength = "Weak";
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {
      strength = "Strong";
      setShowPassStrengthList(false);
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      strength = "Medium";
      setShowPassStrengthList(true);
    }
    setStrength(strength);
    setShowPassStrengthList(true);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (
      !SignUpOrganizationName &&
      !SignUpEmail &&
      !SignUpName &&
      !SignUpPassword
    ) {
      setOrgError("Organization Name is required");
      setEmailErrors("Email is required");
      setUsernameError("Name is required");
      setPasswordError("Password is required");
      setLoading(false);
      return;
    }
    // Validate Organization Name
    if (!SignUpOrganizationName) {
      setOrgError("Organization Name is required");
      setLoading(false);
      return;
    }

    // Validate Email
    if (!SignUpEmail) {
      setEmailErrors("Email is required");
      setLoading(false);
      return;
    }

    // Validate Name (Username) length
    if (SignUpName.length < 3) {
      setUsernameError("Name must be at least 3 characters long");
      setLoading(false);
      return;
    }

    // Validate Password Strength
    if (strength !== "Strong") {
      setLoading(false);
      return;
    }

    // Check if Password and Confirm Password match
    if (SignUpPassword !== SignUpConfirmPassword) {
      setIsPasswordMatch(true);
      setLoading(false);
      return;
    }

    setIsPasswordMatch(false);

    // Prepare Payload
    const payLoad: SignUpInputs = {
      organization_name: SignUpOrganizationName,
      first_name: SignUpName,
      email: SignUpEmail,
      password: SignUpPassword,
    };

    try {
      const res = await UserSignUp(payLoad).unwrap();
      dispatch(
        userLoginSuccess({
          refresh: res.refresh,
          access: res.access,
        })
      );
      setLoading(false);
      router.push("/dashboard/agents");
      toast.success("You’ve successfully registered!");
    } catch (err: any) {
      setLoading(false);
      console.error("Failed to sign-up:", err);
      if (err.status === 400) {
        setEmailErrors("Email is invalid or already in use");
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
    if (!/^[A-Za-z ]{3,}$/.test(value)) {
      setUsernameError("Please enter at least 3 characters.");
    } else {
      setUsernameError("");
    }
    setSignUpName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailAlreadyExists(false);

    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailErrors("Please enter a valid email address.");
    } else {
      setEmailErrors("");
    }
    setSignUpEmail(value);
  };

  const handleSignupPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(e.target.value);
    checkPasswordStrength(e.target.value);
    setPasswordError("");
  };

  return (
    <div className="h-full overflow-auto scrollbar-hide py-12 bg-white rounded-lg">
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
          <p className="text-center font-semibold text-2xl">
            Get started for free
          </p>
        </div>
        <div>
          <form onSubmit={handleSignUp} className="text-sm ">
            <div className="mb-4">
              <div>
                <p className="font-medium">Organization Name</p>
              </div>
              <label htmlFor="">
                <input
                  type="text"
                  placeholder="Organization Name"
                  value={SignUpOrganizationName}
                  onChange={(e) => {
                    setSignUpOrganizationName(e.target.value);
                    setOrgError("");
                  }}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
              {orgError && (
                <div className="text-xs text-[#ef4444]">{orgError}</div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <p className="font-medium">Name</p>
              </div>
              <label htmlFor="">
                <input
                  type="text"
                  placeholder="Name"
                  value={SignUpName}
                  onChange={handleUsernameChange}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
              {usernameAlreadyExists && (
                <div className="text-xs text-[#ef4444]">
                  A user with this username already exists
                </div>
              )}
              {usernameError && (
                <div className="text-xs text-[#ef4444]">{usernameError}</div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <p className="font-medium">Email</p>
              </div>
              <label htmlFor="">
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={SignUpEmail}
                  onChange={handleEmailChange}
                  className="border rounded-md px-3 py-2 focus:outline-none mt-2 w-full"
                />
              </label>
              {emailErrors && (
                <div className="text-xs text-[#ef4444]">{emailErrors}</div>
              )}
              {emailAlreadyExists && (
                <div className="text-xs text-[#ef4444]">
                  A user with this email already exists
                </div>
              )}
            </div>
            <div className="mb-4">
              <div>
                <p className="font-medium">Password</p>
              </div>
              <div className="border rounded-md px-3 py-2 mt-2 flex items-center gap-1">
                <div className="w-full">
                  <label htmlFor="">
                    <input
                      type={`${showSignUpPassword ? "text" : "password"}`}
                      placeholder="Password"
                      value={SignUpPassword}
                      onChange={handleSignupPassword}
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
              {passwordError && (
                <div className="text-xs text-[#ef4444]">{passwordError}</div>
              )}
              {SignUpPassword && (
                <div
                  className={`${strength === "Weak" && "text-red-600"} ${
                    strength === "Medium" && "text-orange-600"
                  } ${strength === "Strong" && "text-green-600"}`}
                >
                  {strength}
                </div>
              )}
              {showPassStrenghtList && (
                <div
                  className={`my-2 ml-4 ${strength === "Strong" && "hidden"}`}
                >
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
                <p className="font-medium">Confirm Password</p>
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
                <div className="text-xs text-[#ef4444]">
                  Passwords do not match
                </div>
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
                <span className="font-bold cursor-pointer hover:text-[#9333ea]">
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
