import axios from "axios";
import * as cheerio from "cheerio";
import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from "../../Loader/Loader";
import { useDeleteFileMutation } from "../../ReduxToolKit/aiAssistantOtherApis";

interface WebsiteTrainingProps {
  setWebsiteContentLength: Dispatch<SetStateAction<number>>;
  newLinks: {
    id: number;
    url: string;
    content: string;
    isValid: boolean;
    isLoading: boolean;
    isScraped: boolean;
    isScrapingError?: boolean;
  }[];
  setNewLinks: Dispatch<
    SetStateAction<
      {
        id: number;
        url: string;
        content: string;
        isValid: boolean;
        isLoading: boolean;
        isScraped: boolean;
        isScrapingError?: boolean;
      }[]
    >
  >;
}

const WebsiteTraining: FC<WebsiteTrainingProps> = ({
  setWebsiteContentLength,
  newLinks,
  setNewLinks,
}) => {
  const [delExistingFile] = useDeleteFileMutation();
  const urlRegex = /^https:\/\/[a-zA-Z]/;
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const handleCreateNewInput = () => {
    setNewLinks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        url: "",
        content: "",
        isValid: true,
        isLoading: false,
        isScraped: false,
        isScrapingError: false,
      },
    ]);
  };

  const handleUrlChange = (index: number, value: string) => {
    setNewLinks((prev) =>
      prev.map((link, i) =>
        i === index
          ? { ...link, url: value, isValid: urlRegex.test(value) }
          : link
      )
    );
  };

  const handleDeleteLink = async (index: number, id: number) => {
    setDeletingIds((prev) => [...prev, id]);

    const websiteToRemove = newLinks[index];
    try {
      await delExistingFile(id);
      toast.success("URL deleted successfully");

      if (websiteToRemove.isScraped) {
        setWebsiteContentLength(
          (prevTotal) => prevTotal - websiteToRemove.content.length
        );
      }

      setNewLinks((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      toast.error("Unable to delete file");
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  };

  const scrapeWebsite = async (index: number) => {
    const { url } = newLinks[index];
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }

    setNewLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, isLoading: true } : link))
    );

    try {
      const fullUrl = `https://app.scrapingbee.com/api/v1/?api_key=${
        process.env.NEXT_PUBLIC_SCRAPINGBEE_API_KEY
      }&url=${encodeURIComponent(url)}`;

      const response = await axios.get(fullUrl, {
        params: { render_js: "true", block_ads: "true" },
      });

      const $ = cheerio.load(response.data);
      const website_content = $("body").text().replace(/\s+/g, " ").trim();
      const charCount = website_content.length;

      setNewLinks((prev) =>
        prev.map((link, i) =>
          i === index
            ? {
                ...link,
                content: website_content,
                isLoading: false,
                isScraped: true,
                isScrapingError: false,
              }
            : link
        )
      );

      setWebsiteContentLength((prev) => prev + charCount);
      toast.success("Data scraped successfully");
    } catch (error: any) {
      toast.error("Error scraping website");
      setNewLinks((prev) =>
        prev.map((link, i) =>
          i === index
            ? { ...link, isLoading: false, isScrapingError: true }
            : link
        )
      );
    }
  };

  return (
    <div className="">
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
      {newLinks.map((item, index) => (
        <div key={item.id} className=" border rounded-lg p-4 text-sm mb-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-10 gap-3">
              <label className="">
                <input
                  type="text"
                  placeholder="https://www.example.com/"
                  value={item.url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className={`text-sm border border-[#c4c4c4] rounded-md px-3 py-[6px] focus:outline-none w-full ${
                    item.isValid ? "" : "border-red-500"
                  }`}
                  disabled={item.isScraped}
                />
                {!item.isValid && (
                  <p className="text-red-500 text-xs">Invalid URL</p>
                )}
              </label>
              <div className="space-y-4 mt-5">
                <div className="">
                  <p>Source Name</p>
                  <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                    <input
                      type="text"
                      placeholder="Source Unique Label"
                      className="font-light focus:outline-none w-full"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex justify-between items-end">
                    <p>Context/clarifications</p>
                    <p className="text-xs max-w-[345px]">
                      Give more information and context to your AI about this
                      data source. This will help the AI to fetch this data
                      appropriately
                    </p>
                  </div>

                  <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                    <textarea
                      rows={2}
                      placeholder="Enter Context"
                      className=" focus:outline-none font-light w-full resize-none"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex justify-between items-end">
                    <p>Instructions</p>
                    <p className="text-xs max-w-[345px]">
                      Give instructions to your AI to help him understand how to
                      use your data source.
                    </p>
                  </div>

                  <div className="py-2 px-2 border border-[#c4c4c4] rounded mt-1">
                    <textarea
                      rows={2}
                      placeholder="Enter Instructions"
                      className=" focus:outline-none font-light w-full resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="col-span-2">
                <button
                  className={`border rounded-lg px-3 py-1 ${
                    item.isScrapingError
                      ? "border-red-400 bg-red-300 text-red-700"
                      : "border-[#BDE8D3] bg-[#eaf8f1] text-[#27A468]"
                  }`}
                >
                  {item.isScrapingError ? (
                    "Failed"
                  ) : (
                    <>
                      {item.isScraped ? (
                        "Success"
                      ) : item.isLoading ? (
                        <Loader />
                      ) : (
                        "Success"
                      )}
                    </>
                  )}
                </button>
                <p className="text-end text-[10px] font-semibold">
                  Jan 2024 - Aug 2024
                </p>
              </div>
              {/* {item.isScrapingError ? (
                <div className="h-full flex justify-center self-center">
                  <MdOutlineCancel className="text-red-500 " size={20} />
                </div>
              ) : (
                <>
                  {item.isScraped ? (
                    <div className="h-full flex justify-center self-center">
                      <AiOutlineCheckCircle
                        className="text-green-500"
                        size={20}
                      />
                    </div>
                  ) : item.isLoading ? (
                    <Loader />
                  ) : (
                    <div className="w-5"></div>
                  )}
                </>
              )} */}
            </div>
          </div>
          <div className="flex justify-end items-end gap-3 mt-8">
            <button className="py-1 px-4 border border-[#2563DC] text-[#595959] bg-white font-medium rounded-md text-[10px] w-max">
              Raw data
            </button>
            <button
              onClick={() => scrapeWebsite(index)}
              disabled={
                item.isLoading || item.isScraped || !item.url || !item.isValid
              }
              className={`py-2 w-[120px] border border-[#0790FF] bg-[#0790FF] text-white hover:bg-transparent hover:text-[#0790FF] font-medium text-sm rounded-full  ${
                item.isScraped
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Save
            </button>
            {deletingIds.includes(item.id) ? (
              <Loader />
            ) : (
              <RiDeleteBinLine
                className="mb-1 cursor-pointer"
                onClick={() => handleDeleteLink(index, item.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteTraining;
