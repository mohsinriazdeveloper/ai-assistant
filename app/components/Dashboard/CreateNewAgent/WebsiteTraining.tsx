import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { WebsiteTags } from "../../UpdateTraining/trainingTypes.d";

interface WebsiteTrainingProps {
  // need to remove
  webWithTags: WebsiteTags[];
  setWebWithTags: Dispatch<SetStateAction<WebsiteTags[]>>;
}

const WebsiteTraining: FC<WebsiteTrainingProps> = ({
  webWithTags,
  setWebWithTags,
}) => {
  const urlRegex =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

  const [websiteError, setWebsiteError] = useState<string>("");
  const [sourceNameError, setSourceNameError] = useState<string>("");
  const [sourceContextError, setSourceContextError] = useState<string>("");
  const [sourceInstructionsError, setSourceInstructionsError] =
    useState<string>("");

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
  };

  // Function to handle changes in the URL input field
  const handleUrlChange = (index: number, value: string) => {
    if (!urlRegex.test(value)) {
      setWebsiteError("Invalid URL format. Please enter a valid website URL.");
    } else {
      setWebsiteError(""); // Clear error if valid
    }
    setWebWithTags((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, website_url: value } : item
      )
    );
  };

  // Function to handle changes in the other fields
  const handleFieldChange = (
    index: number,
    field: keyof WebsiteTags,
    value: string
  ) => {
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
    toast.success("Website deleted successfully");
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="font-bold text-2xl">Websites</p>
        <div className="flex justify-end items-center gap-5">
          <div
            onClick={handleCreateNewInput}
            className="w-8 h-8 bg-black rounded flex justify-center items-center text-white text-xs cursor-pointer"
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
                    onChange={(e) => {
                      handleUrlChange(index, e.target.value);
                      // setWebsiteError("");
                    }}
                    className={`text-sm border border-[#c4c4c4] rounded-md px-3 py-[6px] focus:outline-none w-full`}
                  />
                </label>
                <p className="text-xs text-red-600">{websiteError}</p>
              </div>
              <div className="space-y-4 mt-5">
                <div>
                  <p>Source Name *</p>
                  <div>
                    <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                      <input
                        type="text"
                        placeholder="Source Unique Label"
                        value={item.source_name}
                        onChange={(e) => {
                          handleFieldChange(
                            index,
                            "source_name",
                            e.target.value
                          );
                          setSourceNameError("");
                        }}
                        className="font-light focus:outline-none w-full"
                      />
                    </div>
                    <p className="text-xs text-red-600">{sourceNameError}</p>
                  </div>
                </div>
                <div>
                  <div className="w-full flex justify-between items-end">
                    <p>Context/clarifications *</p>
                    <p className="text-xs max-w-[345px]">
                      Give more information and context to your AI about this
                      data source. This will help the AI to fetch this data
                      appropriately
                    </p>
                  </div>
                  <div>
                    <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                      <textarea
                        rows={2}
                        placeholder="Enter Context"
                        value={item.source_context}
                        onChange={(e) => {
                          handleFieldChange(
                            index,
                            "source_context",
                            e.target.value
                          );
                          setSourceContextError("");
                        }}
                        className="focus:outline-none font-light w-full resize-none"
                      />
                    </div>
                    <p className="text-xs text-red-600">{sourceContextError}</p>
                  </div>
                </div>
                <div>
                  <div className="w-full flex justify-between items-end">
                    <p>Instructions *</p>
                    <p className="text-xs max-w-[345px]">
                      Give instructions to your AI to help him understand how to
                      use your data source.
                    </p>
                  </div>
                  <div>
                    <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                      <textarea
                        rows={2}
                        placeholder="Enter Instructions"
                        value={item.source_instructions}
                        onChange={(e) => {
                          handleFieldChange(
                            index,
                            "source_instructions",
                            e.target.value
                          );
                          setSourceInstructionsError("");
                        }}
                        className="focus:outline-none font-light w-full resize-none"
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {sourceInstructionsError}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="w-full flex justify-between items-end">
                    <p>Daily Auto-Updates *</p>
                    <p className="text-xs max-w-[345px]">
                      If your data source updates at regular intervals, select
                      the appropriate update frequency to update automatically.
                    </p>
                  </div>
                  <div className="border border-[#c3c3c3] rounded py-3 px-4 w-full space-y-2">
                    {[
                      "manually",
                      "maily",
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
