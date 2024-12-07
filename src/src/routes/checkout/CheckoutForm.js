import React from "react";
import { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { RiContactsBookLine, RiShoppingBagLine } from "react-icons/ri";
import { FaSign } from "react-icons/fa";
import ResetLocation from "../../helpers/ResetLocation";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
const CheckoutForm = ({
  currentUser,
  totalPayment,
  productsQuantity,
  taxes,
}) => {
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
  const [submit, setSubmit] = useState(false);
  const [promoCode, setPromoCode] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const chiNhanh = [
    { chiNhanh: 1, tenChiNhanh: "Sushi Time - 1" },
    { chiNhanh: 2, tenChiNhanh: "Sushi Time - 2" },
  ];
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
  const togglePromocode = () => {
    setPromoCode(!promoCode);
  };
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
    setFormError(validateForm(formValue));
    if (Object.keys(validateForm(formValue)).length > 0) {
      console.log("Form Error: ", formError);
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
  useEffect(() => {
    if (submit) {
      if (
        currentUser.LoaiTaiKhoan === "KH" &&
        Object.keys(formError).length === 0
      ) {
        return navigate("/payment");
      }
    }
  }, [submit, formError, navigate]);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateForm = (value) => {
    let errors = {};
    if (!value.LoaiPhieu) {
      errors.chooseDelivery = "Please choose a delivery type";
    }
    if (!value.promoCode && promoCode) {
      errors.promoCode = "Please indicate your promo code";
    }
    if (value.promoCode && value.promoCode.length < 5 && promoCode) {
      errors.promoCode = "Invalid promo code!";
    }
    if (currentUser.Diachi === null && value.chooseDelivery === "delivery") {
      errors.address = "Please add your address";
    }
    if (currentUser.SDT === null) {
      errors.number = "Please add your number";
    }

    return errors;
  };

  return (
    <section className="checkout__form">
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
                    <option value={chiNhanh.chiNhanh} key={chiNhanh.chiNhanh}>
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

              {currentUser.LoaiTaiKhoan === "NV" ? (
                <button type="submit" className="active-button-style">
                  Submit
                  {currentUser.LoaiTaiKhoan}
                </button>
              ) : (
                <button type="submit" className="active-button-style">
                  Payment
                </button>
              )}
            </form>
          </section>
        )}
      </motion.main>
    </section>
  );
};

export default CheckoutForm;
