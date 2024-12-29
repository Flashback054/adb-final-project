import React, { useState } from "react";
import "./loginModal.css";
import LinkButton from "../Button";
import { useNavigate } from "react-router-dom";
import validateForm from "../validateForm";
import { FaTrophy } from "react-icons/fa";

const LoginModal = ({
  setLoginModalWindow,
  setValidLogin,
  loginModalWindow,
  hideMenu,
  validLogin,
  getUser,
}) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ TenDangNhap: "", MatKhau: "" });
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const validate = validateForm("login");

  const callAPILogin = async (payload) => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1" + "/auth/login",
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
      console.log("callAPILogin error:", err.message);
      throw err;
    }
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const hideLoginModal = () => {
    setLoginModalWindow(false);
    setFormValue({ TenDangNhap: "", MatKhau: "" });
    setFormError({});
    setSubmit(false);
  };

  const handleLogin = async (e) => {
    setVerificationError("");
    e.preventDefault();
    setLoading(true);

    //find all users
    try {
      const loginResult = await callAPILogin(formValue);

      if (loginResult.status === "success") {
        const accessToken = loginResult.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setLoading(false);
        hideLoginModal();
        setFormValue({ TenDangNhap: "", MatKhau: "" });
        setFormError({});
        setVerificationError("");
        setValidLogin(true);
        navigate("/menu");
      } else {
        setVerificationError("Invalid credentials");
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
      setVerificationError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <article className={`modal ${loginModalWindow ? "active-modal" : null}`}>
      <section className="modal__inner">
        <button
          className="modal__inner__close"
          type="button"
          onClick={() => {
            hideLoginModal();
          }}
        >
          X
        </button>
        <section className="modal__content">
          <h2>Log in</h2>
          {loading ? (
            <div role="status" className="loader">
              <p>Almost there...</p>
              <img
                alt="Processing request"
                src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              />
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              {verificationError.length === 0 ? null : (
                <p className="modal__form__error">{verificationError}</p>
              )}
              <input
                onChange={handleValidation}
                value={formValue.TenDangNhap}
                name="TenDangNhap"
                type="text"
                placeholder="TenDangNhap"
              />
              <span className="modal__form__error">
                {formError.TenDangNhap}
              </span>
              <input
                onChange={handleValidation}
                value={formValue.MatKhau}
                name="MatKhau"
                type="password"
                autoComplete="true"
                placeholder="MatKhau"
              />
              <span className="modal__form__error">{formError.MatKhau}</span>
              {submit && Object.keys(formError).length === 0 && !validLogin ? (
                <p className="modal__form__error">
                  We couldn't find an account. Try another credentials
                </p>
              ) : null}
              <section className="modal__buttons">
                <LinkButton
                  onClick={() => {
                    hideLoginModal();
                    hideMenu();
                  }}
                  to="/register"
                  className="modal__buttons__signup"
                >
                  Sign up
                </LinkButton>
                <button type="submit" className="modal__buttons__login">
                  Log in
                </button>
              </section>
            </form>
          )}
        </section>
      </section>
    </article>
  );
};

export default LoginModal;
