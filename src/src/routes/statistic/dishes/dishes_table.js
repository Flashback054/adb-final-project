import React from "react";
const DishesTable = ({ data }) => {
  return (
    <div className="dishes-statistic-table">
      <h2 className="table-title">Top 10 Best-Selling Dishes</h2>
      <table className="dishes-table">
        <thead>
          <tr>
            <th>Tên món</th>
            <th>Giá bán</th>
            <th>Số lượng bán</th>
            <th>Doanh thu món</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dish, index) => (
            <tr key={index}>
              <td>{dish.name}</td>
              <td>{dish.price.toLocaleString()} VNĐ</td>
              <td>{dish.sold}</td>
              <td>{dish.revenue.toLocaleString()} VNĐ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishesTable;
