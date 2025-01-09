"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetGraphDataQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
// import { graphData } from "./content";

type Data = {
  name: string;
  value: number;
  currency: string;
};

interface GraphProps {
  graphId: number;
  showDataBy: string;
  setShowWeek: Dispatch<SetStateAction<boolean>>;
  setShowMonth: Dispatch<SetStateAction<boolean>>;
}

const Graph: FC<GraphProps> = ({
  graphId,
  showDataBy,
  setShowWeek,
  setShowMonth,
}) => {
  const { data: graphData, isLoading: dataLoading } =
    useGetGraphDataQuery(graphId);

  // check if there are multiple dates then show week tab
  const isWeek = graphData?.recent_exchange_rates.map(
    (item) => item.date.split("T")[0]
  );
  const hasDifferentDates = new Set(isWeek).size > 1;
  setShowWeek(hasDifferentDates);
  // check if there are multiple months then show month tab
  const months = graphData?.recent_exchange_rates.map((item) =>
    item.date.slice(0, 7)
  );
  const hasDifferentMonths = new Set(months).size > 1;
  setShowMonth(hasDifferentMonths);

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (!dataLoading) {
      if (showDataBy === "spot") {
        if (!graphData?.recent_exchange_rates?.length) return;

        // Find the latest date from the dataset
        const latestDate = graphData.recent_exchange_rates.reduce(
          (latest, item) => {
            const itemDate = new Date(item.date);
            return itemDate > latest ? itemDate : latest;
          },
          new Date(0)
        ); // Initialize with a very old date

        // Filter data for the latest date
        const filteredData = graphData.recent_exchange_rates.filter((item) => {
          const itemDate = new Date(item.date).toISOString().split("T")[0];
          const latestDateString = latestDate.toISOString().split("T")[0];
          return itemDate === latestDateString;
        });

        // Map filtered data to match the `Data` structure
        setData(
          filteredData.map((item) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return {
              name: formattedDate, // Time of the entry
              value: item.value, // Value from the backend
              currency: `${item.base_currency} to ${item.target_currency}`, // Base to target currency
            };
          })
        );
      } else if (showDataBy === "month") {
        const monthMap = new Map<
          string,
          { totalValue: number; count: number; year: number; month: number }
        >();

        graphData?.recent_exchange_rates.forEach((item) => {
          const date = new Date(item.date);
          const yearMonthKey = `${date.getFullYear()}-${date.getMonth()}`;

          if (!monthMap.has(yearMonthKey)) {
            monthMap.set(yearMonthKey, {
              totalValue: item.value,
              count: 1,
              year: date.getFullYear(),
              month: date.getMonth(),
            });
          } else {
            const current = monthMap.get(yearMonthKey)!;
            current.totalValue += item.value;
            current.count += 1;
            monthMap.set(yearMonthKey, current);
          }
        });

        // Convert aggregated data to an array and calculate the average
        const aggregatedData = Array.from(monthMap.values())
          .sort((a, b) => a.year - b.year || a.month - b.month) // Sort by year and month
          .map(({ totalValue, count, year, month }) => {
            const averageValue = totalValue / count;
            const sampleData = graphData?.recent_exchange_rates.find((item) => {
              const date = new Date(item.date);
              return date.getFullYear() === year && date.getMonth() === month;
            });

            return {
              name: new Date(year, month).toLocaleString("en-US", {
                month: "short",
              }), // Month name
              value: averageValue, // Average value
              currency: sampleData
                ? `${sampleData.base_currency} to ${sampleData.target_currency}`
                : "N/A", // Use the sample's currency or fallback
            };
          });

        setData(aggregatedData);
      } else if (showDataBy === "week") {
        // Get the current date and calculate the past 7 days
        const today = new Date();
        const past7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        });

        // Filter the data to include only the last 7 days
        const filteredData = graphData?.recent_exchange_rates.filter((item) => {
          const itemDate = new Date(item.date).toISOString().split("T")[0];
          return past7Days.includes(itemDate);
        });

        setData(
          filteredData?.map((item) => {
            // Format the date into "Month, Day, Year" format
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            });

            return {
              name: formattedDate, // Formatted date
              value: item?.value || 0, // Value from backend
              currency: `${item?.base_currency} to ${item?.target_currency}`, // Base to target currency
            };
          }) || []
        );
      }
    }
  }, [showDataBy, dataLoading]);

  // Define months

  return (
    <div style={{ width: "100%", height: 350 }} className="text-xs">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            strokeDasharray="4 4"
            stroke="#e0e0e0"
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={0.3}
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
