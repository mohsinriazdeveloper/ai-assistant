"use client";
import { FC, useState } from "react";
import {
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import LeftBar from "../LeftBar/LeftBar";
import { content } from "./content";
import DeleteModal from "../Dialogues/DeleteModal";
import DeleteAgent from "../DeleteAgent/DeleteAgent";
import AgentModel from "../AgentModel/AgentModel";
import Loader from "../Loader/Loader";
import Image, { StaticImageData } from "next/image";
import { IoMdAdd } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

type PayLoad = {
  id: number;
  name: string;
};

interface AgentSettings {
  agentId: any;
}

const AgentSettings: FC<AgentSettings> = ({ agentId }) => {
  const [checkOption, setCheckOption] = useState<string>("settings");
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);
  const [addImage, setAddImage] = useState<any>();
  const [preview, setPreview] = useState<string>();

  const { data: allAgents, isLoading } = useGetAllAgentsQuery();
  const agent = allAgents?.find(
    (agent) => agent.id.toString() === agentId.toString()
  );
  //@ts-ignore
  const [agentName, setAgentName] = useState<string>("" || agent?.name);

  const [agentID] = useState<any>(agent?.id);
  const [updating] = useUpdateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", agentID);
    formData.append("name", agentName);
    if (addImage) {
      formData.append("image", addImage);
    }
    try {
      const res = await updating(formData);
      //@ts-ignore
      if (res.error?.status === "FETCH_ERROR") {
        toast.error("Image size is too large");
      } else {
        toast.success("Successfully Updated");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update");
      console.error("Failed to update", error);
    }
  };
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setAddImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
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
          <div className="md:col-span-10 col-span-12">
            {checkOption === "settings" ? (
              <div>
                <div className="w-full border border-gray-200 rounded-lg py-7 px-6 flex flex-col gap-10 mb-10">
                  <p className="text-2xl font-medium">General</p>
                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">
                      Add Agent Image
                    </p>
                    <label htmlFor="addImage">
                      <div className="w-[142px] h-[121px] border border-gray-200 rounded-md flex justify-center items-center cursor-pointer overflow-hidden">
                        {preview ? (
                          <div
                            className="w-full h-full bg-center bg-cover bg-no-repeat flex justify-center items-center"
                            style={{ backgroundImage: `url(${preview})` }}
                          >
                            <div className="rounded-full bg-gray-100 p-2">
                              <IoMdAdd color="#3F3F46" />
                            </div>
                          </div>
                        ) : (
                          <IoMdAdd color="#3F3F46" />
                        )}
                        <input
                          id="addImage"
                          type="file"
                          onChange={handleAddImage}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">
                      Agent ID
                    </p>
                    <p className="text-sm font-medium ">{agent?.ran_id}</p>
                  </div>
                  <form onSubmit={handleUpdate}>
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-2">
                        Name
                      </p>
                      <input
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="Your Agent Name"
                        type="text"
                        className="focus:outline-none w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md"
                      />
                    </div>
                    <div className="flex justify-end mt-5">
                      <button
                        type="submit"
                        className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
                      >
                        {loading ? <Loader /> : <>save</>}
                      </button>
                    </div>
                  </form>
                </div>
                {allAgents && (
                  <div>
                    <DeleteAgent setOpenDialogue={setOpenDialogue} />
                  </div>
                )}
              </div>
            ) : (
              <AgentModel agentId={agentId} />
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        agentId={agentId}
        openDialogue={openDialogue}
        handleClose={() => setOpenDialogue(false)}
      />
    </div>
  );
};
export default AgentSettings;
