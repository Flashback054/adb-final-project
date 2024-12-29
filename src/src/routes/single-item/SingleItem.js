import React, { useEffect, useState } from "react";
import AddToCartButton from "../cart/AddToCartButton.js";
import Attribute from "../menu/Attribute.js";
import { allProductsData } from "../../data/AllProductsData.js";
import { Link } from "react-router-dom";
import "./single-item.css";
const SingleItem = ({ handleAddProduct, handleRemoveProduct }) => {
  const [singleProduct, setSingleProduct] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [targetAttribute, setTargetAttribute] = useState("");

  const handleSelectedAttributes = (attributeId, attributeValue) => {
    setTargetAttribute(attributeValue);
    const newSelectedAttribute = { attributeId, attributeValue };
    setSelectedAttributes((prevAttributes) => {
      const existingAttributeIndex = prevAttributes.findIndex(
        (attribute) =>
          attribute.attributeId === newSelectedAttribute.attributeId
      );
      if (existingAttributeIndex !== -1) {
        const updatedAttributes = [...prevAttributes];
        updatedAttributes[existingAttributeIndex] = { ...newSelectedAttribute };
        return updatedAttributes;
      } else {
        return [...prevAttributes, newSelectedAttribute];
      }
    });
  };
  const callAPIGetMon = async (maMo) => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/mon/" + maMo, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSingleProduct(data.data);
    } catch (error) {
      console.log("callAPIGetMon error:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    callAPIGetMon(window.location.pathname.toString().substring(6));

    document.title = `${singleProduct.TenMon}| Pizza Time`;
  }, [singleProduct.TenMon]);

  return (
    <main className="single-item">
      <Link to="/menu" className="single-item__back">
        ← Back
      </Link>
      <article className="single-item__inner flex-container flex-column txt-white">
        <img
          src={`/assets/mon/${singleProduct?.HinhAnh}`}
          alt={`${singleProduct?.TenMon}`}
        />
        <section className="single-item__info">
          <section className="single-item__title">
            <h2>{singleProduct?.TenMon}</h2>
            <p>{singleProduct?.MoTa}</p>
          </section>
          <section className="single-item__pricing">
            <p className="single-item__pricing-curr">
              <span>$</span>
              {singleProduct.GiaHienTai}
            </p>
            {/* <AddToCartButton
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              singleProduct={singleProduct}
              selectedAttributes={selectedAttributes}
              targetAttribute={targetAttribute}
              setTargetAttribute={setTargetAttribute}
            /> */}
          </section>
        </section>
      </article>
    </main>
  );
};

export default SingleItem;
