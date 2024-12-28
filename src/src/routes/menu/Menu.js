import React from "react";
import MenuCategories from "./MenuCategories";
import ScrollButton from "../../helpers/ScrollBtn";
import MenuGridItem from "./MenuGridItem";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import { motion } from "framer-motion";
import "./menu.css";
import AddNewProductModal from "./AddNewProductModal";
import AddExistingProductModal from "./add-product/AddExistingProductModal";

const Menu = ({
  allProducts,
  activeCategory,
  allCategories,
  changeCategory,
  handleAddProduct,
  handleRemoveProduct,
  findMenuItem,
  handleAddNewProduct,
  handleUpdateProductStatus,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemOffset + 5);
  const [currentProducts, setcurrentProducts] = useState(
    [...allProducts].reverse().slice(itemOffset, endOffset)
  );
  const [pageCountProducts, setpageCountProducts] = useState(
    Math.ceil(allProducts.length / 5)
  );
  const [addNewProductModalWindow, setAddNewProductModalWindow] =
    useState(false);
  const [addExistingProductModalWindow, setAddExistingProductModalWindow] =
    useState(false);
  const userRole = JSON.parse(
    sessionStorage.getItem("currentUser")
  ).LoaiTaiKhoan;
  console.log("userRole" + userRole);

  const activateAddNewProductModal = () => {
    setAddNewProductModalWindow(!addNewProductModalWindow);
  };
  const activateAddExistingProductModal = () => {
    setAddExistingProductModalWindow(!addExistingProductModalWindow);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % allProducts.length;
    setItemOffset(newOffset);
    ResetLocation();
  };
  const handleAddExistingProduct = async (product) => {
    // Kiểm tra xem sản phẩm đã có trong currentProducts chưa
    const isProductAlreadyInMenu = currentProducts.some(
      (item) => item.id === product.id
    );
    console.log(isProductAlreadyInMenu);
    if (isProductAlreadyInMenu) {
      alert("This product is already in the menu.");
      return;
    }

    // // Gọi API để thêm sản phẩm vào menu
    // try {
    //   const response = await fetch("/api/add-product-to-menu", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ productId: product.id }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to add product to menu");
    //   }

    //   const updatedProduct = await response.json();

    //   // Sau khi API thêm sản phẩm thành công, cập nhật currentProducts
    //   setcurrentProducts((prevProducts) => {
    //     // Thêm sản phẩm mới vào đầu danh sách (hoặc có thể thêm vào cuối tùy nhu cầu)
    //     return [updatedProduct, ...prevProducts];
    //   });

    //   // Đóng modal sau khi thêm sản phẩm
    //   setAddExistingProductModalWindow(false);
    // } catch (error) {
    //   console.error("Error adding product to menu:", error);
    //   alert("An error occurred while adding the product.");
    // }
  };

  const resetPagination = () => {
    setItemOffset(0);
    setEndOffset(5);
  };
  useEffect(() => {
    document.title = `${activeCategory} | Pizza Time`;
    setEndOffset(itemOffset + 5);
    setcurrentProducts([...allProducts].reverse().slice(itemOffset, endOffset));
    setpageCountProducts(Math.ceil(allProducts.length / 5));
  }, [allProducts, setEndOffset, endOffset, itemOffset, activeCategory]);
  return (
    <motion.main
      className="menu"
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}
    >
      <MenuCategories
        activeCategory={activeCategory}
        allCategories={allCategories}
        changeCategory={changeCategory}
        resetPagination={resetPagination}
        findMenuItem={findMenuItem}
      />
      <article className="menu__items">
        {currentProducts.length === 0 ? (
          <p className="menu__not-found">No results found...</p>
        ) : (
          currentProducts.map((singleProduct) => (
            <MenuGridItem
              key={singleProduct.id}
              singleProduct={singleProduct}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              handleUpdateProductStatus={handleUpdateProductStatus}
            />
          ))
        )}
        <ScrollButton />

        {userRole === "NV" && (
          <>
            <AddNewProductModal
              addNewProductModalWindow={addNewProductModalWindow}
              setAddNewProductModalWindow={setAddNewProductModalWindow}
              handleAddNewProduct={handleAddNewProduct}
            />
            <AddExistingProductModal
              addExistingProductModalWindow={addExistingProductModalWindow}
              setAddExistingProductModalWindow={
                setAddExistingProductModalWindow
              }
              allProducts={allProducts} // Truyền allProducts vào modal
              handleAddExistingProduct={handleAddExistingProduct} // Hàm xử lý thêm sản phẩm vào menu
            />
          </>
        )}
        {userRole === "NV" && (
          <div>
            <button
              onClick={() => {
                ResetLocation();
                activateAddNewProductModal();
              }}
              className="passive-button-style floating-add-new-product"
            >
              +
            </button>
            <button
              onClick={() => {
                ResetLocation();
                activateAddExistingProductModal(); // Mở modal chọn sản phẩm có sẵn
              }}
              className="passive-button-style floating-add-existing-product"
            >
              Add Existing Product
            </button>
          </div>
        )}
      </article>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=" &#62;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCountProducts}
        previousLabel="&#60;"
        renderOnZeroPageCount={null}
      />
    </motion.main>
  );
};

export default Menu;
