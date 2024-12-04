import axios from "axios";
import * as cheerio from "cheerio";
import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
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
      <p className="font-semibold text-2xl">Websites</p>
      <div className="flex justify-end items-center gap-5 mb-6">
        <div
          onClick={handleCreateNewInput}
          className="w-9 h-9 bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer"
        >
          <span className="text-black">+</span>
        </div>
      </div>

      {newLinks.map((item, index) => (
        <div key={item.id} className="flex items-start mb-1 gap-2">
          <label className="grow">
            <input
              type="text"
              placeholder="https://www.example.com/"
              value={item.url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              className={`text-sm border rounded-md px-3 py-[6px] focus:outline-none w-full ${
                item.isValid ? "" : "border-red-500"
              }`}
              disabled={item.isScraped}
            />
            {!item.isValid && (
              <p className="text-red-500 text-xs">Invalid URL</p>
            )}
          </label>
          <button
            className={`py-[6px] px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm ${
              item.isScraped ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => scrapeWebsite(index)}
            disabled={
              item.isLoading || item.isScraped || !item.url || !item.isValid
            }
          >
            {item.isLoading ? <Loader /> : "Scrape"}
          </button>
          {item.isScrapingError ? (
            <div className="h-full flex justify-center self-center">
              <MdOutlineCancel className="text-red-500 " size={20} />
            </div>
          ) : (
            <>
              {item.isScraped ? (
                <div className="h-full flex justify-center self-center">
                  <AiOutlineCheckCircle className="text-green-500" size={20} />
                </div>
              ) : item.isLoading ? (
                <Loader />
              ) : (
                <div className="w-5"></div>
              )}
            </>
          )}
          {deletingIds.includes(item.id) ? (
            <Loader />
          ) : (
            <div
              onClick={() => handleDeleteLink(index, item.id)}
              className="flex justify-center self-center cursor-pointer bg-white hover:bg-red-50 rounded-lg transition-colors duration-300"
            >
              <RiDeleteBin7Line className="text-red-500" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WebsiteTraining;
