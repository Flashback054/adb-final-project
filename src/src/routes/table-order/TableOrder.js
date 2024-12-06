import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useState } from "react";
import "./tableOrder.css";
import ResetLocation from "../../helpers/ResetLocation";

const TableOrder = () => {
  const [formValue, setFormValue] = useState({
    MaPhieuDatBan: "",
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

  useEffect(() => {
    document.title = "Table Order | Sushi Time";
  }, []);

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
      MaPhieuDatBan: "",
      SoBan: "",
      SoLuongKhach: "",
      NgayDat: "",
      GioDen: "",
      GhiChu: "",
      LoaiPhieuDatBan: "TC",
      MaNVDatBan: "",
    });
    setFormError({});
  };
  // API will be called here
  const createTableOrder = async (formValue) => {
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
          MaPhieuDatBan: "",
          SoBan: "",
          SoLuongKhach: "",
          NgayDat: "",
          GioDen: "",
          GhiChu: "",
          LoaiPhieuDatBan: "TC",
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
        <form
          className="table-order__form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
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
          <button type="submit" className="table-order__submit">
            Submit
          </button>
        </form>
      )}
    </motion.main>
  );
};

export default TableOrder;
