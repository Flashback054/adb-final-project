import React from "react";
import "./customers_table";
import { useState, useEffect } from "react";
import ColumnChartComponent from "./columnchart_component";
import "./customers.css";
import CustomersTable from "./customers_table";

// Dữ liệu giả cho khách hàng
const last12months = [
  { date: "2024-01-01", newCustomers: 12, totalCustomers: 300 },
  { date: "2024-02-01", newCustomers: 15, totalCustomers: 315 },
  { date: "2024-03-01", newCustomers: 20, totalCustomers: 335 },
  { date: "2024-04-01", newCustomers: 18, totalCustomers: 353 },
  { date: "2024-05-01", newCustomers: 10, totalCustomers: 363 },
  { date: "2024-06-01", newCustomers: 12, totalCustomers: 375 },
  { date: "2024-07-01", newCustomers: 16, totalCustomers: 391 },
  { date: "2024-08-01", newCustomers: 20, totalCustomers: 411 },
  { date: "2024-09-01", newCustomers: 18, totalCustomers: 429 },
  { date: "2024-10-01", newCustomers: 25, totalCustomers: 454 },
  { date: "2024-11-01", newCustomers: 14, totalCustomers: 468 },
  { date: "2024-12-01", newCustomers: 30, totalCustomers: 498 },
];

const last10years = [
  { date: "2014-01-01", newCustomers: 50, totalCustomers: 500 },
  { date: "2015-01-01", newCustomers: 70, totalCustomers: 570 },
  { date: "2016-01-01", newCustomers: 100, totalCustomers: 670 },
  { date: "2017-01-01", newCustomers: 120, totalCustomers: 790 },
  { date: "2018-01-01", newCustomers: 150, totalCustomers: 940 },
  { date: "2019-01-01", newCustomers: 180, totalCustomers: 1120 },
  { date: "2020-01-01", newCustomers: 200, totalCustomers: 1320 },
  { date: "2021-01-01", newCustomers: 250, totalCustomers: 1570 },
  { date: "2022-01-01", newCustomers: 300, totalCustomers: 1870 },
  { date: "2023-01-01", newCustomers: 350, totalCustomers: 2220 },
  { date: "2024-01-01", newCustomers: 400, totalCustomers: 2620 },
];

const last30days = [
  { date: "2024-11-01", newCustomers: 10, totalCustomers: 100 },
  { date: "2024-11-02", newCustomers: 12, totalCustomers: 112 },
  { date: "2024-11-03", newCustomers: 15, totalCustomers: 127 },
  { date: "2024-11-04", newCustomers: 18, totalCustomers: 145 },
  { date: "2024-11-05", newCustomers: 20, totalCustomers: 165 },
  { date: "2024-11-06", newCustomers: 22, totalCustomers: 187 },
  { date: "2024-11-07", newCustomers: 25, totalCustomers: 212 },
  { date: "2024-11-08", newCustomers: 28, totalCustomers: 240 },
  { date: "2024-11-09", newCustomers: 30, totalCustomers: 270 },
  { date: "2024-11-10", newCustomers: 32, totalCustomers: 302 },
  { date: "2024-11-11", newCustomers: 35, totalCustomers: 337 },
  { date: "2024-11-12", newCustomers: 38, totalCustomers: 375 },
  { date: "2024-11-13", newCustomers: 40, totalCustomers: 415 },
  { date: "2024-11-14", newCustomers: 42, totalCustomers: 457 },
  { date: "2024-11-15", newCustomers: 45, totalCustomers: 502 },
  { date: "2024-11-16", newCustomers: 48, totalCustomers: 550 },
  { date: "2024-11-17", newCustomers: 50, totalCustomers: 600 },
  { date: "2024-11-18", newCustomers: 52, totalCustomers: 652 },
  { date: "2024-11-19", newCustomers: 55, totalCustomers: 707 },
  { date: "2024-11-20", newCustomers: 58, totalCustomers: 765 },
  { date: "2024-11-21", newCustomers: 60, totalCustomers: 825 },
  { date: "2024-11-22", newCustomers: 62, totalCustomers: 887 },
  { date: "2024-11-23", newCustomers: 65, totalCustomers: 952 },
  { date: "2024-11-24", newCustomers: 68, totalCustomers: 1020 },
  { date: "2024-11-25", newCustomers: 70, totalCustomers: 1090 },
  { date: "2024-11-26", newCustomers: 72, totalCustomers: 1162 },
  { date: "2024-11-27", newCustomers: 75, totalCustomers: 1237 },
  { date: "2024-11-28", newCustomers: 78, totalCustomers: 1315 },
  { date: "2024-11-29", newCustomers: 80, totalCustomers: 1395 },
  { date: "2024-11-30", newCustomers: 82, totalCustomers: 1477 },
];
const mockData = {
  last30days: last30days,
  last12months: last12months,
  last10years: last10years,
};

const Customers = () => {
  const [activeTab, setActiveTab] = useState("last30days");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async (range) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/statistics/employee?period=${range}`,
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
      setChartData(data.data); // Dữ liệu từ API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  return (
    <div className="customers-statistic-container">
      <div className="tab-container">
        <div
          onClick={() => setActiveTab("last30days")}
          className={`tab-item ${activeTab === "last30days" ? "active" : ""}`}
        >
          Last 30 Days
        </div>
        <div
          onClick={() => setActiveTab("last12months")}
          className={`tab-item ${activeTab === "last12months" ? "active" : ""}`}
        >
          Last 12 Months
        </div>
        <div
          onClick={() => setActiveTab("last10years")}
          className={`tab-item ${activeTab === "last10years" ? "active" : ""}`}
        >
          Last 10 Years
        </div>
      </div>
      <div className="customers-statistic-content">
        <div className="customers-statistic-chart">
          <ColumnChartComponent data={chartData} />
        </div>
        <div className="customers-statistic-table">
          <CustomersTable data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
