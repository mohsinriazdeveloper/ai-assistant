import Image, { StaticImageData } from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

type Content = {
  icon?: StaticImageData;
  url: string;
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
  return (
    <div>
      {content.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer px-3 py-3 hover:bg-gray-50 rounded w-full mb-1 ${
            item.url === checkOption ? "bg-gray-50" : "bg-white"
          }`}
          onClick={() => setCheckOption?.(item.url)}
        >
          <div className="flex items-end gap-2">
            {item.icon && <Image src={item.icon} alt="" className="max-w-5" />}
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
