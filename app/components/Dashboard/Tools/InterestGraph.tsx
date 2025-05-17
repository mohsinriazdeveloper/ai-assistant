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

interface RateData {
  date: string;
  value: number;
}

interface DailyData {
  date: string;
  usValue: number | null;
  caValue: number | null;
}

const InterestGraph: FC = () => {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date as YYYY-MM-DD for API requests
  const formatDateForAPI = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calculate date 2 years ago from today
  // const getTwoYearsAgoDate = (): Date => {
  //   const date = new Date();
  //   date.setFullYear(date.getFullYear() - 2);
  //   return date;
  // };
  const getOneMonthAgoDate = (): Date => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  };
  // Parse CSV text into RateData[]
  const parseCSV = (csvText: string): RateData[] => {
    const lines = csvText.split("\n");
    const data: RateData[] = [];

    // Find line where actual data starts
    let dataStartIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("Date,")) {
        dataStartIndex = i + 1;
        break;
      }
    }

    for (let i = dataStartIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [date, valueStr] = line.split(",");
      const value = parseFloat(valueStr.trim());

      if (!isNaN(value)) {
        data.push({
          date: date.trim(),
          value,
        });
      }
    }

    return data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  // Merge US and CA daily data by exact date
  const mergeDailyData = (
    usData: RateData[],
    caData: RateData[]
  ): DailyData[] => {
    const dailyMap: Record<string, DailyData> = {};

    usData.forEach(({ date, value }) => {
      dailyMap[date] = {
        date,
        usValue: value,
        caValue: null,
      };
    });

    caData.forEach(({ date, value }) => {
      if (!dailyMap[date]) {
        dailyMap[date] = {
          date,
          usValue: null,
          caValue: value,
        };
      } else {
        dailyMap[date].caValue = value;
      }
    });

    return Object.values(dailyMap).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  // Fetch and process data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentDate = new Date();
      const endDate = formatDateForAPI(currentDate);
      // const startDate = formatDateForAPI(getTwoYearsAgoDate());
      const startDate = formatDateForAPI(getOneMonthAgoDate());

      let usData: RateData[] = [];
      let caData: RateData[] = [];

      // Fetch US data proxy
      try {
        const usResponse = await fetch(
          `/api/proxy-us?startDate=${startDate}&endDate=${endDate}`,
          { headers: { Accept: "text/csv" } }
        );
        if (!usResponse.ok)
          throw new Error(`Failed to fetch US data: ${usResponse.status}`);
        const usCsvText = await usResponse.text();
        usData = parseCSV(usCsvText);
      } catch (err) {
        console.error("US fetch error:", err);
        setError((prev) =>
          prev ? prev + "; US data fetch failed" : "US data fetch failed"
        );
      }

      // Fetch CA data proxy
      try {
        const caResponse = await fetch(
          `/api/proxy-ca?startDate=${startDate}&endDate=${endDate}`,
          { headers: { Accept: "text/csv" } }
        );
        if (!caResponse.ok)
          throw new Error(`Failed to fetch CA data: ${caResponse.status}`);
        const caCsvText = await caResponse.text();
        caData = parseCSV(caCsvText);
      } catch (err) {
        console.error("CA fetch error:", err);
        setError((prev) =>
          prev ? prev + "; CA data fetch failed" : "CA data fetch failed"
        );
      }

      if (usData.length === 0 && caData.length === 0) {
        throw new Error("No data available from either source");
      }

      const mergedData = mergeDailyData(usData, caData);
      setDailyData(mergedData);

      localStorage.setItem(
        "cachedInterestData",
        JSON.stringify({
          usData,
          caData,
          lastUpdated: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error("Overall fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format date as DD-MM-YYYY for XAxis ticks
  const formatDateDDMMYYYY = (dateStr: string) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div>Loading interest rate data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (dailyData.length === 0) {
    return (
      <div className="no-data-container">
        <div>No interest rate data available</div>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Calculate Y axis domain with padding
  const allValues = dailyData
    .flatMap((item) => [item.usValue, item.caValue])
    .filter((val) => val !== null) as number[];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.1;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={dailyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 0" stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateDDMMYYYY}
            tick={{ fontSize: 10 }}
            tickCount={dailyData.length > 12 ? 12 : dailyData.length}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(tick) => tick.toFixed(2)}
            domain={[minValue - padding, maxValue + padding]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const rateName = name === "usValue" ? "US Rate" : "CA Rate";
              return [`${value?.toFixed(2) || "N/A"}%`, rateName];
            }}
            labelFormatter={(label) => formatDateDDMMYYYY(label as string)}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="usValue"
            stroke="#4472C4"
            strokeWidth={2}
            dot={false}
            connectNulls={true}
            name="US Interest Rate"
          />
          <Line
            type="monotone"
            dataKey="caValue"
            stroke="#FF0000"
            strokeWidth={2}
            dot={false}
            connectNulls={true}
            name="CA Interest Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InterestGraph;
