import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/AddToCartButton";
import Attribute from "./Attribute";
import ResetLocation from "../../helpers/ResetLocation";

const MenuGridItem = ({
  singleProduct,
  handleAddProduct,
  handleRemoveProduct,
  handleUpdateProductStatus,
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [targetAttribute, setTargetAttribute] = useState("");

  const isStock = singleProduct.isStock;
  const userRole = JSON.parse(
    sessionStorage.getItem("currentUser")
  ).LoaiTaiKhoan;

  const handleToggleStock = () => {
    const updatedStock = !singleProduct.isStock;
    handleUpdateProductStatus(singleProduct.id, updatedStock);
  };

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

  return (
    <article className="menu-item txt-white">
      {userRole === "NV" && (
        <div
          className={`stock-status ${isStock ? "in-stock" : "out-of-stock"}`}
        >
          {isStock ? "Còn Hàng" : "Hết hàng"}
        </div>
      )}

      <Link
        onClick={ResetLocation}
        to={`/menu/${singleProduct.id}`}
        className="menu-item__link"
      >
        <img src={singleProduct.ItemImg} alt={`${singleProduct.ItemName}`} />
      </Link>
      <h3>{singleProduct.ItemName}</h3>
      <div className="menu-item__pricing">
        <p className="menu-item__pricing-curr">
          <span>$</span>
          {singleProduct.ItemPrice}
        </p>
        <AddToCartButton
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          singleProduct={singleProduct}
          selectedAttributes={selectedAttributes}
          targetAttribute={targetAttribute}
          setTargetAttribute={setTargetAttribute}
        />
      </div>

      {/* Add click event to toggle stock status */}
      {userRole === "NV" && (
        <button onClick={handleToggleStock} className="toggle-stock-btn">
          {isStock ? "Mark as Out of Stock" : "Restock"}
        </button>
      )}
    </article>
  );
};

export default MenuGridItem;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import AddToCartButton from "../cart/AddToCartButton";
// import Attribute from "./Attribute";
// import ResetLocation from "../../helpers/ResetLocation";

// const MenuGridItem = ({
//   singleProduct,
//   handleAddProduct,
//   handleRemoveProduct,
//   handleUpdateProductStatus,
// }) => {
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [targetAttribute, setTargetAttribute] = useState("");

//   const isStock = singleProduct.isStock;
//   const userRole = JSON.parse(
//     sessionStorage.getItem("currentUser")
//   ).LoaiTaiKhoan;

//   const handleToggleStock = () => {
//     const updatedStock = !singleProduct.isStock;
//     handleUpdateProductStatus(singleProduct.MaMon, updatedStock);
//   };

//   const handleSelectedAttributes = (attributeId, attributeValue) => {
//     setTargetAttribute(attributeValue);
//     const newSelectedAttribute = { attributeId, attributeValue };
//     setSelectedAttributes((prevAttributes) => {
//       const existingAttributeIndex = prevAttributes.findIndex(
//         (attribute) =>
//           attribute.attributeId === newSelectedAttribute.attributeId
//       );
//       if (existingAttributeIndex !== -1) {
//         const updatedAttributes = [...prevAttributes];
//         updatedAttributes[existingAttributeIndex] = { ...newSelectedAttribute };
//         return updatedAttributes;
//       } else {
//         return [...prevAttributes, newSelectedAttribute];
//       }
//     });
//   };

//   return (
//     <article className="menu-item txt-white">
//       {userRole === "NV" && (
//         <div
//           className={`stock-status ${isStock ? "in-stock" : "out-of-stock"}`}
//         >
//           {isStock ? "Còn Hàng" : "Hết hàng"}
//         </div>
//       )}

//       <Link
//         onClick={ResetLocation}
//         to={`/menu/${singleProduct.MaMon}`}
//         className="menu-item__link"
//       >
//         <img src={singleProduct.HinhAnh} alt={`${singleProduct.TenMon}`} />
//       </Link>
//       <h3>{singleProduct.TenMon}</h3>

//       <div className="menu-item__pricing">
//           <p className="menu-item__pricing-curr">
//             <span>$</span>
//             {singleProduct.GiaHienTai}
//           </p>
//         <AddToCartButton
//           handleAddProduct={handleAddProduct}
//           handleRemoveProduct={handleRemoveProduct}
//           singleProduct={singleProduct}
//           selectedAttributes={selectedAttributes}
//           targetAttribute={targetAttribute}
//           setTargetAttribute={setTargetAttribute}
//         />
//       </div>

//       {/* Add click event to toggle stock status */}
//       {userRole === "NV" && (
//         <button onClick={handleToggleStock} className="toggle-stock-btn">
//           {isStock ? "Mark as Out of Stock" : "Restock"}
//         </button>
//       )}
//     </article>
//   );
// };

// export default MenuGridItem;
