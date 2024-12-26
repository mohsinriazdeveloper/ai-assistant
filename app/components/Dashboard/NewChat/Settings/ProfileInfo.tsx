import { FC } from "react";

interface ProfileInfoProps {}

const ProfileInfo: FC<ProfileInfoProps> = ({}) => {
  return (
    <div className="pt-16">
      <p className="text-xl font-bold">Profile Info</p>
      <div className="mt-8 pb-10 border-b">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-[#222529] text-xs font-medium mt-5">
              FIRST NAME
            </p>
            <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
              <input type="text" className="focus:outline-none w-full" />
            </div>
          </div>
          <div>
            <p className="text-[#222529] text-xs font-medium mt-5">LAST NAME</p>
            <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
              <input type="text" className="focus:outline-none w-full" />
            </div>
          </div>
          {/* <div>
            <p className="text-[#222529] text-xs font-medium mt-5">USERNAME*</p>
            <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
              <input type="text" className="focus:outline-none w-full" />
            </div>
          </div>
          <div>
            <p className="text-[#222529] text-xs font-medium mt-5">EMAIL</p>
            <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
              <input
                type="text"
                className="focus:outline-none w-full"
                readOnly
              />
            </div>
          </div> */}
        </div>
        <div className="w-full flex justify-center mt-10">
          <button className="border border-black h-12 px-8 text-sm rounded-full">
            SAVE CHANGES
          </button>
        </div>
      </div>

      <div className="pt-10">
        <p className="text-xl font-bold">Change Password</p>
        <div className="mt-8 pb-10 ">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-[#222529] text-xs font-medium mt-5">
                CURRENT PASSWORD
              </p>
              <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
                <input type="text" className="focus:outline-none w-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-[#222529] text-xs font-medium mt-5">
                NEW PASSWORD
              </p>
              <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
                <input type="text" className="focus:outline-none w-full" />
              </div>
            </div>
            <div>
              <p className="text-[#222529] text-xs font-medium mt-5">
                CONFIRM PASSWORD
              </p>
              <div className="border border-[#e4e7eb] rounded mt-2 py-3 px-4 text-sm">
                <input type="text" className="focus:outline-none w-full" />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center my-10">
            <button className="border border-black h-12 px-8 text-sm rounded-full">
              SAVE CHANGES
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
