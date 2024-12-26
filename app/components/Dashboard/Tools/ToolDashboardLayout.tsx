import { Dispatch, FC, SetStateAction } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Graph from "./Graph";

interface ToolDashboardLayoutProps {
  agentId: number;
  isOverlayVisible: boolean;
  setIsSetup: Dispatch<SetStateAction<string>>;
}

const ToolDashboardLayout: FC<ToolDashboardLayoutProps> = ({
  agentId,
  isOverlayVisible,
  setIsSetup,
}) => {
  //   const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  return (
    <div className="w-full rounded-md shadow-md relative">
      <div className="flex justify-between items-center p-5 border-b">
        <p className="text-xl font-bold">Heading Name</p>
        <div className="flex items-start">
          <div className="hover:bg-[#F5F7FB] hover:text-[#017EFA] text-[#A9ABB0] py-2 px-4 rounded duration-300 transition-colors cursor-pointer">
            <p>Tab1</p>
          </div>
          <div className="hover:bg-[#F5F7FB] hover:text-[#017EFA] text-[#A9ABB0] py-2 px-4 rounded duration-300 transition-colors cursor-pointer">
            <p>Tab2</p>
          </div>
          <div className="hover:bg-[#F5F7FB] hover:text-[#017EFA] text-[#A9ABB0] py-2 px-4 rounded duration-300 transition-colors cursor-pointer">
            <p>Tab3</p>
          </div>
          <HiOutlineDotsHorizontal
            className={`text-3xl cursor-pointer rotate-90 ml-5`}
          />
        </div>
      </div>

      {/* <div className="px-5 grid grid-cols-12 "> */}
      <div className="px-5 ">
        <div className="col-span-9 py-5">
          <Graph />
        </div>
        {/* <div className="col-span-3">
          <GraphSideBar />
        </div> */}
      </div>
      {isOverlayVisible && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 h-[70vh]">
          <button
            onClick={() => setIsSetup("setup")}
            className="py-2 px-6 hover:bg-[#3C3C3F] bg-[#18181b] text-white font-medium rounded-full text-sm"
          >
            Setup
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolDashboardLayout;
