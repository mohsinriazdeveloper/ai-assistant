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

interface MonthlyData {
  monthYear: string;
  date: string;
  usValue: number | null;
  caValue: number | null;
}

const InterestGraph: FC = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
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

  // Function to parse CSV text into our data format
  const parseCSV = (csvText: string): RateData[] => {
    const lines = csvText.split("\n");
    const data: RateData[] = [];

    // Find the line where the actual data starts (after the summary)
    let dataStartIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("Date,")) {
        dataStartIndex = i + 1;
        break;
      }
    }

    // Process each data line
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

  // Function to aggregate data by month-year and merge US/CA data
  const aggregateAndMergeData = (
    usData: RateData[],
    caData: RateData[]
  ): MonthlyData[] => {
    const monthlyMap: Record<string, MonthlyData> = {};

    // Process US data
    usData.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthYear = `${year}-${String(month + 1).padStart(2, "0")}`;

      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = {
          monthYear,
          date: item.date,
          usValue: item.value,
          caValue: null,
        };
      } else {
        // For US data, we'll take the last value of the month
        monthlyMap[monthYear].usValue = item.value;
      }
    });

    // Process CA data
    caData.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthYear = `${year}-${String(month + 1).padStart(2, "0")}`;

      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = {
          monthYear,
          date: item.date,
          usValue: null,
          caValue: item.value,
        };
      } else {
        // For CA data, we'll take the last value of the month
        monthlyMap[monthYear].caValue = item.value;
      }
    });

    // Convert to array and sort chronologically
    return Object.values(monthlyMap).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentDate = new Date();
      const endDate = formatDateForAPI(currentDate);
      const startDate = formatDateForAPI(getTwoYearsAgoDate());

      // Fetch US interest rate data
      const usResponse = await fetch(
        `https://www.bankofcanada.ca/stats/results/csv?rangeType=dates&lP=lookup_us_interest.php&sR=${startDate}&dF=${startDate}&dT=${endDate}`,
        {
          headers: {
            Accept: "text/csv",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!usResponse.ok) {
        throw new Error(`Failed to fetch US data: ${usResponse.status}`);
      }

      // Fetch Canadian interest rate data
      const caResponse = await fetch(
        `https://www.bankofcanada.ca/stats/results/csv?rangeType=dates&ByDate_frequency=daily&lP=lookup_canadian_interest.php&sR=${startDate}&dF=${startDate}&dT=${endDate}`,
        {
          headers: {
            Accept: "text/csv",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!caResponse.ok) {
        throw new Error(`Failed to fetch CA data: ${caResponse.status}`);
      }

      const usCsvText = await usResponse.text();
      const caCsvText = await caResponse.text();

      const usData = parseCSV(usCsvText);
      const caData = parseCSV(caCsvText);

      const mergedMonthlyData = aggregateAndMergeData(usData, caData);
      setMonthlyData(mergedMonthlyData);

      // Cache the data
      localStorage.setItem(
        "cachedInterestData",
        JSON.stringify({
          usData,
          caData,
          lastUpdated: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err instanceof Error
          ? `Failed to load data: ${err.message}`
          : "An unknown error occurred"
      );

      // Try to load from cache if available
      const cachedData = localStorage.getItem("cachedInterestData");
      if (cachedData) {
        try {
          const { usData, caData } = JSON.parse(cachedData);
          const mergedMonthlyData = aggregateAndMergeData(usData, caData);
          setMonthlyData(mergedMonthlyData);
          setError("Using cached data - connection issue detected");
        } catch (parseError) {
          console.error("Failed to parse cached data", parseError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
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

  if (monthlyData.length === 0) {
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

  // Calculate min and max values for YAxis domain with some padding
  const allValues = monthlyData
    .flatMap((item) => [item.usValue, item.caValue])
    .filter((val) => val !== null) as number[];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.1;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 0" stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="monthYear"
            tickFormatter={(monthYear) => {
              const [year, month] = monthYear.split("-");
              const date = new Date();
              date.setFullYear(parseInt(year));
              date.setMonth(parseInt(month) - 1);
              return formatDate(date.toISOString());
            }}
            tick={{ fontSize: 12 }}
            tickCount={monthlyData.length > 12 ? 12 : monthlyData.length}
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
            labelFormatter={(label) => formatDate(label as string)}
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
