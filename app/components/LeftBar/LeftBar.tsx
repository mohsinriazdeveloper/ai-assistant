import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

type Content = {
  url: string;
  icon: StaticImageData;
  title: string;
};

interface LeftBarProps {
  content: Content[];
  setCheckOption?: Dispatch<SetStateAction<string>>;
  checkOption?: string;
}

const LeftBar: FC<LeftBarProps> = ({
  content,
  setCheckOption,
  checkOption,
}) => {
  const currentPage = usePathname();

  // Filter out "Image Training" when on the "/dashboard/create-new-agent" page
  const filteredContent =
    currentPage === "/dashboard/create-new-agent"
      ? content.filter((item) => item.title !== "Image Training")
      : content;

  return (
    <div>
      {filteredContent.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer px-3 py-3 hover:bg-gray-50 rounded w-full mb-1 ${
            item.url === checkOption ? "bg-gray-50" : "bg-white"
          }`}
          onClick={() => setCheckOption?.(item.url)}
        >
          <div className="flex items-end gap-2">
            <Image src={item.icon} alt="" className="max-w-5" />
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
