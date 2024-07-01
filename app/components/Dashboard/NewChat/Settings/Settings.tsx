"use client";
import LeftBar from "@/app/components/LeftBar/LeftBar";
import { FC, useState } from "react";
import { content } from "./content";
import DeleteAgent from "@/app/components/DeleteAgent/DeleteAgent";
import DeleteModal from "@/app/components/Dialogues/DeleteModal";
import {
  useGetOrganizationQuery,
  useUpdateAgentMutation,
} from "@/app/components/ReduxToolKit/aiAssistantOtherApis";

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const { data: getOrg } = useGetOrganizationQuery();
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);
  const [checkOption, setCheckOption] = useState<string>("setting");
  console.log("getOrg", getOrg);

  return (
    <div>
      <div className="container mx-auto my-10">
        <p className="text-3xl font-bold">Settings</p>
        <div className="grid grid-cols-12 gap-8 mt-10">
          <div className="col-span-2">
            <LeftBar
              setCheckOption={setCheckOption}
              checkOption={checkOption}
              content={content.sideBarOptions}
            />
          </div>
          <div className="col-span-10 flex flex-col gap-10">
            {checkOption === "setting" && (
              <form>
                <div className="w-full border border-gray-200 py-7 px-6 rounded-lg flex flex-col gap-6">
                  <p className="text-2xl font-semibold">General</p>
                  <div>
                    <p className="text-sm font-medium">Organization ID</p>
                    <div className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md mt-3">
                      {getOrg ? <p>{getOrg.id}</p> : <p>NA</p>}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Organization Name</p>
                    <div className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md mt-3">
                      {getOrg ? <p>{getOrg.name}</p> : <p>NA</p>}
                    </div>
                  </div>
                </div>
              </form>
            )}
            {/* {allAgents && (
              <div>
                <DeleteAgent setOpenDialogue={setOpenDialogue} />
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* <DeleteModal
        openDialogue={openDialogue}
        handleClose={() => setOpenDialogue(false)}
      /> */}
    </div>
  );
};

export default Settings;
