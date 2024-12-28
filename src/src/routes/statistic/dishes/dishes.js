import React, { useState, useEffect } from "react";
import PieChartComponent from "./piechar_component";
import DishesTable from "./dishes_table";
import "./dishes.css";
const last30days = [
  { name: "Pho", price: 50000, sold: 120, revenue: 6000000 },
  { name: "Banh Mi", price: 30000, sold: 200, revenue: 6000000 },
  { name: "Bun Bo Hue", price: 55000, sold: 90, revenue: 4950000 },
  { name: "Com Ga", price: 60000, sold: 70, revenue: 4200000 },
  { name: "Goi Cuon", price: 25000, sold: 150, revenue: 3750000 },
  { name: "Banh Xeo", price: 40000, sold: 80, revenue: 3200000 },
  { name: "Hu Tieu", price: 45000, sold: 60, revenue: 2700000 },
  { name: "Cha Gio", price: 30000, sold: 70, revenue: 2100000 },
  { name: "Xoi Ga", price: 35000, sold: 50, revenue: 1750000 },
  { name: "Bo Luc Lac", price: 90000, sold: 20, revenue: 1800000 },
];
const last12months = [
  { name: "Pho", price: 50000, sold: 1500, revenue: 75000000 },
  { name: "Banh Mi", price: 30000, sold: 2200, revenue: 66000000 },
  { name: "Bun Bo Hue", price: 55000, sold: 1200, revenue: 66000000 },
  { name: "Com Ga", price: 60000, sold: 1000, revenue: 60000000 },
  { name: "Goi Cuon", price: 25000, sold: 1700, revenue: 42500000 },
  { name: "Banh Xeo", price: 40000, sold: 1100, revenue: 44000000 },
  { name: "Hu Tieu", price: 45000, sold: 900, revenue: 40500000 },
  { name: "Cha Gio", price: 30000, sold: 950, revenue: 28500000 },
  { name: "Xoi Ga", price: 35000, sold: 800, revenue: 28000000 },
  { name: "Bo Luc Lac", price: 90000, sold: 300, revenue: 27000000 },
];
const last10years = [
  { name: "Pho", price: 50000, sold: 15000, revenue: 750000000 },
  { name: "Banh Mi", price: 30000, sold: 22000, revenue: 660000000 },
  { name: "Bun Bo Hue", price: 55000, sold: 12000, revenue: 660000000 },
  { name: "Com Ga", price: 60000, sold: 10000, revenue: 600000000 },
  { name: "Goi Cuon", price: 25000, sold: 17000, revenue: 425000000 },
  { name: "Banh Xeo", price: 40000, sold: 11000, revenue: 440000000 },
  { name: "Hu Tieu", price: 45000, sold: 9000, revenue: 405000000 },
  { name: "Cha Gio", price: 30000, sold: 9500, revenue: 285000000 },
  { name: "Xoi Ga", price: 35000, sold: 8000, revenue: 280000000 },
  { name: "Bo Luc Lac", price: 90000, sold: 3000, revenue: 270000000 },
];

const DishesStatistic = () => {
  const [activeTab, setActiveTab] = useState("last30days");
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const mockData = {
    last30days: last30days,
    last12months: last12months,
    last10years: last10years,
  };

  const loadData = (range) => {
    setChartData(mockData[range].slice(0, 5));
    setTableData(generateTableData(mockData[range]));
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const generateTableData = (data) => {
    return data.map((item, index) => {
      return {
        name: item.name,
        price: item.price,
        sold: item.sold,
        revenue: item.revenue,
      };
    });
  };

  return (
    <div className="dishes-statistic-container">
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
      <div className="dishes-statistic-content">
        <div className="dishes-statistic-chart">
          <PieChartComponent data={chartData} />
        </div>
        <div className="dishes-statistic-table">
          <DishesTable data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default DishesStatistic;
