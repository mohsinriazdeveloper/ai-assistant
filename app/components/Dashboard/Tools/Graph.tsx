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
import { Ids } from "../../Connect/ConnectionRawData";
import { useGetGraphDataQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
// import { graphData } from "./content";
import "./style.css";

type Data = {
  name: string;
  value: number;
  currency: string;
};

interface GraphProps {
  agentId: number;
  graphId: number;
  showDataBy: string;
  setShowWeek: Dispatch<SetStateAction<boolean>>;
  setShowMonth: Dispatch<SetStateAction<boolean>>;
}

const Graph: FC<GraphProps> = ({
  agentId,
  graphId,
  showDataBy,
  setShowWeek,
  setShowMonth,
}) => {
  const ids: Ids = {
    id: graphId,
    agentId: agentId,
  };

  const { data: graphData, isLoading: dataLoading } = useGetGraphDataQuery(ids);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (!dataLoading && graphData?.recent_exchange_rates) {
      const rates = graphData.recent_exchange_rates;

      // Check if there are multiple dates
      const dates = rates.map((item) => item.date.split("T")[0]);
      const hasDifferentDates = new Set(dates).size > 1;
      setShowWeek(hasDifferentDates);

      // Check if there are multiple months
      const months = rates.map((item) => item.date.slice(0, 7));
      const hasDifferentMonths = new Set(months).size > 1;
      setShowMonth(hasDifferentMonths);

      if (showDataBy === "spot") {
        // Find the latest date
        const latestDate = rates.reduce((latest, item) => {
          const itemDate = new Date(item.date);
          return itemDate > latest ? itemDate : latest;
        }, new Date(0));

        // Filter data for the latest date
        const filteredData = rates.filter((item) => {
          const itemDate = new Date(item.date).toISOString().split("T")[0];
          const latestDateString = latestDate.toISOString().split("T")[0];
          return itemDate === latestDateString;
        });

        // Map filtered data to match the `Data` structure
        setData(
          filteredData.map((item) => ({
            name: new Date(item.date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            value: item.value,
            currency: `${item.base_currency} to ${item.target_currency}`,
          }))
        );
      } else if (showDataBy === "week") {
        // Find the latest date in the dataset
        const latestDate = rates.reduce((latest, item) => {
          const itemDate = new Date(item.date);
          return itemDate > latest ? itemDate : latest;
        }, new Date(0));

        // Extract the latest month and year from the latest date
        const latestMonth = latestDate.getMonth();
        const latestYear = latestDate.getFullYear();

        // Filter data for the latest month
        const filteredData = rates.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === latestMonth &&
            itemDate.getFullYear() === latestYear
          );
        });

        // Group data by date and calculate average for each day
        const groupedData = filteredData.reduce((acc, item) => {
          const date = new Date(item.date).toISOString().split("T")[0];
          if (!acc[date]) {
            acc[date] = { totalValue: 0, count: 0 };
          }
          acc[date].totalValue += item.value;
          acc[date].count += 1;
          return acc;
        }, {} as Record<string, { totalValue: number; count: number }>);

        // Convert grouped data to an array and calculate the average
        const aggregatedData = Object.keys(groupedData).map((date) => ({
          name: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
          value: groupedData[date].totalValue / groupedData[date].count,
          currency: `${rates[0].base_currency} to ${rates[0].target_currency}`,
        }));

        setData(aggregatedData);
      } else if (showDataBy === "month") {
        // Aggregate data by month
        const monthMap = new Map<
          string,
          { totalValue: number; count: number; year: number; month: number }
        >();

        rates.forEach((item) => {
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
          .sort((a, b) => a.year - b.year || a.month - b.month)
          .map(({ totalValue, count, year, month }) => ({
            name: new Date(year, month).toLocaleString("en-US", {
              month: "short",
            }),
            value: totalValue / count,
            currency: `${rates[0].base_currency} to ${rates[0].target_currency}`,
          }));

        setData(aggregatedData);
      }
    }
  }, [showDataBy, dataLoading, graphData]);

  return (
    <div className="text-xs responsiveGraph">
      {/* <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            strokeDasharray="4 4"
            stroke="#e0e0e0"
          />
          <XAxis dataKey="name" interval={Math.ceil(data.length / 10)} />
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
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid Styling */}
          <CartesianGrid
            vertical={true}
            horizontal={false}
            // strokeDasharray="2 0"
            stroke="#e0e0e0"
          />

          {/* Axes */}
          <XAxis dataKey="name" interval={Math.ceil(data.length / 10)} />
          <YAxis />
          <Tooltip />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b7b7b7" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#b7b7b7" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area with Stroke & Gradient Fill */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#007bff"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
