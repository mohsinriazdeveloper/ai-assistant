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
import "./style.css";

interface ExchangeRateGraphProps {
  selectedCurrencies?: string[]; // Array of currency codes like ["FXMUSDCAD", "FXMEURCAD"]
}

// Type for the exchange rate data
interface ExchangeRateData {
  d: string; // Date
  [key: string]: any; // Dynamic keys for different currencies
}

// Type for the transformed data
interface TransformedData {
  Date: string;
  [key: string]: number | null | string;
}

// Function to transform the raw data into the format needed for the chart
const transformData = (
  rawData: ExchangeRateData[],
  selectedCurrencies: string[]
): TransformedData[] => {
  return rawData.map((item) => {
    const transformedItem: TransformedData = { Date: item.d };

    selectedCurrencies.forEach((currency) => {
      transformedItem[currency] = item[currency]
        ? parseFloat(item[currency].v)
        : null;
    });

    return transformedItem;
  });
};

// Function to get currency label from the seriesDetail
const getCurrencyLabel = (currencyCode: string, seriesDetail: any): string => {
  return seriesDetail[currencyCode]?.label || currencyCode;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const ExchangeRateGraph: FC<ExchangeRateGraphProps> = ({
  selectedCurrencies = ["FXMUSDCAD", "FXMEURCAD"],
}) => {
  // In a real app, you would fetch this data or pass it as a prop
  const rawData = require("./FX_RATES_MONTHLY-sd-2024-04-01.json");
  const seriesDetail = rawData.seriesDetail;
  const observations = rawData.observations as ExchangeRateData[];

  // Transform the data for the chart
  const chartData = transformData(observations, selectedCurrencies);

  // Colors for the lines - you can add more if needed
  const lineColors = [
    "#4472C4",
    "#FF0000",
    "#70AD47",
    "#FFC000",
    "#5B9BD5",
    "#7030A0",
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
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
            tickFormatter={(tick) => tick.toFixed(4)}
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const currencyLabel = getCurrencyLabel(name, seriesDetail);
              return [value.toFixed(4), currencyLabel];
            }}
            labelFormatter={(label) => formatDate(label as string)}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => getCurrencyLabel(value, seriesDetail)}
          />

          {selectedCurrencies.map((currency, index) => (
            <Line
              key={currency}
              type="monotone"
              dataKey={currency}
              stroke={lineColors[index % lineColors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={true}
              name={currency}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExchangeRateGraph;
