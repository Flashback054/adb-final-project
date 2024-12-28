import React from "react";

const CustomersTable = ({ data }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Customer Details by Date</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>New Customers</th>
            <th>Total Customers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.newCustomers}</td>
              <td>{entry.totalCustomers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
