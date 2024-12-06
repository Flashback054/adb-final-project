import React from "react";
import { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import ResetLocation from "../../helpers/ResetLocation";
import { Link, useNavigate } from "react-router-dom";

const CheckoutForm = ({
  currentUser,
  totalPayment,
  productsQuantity,
  taxes,
}) => {
  const [formValue, setFormValue] = useState({
    fullname: currentUser.fullname,
    email: currentUser.email,
    address: currentUser.address,
    number: currentUser.number,
    chooseDelivery: "",
    promoCode: "",
  });
  const [formValueAdmin, setFormValueAdmin] = useState({
    fullname: "",
    email: "",
    address: "",
    number: "",
    chooseDelivery: "",
    promoCode: "",
  });
  const [submit, setSubmit] = useState(false);
  const [promoCode, setPromoCode] = useState(false);
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const togglePromocode = () => {
    setPromoCode(!promoCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validateForm(formValue));
    setSubmit(true);
    ResetLocation();
  };
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
    if (!value.chooseDelivery) {
      errors.chooseDelivery = "Please choose a delivery type";
    }
    if (!value.promoCode && promoCode) {
      errors.promoCode = "Please indicate your promo code";
    }
    if (value.promoCode && value.promoCode.length < 5 && promoCode) {
      errors.promoCode = "Invalid promo code!";
    }
    if (currentUser.address === null && value.chooseDelivery === "delivery") {
      errors.address = "Please add your address";
    }
    if (currentUser.number === null) {
      errors.number = "Please add your number";
    }

    return errors;
  };

  return (
    <section className="checkout__form">
      <form onSubmit={handleSubmit}>
        <h3>Delivery details</h3>
        <label
          htmlFor="takeaway"
          className="checkout__form__takeaway"
          name="chooseDelivery"
        >
          <RiShoppingBagLine />
          Takeaway
          <input
            type="radio"
            placeholder="Address"
            value="takeaway"
            name="chooseDelivery"
            onChange={handleValidation}
          />
        </label>
        <label
          htmlFor="delivery"
          className="checkout__form__delivery"
          name="chooseDelivery"
        >
          <FaShippingFast />
          Delivery
          <input
            type="radio"
            placeholder="Address"
            value="delivery"
            name="chooseDelivery"
            onChange={handleValidation}
          />
        </label>
        <span className="checkout__form__error">
          {formError.chooseDelivery}
        </span>
        <section className="checkout__form-promo-code">
          {promoCode === false ? (
            <p onClick={togglePromocode}>I have a promo code!</p>
          ) : (
            <React.Fragment>
              <p onClick={togglePromocode}>No promo code</p>
              <input
                name="promoCode"
                className=" pop-font"
                type="text"
                placeholder="Enter the 5-digit code"
                onChange={handleValidation}
                value={formValue.promoCode}
              />
            </React.Fragment>
          )}
          <span className="checkout__form__error">{formError.promoCode}</span>
        </section>
        {currentUser.role !== "admin" ? (
          <>
            <h3>
              Personal information{" "}
              <span>
                <Link onClick={ResetLocation} to="/profile">
                  Edit profile
                </Link>
              </span>
            </h3>
            <section>
              <p>{currentUser.fullname}</p>
              <p>{currentUser.email}</p>
              {currentUser.address !== null ? (
                <p>Address: {currentUser.address}</p>
              ) : (
                <p className="checkout__form__address">
                  You haven't added address yet
                  <span>
                    <Link onClick={ResetLocation} to="/profile">
                      Add address
                    </Link>
                  </span>
                </p>
              )}
              <span className="checkout__form__error">{formError.address}</span>
              {currentUser.number !== null ? (
                <p>Contact number: {currentUser.number}</p>
              ) : (
                <p className="checkout__form__number">
                  Please add you contact number
                  <span>
                    <Link onClick={ResetLocation} to="/profile">
                      Add number
                    </Link>
                  </span>
                </p>
              )}
              <span className="checkout__form__error">{formError.number}</span>
            </section>
          </>
        ) : (
          <>
            <h3>Admin Information Form</h3>
            <form onSubmit={handleSubmit} className="checkout__form-admin">
              <label htmlFor="fullname">
                Full Name:
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formValueAdmin.fullname}
                  onChange={handleValidation}
                  required
                />
              </label>
              <span className="checkout__form__error">
                {formValueAdmin.fullname}
              </span>

              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValueAdmin.email}
                  onChange={handleValidation}
                  required
                />
              </label>
              <span className="checkout__form__error">{formError.email}</span>

              <label htmlFor="number">
                Phone Number:
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formValueAdmin.number}
                  onChange={handleValidation}
                  required
                />
              </label>
              <span className="checkout__form__error">{formError.number}</span>

              <label htmlFor="tableNumber">
                Table Number:
                <select
                  id="tableNumber"
                  name="tableNumber"
                  value={formValueAdmin.tableNumber}
                  onChange={handleValidation}
                  required
                >
                  <option value="" disabled>
                    Select a table number
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </label>
              <span className="checkout__form__error">
                {formError.tableNumber}
              </span>

              {formValue.chooseDelivery === "delivery" && (
                <label htmlFor="address">
                  Delivery Address:
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formValueAdmin.address}
                    onChange={handleValidation}
                  />
                </label>
              )}
            </form>
          </>
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
        <button type="submit" className="active-button-style">
          Proceed to payment
        </button>
      </form>
    </section>
  );
};

export default CheckoutForm;
