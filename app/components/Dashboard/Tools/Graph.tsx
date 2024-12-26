import { FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface GraphProps {}

const Graph: FC<GraphProps> = ({}) => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3600,
      pv: 4500,
      amt: 2400,
    },
    {
      name: "Sep",
      uv: 3700,
      pv: 4800,
      amt: 2700,
    },
    {
      name: "Oct",
      uv: 4200,
      pv: 5000,
      amt: 3100,
    },
    {
      name: "Nov",
      uv: 4500,
      pv: 5400,
      amt: 3200,
    },
    {
      name: "Dec",
      uv: 4700,
      pv: 5700,
      amt: 3400,
    },
  ];
  return (
    <div style={{ width: "100%", height: 350 }} className="text-xs">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* CartesianGrid with vertical lines */}
          <CartesianGrid
            vertical={true}
            horizontal={false}
            strokeDasharray="4 4" // Dotted vertical lines
            stroke="#e0e0e0" // Light gray color
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={0.3}
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
