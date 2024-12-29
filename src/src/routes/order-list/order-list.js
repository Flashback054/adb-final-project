import React, { useEffect, useState } from "react";
import "./order-list.css";
import ReactPaginate from "react-paginate";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async (page = 1) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/v1/phieudatban/chinhanh/1?page=${page}&limit=30`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.data); // Gán danh sách đơn hàng vào state
        setTotalPages(Math.ceil(30 / 10));
        console.log("Total Pages:", totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(currentPage);
  }, [currentPage]);
  const handlePageClick = (event) => {
    console.log(event.selected);
    setCurrentPage(event.selected + 1); // ReactPaginate sử dụng chỉ mục 0, cần +1
  };
  if (loading) return <div className="order-list__loading">Loading...</div>;
  if (error) return <div className="order-list__error">{error}</div>;

  return (
    <div className="order-list__container">
      <h1 className="order-list__title">Danh sách phiếu đặt bàn</h1>
      <table className="order-list__table">
        <thead>
          <tr>
            <th>Mã Phiếu</th>
            <th>Số Bàn</th>
            <th>Số Khách</th>
            <th>Ngày Đặt</th>
            <th>Giờ Đến</th>
            <th>Ghi Chú</th>
            <th>Mã Khách Hàng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.MaPhieuDatBan}>
              <td>{order.MaPhieuDatBan}</td>
              <td>{order.SoBan}</td>
              <td>{order.SoLuongKhach}</td>
              <td>{new Date(order.NgayDat).toLocaleDateString()}</td>
              <td>{new Date(order.GioDen).toLocaleTimeString()}</td>
              <td>{order.GhiChu || "Không có ghi chú"}</td>
              <td>{order.MaKhachHang}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=" &#62;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="&#60;"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default OrderList;
