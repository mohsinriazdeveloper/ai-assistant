"use client";

import { FC, useEffect, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Ids } from "../../Connect/ConnectionRawData";
import { useGetGraphDataQuery } from "../../ReduxToolKit/aiAssistantOtherApis";
import "./style.css";

interface CPIGraphProps {
  agentId: number;
  graphId: number;
}

const CPIGraph: FC<CPIGraphProps> = ({ agentId, graphId }) => {
  const ids: Ids = {
    id: graphId,
    agentId: agentId,
  };

  console.log("Agent & Graph IDs:", ids);

  const { data: graphData, isLoading: dataLoading } = useGetGraphDataQuery(ids);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    console.log("Raw graphData:", graphData);
    console.log(
      "Observations data:",
      graphData?.recent_cpi_rates?.observations
    );

    if (Array.isArray(graphData?.recent_cpi_rates?.observations)) {
      const transformedData = graphData.recent_cpi_rates.observations.map(
        (obs) => ({
          date: obs.d ?? "", // Ensure date exists
          cpiTrim: obs.CPI_TRIM?.v ? parseFloat(obs.CPI_TRIM.v) : null,
          cpiMedian: obs.CPI_MEDIAN?.v ? parseFloat(obs.CPI_MEDIAN.v) : null,
          cpiCommon: obs.CPI_COMMON?.v ? parseFloat(obs.CPI_COMMON.v) : null,
          totalCPIChange: obs.STATIC_TOTALCPICHANGE?.v
            ? parseFloat(obs.STATIC_TOTALCPICHANGE.v)
            : null,
        })
      );

      console.log("Transformed Data:", transformedData);
      setData(transformedData);
    } else {
      console.error("Error: observations is not an array", graphData);
      setData([]);
    }
  }, [graphData?.recent_cpi_rates?.observations]);

  return (
    <div className="text-xs responsiveGraph">
      <h2 className="text-lg font-semibold mb-4">
        Consumer Price Index (CPI) Graph
      </h2>

      {dataLoading ? (
        <p>Loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => tick.substring(0, 7)} // Formats YYYY-MM
            />
            <YAxis
              tickFormatter={(tick) => `${tick}%`}
              domain={[-2, 10]} // Ensures Y-Axis stays between -2% and 10%
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="cpiTrim"
              stroke="#ffc658"
              name="CPI-Trim"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="cpiMedian"
              stroke="#ff7300"
              name="CPI-Median"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="cpiCommon"
              stroke="#0088FE"
              name="CPI-Common"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="totalCPIChange"
              stroke="#FF0000"
              name="Total CPI % Change"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CPIGraph;
