import { FC, useState } from "react";
import LeftBar from "../LeftBar/LeftBar";
import { content } from "./content";
import Image from "next/image";
import Finance from "./Finance";

interface ConnectProps {
  agentId: number;
}

const Connect: FC<ConnectProps> = ({ agentId }) => {
  const [checkOption, setCheckOption] = useState<string>("integration");
  return (
    <div className="md:container md:mx-auto mx-5 my-10">
      <p className="text-3xl font-bold">Connect</p>
      <div className="grid grid-cols-12 gap-8 mt-10">
        <div className="md:col-span-2 col-span-12">
          <LeftBar
            setCheckOption={setCheckOption}
            checkOption={checkOption}
            content={content.sideBarOptions}
          />
        </div>
        {checkOption === "integration" && (
          <div className="md:col-span-10 col-span-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
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
        {checkOption === "finance" && <Finance agentId={agentId} />}
      </div>
    </div>
  );
};

export default Connect;
