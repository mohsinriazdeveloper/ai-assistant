import { FC, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BCPIDataPoint {
  date: string;
  value: number;
}

interface ApiResponse {
  observations: Array<{
    d: string;
    "M.BCPI": {
      v: string;
    };
  }>;
  seriesDetail: {
    "M.BCPI": {
      label: string;
    };
  };
}

const BCPIGraph: FC = () => {
  const [data, setData] = useState<BCPIDataPoint[]>([]);
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
          `https://www.bankofcanada.ca/valet/observations/group/BCPI_MONTHLY/json?start_date=${startDate}&end_date=${endDate}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: ApiResponse = await response.json();

        // Transform the API data into our chart format
        const transformedData = jsonData.observations.map((item) => ({
          date: item.d,
          value: parseFloat(item["M.BCPI"].v),
        }));

        setData(transformedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching BCPI data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  if (loading) {
    return <div className="loading-message">Loading BCPI data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="no-data-message">No BCPI data available</div>;
  }

  // Calculate min and max values for YAxis domain with some padding
  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1; // 10% padding

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 0" stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            tickCount={6}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(tick) => tick.toFixed(2)}
            domain={[minValue - padding, maxValue + padding]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [value.toFixed(4), "BCPI"]}
            labelFormatter={(label) => formatDate(label as string)}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#13293D"
            strokeWidth={2}
            dot={{ r: 3, stroke: "#0088FE" }}
            activeDot={{ r: 6 }}
            name="BCPI"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BCPIGraph;
