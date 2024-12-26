import { FC } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface GraphSideBarProps {}
const GraphSideBar: FC<GraphSideBarProps> = ({}) => {
  return (
    <div className="h-full w-full bg-[#F5F7FB] rounded p-3">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold ">$1450</p>
        <HiOutlineDotsHorizontal
          className={`text-3xl cursor-pointer rotate-90 ml-5`}
        />
      </div>
      <p className="text-[#777A89] text-xs mt-2 mb-4">USD - CAD spot</p>
      <p className="font-bold">Watchlist</p>
      <div className="grid grid-cols-3 pt-6 pb-4 border-b border-[#c6c7c9] items-center">
        <div className="col-span-1">
          <p className="font-bold text-sm">EURO - CAD</p>
          <p>European euro</p>
        </div>
        <div className="col-span-1">here will be the graph</div>
        <div className="col-span-1 flex justify-between items-center">
          <p>1.4986</p>
          <FaArrowUpLong />
        </div>
      </div>
    </div>
  );
};

export default GraphSideBar;
