"use client";
import LeftBar from "@/app/components/LeftBar/LeftBar";
import Loader from "@/app/components/Loader/Loader";
import { useGetOrganizationQuery } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FC, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { content } from "./content";
import ProfileInfo from "./ProfileInfo";

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const { data: getOrg, isLoading } = useGetOrganizationQuery();
  const [checkOption, setCheckOption] = useState<string>("setting");

  return (
    <div>
      <div className="md:container md:mx-auto mx-5 my-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="md:col-span-2 col-span-12">
            <p className="text-3xl font-bold mb-10">Settings</p>
            <LeftBar
              setCheckOption={setCheckOption}
              checkOption={checkOption}
              content={content.sideBarOptions}
            />
          </div>
          <div className="md:col-span-10 col-span-12 flex flex-col gap-10 h-[74vh] overflow-y-scroll scrollbar-hide pt-16">
            {checkOption === "setting" && (
              <div>
                <form className="mb-10">
                  <div className="w-full border border-gray-200 py-7 px-6 rounded-lg flex flex-col gap-6">
                    <p className="text-2xl font-semibold">General</p>
                    <div>
                      <p className="text-sm font-medium">Organization ID</p>
                      <div className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md mt-3">
                        {getOrg ? <p>{getOrg.ran_id}</p> : <Loader />}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Organization Name</p>
                      <div className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md mt-3">
                        {getOrg ? <p>{getOrg.name}</p> : <Loader />}
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex gap-5">
                  <div className="w-[150px] h-[146px] border border-[#bfbfbf] rounded-lg bg-gradient-to-br from-[#f9f9f9] to-[#ffffff] flex justify-center items-center">
                    <p className="font-medium text-lg text-[#BDBDBD]">
                      No Logo
                    </p>
                  </div>
                  <div className="h-full flex flex-col justify-between pt-3">
                    <div className="mb-6">
                      <p className="text-lg font-medium">
                        Account / Organization Logo
                      </p>
                    </div>
                    <div>
                      <p className="text-xs">
                        This logo will be used on a black GB. Use a <br />
                        white/colored logo for better results
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <button className="border border-black rounded-full py-2 px-8 text-xs hover:bg-black hover:text-white duration-300 transition-colors">
                          Update
                        </button>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <RiDeleteBin6Line className="text-sm" />
                          <p className="text-xs">Remove</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ProfileInfo />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
