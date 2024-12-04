"use client";
import LeftBar from "@/app/components/LeftBar/LeftBar";
import Loader from "@/app/components/Loader/Loader";
import { useGetOrganizationQuery } from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FC, useState } from "react";
import { content } from "./content";

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const { data: getOrg, isLoading } = useGetOrganizationQuery();
  const [checkOption, setCheckOption] = useState<string>("setting");

  return (
    <div>
      <div className="md:container md:mx-auto mx-5 my-10">
        <p className="text-3xl font-bold">Settings</p>
        <div className="grid grid-cols-12 gap-8 mt-10">
          <div className="md:col-span-2 col-span-12">
            <LeftBar
              setCheckOption={setCheckOption}
              checkOption={checkOption}
              content={content.sideBarOptions}
            />
          </div>
          <div className="md:col-span-10 col-span-12 flex flex-col gap-10">
            {checkOption === "setting" && (
              <form>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
