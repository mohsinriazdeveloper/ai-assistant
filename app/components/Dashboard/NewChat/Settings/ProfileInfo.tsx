import Loader from "@/app/components/Loader/Loader";
import {
  useGetUserProfileQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProfileInfoProps {}

const ProfileInfo: FC<ProfileInfoProps> = ({}) => {
  const { data: userData } = useGetUserProfileQuery();
  const [updateUser, isLoading] = useUpdateUserMutation();
  const [updatePassword, { isLoading: passLoading }] =
    useUpdatePasswordMutation();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [currentPassError, setCurrentPassError] = useState<string>("");
  const [newPassError, setNewPassError] = useState<string>("");

  // Password strength functionality
  const [strength, setStrength] = useState<string>("");
  const [showPassStrengthList, setShowPassStrengthList] =
    useState<boolean>(false);

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

  useEffect(() => {
    if (userData) {
      setFirstName(userData.first_name);
      setUserEmail(userData.email);
    }
  }, [userData]);

  const handleUpdateUser = async () => {
    if (!firstName) {
      setFirstNameError("First Name is required");
      return;
    }
    if (firstName.trim() === "") {
      setFirstNameError("First Name cannot be empty");
      return;
    }
    try {
      updateUser({ first_name: firstName });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdatePassword = async () => {
    if (currentPass.trim() === "") {
      setCurrentPassError("Current Password cannot be empty");
      return;
    }

    if (newPass !== confirmPass) {
      setNewPassError("Passwords do not match");
      return;
    }

    if (strength !== "Strong") {
      setNewPassError("Password strength must be 'Strong'");
      return;
    }

    try {
      const res = await updatePassword({
        current_password: currentPass,
        new_password: newPass,
      }).unwrap();

      // Ensure proper response structure
      if (res?.data?.status === 400) {
        toast.error("Invalid input");
      } else {
        toast.success("Password updated successfully");
      }

      console.log("Response:", res);
    } catch (error: any) {
      if (error?.data) {
        // Extracting and displaying errors from the API response
        const errors = Object.values(error.data).flat().join(" ");
        toast.error(errors);
      } else {
        // Default error message for unexpected issues
        toast.error("An unexpected error occurred");
      }

      console.error("Error: ", error);
    }
  };

  console.log(passLoading);
  return (
    <div className="pt-16">
      <p className="text-xl font-bold">Profile Info</p>
      <div className="mt-8 pb-10 border-b">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-[#222529] text-xs font-medium mt-5">NAME</p>
            <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="focus:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <p className="text-[#222529] text-xs font-medium mt-5">Email</p>
            <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
              <input
                type="text"
                value={userEmail}
                className="focus:outline-none w-full text-gray-300"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={handleUpdateUser}
            disabled={isLoading.status === "pending"}
            className="border hover:bg-[#18181b] hover:text-white duration-300 transition-colors border-black h-12 px-8 text-sm rounded-full"
          >
            {isLoading.status === "pending" ? <Loader /> : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      <div className="pt-10">
        <p className="text-xl font-bold">Change Password</p>
        <div className="mt-8 pb-10">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-[#222529] text-xs font-medium mt-5">
                CURRENT PASSWORD
              </p>
              <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => {
                    setCurrentPass(e.target.value), setCurrentPassError("");
                  }}
                  className="focus:outline-none w-full"
                />
              </div>
              {currentPassError && (
                <p className="text-[10px] text-red-500">{currentPassError}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-[#222529] text-xs font-medium mt-5">
                NEW PASSWORD
              </p>
              <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
                <input
                  type="text"
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                    setNewPassError("");
                    checkPasswordStrength(e.target.value);
                  }}
                  className="focus:outline-none w-full"
                />
              </div>
              {newPassError && (
                <p className="text-[10px] text-red-500">{newPassError}</p>
              )}
              {newPass && (
                <div
                  className={`text-[10px] ${
                    strength === "Weak" && "text-red-600"
                  } ${strength === "Medium" && "text-orange-600"} ${
                    strength === "Strong" && "text-green-600"
                  }`}
                >
                  {strength}
                </div>
              )}
              {showPassStrengthList && (
                <div className="text-[10px] my-2 ml-4">
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
            <div>
              <p className="text-[#222529] text-xs font-medium mt-5">
                CONFIRM PASSWORD
              </p>
              <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
                <input
                  type="text"
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value), setNewPassError("");
                  }}
                  className="focus:outline-none w-full"
                />
              </div>
              {newPassError && (
                <p className="text-[10px] text-red-500">{newPassError}</p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center my-10">
            <button
              onClick={handleUpdatePassword}
              disabled={passLoading}
              className="border hover:bg-[#18181b] hover:text-white duration-300 transition-colors border-black h-12 px-8 text-sm rounded-full"
            >
              {passLoading ? <Loader /> : "SAVE CHANGES"}
            </button>
          </div>
          <p className="text-center text-[#222529] text-xs font-medium uppercase">
            You will be asked to log in again with your new password after you
            save your changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
