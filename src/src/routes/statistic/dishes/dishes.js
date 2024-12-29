import React, { useState, useEffect } from "react";
import PieChartComponent from "./piechar_component";
import DishesTable from "./dishes_table";
import "./dishes.css";

const DishesStatistic = () => {
	const [activeTab, setActiveTab] = useState("30days");
	const [chartData, setChartData] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const loadData = async (range) => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(
				`http://localhost:8081/api/v1/statistics/dish?period=${range}`,
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
			setTableData(data.data); // Lưu dữ liệu bảng
			setChartData(
				data.data.map((item) => ({
					name: item.name,
					price: item.price,
					sold: item.sold,
					revenue: item.revenue,
				}))
			);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData(activeTab);
	}, [activeTab]);

	return (
		<div className="dishes-statistic-container">
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
