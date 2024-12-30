import React from "react";
import { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { RiContactsBookLine, RiShoppingBagLine } from "react-icons/ri";
import { FaSign } from "react-icons/fa";
import ResetLocation from "../../helpers/ResetLocation";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import TableOrder from "../table-order/TableOrder";
const CheckoutForm = ({
  currentUser,
  totalPayment,
  productsQuantity,
  taxes,
}) => {
  return (
    <section className="checkout__form">
      <motion.main
        className="table-order"
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 1 }}
      >
        <TableOrder />
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
      </motion.main>
    </section>
  );
};

export default CheckoutForm;
