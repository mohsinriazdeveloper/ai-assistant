import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Validation, WebsiteTags } from "../../UpdateTraining/trainingTypes.d";

interface WebsiteTrainingProps {
  webWithTags: WebsiteTags[];
  setWebWithTags: Dispatch<SetStateAction<WebsiteTags[]>>;
  setWebValidations: Dispatch<SetStateAction<Validation[]>>;
  webValidations: Validation[];
  setWebLinkError: Dispatch<SetStateAction<boolean>>;
}

const WebsiteTraining: FC<WebsiteTrainingProps> = ({
  webWithTags,
  setWebWithTags,
  setWebValidations,
  webValidations,
  setWebLinkError,
}) => {
  const [urlError, setUrlError] = useState<string>("");
  const urlRegex =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

  // Function to handle adding a new input row
  const handleCreateNewInput = () => {
    setWebWithTags((prev) => [
      ...prev,
      {
        website_url: "",
        source_name: "",
        source_context: "",
        source_instructions: "",
        website_auto_update: "manually",
      },
    ]);

    setWebValidations((prev) => [
      ...prev,
      {
        sourceName: false,
        sourceContext: false,
        sourceInstructions: false,
      },
    ]);
  };

  // Utility function to update validation
  const updateValidation = (
    index: number,
    field: keyof Validation,
    isValid: boolean
  ) => {
    setWebValidations((prev) => {
      const updatedValidations = [...prev];
      if (updatedValidations[index]) {
        updatedValidations[index][field] = !isValid;
      }
      return updatedValidations;
    });
  };

  // Function to handle changes in the URL input field
  const handleUrlChange = (index: number, value: string) => {
    const isValid = urlRegex.test(value);
    if (isValid) {
      setUrlError("");
      setWebLinkError(false);
    } else {
      setUrlError("Invalid URL");
      setWebLinkError(true);
    }
    updateValidation(index, "webUrl", isValid);
    setWebWithTags((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, website_url: value } : item
      )
    );
  };

  // Function to handle changes in other fields
  const handleFieldChange = (
    index: number,
    field: keyof WebsiteTags,
    value: string,
    validationField: keyof Validation
  ) => {
    const isValid = value.trim().length > 0;
    updateValidation(index, validationField, isValid);
    setWebWithTags((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleUpdateOption = (index: number, option: string) => {
    setWebWithTags((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, website_auto_update: option } : item
      )
    );
  };

  const handleDelete = (index: number) => {
    setWebWithTags((prev) => prev.filter((_, i) => i !== index));
    setWebValidations((prev) => prev.filter((_, i) => i !== index));
    toast.success("Website deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="font-bold text-[40px]">Websites</p>
        <div className="flex justify-end items-center gap-5">
          <div
            onClick={handleCreateNewInput}
            className="w-[50px] h-[50px] bg-black rounded-[5px] flex justify-center items-center text-white text-lg cursor-pointer"
          >
            <FaPlus />
          </div>
        </div>
      </div>

      {webWithTags.map((item, index) => (
        <div key={index} className="border rounded-lg p-4 text-sm mb-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-10 gap-3">
              <div>
                <label>
                  <input
                    type="text"
                    placeholder="https://www.example.com/"
                    value={item.website_url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    className={`text-sm border rounded-md px-3 py-[6px] focus:outline-none w-full ${
                      webValidations[index]?.webUrl
                        ? "border-red-600"
                        : "border-[#667085]"
                    }`}
                  />
                </label>
                {urlError && <p className="text-xs text-red-500">{urlError}</p>}
              </div>
              <div className="space-y-4 mt-5 w-[45%]">
                <div>
                  <p className="text-sm">Name*</p>
                  <div
                    className={`py-2 px-2 border rounded mt-1 ${
                      webValidations[index]?.sourceName
                        ? "border-red-600"
                        : "border-[#667085]"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Source Unique Label"
                      value={item.source_name}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "source_name",
                          e.target.value,
                          "sourceName"
                        )
                      }
                      className="font-light focus:outline-none w-full"
                    />
                  </div>
                </div>
                <div>
                  {/* <div className="w-full grid grid-cols-12 gap-2 justify-between items-end"> */}
                  <p className="col-span-5 text-sm">Context / clarifications</p>
                  {/* <p className="text-xs col-span-7">
                      Provide context to your AI about this data source.
                    </p>
                  </div> */}
                  <div
                    className={`py-2 px-2 border rounded mt-1 ${
                      webValidations[index]?.sourceContext
                        ? "border-red-600"
                        : "border-[#667085]"
                    }`}
                  >
                    <textarea
                      rows={2}
                      placeholder="Enter Context"
                      value={item.source_context}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "source_context",
                          e.target.value,
                          "sourceContext"
                        )
                      }
                      className="focus:outline-none font-light w-full resize-none"
                    />
                  </div>
                </div>
                <div>
                  {/* <div className="w-full grid grid-cols-12 gap-2 justify-between items-end"> */}
                  <p className="col-span-5 text-sm">Instructions</p>
                  {/* <p className="text-xs col-span-7">
                      Provide instructions to your AI about how to use this data
                      source.
                    </p>
                  </div> */}
                  <div
                    className={`py-2 px-2 border rounded mt-1 ${
                      webValidations[index]?.sourceInstructions
                        ? "border-red-600"
                        : "border-[#667085]"
                    }`}
                  >
                    <textarea
                      rows={2}
                      placeholder="Enter Instructions"
                      value={item.source_instructions}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "source_instructions",
                          e.target.value,
                          "sourceInstructions"
                        )
                      }
                      className="focus:outline-none font-light w-full resize-none"
                    />
                  </div>
                </div>
                <div>
                  {/* <div className="w-full grid grid-cols-12 gap-2 justify-between items-end"> */}
                  <p className="col-span-5 text-sm">Daily Auto-Updates *</p>
                  {/* <p className="text-xs col-span-7">
                      If your data source updates at regular intervals, select
                      the appropriate update frequency to update automatically.
                    </p>
                  </div> */}
                  <div className="border border-[#667085] rounded py-3 px-4 w-full space-y-2 mt-1">
                    {[
                      "manually",
                      "daily",
                      "weekly",
                      "monthly",
                      "quarterly",
                    ].map((option) => (
                      <div
                        key={option}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleUpdateOption(index, option)}
                      >
                        <div className="w-5 h-5 rounded-[7px] border-2 border-[#A8A2A2] flex justify-center items-center text-sm font-bold">
                          <p className="pb-1">
                            {item.website_auto_update === option ? "x" : ""}
                          </p>
                        </div>
                        <p className="capitalize">{option}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <button className="border border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468] rounded-lg px-3 py-1">
                  Success
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-end gap-3 mt-8">
            <RiDeleteBinLine
              onClick={() => handleDelete(index)}
              className="mb-1 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteTraining;
