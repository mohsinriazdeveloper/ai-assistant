import { FC, useEffect, useState } from "react";
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

interface ExchangeRateData {
  d: string; // Date
  [key: string]: any; // Dynamic keys for different currencies
}

interface TransformedData {
  Date: string;
  [key: string]: number | null | string;
}

interface ApiResponse {
  observations: ExchangeRateData[];
  seriesDetail: Record<string, { label: string }>;
}

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
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to format date as YYYY-MM-DD for API requests
  const formatDateForAPI = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to calculate date 2 years ago from today
  const getTwoYearsAgoDate = (): Date => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    return date;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentDate = new Date();
        const endDate = formatDateForAPI(currentDate);
        const startDate = formatDateForAPI(getTwoYearsAgoDate());

        const response = await fetch(
          `https://www.bankofcanada.ca/valet/observations/group/FX_RATES_MONTHLY/json?start_date=${startDate}&end_date=${endDate}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Colors for the lines
  const lineColors = [
    "#4472C4",
    "#FF0000",
    "#70AD47",
    "#FFC000",
    "#5B9BD5",
    "#7030A0",
  ];

  if (loading) {
    return <div className="loading-message">Loading exchange rate data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!data) {
    return <div className="no-data-message">No data available</div>;
  }

  // Transform the data for the chart
  const chartData = transformData(data.observations, selectedCurrencies);

  return (
    <div className="w-full exchange-rate-graph">
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
              const currencyLabel = getCurrencyLabel(name, data.seriesDetail);
              return [value.toFixed(4), currencyLabel];
            }}
            labelFormatter={(label) => formatDate(label as string)}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => getCurrencyLabel(value, data.seriesDetail)}
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
