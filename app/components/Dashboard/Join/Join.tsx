"use client";
import { FC, useState } from "react";
// import DotBg from "@/app/assets/Images/dotBg.png";
import Image from "next/image";
import OrganizationIcon from "@/app/assets/Images/organizationIcon.png";
import { useRouter } from "next/navigation";

interface JoinProps {}
const Join: FC<JoinProps> = () => {
  const [orgName, setOrgName] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const router = useRouter();
  const submitData = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgName && orgUrl) {
      return router.push("/dashboard/new-chat");
    }
  };
  return (
    <div
      className="bg-repeat h-screen w-full flex justify-center items-center"
      // style={{ backgroundImage: `url(${DotBg.src})` }}
    >
      <div className="w-[415px] h-[410px] border rounded-lg bg-white p-5">
        <div className="w-[55px] h-[55px] flex justify-center items-center border-2 rounded-full">
          <Image src={OrganizationIcon} alt="" className="max-w-7" />
        </div>
        <div className="mt-2 mb-7">
          <p className="font-bold">Create Organization</p>
          <p className="text-sm font-light">
            This is your Organization’s visible name within Chatbase
          </p>
        </div>
        <form
          onSubmit={submitData}
          className="text-sm font-medium flex flex-col gap-7"
        >
          <div>
            <p>Organization Name</p>
            <label htmlFor="">
              <input
                type="text"
                className="focus:outline-none px-4 py-2 w-full border rounded-md mt-2 font-normal"
                placeholder="Name your Organization"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <p>Organization Link</p>
            <label htmlFor="">
              <input
                type="text"
                className="focus:outline-none px-4 py-2 w-full border rounded-md mt-2 font-normal"
                placeholder="URL of your Organization"
                value={orgUrl}
                onChange={(e) => setOrgUrl(e.target.value)}
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="p-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md w-[110px]"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Join;
