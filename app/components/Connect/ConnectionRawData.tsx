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

  // Fetch both data sets
  const { data: graphData, isLoading: graphLoading } =
    useGetGraphDataQuery(ids);
  const { data: getExchangeRate, isLoading: exchangeRateLoading } =
    useGetExchangeRateQuery(ids);

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

  // Populate data based on route
  useEffect(() => {
    if (currentRoute.includes("tools") && graphData) {
      // setShowData(graphData.recent_exchange_rates || []);
      setShowData(
        [...(graphData.recent_exchange_rates || [])].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } else if (currentRoute.includes("connections") && getExchangeRate) {
      // setShowData(getExchangeRate.recent_exchange_rates || []);
      setShowData(
        [...(getExchangeRate.recent_exchange_rates || [])].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } else {
      setShowData([]);
    }
  }, [graphData, getExchangeRate, currentRoute]);

  // Handle input changes
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

  // Handle edit button click
  const handleEditClick = (index: number) => {
    setEditableRow(index);

    const rate = currentRoute.includes("tools")
      ? graphData?.recent_exchange_rates[index]
      : getExchangeRate?.recent_exchange_rates[index];

    if (rate) {
      setEditData({
        title: rate.title,
        base_currency: rate.base_currency,
        target_currency: rate.target_currency,
        value: rate.value.toString(),
      });
    }
  };

  // Handle save button click
  const handleEditData = async (id: number) => {
    if (
      !editData?.title.trim() ||
      !editData?.base_currency.trim() ||
      !editData?.target_currency.trim() ||
      !editData?.value.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    setLoadingRowId(id);

    try {
      await updateExchangeData({ id, data: editData }).unwrap();
      toast.success("Exchange rate updated successfully");

      // Update local state after successful edit
      setShowData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, ...editData, value: Number(editData.value) }
            : item
        )
      );
    } catch (error) {
      toast.error("Failed to update exchange rate");
    } finally {
      setLoadingRowId(null);
      setEditableRow(null);
    }
  };

  // Handle reset functionality
  const handleReset = async () => {
    try {
      if (currentRoute.includes("connections")) {
        const res = await resetExchangeData({ id: getRawDataId, agentId });
        toast.success(res.data.message);
      } else if (currentRoute.includes("tools")) {
        await resetGraph({ id: getRawDataId, agentId }).unwrap();
        toast.success("Graph reset successfully");
      }
    } catch (error) {
      toast.error("Failed to reset data");
    }
  };

  return (
    <div className="h-[76vh]">
      {currentRoute.includes("connections") ? (
        <div
          className="flex items-center cursor-pointer w-fit"
          // onClick={() => setIsRawData("graph")}
          onClick={() => setIsRawData(false)}
        >
          <IoIosArrowBack className="text-3xl" />
          <p className="font-bold">Back</p>
        </div>
      ) : (
        <div
          className="flex items-center cursor-pointer w-fit"
          // onClick={() => setIsRawData("graph")}
          onClick={() => setIsRawData("graph")}
        >
          <IoIosArrowBack className="text-3xl" />
          <p className="font-bold">Back</p>
        </div>
      )}
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
            {graphLoading || exchangeRateLoading ? (
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <Loader2 />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {showData.map((rate, index) => (
                  <tr
                    key={rate.id}
                    className={`hover:bg-gray-100 text-xs border-b ${
                      editableRow === index && "bg-gray-100"
                    }`}
                  >
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={
                          editableRow === index
                            ? editData?.title || ""
                            : rate.title
                        }
                        className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                        onChange={(e) =>
                          editableRow === index && handleInputChange(e, "title")
                        }
                        readOnly={editableRow !== index}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={
                          editableRow === index
                            ? editData?.base_currency || ""
                            : rate.base_currency
                        }
                        className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                        onChange={(e) =>
                          editableRow === index &&
                          handleInputChange(e, "base_currency")
                        }
                        readOnly={editableRow !== index}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={
                          editableRow === index
                            ? editData?.target_currency || ""
                            : rate.target_currency
                        }
                        className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                        onChange={(e) =>
                          editableRow === index &&
                          handleInputChange(e, "target_currency")
                        }
                        readOnly={editableRow !== index}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={
                          editableRow === index
                            ? editData?.value || ""
                            : rate.value.toString()
                        }
                        className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                        onChange={(e) =>
                          editableRow === index && handleInputChange(e, "value")
                        }
                        readOnly={editableRow !== index}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <p>
                        {new Date(rate.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="py-4 px-2 flex justify-center text-base">
                      {loadingRowId === rate.id ? (
                        <Loader />
                      ) : editableRow === index ? (
                        <IoMdSave
                          className="cursor-pointer"
                          onClick={() => handleEditData(rate.id)}
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
