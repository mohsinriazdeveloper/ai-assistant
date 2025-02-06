"use client";
import LeftBar from "@/app/components/LeftBar/LeftBar";
import Loader from "@/app/components/Loader/Loader";
import {
  useDeleteOrgImgMutation,
  useGetOrganizationQuery,
  useUpdateOrgImgMutation,
  useUpdateOrgNameMutation,
} from "@/app/components/ReduxToolKit/aiAssistantOtherApis";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { content } from "./content";
import ProfileInfo from "./ProfileInfo";
import "./style.css";

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const { data: getOrg, isLoading } = useGetOrganizationQuery();
  const [updateOrg] = useUpdateOrgNameMutation();
  const [updateOrgImg] = useUpdateOrgImgMutation();
  const [delImg] = useDeleteOrgImgMutation();
  const [checkOption, setCheckOption] = useState<string>("setting");
  const [imgError, setImgError] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [orgName, setOrgName] = useState<string>("");

  useEffect(() => {
    if (getOrg?.name) {
      setOrgName(getOrg.name);
    } else {
      setOrgName("");
    }
  }, [getOrg]);

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

  const handleUpdateOrg = async () => {
    if (!orgName.trim()) {
      toast.error("Organization name should not be empty");
      return;
    }
    if (orgName === getOrg?.name) {
      return;
    }
    const payload = {
      name: orgName,
    };
    try {
      await updateOrg(payload);
      toast.success("Organization Name updated successfully");
    } catch (error) {
      toast.error("Failed to update organization name");
    }
  };
  return (
    <div className="dashboardSetting mt-[110px]">
      <div className="md:container md:mx-auto mb-10">
        <div className="">
          <p className="md:text-3xl text-2xl font-bold">Settings</p>
          <HiOutlineDotsHorizontal
            className={`text-2xl cursor-pointer md:hidden block`}
            onClick={() => setShowSideBar(!showSideBar)}
          />
        </div>
        <div className={`grid grid-cols-12 gap-8`}>
          <div
            className={`md:col-span-2 md:w-full w-[200px] md:relative absolute pt-5 h-full bg-white md:border-none border ${
              showSideBar ? "block" : "hidden"
            }`}
          >
            <LeftBar
              setCheckOption={setCheckOption}
              checkOption={checkOption}
              content={content.sideBarOptions}
            />
          </div>
          <div className="w-full md:col-span-10 col-span-12 overflow-y-scroll primaryScroller">
            <div className="flex flex-col gap-10 pt-16 xl:h-[65vh]  md:h-[60vh] h-[55vh] pr-4">
              {checkOption === "setting" && (
                <div>
                  <div className="mb-10">
                    <div className="w-full border border-gray-200 py-7 px-6 rounded-lg flex flex-col gap-6">
                      <p className="md:text-2xl text-xl font-semibold">
                        General
                      </p>
                      <div>
                        <p className="text-sm font-medium">Organization ID</p>
                        <div className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md mt-3">
                          {getOrg ? <p>{getOrg.ran_id}</p> : <Loader />}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Organization Name</p>
                        <input
                          type="text"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-300 font-medium rounded-md mt-3"
                        />
                      </div>
                      <div className="w-full flex justify-center">
                        <button
                          onClick={handleUpdateOrg}
                          className="border hover:bg-[#18181b] hover:text-white duration-300 transition-colors border-black h-12 px-8 text-sm rounded-full"
                        >
                          SAVE CHANGES
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="sm:flex gap-5">
                    <div>
                      {preview ? (
                        <div
                          className="md:w-[150px] w-[120px] md:h-[146px] h-[116px] border border-[#bfbfbf] rounded-lg bg-cover bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${preview})` }}
                        ></div>
                      ) : (
                        <div className="md:w-[150px] w-[120px] md:h-[146px] h-[116px] border border-[#bfbfbf] rounded-lg bg-gradient-to-br from-[#f9f9f9] to-[#ffffff] flex justify-center items-center">
                          <p className="font-medium text-lg text-[#BDBDBD]">
                            No Logo
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-red-600">{imgError}</p>
                    </div>
                    <div className="h-full flex flex-col justify-between md:pt-3 sm:pt-0 pt-3">
                      <div className="md:mb-6">
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
