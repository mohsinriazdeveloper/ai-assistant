import Image from "next/image";
import { FC, useState } from "react";
import PlusIcon from "@/app/assets/icons/plus.png";
import { RiDeleteBin7Line } from "react-icons/ri";

interface WebsiteTrainingProps {}

const WebsiteTraining: FC<WebsiteTrainingProps> = () => {
  const [crawUrl, setCrawlUrl] = useState<string>("");
  const [newLink, setNewLink] = useState<
    { id: number; url: string; isValid: boolean }[]
  >([]);
  const urlRegex = /^https:\/\/[a-zA-Z]/;

  const handleCreateNewInput = () => {
    setNewLink((prev) => [
      ...prev,
      { id: prev.length + 1, url: "", isValid: true },
    ]);
  };

  const handleUrlChange = (index: number, value: string) => {
    setNewLink((prev) =>
      prev.map((link, i) =>
        i === index
          ? { ...link, url: value, isValid: urlRegex.test(value) }
          : link
      )
    );
  };

  return (
    <div className="mt-7">
      <div>
        <p className="">Crawl</p>
        <div className="flex justify-between items-center gap-2 mt-1">
          <label htmlFor="" className="grow">
            <input
              type="text"
              placeholder="http://www.example.com"
              value={crawUrl}
              onChange={(e) => setCrawlUrl(e.target.value)}
              className="text-sm border rounded-md px-3 py-[6px] focus:outline-none w-full"
            />
          </label>
          <button className="py-[6px] px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm">
            Fetch Links
          </button>
        </div>
        <p className="mt-2 text-sm">
          This will crawl all the links starting with the &apos;
          {crawUrl ? crawUrl : "URL"}&apos; (not including files on the
          website).
        </p>
      </div>
      <div className="flex items-center gap-2 my-9">
        <div className="border-b border w-full"></div>
        <p className="text-[52525b]">OR</p>
        <div className="border-b border w-full"></div>
      </div>
      <div>
        <p className="">Submit Sitemap</p>
        <div className="flex justify-between items-center gap-2 mt-1">
          <label htmlFor="" className="grow">
            <input
              type="text"
              placeholder="https://www.example.com/sitemap.xml"
              className="text-sm border rounded-md px-3 py-[6px] focus:outline-none w-full"
            />
          </label>
          <button className="py-[6px] px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm">
            Load sitemap
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-14 mb-4">
        <div className="border-b border w-full"></div>
        <p className="text-[52525b] min-w-fit">Included Links</p>
        <div className="border-b border w-full"></div>
      </div>

      <div className="flex justify-end items-center gap-5 mb-6">
        {newLink.length > 0 && (
          <p
            className="text-sm text-red-500 font-medium cursor-pointer"
            onClick={() => setNewLink([])}
          >
            Delete all
          </p>
        )}
        <div
          onClick={handleCreateNewInput}
          className="w-9 h-9 bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer"
        >
          <Image src={PlusIcon} alt="Add" className="w-3" />
        </div>
      </div>

      {newLink.map((item, index) => (
        <div key={index} className="flex items-center mb-1 gap-2">
          <label htmlFor="" className="grow">
            <input
              type="text"
              placeholder="https://www.example.com/"
              value={item.url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              className={`text-sm border rounded-md px-3 py-[6px] focus:outline-none w-full ${
                item.isValid ? "" : "border-red-500"
              }`}
            />
            {!item.isValid && (
              <p className="text-red-500 text-xs">Invalid URL</p>
            )}
          </label>
          <div
            onClick={() =>
              setNewLink((prev) => prev.filter((_, i) => i !== index))
            }
            className="w-9 h-9 flex justify-center items-center cursor-pointer bg-white hover:bg-red-50 rounded-lg transition-colors duration-300"
          >
            <RiDeleteBin7Line className="text-red-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteTraining;
