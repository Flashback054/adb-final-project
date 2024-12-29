import React from "react";

const CustomersTable = ({ data }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Employee Details by Date</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Total Order</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.employeeId}</td>
              <td>{entry.totalOrders}</td>
              <td>{entry.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
