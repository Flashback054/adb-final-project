import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// Component Tooltip tùy chỉnh
const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    const { totalCustomers } = payload[0].payload; // Truy xuất giá trị totalCustomers từ payload
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
          color: "#000",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{`Ngày: ${label}`}</p>
        <p>{`Tổng số khách: ${totalCustomers.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};
const ColumnChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{
            value: "Biểu đồ thống kê khách hàng",
            position: "insideBottom",
            fontSize: 20,
            offset: -10,
            fill: "#ffffff",
            fontWeight: "bold",
          }}
        />
        <YAxis
          tickSize={10}
          label={{
            value: "Tổng số khách (Người)",
            angle: -90,
            position: "insideLeft",
            fontSize: 14,
            fill: "#ffffff",
            fontWeight: "bold",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="totalCustomers" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChartComponent;
