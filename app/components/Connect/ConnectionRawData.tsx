import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoMdSave } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import Loader from "../Loader/Loader";
import Loader2 from "../Loader/Loader2";
import {
  useGetExchangeRateQuery,
  useResetExchangeRateMutation,
  useUpdateExchangeRateByIdMutation,
} from "../ReduxToolKit/aiAssistantOtherApis";

type EditData = {
  title: string;
  base_currency: string;
  target_currency: string;
  value: string;
};

interface ConnectionRawDataProps {
  setIsRawData: Dispatch<SetStateAction<boolean>>;
  getRawDataId: number;
}

const ConnectionRawData: FC<ConnectionRawDataProps> = ({
  setIsRawData,
  getRawDataId,
}) => {
  const { data: getExchangeRate, isLoading: getDataLoading } =
    useGetExchangeRateQuery(getRawDataId);
  const [updateExchangeData, { isLoading: updateLoading }] =
    useUpdateExchangeRateByIdMutation();
  const [resetExchangeData, { isLoading: resetLoading }] =
    useResetExchangeRateMutation();

  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<EditData | null>(null);
  const [loadingRowId, setLoadingRowId] = useState<number | null>(null);

  const handleEditData = async (id: number) => {
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
    if (editData) {
      setEditData({
        ...editData,
        [field]: e.target.value,
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
    try {
      const res = await resetExchangeData(getRawDataId);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to reset exchange rates");
    }
  };
  return (
    <div className="min-h-screen">
      <div
        className="flex items-center cursor-pointer w-fit"
        onClick={() => setIsRawData(false)}
      >
        <IoIosArrowBack className="text-3xl" />
        <p className="font-bold">Back</p>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-gray-800">Data</p>

          {resetLoading ? (
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
            {getDataLoading ? (
              <tbody className="pt-10">
                <tr>
                  <td colSpan={5}>
                    <Loader2 />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {getExchangeRate?.recent_exchange_rates.map((rate, index) => (
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
                          <p>{rate.title}</p>
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
                          <p>{rate.base_currency}</p>
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
                          <p>{rate.target_currency}</p>
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
                          <p>{rate.value}</p>
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
