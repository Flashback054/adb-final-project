import React, { useState, useEffect } from "react";
import LineChartComponent from "./linechar_component";
import "./revenue.css"; // Import the CSS file

const RevenueStatistic = () => {
  const [activeTab, setActiveTab] = useState("30days");
  // const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async (range) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/statistics/revenue?period=${range}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data for period: ${range}`);
      }

      const data = await response.json();
      setTableData(data.data); // Dữ liệu từ API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterDataForChart = () => {
    const data = tableData.map((item) => ({
      time: item.date,
      value: item.totalRevenue,
    }));
    return data;
  };

  const chartData = filterDataForChart();

  console.log(chartData);

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

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
