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
import { toast } from "react-toastify";

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
  currentUser,
}) => {
  const [allMonThucDon, setAllMonThucDon] = useState([]);
  const [allExistingMon, setAllExistingMon] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemOffset + 5);
  const [currentProducts, setcurrentProducts] = useState(
    [...allMonThucDon].reverse().slice(itemOffset, endOffset)
  );
  const [originalProducts, setOriginalProducts] = useState([]);
  const [pageCountProducts, setpageCountProducts] = useState(
    Math.ceil(allMonThucDon.length / 5)
  );
  const [addNewProductModalWindow, setAddNewProductModalWindow] =
    useState(false);
  const [addExistingProductModalWindow, setAddExistingProductModalWindow] =
    useState(false);

  const findMenuItem2 = (e) => {
    const inputValue = e.target.value.toLowerCase();

    if (inputValue === "") {
      // Khôi phục danh sách gốc khi không có giá trị input
      setAllMonThucDon(originalProducts);
      return;
    }

    const filteredProducts = originalProducts.filter((product) =>
      product.TenMon.toLowerCase().includes(inputValue)
    );

    setAllMonThucDon(filteredProducts);
  };
  const userRole = currentUser.LoaiTaiKhoan;

  const activateAddNewProductModal = () => {
    setAddNewProductModalWindow(!addNewProductModalWindow);
  };
  const activateAddExistingProductModal = () => {
    setAddExistingProductModalWindow(!addExistingProductModalWindow);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % allMonThucDon.length;
    setItemOffset(newOffset);
    ResetLocation();
  };
  const handleAddExistingProduct = async (product) => {
    // Gọi API để thêm sản phẩm vào menu
    try {
      const response = await fetch("http://localhost:8081/api/v1/thucdon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ MaThucDon: 1, MaMon: product.MaMon }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to menu");
      }

      toast.success("Product added to menu successfully");

      getThucDonMon();
      // Đóng modal sau khi thêm sản phẩm
      setAddExistingProductModalWindow(false);
    } catch (error) {
      console.error("Error adding product to menu:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const handleUpdateProductStatus2 = async (MaMon, CoPhucVuKhong) => {
    try {
      // Đảm bảo giá trị CoPhucVuKhong chỉ nhận 0 hoặc 1
      const validValue = CoPhucVuKhong ? 1 : 0;

      const response = await fetch(
        `http://localhost:8081/api/v1/thucdon/1/${MaMon}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            CoPhucVuKhong: validValue,
            CoGiaoHangKhong: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update product status with MaMon: ${MaMon}`);
      }

      const data = await response.json();
      toast.success("Cập nhật trạng thái sản phẩm thành công");
      getThucDonMon();
      return data; // Trả về kết quả nếu cần xử lý tiếp
    } catch (error) {
      console.error("Error updating product status:", error.message);
    }
  };

  const resetPagination = () => {
    setItemOffset(0);
    setEndOffset(5);
  };
  const getThucDonMon = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/thucdon/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("accessToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get menu items");
      }
      const data = await response.json();
      setAllMonThucDon(data.data);
      setOriginalProducts(data.data);
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to get menu items, ${error.message}`);
    }
  };
  const getExistingMon = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/thucdon/1?exclude=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get menu items");
      }
      const data = await response.json();
      setAllExistingMon(data.data);
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to get menu items, ${error.message}`);
    }
  };
  useEffect(() => {
    getExistingMon();
    getThucDonMon();
  }, []);

  useEffect(() => {
    document.title = `${activeCategory} | Pizza Time`;
    setEndOffset(itemOffset + 5);
    setcurrentProducts(
      [...allMonThucDon].reverse().slice(itemOffset, endOffset)
    );
    setpageCountProducts(Math.ceil(allMonThucDon.length / 5));
  }, [allMonThucDon, setEndOffset, endOffset, itemOffset, activeCategory]);
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
        findMenuItem={findMenuItem2}
      />
      <article className="menu__items">
        {currentProducts.length === 0 ? (
          <p className="menu__not-found">No results found...</p>
        ) : (
          currentProducts.map((singleProduct) => (
            <MenuGridItem
              key={singleProduct.MaMon}
              singleProduct={singleProduct}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              handleUpdateProductStatus={handleUpdateProductStatus2}
              currentUser={currentUser}
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
              allProducts={allExistingMon} // Truyền allMonThucDon vào modal
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
