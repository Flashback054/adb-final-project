import React from "react";
import "./AddExistingProductModal.css";

const AddExistingProductModal = ({
  addExistingProductModalWindow,
  setAddExistingProductModalWindow,
  allProducts,
  handleAddExistingProduct,
}) => {
  return (
    <div
      className={`modal ${addExistingProductModalWindow ? "open" : "closed"}`}
      onClick={() => setAddExistingProductModalWindow(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select Products to Add</h2>
        <ul>
          {allProducts.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-item__info">
                <img
                  src={product.ItemImg}
                  alt={product.name}
                  style={{ width: "100px", height: "auto" }}
                />
                <span>{product.ItemName}</span>
              </div>
              <button
                onClick={() => handleAddExistingProduct(product)}
                className="add-button"
              >
                Add to Menu
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setAddExistingProductModalWindow(false)}
          className="close-modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddExistingProductModal;