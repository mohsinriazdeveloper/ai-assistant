import { usePathname } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoMdSave } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import Loader from "../Loader/Loader";
import Loader2 from "../Loader/Loader2";
import {
  useGetExchangeRateQuery,
  useGetGraphDataQuery,
  useResetExchangeRateMutation,
  useResetGraphMutation,
  useUpdateExchangeRateByIdMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";
import { ExchangeRateType } from "../ReduxToolKit/types/agents";

export type Ids = {
  id: number;
  agentId: number;
};

type EditData = {
  title: string;
  base_currency: string;
  target_currency: string;
  value: string;
};

interface ConnectionRawDataProps {
  agentId: number;
  setIsRawData: Dispatch<SetStateAction<boolean | string>>;
  getRawDataId: number;
}

const ConnectionRawData: FC<ConnectionRawDataProps> = ({
  agentId,
  setIsRawData,
  getRawDataId,
}) => {
  const currentRoute = usePathname();
  const ids: Ids = {
    id: getRawDataId,
    agentId: agentId,
  };
  const { data: graphData, isLoading: dataLoading } = useGetGraphDataQuery(
    ids,
    {
      skip: !currentRoute.includes("tools"),
    }
  );

  const { data: getExchangeRate, isLoading: getDataLoading } =
    useGetExchangeRateQuery(ids, {
      skip: !currentRoute.includes("connections"),
    });
  const [updateExchangeData, { isLoading: updateLoading }] =
    useUpdateExchangeRateByIdMutation();
  const [resetExchangeData, { isLoading: resetLoading }] =
    useResetExchangeRateMutation();
  const [resetGraph, { isLoading: graphResetLoading }] =
    useResetGraphMutation();

  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<EditData | null>(null);
  const [loadingRowId, setLoadingRowId] = useState<number | null>(null);

  const [showData, setShowData] = useState<ExchangeRateType[]>([]);
  useEffect(() => {
    if (graphData) {
      if (currentRoute.includes("tools")) {
        setShowData(graphData.recent_exchange_rates);
      }
    } else if (getExchangeRate) {
      if (currentRoute.includes("connections")) {
        setShowData(getExchangeRate.recent_exchange_rates);
      }
    } else {
      setShowData([]);
    }
  }, [graphData, getExchangeRate]);

  const handleEditData = async (id: number) => {
    if (editData?.title.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }
    if (editData?.base_currency.trim() === "") {
      toast.error("Base Currency cannot be empty");
      return;
    }
    if (editData?.target_currency.trim() === "") {
      toast.error("Target Currency cannot be empty");
      return;
    }
    if (editData?.value.trim() === "") {
      toast.error("Value cannot be empty");
      return;
    }
    setLoadingRowId(id);
    try {
      const res = updateExchangeData({ id, data: editData }).unwrap();
      toast.success("Exchange rate updated successfully");
    } catch (error) {
      toast.error("Exchange rate updated failed");
    } finally {
      setLoadingRowId(null); // Reset the loading row
    }
    setEditableRow(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof EditData
  ) => {
    const inputValue = e.target.value;

    if (field === "value" && isNaN(Number(inputValue))) {
      toast.error("Value must be numeric");
      return;
    }

    if (editData) {
      setEditData({
        ...editData,
        [field]: inputValue,
      });
    }
  };

  const handleEditClick = (index: number) => {
    setEditableRow(index);

    const rate = getExchangeRate?.recent_exchange_rates[index];
    if (rate) {
      setEditData({
        title: rate.title,
        base_currency: rate.base_currency,
        target_currency: rate.target_currency,
        value: rate.value.toString(),
      });
    }
  };

  const handleReset = async () => {
    if (currentRoute.includes("connections")) {
      try {
        const res = await resetExchangeData({ id: getRawDataId, agentId });
        toast.success(res.data.message);
      } catch (error) {
        toast.error("Failed to reset exchange rates");
      }
    } else if (currentRoute.includes("tools")) {
      try {
        await resetGraph({ id: getRawDataId, agentId }).unwrap();
        toast.success("Graph Reset Successfully");
      } catch (error) {
        toast.error("Failed to reset graph");
      }
    }
  };
  return (
    <div className="min-h-screen">
      <div
        className="flex items-center cursor-pointer w-fit"
        onClick={() => setIsRawData("graph")}
      >
        <IoIosArrowBack className="text-3xl" />
        <p className="font-bold">Back</p>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-gray-800">Data</p>

          {resetLoading || graphResetLoading ? (
            <Loader />
          ) : (
            <p
              className="text-sm text-red-700 cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </p>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-sm">
              <tr>
                <th className="py-2 px-2 border-b">Title</th>
                <th className="py-2 px-2 border-b">Base Currency</th>
                <th className="py-2 px-2 border-b">Target Currency</th>
                <th className="py-2 px-2 border-b">Value</th>
                <th className="py-2 px-2 border-b">Date</th>
                <th className="py-2 px-2 border-b">Action</th>
              </tr>
            </thead>
            {getDataLoading || dataLoading ? (
              <tbody className="pt-10">
                <tr>
                  <td colSpan={5}>
                    <Loader2 />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {showData.map((rate, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 text-xs border-b ${
                      editableRow === index && "bg-gray-100"
                    }`}
                  >
                    <td className="py-2 px-2">
                      <div className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1">
                        {editableRow === index ? (
                          <input
                            type="text"
                            value={editData?.title || ""}
                            className="w-full focus:outline-none"
                            onChange={(e) => handleInputChange(e, "title")}
                          />
                        ) : (
                          <input
                            type="text"
                            value={rate.title}
                            className="w-full focus:outline-none"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1">
                        {editableRow === index ? (
                          <input
                            type="text"
                            value={editData?.base_currency || ""}
                            className="w-full focus:outline-none"
                            onChange={(e) =>
                              handleInputChange(e, "base_currency")
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            value={rate.base_currency}
                            className="w-full focus:outline-none"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1">
                        {editableRow === index ? (
                          <input
                            type="text"
                            value={editData?.target_currency || ""}
                            className="w-full focus:outline-none"
                            onChange={(e) =>
                              handleInputChange(e, "target_currency")
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            value={rate.target_currency}
                            className="w-full focus:outline-none"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1">
                        {editableRow === index ? (
                          <input
                            type="text"
                            value={editData?.value || ""}
                            className="w-full focus:outline-none"
                            onChange={(e) => handleInputChange(e, "value")}
                          />
                        ) : (
                          <input
                            type="text"
                            value={rate.value}
                            className="w-full focus:outline-none"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1">
                        <p>
                          {new Date(rate.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-2 flex justify-center text-base">
                      {loadingRowId === rate.id ? (
                        <Loader />
                      ) : editableRow === index ? (
                        <IoMdSave
                          onClick={() => handleEditData(rate.id)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <RiEdit2Fill
                          className="cursor-pointer"
                          onClick={() => handleEditClick(index)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRawData;
