import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import ResetLocation from "../../helpers/ResetLocation";
import "./register.css";
import { toast } from "react-toastify";
const Register = ({ activateLoginModal }) => {
  const [formValue, setFormValue] = useState({
    TenDangNhap: "",
    MatKhau: "",
    HoTen: "",
    Email: "",
    SDT: "",
    GioiTinh: "Nam", // mặc định là Nam
    CCCD: "",
    Duong: "",
    Phuong: "",
    Quan: "",
    ThanhPho: "",
  });
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [registrationFail, setRegistrationFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const callAPIRegister = async (payload) => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1" + "/auth/signup/khachhang",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("callAPIRegister error:", err.message);
      throw err;
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.TenDangNhap)
      errors.TenDangNhap = "Tên đăng nhập không được để trống";
    if (!values.MatKhau || values.MatKhau.length < 6)
      errors.MatKhau = "Mật khẩu phải có ít nhất 6 ký tự";
    if (!values.HoTen) errors.HoTen = "Họ và tên không được để trống";
    if (!values.Email || !/\S+@\S+\.\S+/.test(values.Email))
      errors.Email = "Email không hợp lệ";
    if (!values.SDT || !/^0\d{9}$/.test(values.SDT))
      errors.SDT = "Số điện thoại phải có 10 chữ số";
    if (!values.CCCD || !/^\d{12}$/.test(values.CCCD))
      errors.CCCD = "CCCD phải có 12 chữ số";
    if (!values.Duong) errors.Duong = "Đường không được để trống";
    if (!values.Phuong) errors.Phuong = "Phường không được để trống";
    if (!values.Quan) errors.Quan = "Quận không được để trống";
    if (!values.ThanhPho) errors.ThanhPho = "Thành phố không được để trống";

    return errors;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setFormError(validate(formValue));
    window.scrollTo(0, 0);
    if (Object.keys(validate(formValue)).length > 0) {
      setLoading(false);
      return;
    } else {
      const accCreationResult = await callAPIRegister(formValue);
      if (accCreationResult.status === "success") {
        setLoading(false);
        setRegistrationFail(false);
        setSubmit(true);
        setFormValue({
          TenDangNhap: "",
          MatKhau: "",
          HoTen: "",
          Email: "",
          SDT: "",
          GioiTinh: "Nam", // mặc định là Nam
          CCCD: "",
          Duong: "",
          Phuong: "",
          Quan: "",
          ThanhPho: "",
        });
      } else {
        toast.error("Đăng ký thất bại, vui lòng thử lại sau");
        setLoading(false);
        setSubmit(false);
        setRegistrationFail(true);
        setFormValue({
          TenDangNhap: "",
          MatKhau: "",
          HoTen: "",
          Email: "",
          SDT: "",
          GioiTinh: "Nam", // mặc định là Nam
          CCCD: "",
          Duong: "",
          Phuong: "",
          Quan: "",
          ThanhPho: "",
        });
      }
    }
  };
  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    document.title = "Registration | Pizza Time";
  }, []);
  return (
    <motion.main
      className="register"
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}
    >
      <h2>
        {submit && Object.keys(formError).length === 0
          ? "Success!"
          : "Registration"}
      </h2>
      {loading ? (
        <div role="status" className="loader">
          <p>Almost there...</p>
          <img
            alt="Processing request"
            src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s"
          />
        </div>
      ) : submit && Object.keys(formError).length === 0 ? (
        <section className="register__success">
          <p>You can now log in and make an order!</p>
          <button
            className="passive-button-style txt-white"
            onClick={() => {
              ResetLocation();
              activateLoginModal();
              setSubmit(false);
            }}
          >
            Log in
          </button>
        </section>
      ) : (
        <form className="register__form" onSubmit={handleSubmit}>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              name="TenDangNhap"
              value={formValue.TenDangNhap}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.TenDangNhap}</span>
          </section>
          <section className="register__form__field">
            <input
              type="password"
              placeholder="Mật khẩu"
              name="MatKhau"
              value={formValue.MatKhau}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.MatKhau}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Họ và Tên"
              name="HoTen"
              value={formValue.HoTen}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.HoTen}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Email"
              name="Email"
              value={formValue.Email}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.Email}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Số điện thoại"
              name="SDT"
              value={formValue.SDT}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.SDT}</span>
          </section>
          <section className="register__form__field">
            <select
              name="GioiTinh"
              value={formValue.GioiTinh}
              onChange={handleValidation}
            >
              <option value="Nam">Nam</option>
              <option value="Nu">Nữ</option>
            </select>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="CCCD"
              name="CCCD"
              value={formValue.CCCD}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.CCCD}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Đường"
              name="Duong"
              value={formValue.Duong}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.Duong}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Phường"
              name="Phuong"
              value={formValue.Phuong}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.Phuong}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Quận"
              name="Quan"
              value={formValue.Quan}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.Quan}</span>
          </section>
          <section className="register__form__field">
            <input
              type="text"
              placeholder="Thành phố"
              name="ThanhPho"
              value={formValue.ThanhPho}
              onChange={handleValidation}
            />
            <span className="register__error">{formError.ThanhPho}</span>
          </section>
          <button className="register__submit" type="submit">
            Đăng ký
          </button>
        </form>
      )}
    </motion.main>
  );
};

export default Register;
