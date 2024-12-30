import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import "./tableOrder.css";
import ResetLocation from "../../helpers/ResetLocation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TableOrder = ({
  currentUser,
  cartItems,
  CartItem,
  productsQuantity,
  totalPayment,
  taxes,
  delivery,
}) => {
  const [formValue, setFormValue] = useState({
    SoBan: "",
    SoLuongKhach: "",
    MaChiNhanh: "",
    NgayDat: "",
    GioDen: "",
    GhiChu: "",
    MaNVDatBan: null,
    DiaChiGiaoHang: "",
  });

  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const chiNhanh = [
    { chiNhanh: 1, tenChiNhanh: "Sushi Time - 1" },
    { chiNhanh: 2, tenChiNhanh: "Sushi Time - 2" },
  ];
  /*
    [MaPhieu] <- Auto, [NgayLap] <- Auto, [LoaiPhieu] <- Mặc định là 'DB', [MaChiNhanh] NV thì Auto - KH là dropdownbutton, [MaKhachHang] user là khách hàng thì lấy từ session - là nhân viên thì không có,
    [MaPhieuDatBan] trùng với [MaPhieu], [SoBan], [SoLuongKhach], [NgayDat] khách hàng chọn từ 1 widget, [GioDen] khách hàng chọn từ 1 widget, [GhiChu], [LoaiPhieuDatBan] <- KH là 'TT' còn NV là 'TC', [MaNVDatBan] nếu nhân viên đặt thì lấy từ session, nếu khách hàng đặt thì không có
  */
  //   {
  //      "NgayLap": "2024-12-07",  // Ngày lập phiếu
  //      "LoaiPhieu": "DB",        // Loại phiếu (GH cho giao hàng, DB cho đặt món)
  //   "MaChiNhanh": 1,          // Mã chi nhánh
  //   ~"MaKhachHang": 123,       // Mã khách hàng
  //   "DiaChiGiaoHang": "123 Street, City", // Địa chỉ giao hàng (nếu là giao hàng)
  //   "SoBan": 5,               // Số bàn (nếu là đặt bàn)
  //   "SoLuongKhach": 4,        // Số lượng khách (nếu là đặt bàn)
  //   "NgayDat": "2024-12-08",  // Ngày đặt bàn (nếu là đặt bàn)
  //   "GioDen": "18:00",        // Giờ đến (nếu là đặt bàn)
  //   "GhiChu": "Booking for 4 persons", // Ghi chú (nếu có)
  //   "LoaiPhieuDatBan": "TC",  // Loại phiếu đặt bàn (TC, TT)
  //   "MaNVDatBan": 1001       // Mã nhân viên đặt bàn (nếu có)
  // }

  useEffect(() => {
    document.title = "Table Order | Sushi Time";
    console.log("cartitems: ", cartItems);
  }, []);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateForm = (value) => {
    let errors = {};
    if (!value.SoBan && !delivery) {
      errors.SoBan = "Please enter a table number";
    }
    if (!value.SoLuongKhach && !delivery) {
      errors.SoLuongKhach = "Please enter number of guests";
    }
    if (!value.NgayDat && !delivery) {
      errors.NgayDat = "Please enter a date";
    }
    if (!value.GioDen && !delivery) {
      errors.GioDen = "Please enter a time";
    }
    if (!value.MaChiNhanh && !delivery) {
      errors.MaChiNhanh = "Please select a branch";
    }
    if (delivery && !value.DiaChiGiaoHang) {
      errors.DiaChiGiaoHang = "Please enter a delivery address";
    }
    return errors;
  };
  const isoToTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const timeToIso = (timeString, date = new Date()) => {
    const [hours, minutes] = timeString.split(":"); // Tách giờ và phút
    date.setHours(hours, minutes, 0, 0); // Đặt giờ, phút
    return date.toISOString(); // Chuyển đổi thành ISO
  };

  const resetForm = () => {
    setSubmit(false);
    setFormValue({
      SoBan: "",
      SoLuongKhach: "",
      MaChiNhanh: "",
      NgayDat: "",
      GioDen: "",
      GhiChu: "",
      DiaChiGiaoHang: "",
    });
    setFormError({});
  };
  // API will be called here
  const createTableOrder = async (formValue) => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/phieudatban/datban",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...formValue,
            MaKhachHang: currentUser.MaKhachHang,
            LoaiPhieuDatBan: "TT",
            LoaiPhieu: "DB",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create table order");
      }
      if (cartItems.length > 0) {
        const data = await response.json();
        const MaPhieu = data.data.MaPhieuDatBan;
        const response2 = await fetch(
          `http://localhost:8081/api/v1/phieudatmon/datmon`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              MaPhieu: MaPhieu,
              Mon: cartItems.map((item) => ({
                MaMon: item.MaMon,
                SoLuong: item.quantity,
                Gia: item.GiaHienTai,
              })),
            }),
          }
        );

        if (!response2.ok) {
          throw new Error("Failed to create order details");
        }
      }

      toast.success("Table order created successfully");
      return true;
    } catch (error) {
      toast.error("Failed to create table order:", error);
      console.error("Error creating table order:", error);
      alert("An error occurred while creating the table order.");
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(validateForm(formValue));
    if (Object.keys(validateForm(formValue)).length > 0) {
      setLoading(false);
      return;
    } else {
      // API Call
      const tableOrderCreation = await createTableOrder(formValue);
      if (tableOrderCreation === false) {
        setLoading(false);
        setSubmit(false);
        return;
      } else {
        ResetLocation();
        setLoading(false);
        setSubmit(true);
        setFormError({});
        setFormValue({
          SoBan: "",
          SoLuongKhach: "",
          MaChiNhanh: "",
          NgayDat: "",
          GioDen: "",
          GhiChu: "",
          DiaChiGiaoHang: "",
        });
      }
    }
  };
  return (
    <motion.main
      className="table-order"
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}
    >
      <h2 className="table-order__title">
        {submit && Object.keys(formError).length === 0
          ? "Success!"
          : "Table Order Form"}
      </h2>
      {loading ? (
        <div role="status" className="loader">
          {ResetLocation()}
          <p>Loading...</p>
          <img
            alt="Processing request"
            src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s"
          />
        </div>
      ) : submit && Object.keys(formError).length === 0 ? (
        <section className="table-order__form__success">
          <p>Table Order Form was created successfully!</p>
          <div className="table-order__interaction">
            <Link className="passive-button-style" to="/menu">
              Go To Menu
            </Link>
            <Link
              className="passive-button-style"
              to="/table-order"
              onClick={resetForm}
            >
              More Orders Table
            </Link>
          </div>
        </section>
      ) : (
        <section className="table-order">
          <form
            className="table-order__form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {/* Số bàn */}
            {!delivery && (
              <div className="table-order__form-group">
                <label htmlFor="SoBan">Số Bàn</label>
                <input
                  type="number"
                  id="SoBan"
                  name="SoBan"
                  value={formValue.SoBan}
                  onChange={handleValidation}
                  required
                />
                {formError.SoBan && (
                  <span className="error">{formError.SoBan}</span>
                )}
              </div>
            )}
            {/* Mã Chi Nhánh */}
            {!delivery && (
              <div className="table-order__form-group">
                <label htmlFor="MaChiNhanh">Chi Nhanh</label>
                <select
                  type="number"
                  id="MaChiNhanh"
                  name="MaChiNhanh"
                  value={formValue.MaChiNhanh}
                  onChange={handleValidation}
                  required
                >
                  <option value="" disabled>
                    Chọn chi nhánh
                  </option>
                  {chiNhanh.map((chiNhanh) => (
                    <option value={chiNhanh.chiNhanh}>
                      {chiNhanh.tenChiNhanh}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Số Lượng Khách */}
            {!delivery && (
              <div className="table-order__form-group">
                <label htmlFor="SoLuongKhach">Số lượng khách</label>
                <input
                  type="number"
                  id="SoLuongKhach"
                  name="SoLuongKhach"
                  value={formValue.SoLuongKhach}
                  onChange={handleValidation}
                  required
                />
                {formError.SoLuongKhach && (
                  <span className="error">{formError.SoLuongKhach}</span>
                )}
              </div>
            )}
            {/* Ngày Đặt */}
            {!delivery && (
              <div className="table-order__form-group">
                <label htmlFor="NgayDat">Ngày đặt</label>
                <input
                  type="date"
                  id="NgayDat"
                  name="NgayDat"
                  value={formValue.NgayDat}
                  onChange={handleValidation}
                />
                {formError.NgayDat && (
                  <span className="error">{formError.NgayDat}</span>
                )}
              </div>
            )}
            {/* Giờ đến */}
            {!delivery && (
              <div className="table-order__form-group">
                <label htmlFor="GioDen">Giờ Đến</label>
                <input
                  type="time"
                  id="GioDen"
                  name="GioDen"
                  value={formValue.GioDen ? isoToTime(formValue.GioDen) : ""} // Hiển thị giá trị HH:mm
                  onChange={(e) => {
                    const timeValue = e.target.value; // Lấy giá trị HH:mm từ input
                    const isoValue = timeToIso(timeValue); // Chuyển sang ISO
                    handleValidation({
                      target: { name: "GioDen", value: isoValue },
                    }); // Cập nhật formValue
                  }}
                />
                {formError.GioDen && (
                  <span className="error">{formError.GioDen}</span>
                )}
              </div>
            )}
            {/* Ghi chú */}
            {!delivery && (
              <div className="table-order__form-group">
                <label htmlFor="GhiChu">Ghi Chú</label>
                <input
                  id="GhiChu"
                  name="GhiChu"
                  value={formValue.GhiChu}
                  onChange={handleValidation}
                ></input>
              </div>
            )}
            {/* Địa chỉ giao hàng */}
            {delivery && (
              <div className="table-order__form-group">
                <label htmlFor="DiaChiGiaoHang">Địa chỉ giao hàng</label>
                <input
                  id="DiaChiGiaoHang"
                  name="DiaChiGiaoHang"
                  value={formValue.DiaChiGiaoHang}
                  onChange={handleValidation}
                ></input>
              </div>
            )}

            {productsQuantity > 0 && (
              <section className="checkout__totals">
                <section className="checkout__totals__content">
                  <h4>Tax 10%:</h4>
                  <p>$ {taxes}</p>
                </section>
                <section className="checkout__totals__content">
                  <h4>Quantity:</h4>
                  <p> {productsQuantity}</p>
                </section>
                <section className="checkout__totals__content">
                  <h4>Total:</h4>
                  <p>$ {totalPayment}</p>
                </section>
              </section>
            )}
            {currentUser.LoaiTaiKhoan === "KH" ? (
              <button type="submit" className="active-button-style">
                Proceed to payment
              </button>
            ) : (
              <button type="submit" className="active-button-style">
                Submit
              </button>
            )}
          </form>
        </section>
      )}
    </motion.main>
  );
};

export default TableOrder;
