import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { time: "12:00", temp: 34, humidity: 80, wind: 28 },
  { time: "15:00", temp: 36, humidity: 85, wind: 26 },
  { time: "18:00", temp: 32, humidity: 88, wind: 24 },
  { time: "21:00", temp: 33, humidity: 90, wind: 22 },
  { time: "00:00", temp: 31, humidity: 87, wind: 20 },
];

const WeatherOverview = () => {
  return (
    <div className="weather-chart-container">
      <div className="chart-header">
        <h3>Weather Overview</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* X AXIS */}
          <XAxis dataKey="time" />

          {/* LEFT Y AXIS → TEMPERATURE */}
          <YAxis
            yAxisId="left"
            domain={[20, 40]}
            tickFormatter={(value) => `${value}°`}
          />

          {/* RIGHT Y AXIS → PERCENTAGE */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />

          {/* TOOLTIP */}
          <Tooltip
            formatter={(value, name) => {
              if (name === "Temperature") return `${value}°C`;
              if (name === "Humidity") return `${value}%`;
              if (name === "Wind") return `${value} km/h`;
              return value;
            }}
          />

          {/* LEGEND (TOP like your design) */}
          <Legend verticalAlign="top" height={40} />

          {/* TEMPERATURE BAR (LEFT AXIS) */}
          <Bar
            yAxisId="left"
            dataKey="temp"
            name="Temperature"
            fill="#10B981"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />

          {/* HUMIDITY BAR (RIGHT AXIS) */}
          <Bar
            yAxisId="right"
            dataKey="humidity"
            name="Humidity"
            fill="#3B82F6"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />

          {/* WIND LINE (RIGHT AXIS) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="wind"
            name="Wind"
            stroke="#8B5CF6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherOverview;