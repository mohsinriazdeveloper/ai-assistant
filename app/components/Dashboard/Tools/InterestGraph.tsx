import { FC } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface InterestGraphProps {}

// Sample interest rate data
const data = [
  { Date: "2025-04-02", value: 7.5 },
  { Date: "2025-03-26", value: 7.5 },
  { Date: "2025-03-19", value: 7.5 },
  { Date: "2025-03-12", value: 7.5 },
  { Date: "2025-03-05", value: 7.5 },
  { Date: "2025-02-26", value: 7.5 },
  { Date: "2025-02-19", value: 7.5 },
  { Date: "2025-02-12", value: 7.5 },
  { Date: "2025-02-05", value: 7.5 },
  { Date: "2025-01-29", value: 7.5 },
  { Date: "2025-01-22", value: 7.5 },
  { Date: "2025-01-15", value: 7.5 },
  { Date: "2025-01-08", value: 7.5 },
  { Date: "2025-01-01", value: 7.5 },
  { Date: "2024-12-25", value: 7.5 },
  { Date: "2024-12-18", value: 7.75 },
  { Date: "2024-12-11", value: 7.75 },
  { Date: "2024-12-04", value: 7.75 },
  { Date: "2024-11-27", value: 7.75 },
  { Date: "2024-11-20", value: 7.75 },
  { Date: "2024-11-13", value: 7.75 },
  { Date: "2024-11-06", value: 8.0 },
  { Date: "2024-10-30", value: 8.0 },
  { Date: "2024-10-23", value: 8.0 },
  { Date: "2024-10-16", value: 8.0 },
  { Date: "2024-10-09", value: 8.0 },
  { Date: "2024-10-02", value: 8.0 },
];

// Sort data chronologically
const sortedData = [...data].sort(
  (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const InterestGraph: FC<InterestGraphProps> = () => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={sortedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="Date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            tickCount={6}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(tick) => `${tick}%`}
            domain={[7, 8.5]} // Adjusted domain for better visualization
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Interest Rate"]}
            labelFormatter={(label) => formatDate(label as string)}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0088FE"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            name="Interest Rate"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-center text-sm text-gray-500 mt-2">
        Interest Rates (Oct 2024 - Apr 2025)
      </div>
    </div>
  );
};

export default InterestGraph;
