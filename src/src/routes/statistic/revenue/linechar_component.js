import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data }) => {
  // Format the VND values with commas and a "VNĐ" suffix
  const formatTooltipValue = (value) => {
    return value ? value.toLocaleString() + " VNĐ" : "";
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
      >
        {/* Enhance the Cartesian Grid with a softer color */}
        <CartesianGrid
          strokeDasharray="5 5" // Create a dotted grid line
          stroke="#ddd" // Light gray color for the grid lines
        />

        {/* Customize the X-axis label and style */}
        <XAxis
          dataKey="time"
          label={{
            value: "Doanh thu VNĐ", // Label for X-axis
            position: "insideBottom",
            fontSize: 14,
            offset: -10,
            fill: "#ffffff", // Green color for the X-axis label
            fontWeight: "bold", // Make the label bold
          }}
          tick={{ fill: "#ffffff" }} // Green color for the X-axis tick marks
          tickSize={10} // Size of tick marks
        />

        {/* Customize the Y-axis label and style */}
        <YAxis
          tickFormatter={(value) => value.toLocaleString() + " VNĐ"} // Format Y-axis values with VNĐ
          tick={{ fill: "#ffffff" }} // Green color for the Y-axis tick marks
          tickSize={10} // Size of tick marks
          label={{
            value: "Doanh thu VNĐ", // Label for Y-axis
            angle: -90,
            position: "insideLeft",
            fontSize: 14,
            fill: "#ffffff", // Green color for the Y-axis label
            fontWeight: "bold", // Make the label bold
          }}
        />

        {/* Tooltip customization */}
        <Tooltip
          formatter={(value) => formatTooltipValue(value)} // Show value with VNĐ on hover
          labelFormatter={(label) => label} // Optional: customize the label format
          contentStyle={{
            backgroundColor: "#fff",
            borderColor: "#ddd",
            borderRadius: "5px",
            borderWidth: "1px",
          }} // Style the tooltip box
        />

        {/* Line with custom color and enhanced style */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ffffff" // Green color for the line
          activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2, fill: "#ffffff" }} // Active dot color and border
          dot={{ stroke: "#ffffff", strokeWidth: 2, fill: "#fff" }} // Inactive dots
          strokeWidth={3} // Line thickness
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
