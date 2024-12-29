import React from "react";
//components
import ChangeItemQuantity from "./ChangeItemQuantity";

const CartItem = ({
  handleAddProduct,
  handleRemoveProduct,
  clearCart,
  cartItems,
  cartTotals,
}) => {
  return (
    <React.Fragment>
      {cartItems.map((cartItem, index) => {
        return (
          <section className="cart__items__single" key={index}>
            <img
              src={`/assets/mon/${cartItem.HinhAnh}`}
              alt={cartItem.TenMon}
            />
            <section className="cart__items__content">
              <section className="cart__items__info">
                <h3 className="cart__items__title">{cartItem.TenMon}, </h3>
              </section>

              <section className="cart__items__interaction">
                <ChangeItemQuantity
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  cartItem={cartItem}
                />

                <p className="cart__items__pricing">${cartItem.GiaHienTai}</p>
              </section>
            </section>
          </section>
        );
      })}
      {cartItems.length > 0 && (
        <button onClick={clearCart} className="cart__items__clear-btns">
          remove all items from the cart
        </button>
      )}
      {cartTotals}
    </React.Fragment>
  );
};

export default CartItem;
