import React, { useEffect, useState } from "react";

const CheckoutItem = ({ cartItem }) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  useEffect(() => {
    cartItem.userSelectedAttributes.map((item) => {
      return setSelectedAttributes(item.attributeValue);
    });
  }, [cartItem.userSelectedAttributes]);

  return (
    <section className="checkout__item">
      <img src={`/assets/mon/${cartItem.HinhAnh}`} alt={cartItem.TenMon} />
      <section className="checkout__item__info">
        {cartItem.userSelectedAttributes.length === 0 ? (
          <h3>{cartItem.TenMon}</h3>
        ) : (
          <h3>
            {cartItem.TenMon} <span>{selectedAttributes}</span>
          </h3>
        )}
        <p>Quantity: {cartItem.quantity}</p>
        <p>Price: {cartItem.GiaHienTai} VNĐ </p>
      </section>
    </section>
  );
};

export default CheckoutItem;
