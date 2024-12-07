import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { FaShippingFast } from "react-icons/fa";
import { FaSign } from "react-icons/fa";
import { useState } from "react";
import "./tableOrder.css";
import ResetLocation from "../../helpers/ResetLocation";
import { useNavigate } from "react-router-dom";

const TableOrder = ({ currentUser, cartItems, CartItem }) => {
  const [formValue, setFormValue] = useState({
    MaPhieuDatBan: "",
    LoaiPhieu: "DB", // mặc định là 'DB'
    MaKhachHang: "",
    TenKhachHang: "",
    DiaChiGiaoHang: "",
    SoBan: "",
    SoLuongKhach: "",
    NgayDat: "",
    GioDen: "",
    GhiChu: "",
    LoaiPhieuDatBan: "TC", // mặc định là 'TC'
    MaNVDatBan: "",
  });

  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const chiNhanh = [
    { chiNhanh: 1, tenChiNhanh: "Sushi Time - 1" },
    { chiNhanh: 2, tenChiNhanh: "Sushi Time - 2" },
  ];
  const navigate = useNavigate();
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
  }, []);
  useEffect(() => {
    if (submit && Object.keys(formError).length === 0) {
      return navigate("/payment");
    }
  }, [submit, formError, navigate]);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateForm = (value) => {
    let errors = {};
    if (!value.SoBan) {
      errors.SoBan = "Please enter a table number";
    }
    if (!value.SoLuongKhach) {
      errors.SoLuongKhach = "Please enter number of guests";
    }
    if (!value.NgayDat) {
      errors.NgayDat = "Please enter a date";
    }
    if (!value.GioDen) {
      errors.GioDen = "Please enter a time";
    }
    return errors;
  };
  const resetForm = () => {
    setSubmit(false);
    setFormValue({
      LoaiPhieu: "DB",
      MaKhachHang: "",
      DiaChiGiaoHang: "",
      MaChiNhanh: 1,
      SoBan: "",
      SoLuongKhach: "",
      NgayDat: "",
      GioDen: "",
      GhiChu: "",
      LoaiPhieuDatBan: "TT",
      MaNVDatBan: "",
    });
    setFormError({});
  };
  // API will be called here
  const createTableOrder = async (formValue) => {
    // User là Nhân Viên
    const ngayLap = new Date().toISOString().split("T")[0];

    if (currentUser.LoaiTaiKhoan === "NV") {
      const maNVDatBan = currentUser.MaTaiKhoan;
    } else {
    }
    // User là Customer
    const tableOrder = {
      MaPhieuDatBan: uuidv4(),
      NgayLap: new Date().toISOString().split("T")[0],
      LoaiPhieu: formValue.LoaiPhieu,
      MaChiNhanh: 1,
      MaKhachHang: currentUser.MaKhachHang,
      TenKhachHang: formValue.TenKhachHang,
      DiaChiGiaoHang: formValue.DiaChiGiaoHang,
      SoBan: formValue.SoBan,
      SoLuongKhach: formValue.SoLuongKhach,
      NgayDat: formValue.NgayDat,
      GioDen: formValue.GioDen,
      GhiChu: formValue.GhiChu,
      LoaiPhieuDatBan: formValue.LoaiPhieuDatBan,
      MaNVDatBan: formValue.MaNVDatBan,
    };

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 2000)
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(validateForm(formValue));
    if (Object.keys(validateForm(formValue)).length > 0) {
      setLoading(false);
      return;
    } else {
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
          LoaiPhieu: "DB",
          MaKhachHang: "",
          TenKhachHang: "",
          DiaChiGiaoHang: "",
          SoBan: "",
          SoLuongKhach: "",
          NgayDat: "",
          GioDen: "",
          GhiChu: "",
          LoaiPhieuDatBan: "TT",
          MaNVDatBan: "",
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
            <div className="table-order__form-group type-of-order">
              <label
                htmlFor="delivery"
                className="order__form__type"
                name="loaiPhieu"
                defaultChecked
              >
                <input
                  type="radio"
                  placeholder="Address"
                  value="GH"
                  name="loaiPhieu"
                  onChange={handleValidation}
                />
                <FaShippingFast />
                Delivery
              </label>

              <label
                htmlFor="delivery"
                className="order__form__type"
                name="loaiPhieu"
              >
                {" "}
                <input
                  type="radio"
                  placeholder="In restaurant"
                  value="DB"
                  name="loaiPhieu"
                  onChange={handleValidation}
                />
                <FaSign />
                Booking Table
              </label>
              {formError.SoBan && (
                <span className="error">{formError.SoBan}</span>
              )}
            </div>
            <div className="table-order__form-group">
              <label htmlFor="MaKhachHang">Customer's Name</label>
              <input
                type="number"
                id="TenKhachHang"
                name="TenKhachHang"
                value={formValue.TenKhachHang}
                onChange={handleValidation}
              />
            </div>
            <div className="table-order__form-group">
              <label htmlFor="DiaChiGiaoHang">Address</label>
              <input
                type="number"
                id="DiaChiGiaoHang"
                name="DiaChiGiaoHang"
                value={formValue.DiaChiGiaoHang}
                onChange={handleValidation}
                required
              />
              {formError.DiaChiGiaoHang && (
                <span className="error">{formError.DiaChiGiaoHang}</span>
              )}
            </div>
            <div className="table-order__form-group">
              <label htmlFor="SoBan">Table Number</label>
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
            <div className="table-order__form-group">
              <label htmlFor="SoLuongKhach">Number of Guests</label>
              <input
                type="number"
                id="SoLuongKhach"
                name="SoLuongKhach"
                value={formValue.SoLuongKhach}
                onChange={handleValidation}
              />
              {formError.SoLuongKhach && (
                <span className="error">{formError.SoLuongKhach}</span>
              )}
            </div>
            <div className="table-order__form-group">
              <label htmlFor="NgayDat">Date</label>
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
            <div className="table-order__form-group">
              <label htmlFor="GioDen">Time</label>
              <input
                type="time"
                id="GioDen"
                name="GioDen"
                value={formValue.GioDen}
                onChange={handleValidation}
              />
              {formError.GioDen && (
                <span className="error">{formError.GioDen}</span>
              )}
            </div>
            <div className="table-order__form-group">
              <label htmlFor="GhiChu">Note</label>
              <input
                id="GhiChu"
                name="GhiChu"
                value={formValue.GhiChu}
                onChange={handleValidation}
              ></input>
            </div>
            {currentUser.LoaiTaiKhoan === "NV" ? (
              <button type="submit" className="table-order__submit">
                Submit
                {currentUser.LoaiTaiKhoan}
              </button>
            ) : (
              <button type="submit" className="table-order__submit">
                Payment
              </button>
            )}
          </form>
        </section>
      )}
    </motion.main>
  );
};

export default TableOrder;
