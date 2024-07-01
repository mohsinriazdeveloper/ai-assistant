import { FC, useState } from "react";
import LeftBar from "../LeftBar/LeftBar";
import { content } from "./content";
import Image from "next/image";

interface ConnectProps {}

const Connect: FC<ConnectProps> = ({}) => {
  const [checkOption, setCheckOption] = useState<string>("integration");
  return (
    <div className="container mx-auto my-10">
      <p className="text-3xl font-bold">Connect</p>
      <div className="grid grid-cols-12 gap-8 mt-10">
        <div className="col-span-2">
          <LeftBar
            setCheckOption={setCheckOption}
            checkOption={checkOption}
            content={content.sideBarOptions}
          />
        </div>
        {checkOption === "integration" && (
          <div className="col-span-10 grid grid-cols-3 gap-4">
            {content.integrationOptions.map((item, index) => (
              <div
                key={index}
                className="col-span-1 p-6 border border-gray-200 rounded-lg"
              >
                <Image
                  src={item.logo}
                  alt=""
                  className="w-20 mb-5 rounded-lg"
                />
                <p className="text-gray-900 font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-gray-300">{item.description}</p>
                <div>
                  <button
                    disabled
                    className="mt-8 w-full border border-gray-200 rounded-xl bg-gray-50 text-gray-300 py-2 text-sm font-semibold"
                  >
                    {item.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connect;
