import React, { useEffect } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import "./statistics.css";
import StatisticsImage from "../../assets/images/statistics/statistics-bg.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
/*
  Doanh Thu trong khoang 10 năm (last 10 years)
  Doanh Thu trong 1 năm có 12 tháng (last 12 months)
  Doanh Thu trong 1 tháng có 30 ngày (last 30 days)
  // Bảng
  Date | Total Revenue | Tại bàn | Giao Hàng | Tổng đơn | Tỷ lệ tăng trưởng

  // Khách hàng
  Biểu đồ | Table (Tong so khach hang, so khach hang moi, tăng trưởng)
  Bảng khách hàng bạc vàng (top 10)

  // Món ăn
  Biểu đồ tròn các món ăn phổ biến ( 5 món ăn phổ biến)
  Bảng món ăn phổ biến (top 10) theo ngày tháng năm
 */
const Statistics = () => {
  useEffect(() => {
    document.title = "Sushi Time";
    ResetLocation();
  }, []);
  return (
    <section className="statistics__hero">
      <div
        className="statistics__background"
        style={{ backgroundImage: `url(${StatisticsImage})` }}
      ></div>
      <section className="statistics_info flex-container flex-column txt-center pop-font txt-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
        >
          <span>Statistics</span>
          <h1 className="txt-white">Explore Your Business Insights</h1>
          <p className="txt-white">
            Get detailed statistics on your revenue, customers, and most popular
            dishes.
          </p>
        </motion.div>
        <div className="statistics__interaction flex-container flex-row">
          <Link className="stat-button-style" to="/statistics/revenue">
            View Revenue
          </Link>
          <Link className="stat-button-style" to="/statistics/customers">
            View Customers
          </Link>
          <Link className="stat-button-style" to="/statistics/dishes">
            View Dishes
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Statistics;
