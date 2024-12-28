import React, { useState, useEffect } from "react";
import LineChartComponent from "./linechar_component";
import "./revenue.css"; // Import the CSS file

const RevenueStatistic = () => {
  const [activeTab, setActiveTab] = useState("30days");
  const [chartData, setChartData] = useState([]);

  const last30DaysData = [
    { time: "2024-11-18", value: 120 },
    { time: "2024-11-19", value: 130 },
    { time: "2024-11-20", value: 150 },
    { time: "2024-11-21", value: 170 },
    { time: "2024-11-22", value: 160 },
    { time: "2024-11-23", value: 180 },
    { time: "2024-11-24", value: 190 },
    { time: "2024-11-25", value: 200 },
    { time: "2024-11-26", value: 210 },
    { time: "2024-11-27", value: 220 },
    { time: "2024-11-28", value: 230 },
    { time: "2024-11-29", value: 240 },
    { time: "2024-11-30", value: 250 },
    { time: "2024-12-01", value: 260 },
    { time: "2024-12-02", value: 270 },
    { time: "2024-12-03", value: 280 },
    { time: "2024-12-04", value: 290 },
    { time: "2024-12-05", value: 300 },
    { time: "2024-12-06", value: 310 },
    { time: "2024-12-07", value: 320 },
    { time: "2024-12-08", value: 330 },
    { time: "2024-12-09", value: 340 },
    { time: "2024-12-10", value: 350 },
    { time: "2024-12-11", value: 360 },
    { time: "2024-12-12", value: 370 },
    { time: "2024-12-13", value: 380 },
    { time: "2024-12-14", value: 390 },
    { time: "2024-12-15", value: 400 },
    { time: "2024-12-16", value: 410 },
    { time: "2024-12-17", value: 420 },
  ];

  const last12MonthsData = [
    { time: "2023-12", value: 120 },
    { time: "2024-01", value: 130 },
    { time: "2024-02", value: 140 },
    { time: "2024-03", value: 150 },
    { time: "2024-04", value: 160 },
    { time: "2024-05", value: 170 },
    { time: "2024-06", value: 180 },
    { time: "2024-07", value: 190 },
    { time: "2024-08", value: 200 },
    { time: "2024-09", value: 210 },
    { time: "2024-10", value: 220 },
    { time: "2024-11", value: 230 },
  ];

  const last10YearsData = [
    { time: "2014", value: 100 },
    { time: "2015", value: 110 },
    { time: "2016", value: 120 },
    { time: "2017", value: 130 },
    { time: "2018", value: 140 },
    { time: "2019", value: 150 },
    { time: "2020", value: 160 },
    { time: "2021", value: 170 },
    { time: "2022", value: 180 },
    { time: "2023", value: 190 },
    { time: "2024", value: 200 },
  ];

  const mockData = {
    "30days": last30DaysData,
    "12months": last12MonthsData,
    "10years": last10YearsData,
  };

  const loadData = (range) => {
    setChartData(mockData[range]);
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const generateTableData = (data) => {
    return data.map((item, index) => {
      const atTable = Math.floor(Math.random() * 10) + 1;
      const delivery = Math.floor(Math.random() * 10) + 1;
      const totalOrders = atTable + delivery;

      return {
        date: item.time,
        totalRevenue: item.value.toLocaleString() + " VNĐ",
        atTableOrders: atTable,
        deliveryOrders: delivery,
        totalOrders: totalOrders,
      };
    });
  };

  const tableData = generateTableData(chartData);
  return (
    <div className="revenue-statistic-container">
      <div className="tab-container">
        <div
          onClick={() => setActiveTab("30days")}
          className={`tab-item ${activeTab === "30days" ? "active" : ""}`}
        >
          Last 30 Days
        </div>
        <div
          onClick={() => setActiveTab("12months")}
          className={`tab-item ${activeTab === "12months" ? "active" : ""}`}
        >
          Last 12 Months
        </div>
        <div
          onClick={() => setActiveTab("10years")}
          className={`tab-item ${activeTab === "10years" ? "active" : ""}`}
        >
          Last 10 Years
        </div>
      </div>

      <div className="chart-container">
        <LineChartComponent data={chartData} />
      </div>

      <div className="table-container">
        <h1>Revenue Table</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Revenue</th>
              <th>Số đơn Tại bàn</th>
              <th>Số đơn Giao hàng</th>
              <th>Tổng đơn</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.totalRevenue}</td>
                <td>{item.atTableOrders}</td>
                <td>{item.deliveryOrders}</td>
                <td>{item.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueStatistic;
