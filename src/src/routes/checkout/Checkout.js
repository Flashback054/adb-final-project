import React from "react";
import { v4 as uuidv4 } from "uuid";
//components
import CheckoutForm from "./CheckoutForm.js";
import EmptyCart from "../cart/EmptyCart.js";
import "./checkout.css";
import CheckoutItem from "./CheckoutItem.js";
import TableOrder from "../table-order/TableOrder.js";
const Checkout = ({
  cartItems,
  productsQuantity,
  totalPayment,
  taxes,
  currentUser,
}) => {
  return (
    <main className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <article className="checkout__inner">
            {cartItems.map((cartItem) => (
              <CheckoutItem key={uuidv4()} cartItem={cartItem} />
            ))}{" "}
            {productsQuantity > 0 && (
              <section className="checkout__totals">
                <section className="checkout__totals__content">
                  <h4>Tax 10%:</h4>
                  <p>{taxes} VNĐ</p>
                </section>
                <section className="checkout__totals__content">
                  <h4>Quantity:</h4>
                  <p> {productsQuantity}</p>
                </section>
                <section className="checkout__totals__content">
                  <h4>Total:</h4>
                  <p>{totalPayment} VNĐ</p>
                </section>
              </section>
            )}
          </article>
          <TableOrder
            currentUser={currentUser}
            productsQuantity={productsQuantity}
            totalPayment={totalPayment}
            taxes={taxes}
            delivery={false}
            cartItems={cartItems}
          />
        </>
      )}
    </main>
  );
};

export default Checkout;
