import Image from "next/image";
import { FC } from "react";
import PlusIcon from "@/app/assets/icons/plus.png";

interface WebsiteTrainingProps {}

const WebsiteTraining: FC<WebsiteTrainingProps> = () => {
  return (
    <div className="mt-7">
      <div>
        <p className="">Crawl</p>
        <div className="flex justify-between items-center gap-2 mt-1">
          <label htmlFor="" className="grow">
            <input
              type="text"
              placeholder="http://www.example.com"
              className="border rounded-md px-3 py-2 focus:outline-none w-full"
            />
          </label>
          <button className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm">
            Fetch Links
          </button>
        </div>
        <p className="mt-2 text-sm">
          This will crawl all the links starting with the URL (not including
          files on the website).
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
              className="border rounded-md px-3 py-2 focus:outline-none w-full"
            />
          </label>
          <button className="py-2 px-3 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-md text-sm">
            Load sitemap
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-14 mb-4">
        <div className="border-b border w-full"></div>
        <p className="text-[52525b] min-w-fit">Included Links</p>
        <div className="border-b border w-full"></div>
      </div>

      <div className="w-9 h-9 bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer ml-auto">
        <Image src={PlusIcon} alt="Add" className="w-3" />
      </div>
    </div>
  );
};

export default WebsiteTraining;
