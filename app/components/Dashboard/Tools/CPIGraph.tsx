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

  const { data: graphData, isLoading: dataLoading } = useGetGraphDataQuery(ids);
  const [data, setData] = useState<any[]>([]);
  const [visibility, setVisibility] = useState({
    cpiTrim: true,
    cpiMedian: true,
    cpiCommon: true,
    totalCPIChange: true,
  });

  useEffect(() => {
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

      setData(transformedData);
    } else {
      console.error("Error: observations is not an array", graphData);
      setData([]);
    }
  }, [graphData?.recent_cpi_rates?.observations]);

  type VisibilityKeys = keyof typeof visibility;

  const handleLegendClick = (dataKey: VisibilityKeys) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [dataKey]: !prevVisibility[dataKey],
    }));
  };

  // Define the legend payload manually
  const legendPayload = [
    {
      value: "CPI-Trim",
      type: "line",
      id: "cpiTrim",
      color: visibility.cpiTrim ? "#ffc658" : "#bfbfbf", // Active or inactive color
    },
    {
      value: "CPI-Median",
      type: "line",
      id: "cpiMedian",
      color: visibility.cpiMedian ? "#ff7300" : "#bfbfbf", // Active or inactive color
    },
    {
      value: "CPI-Common",
      type: "line",
      id: "cpiCommon",
      color: visibility.cpiCommon ? "#0088FE" : "#bfbfbf", // Active or inactive color
    },
    {
      value: "Total CPI % Change",
      type: "line",
      id: "totalCPIChange",
      color: visibility.totalCPIChange ? "#FF0000" : "#bfbfbf", // Active or inactive color
    },
  ];

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
            <Legend
              //@ts-ignore
              payload={legendPayload} // Use custom legend payload
              onClick={(e) => handleLegendClick(e.id as VisibilityKeys)}
              wrapperStyle={{ cursor: "pointer" }}
            />
            {visibility.cpiTrim && (
              <Line
                type="monotone"
                dataKey="cpiTrim"
                stroke="#ffc658"
                name="CPI-Trim"
                connectNulls
              />
            )}
            {visibility.cpiMedian && (
              <Line
                type="monotone"
                dataKey="cpiMedian"
                stroke="#ff7300"
                name="CPI-Median"
                connectNulls
              />
            )}
            {visibility.cpiCommon && (
              <Line
                type="monotone"
                dataKey="cpiCommon"
                stroke="#0088FE"
                name="CPI-Common"
                connectNulls
              />
            )}
            {visibility.totalCPIChange && (
              <Line
                type="monotone"
                dataKey="totalCPIChange"
                stroke="#FF0000"
                name="Total CPI % Change"
                connectNulls
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CPIGraph;
