"use client";
import LeftBar from "@/app/components/LeftBar/LeftBar";
import Loader from "@/app/components/Loader/Loader";
import {
  useDeleteOrgImgMutation,
  useGetOrganizationQuery,
  useUpdateOrgImgMutation,
} from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FC, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { content } from "./content";
import ProfileInfo from "./ProfileInfo";

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const { data: getOrg, isLoading } = useGetOrganizationQuery();
  const [updateOrgImg] = useUpdateOrgImgMutation();
  const [delImg] = useDeleteOrgImgMutation();

  const [checkOption, setCheckOption] = useState<string>("setting");
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const [imgError, setImgError] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (getOrg?.image) {
      setPreview(getOrg.image);
    }
  }, [getOrg?.image]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first file from the input
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setImgError(
          "Invalid file type. Only .jpg, .jpeg, and .png are allowed."
        );
        return;
      }

      // Clear any existing error and set file
      setImgError("");

      // Create a preview URL for the image
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);

      const fd = new FormData();
      fd.append("image", file);

      try {
        updateOrgImg(fd);
      } catch (error) {}
    }
  };

  const handleRemoveImage = async () => {
    const id = 2;
    if (preview) {
      try {
        // Call the mutation function and unwrap the result
        const res = await delImg(id);
        console.log("Image deleted successfully:", res);
        setPreview(""); // Clear the preview
      } catch (error) {
        console.error("Error while deleting image:", error);
        setImgError("Failed to delete the image.");
      }
    } else {
      setImgError("No image found.");
    }
  };

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
          <div className="w-full md:col-span-10 col-span-12 overflow-y-scroll primaryScroller">
            <div className="flex flex-col gap-10 pt-16 h-[74vh] pr-4">
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
                    <div>
                      {preview ? (
                        <div
                          className="w-[150px] h-[146px] border border-[#bfbfbf] rounded-lg bg-cover bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${preview})` }}
                        ></div>
                      ) : (
                        <div className="w-[150px] h-[146px] border border-[#bfbfbf] rounded-lg bg-gradient-to-br from-[#f9f9f9] to-[#ffffff] flex justify-center items-center">
                          <p className="font-medium text-lg text-[#BDBDBD]">
                            No Logo
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-red-600">{imgError}</p>
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
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("fileInput")?.click()
                            }
                            className="border border-black rounded-full py-2 px-8 text-xs hover:bg-black hover:text-white duration-300 transition-colors"
                          >
                            Upload Image
                          </button>
                          <div
                            onClick={handleRemoveImage}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <RiDeleteBin6Line className="text-sm" />
                            <p className="text-xs">Remove</p>
                          </div>
                        </div>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/jpeg, image/png, image/jpg"
                          className="hidden"
                          onChange={handleFileChange}
                        />
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
    </div>
  );
};

export default Settings;
