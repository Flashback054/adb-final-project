import React from "react";

const AddToCartButton = ({
  singleProduct,
  selectedAttributes,
  handleAddProduct,
  targetAttribute,
  setTargetAttribute,
}) => {
  console.log("singleProduct.CoPhucVuKhong", singleProduct.CoPhucVuKhong);
  return (
    <button
      onClick={() => {
        handleAddProduct(singleProduct, selectedAttributes);
        setTargetAttribute(false);
      }}
      className={`passive-button-style ${
        singleProduct.CoPhucVuKhong
          ? "active-add-to-cart"
          : "inactive-add-to-cart"
      }`}
      disabled={singleProduct.CoPhucVuKhong ? false : true}
    >
      Add to cart
    </button>
  );
};
export default AddToCartButton;
