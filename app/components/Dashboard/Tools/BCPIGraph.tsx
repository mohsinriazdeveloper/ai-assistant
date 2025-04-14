import { FC } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BCPI as data } from "./GraphData";

interface BCPIGraphProps {}

// Sort data chronologically
const sortedData = [...data].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const BCPIGraph: FC<BCPIGraphProps> = () => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={sortedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
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
    </div>
  );
};

export default BCPIGraph;
