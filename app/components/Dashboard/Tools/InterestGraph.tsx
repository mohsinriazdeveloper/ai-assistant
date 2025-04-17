import { FC } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { caInterestRate, usInterestRate } from "./GraphData";
import "./style.css";

interface InterestGraphProps {}

// Function to prepare merged data based on Date
const prepareMergedData = () => {
  const dateSet = new Set<string>();

  usInterestRate.forEach((item) => dateSet.add(item.Date));
  caInterestRate.forEach((item) => dateSet.add(item.Date));

  const dates = Array.from(dateSet).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return dates.map((date) => {
    const usItem = usInterestRate.find((item) => item.Date === date);
    const caItem = caInterestRate.find((item) => item.Date === date);

    return {
      Date: date,
      usValue: usItem?.value ?? null,
      caValue: caItem?.value ?? null,
    };
  });
};

const mergedData = prepareMergedData();

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
          data={mergedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 0" stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="Date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            tickCount={6}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(tick) => tick}
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "usValue") {
                return [value, "US Interest Rate"];
              } else if (name === "caValue") {
                return [value, "CA Interest Rate"];
              }
              return [value, name];
            }}
            labelFormatter={(label) => formatDate(label as string)}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="usValue"
            stroke="#4472C4"
            strokeWidth={2}
            dot={false} // <<< No dots
            connectNulls={true}
            name="US Interest Rate"
          />

          <Line
            type="monotone"
            dataKey="caValue"
            stroke="#FF0000"
            strokeWidth={2}
            dot={false} // <<< No dots
            connectNulls={true}
            name="US Interest Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InterestGraph;
