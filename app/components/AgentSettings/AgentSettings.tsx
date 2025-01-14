"use client";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import AgentModel from "../AgentModel/AgentModel";
import DeleteAgent from "../DeleteAgent/DeleteAgent";
import DeleteModal from "../Dialogues/DeleteModal";
import Loader from "../Loader/Loader";
import {
  useGetAgentByIdQuery,
  useUpdateAgentMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { selectIsConnect } from "../ReduxToolKit/connectSlice";
import { useAppSelector } from "../ReduxToolKit/hook";

interface AgentSettings {
  agentId: any;
  checkOption: string;
}

const AgentSettings: FC<AgentSettings> = ({ agentId, checkOption }) => {
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);
  const [addImage, setAddImage] = useState<any>();
  const [preview, setPreview] = useState<string>();
  const [imgError, setImgError] = useState<string>("");
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const { data: agent, isLoading } = useGetAgentByIdQuery(agentId);

  //@ts-ignore
  const [agentName, setAgentName] = useState<string>("" || agent?.name);
  const [agentID] = useState<any>(agent?.id);
  const [updating] = useUpdateAgentMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [agentNameError, setAgentNameError] = useState<string>("");
  const { updateConnectStatus } = useAppSelector(selectIsConnect);

  useEffect(() => {
    if (agent?.image_url) {
      setAddImage(agent.image_url);
      setPreview(agent.image_url);
    }
  }, [agent?.image_url]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const emptyOrSpaces = /^\s*$/;

    if (emptyOrSpaces.test(agentName)) {
      setAgentNameError("The agent name should not be empty");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("id", agentID);
    formData.append("name", agentName);
    formData.append("boc_connected", String(updateConnectStatus));
    if (addImage && typeof addImage !== "string") {
      formData.append("image", addImage);
    }

    try {
      const res = await updating(formData);

      // Handling success response
      if (res?.data === null) {
        toast.success("Successfully Updated");
        //@ts-ignore
      } else if (res?.error?.status === 400) {
        //@ts-ignore
        toast.error(res?.error?.data?.error_message || "Bad Request");
        //@ts-ignore
      } else if (res?.error?.status === "FETCH_ERROR") {
        toast.error("Image size is too large");
      } else {
        toast.error("Failed to update");
      }
    } catch (error: any) {
      // Handling failure response
      if (error?.error?.status === 400) {
        toast.error(error.error.data.error_message || "Bad Request");
      } else if (error?.error?.status === "FETCH_ERROR") {
        toast.error("Image size is too large");
      } else {
        toast.error("Failed to update");
      }
      console.error("Failed to update", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];

    if (selectedFile && allowedFormats.includes(selectedFile.type)) {
      setImgLoading(true);
      setImgError("");
      setPreview("");

      setTimeout(() => {
        setAddImage(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setImgLoading(false);
      }, 2000);
    } else {
      setImgError("Allowed formats are .png, .jpeg, .jpg");
      setAddImage(null);
      setPreview("");
    }
  };

  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length <= 100) {
      setAgentName(newName);
      setAgentNameError("");
    } else {
      setAgentNameError("Name cannot exceed 100 characters.");
    }
  };

  return (
    <div>
      <div className="">
        {checkOption === "general" ? (
          <div>
            <div className="w-full border border-gray-200 rounded-lg py-7 px-6 space-y-5 mb-5">
              <p className="text-2xl font-bold">General</p>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">
                  Add Agent Image
                </p>
                <div>
                  <label htmlFor="addImage">
                    <div className="w-[142px] h-[121px] border border-gray-200 rounded-md flex justify-center items-center cursor-pointer overflow-hidden">
                      {imgLoading ? (
                        <Loader />
                      ) : preview ? (
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
                        accept=".png, .jpeg, .jpg"
                      />
                    </div>
                  </label>
                </div>
                <p className="text-sm text-red-600">{imgError}</p>
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Agent ID
                </p>
                <p className="text-sm font-medium ">{agent?.ran_id}</p>
              </div>
              <form onSubmit={handleUpdate} className="pt-1">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Name</p>
                  <input
                    value={agentName}
                    onChange={handleAgentNameChange}
                    placeholder="Your Agent Name"
                    type="text"
                    className="focus:outline-none w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md"
                  />
                </div>
                {agentNameError && (
                  <p className="text-sm text-red-500">{agentNameError}</p>
                )}
                <div className="flex justify-end mt-5">
                  <button
                    type="submit"
                    className="py-2 px-5 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm"
                  >
                    {loading ? <Loader /> : <>Save</>}
                  </button>
                </div>
              </form>
            </div>
            {agent && (
              <div>
                <DeleteAgent setOpenDialogue={setOpenDialogue} />
              </div>
            )}
          </div>
        ) : (
          <AgentModel agentId={agentId} />
        )}
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
