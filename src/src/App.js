import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import { toast, ToastContainer } from "react-toastify";
import {
  About,
  Blog,
  Cart,
  Checkout,
  Contact,
  Homepage,
  Menu,
  Payment,
  Register,
  SingleItem,
  TableOrder,
} from "./routes/index";
import { allProductsData as allProductsDataF } from "./data/AllProductsData.js";
import { AllCategories } from "./data/AllCategories.js";
// import CheckoutSummary from './routes/checkout/CheckoutSummary.js';
import CartTotals from "./routes/cart/CartTotals.js";
import LoginModal from "./components/login/LoginModal.js";
import CartItem from "./routes/cart/CartItem.js";
import NotFound from "./routes/not-found/NotFound.js";
import Refunds from "./routes/refunds/Refunds.js";
import Terms from "./routes/terms/Terms.js";
import Privacy from "./routes/privacy/Privacy.js";
import Careers from "./routes/careers/Careers.js";
import BlogPost from "./routes/blog-post/BlogPost.js";
import Profile from "./routes/profile/Profile.js";
import ResetLocation from "./helpers/ResetLocation.js";
import Statistics from "./routes/statistic/statistics.js";
import RevenueStatistic from "./routes/statistic/revenue/revenue.js";
import DishesStatistic from "./routes/statistic/dishes/dishes.js";
import Customers from "./routes/statistic/customer/customers.js";
import Branch from "./routes/branch/branch.js";
import Review from "./routes/review/review.js";
import OrderList from "./routes/order-list/order-list.js";

function App() {
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Menu");
  const [cartItems, setCartItems] = useState([]);
  const [clearedCart, setClearedCart] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [validLogin, setValidLogin] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [loginModalWindow, setLoginModalWindow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allProductsData, setAllProductsData] = useState(allProductsDataF);

  // Wrapping WebSocket creation to log usage
  const OriginalWebSocket = WebSocket;
  window.WebSocket = function (...args) {
    console.log("WebSocket created with args:", args);
    return new OriginalWebSocket(...args);
  };
  // const getUser = async (id) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`);
  //     const body = await response.json();
  //     setCurrentUser(body.data[0]);
  //     const jsonUser = JSON.stringify(body.data[0]);
  //     sessionStorage.setItem("currentUser", jsonUser);
  //     if (response.status === 200) {
  //       return true;
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     return false;
  //   }
  // };

  // const updateUser = async (id, user) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });

  //     if (response.status === 200) {
  //       const update = await getUser(id);
  //       if (update) {
  //         return true;
  //       }
  //       return true;
  //     } else {
  //       console.log("Update failed with status:", response.status);
  //       return false;
  //     }
  //   } catch (err) {
  //     console.log("Fetch error:", err.message);
  //     return false;
  //   }
  // };

  const getUser = async (token) => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.data);
        const jsonUser = JSON.stringify(data.data);
        sessionStorage.setItem("currentUser", jsonUser);
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to get user profile, ${error.message}`);
    }
  };

  useEffect(() => {
    getUser(localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    if (validLogin && sessionStorage.getItem("validLogin") === null) {
      sessionStorage.setItem("validLogin", true);
    }
    if (sessionStorage.getItem("validLogin") !== null) {
      setValidLogin(sessionStorage.getItem("validLogin"));
    }
  }, [validLogin]);

  const activateLoginModal = () => {
    hideMenu();
    setLoginModalWindow(!loginModalWindow);
  };

  const handleLogout = async () => {
    const response = await fetch(
      "http://localhost:8081/api/v1" + "/auth/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      toast.success("Đăng xuất thành công");
    }

    localStorage.clear();
    setValidLogin(false);
    hideMenu();
    setCurrentUser({});
    ResetLocation();
    setCartItems([]);
    setProductsQuantity(0);
    sessionStorage.clear();
  };

  const findMenuItem = (e) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    const collectData = allProductsData.filter((product) =>
      product.ItemName.toLowerCase().includes(inputValue)
    );

    if (collectData.length > 0) {
      setAllProducts(collectData);
    } else {
      setAllProducts([]);
    }
  };

  const showModal = () => {
    setIsModalActive(!isModalActive);
  };
  const hideMenu = () => {
    setIsModalActive(false);
  };

  const getAllCategories = async () => {
    setAllCategories(AllCategories);
  };

  const getAllProducts = () => {
    setAllProducts(allProductsData);
  };
  // CART LOGIC
  /*******************************************************/

  const CheckRepeatableProducts = (
    cartItems,
    targetProduct,
    userSelectedAttributes
  ) => {
    let item;
    let productsById = cartItems.filter(
      (item) => item.MaMon === targetProduct.MaMon
    );
    productsById.forEach((targetItem) => {
      if (MatchingAttributes(userSelectedAttributes, targetItem)) {
        item = targetItem;
      }
      if (userSelectedAttributes.length === 0) {
        item = targetItem;
      }
    });

    return item;
  };

  const MatchingAttributes = (userSelectedAttributes, targetProduct) => {
    const attributesMatch = (groupOne, groupTwo) => {
      return Object.values(groupOne)[1] === Object.values(groupTwo)[1];
    };

    let truthyValuesCounter = 0;
    let i = 0;
    while (i < userSelectedAttributes.length) {
      if (
        attributesMatch(
          userSelectedAttributes[i],
          targetProduct?.userSelectedAttributes[i]
        )
      ) {
        truthyValuesCounter += 1;
      }
      i += 1;
    }

    return truthyValuesCounter === userSelectedAttributes?.length;
  };

  const updateCartQuantity = (
    actionToPerfrom,
    productAlreadyInCart,
    userSelectedAttributes
  ) => {
    const repeatableProduct = CheckRepeatableProducts(
      cartItems,
      productAlreadyInCart,
      userSelectedAttributes
    );
    const indexOfRepeatableProduct = cartItems.indexOf(repeatableProduct);

    const currentProductList = [...cartItems];
    if (actionToPerfrom === "addProduct") {
      currentProductList[indexOfRepeatableProduct].quantity += 1;
    } else {
      currentProductList[indexOfRepeatableProduct].quantity -= 1;
    }

    return currentProductList;
  };
  const handleAddProduct = (targetProduct, userSelectedAttributes) => {
    const productAlreadyInCart = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );

    let currentCartItems = [...cartItems];
    let newQuantity;
    //if product doesn't exists yet
    if (productAlreadyInCart === undefined) {
      const itemToAdd = targetProduct;

      newQuantity = 1;

      currentCartItems.push({
        ...itemToAdd,
        userSelectedAttributes,
        quantity: newQuantity,
      });
    }
    //if product already exists
    else {
      let index;
      //if there are no attributes find index by id
      if (userSelectedAttributes.length === 0) {
        index = cartItems.findIndex(
          (item) => item.MaMon === targetProduct.MaMon
        );
      }

      //if there are attributes find index by attributes and id at the same time
      else {
        index = cartItems.findIndex(
          (item) =>
            item.userSelectedAttributes[0]?.attributeValue ===
              userSelectedAttributes[0].attributeValue &&
            item.MaMon === targetProduct.MaMon
        );
      }
      if (index !== -1) {
        newQuantity = cartItems[index].quantity;

        currentCartItems[index] = {
          ...cartItems[index],
          quantity: newQuantity + 1,
        };
      }
    }

    const totalCartQuantity = currentCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const jsonUser = JSON.stringify(currentCartItems);
    sessionStorage.setItem("cartItems", jsonUser);
    setCartItems(currentCartItems);
    sessionStorage.setItem("cartQuantity", totalCartQuantity);
    setProductsQuantity(totalCartQuantity);
    successMsg();
  };

  useEffect(() => {
    if (sessionStorage.getItem("cartItems") !== null) {
      const jsonCartItems = sessionStorage.getItem("cartItems");
      const cartItems = JSON.parse(jsonCartItems);
      setCartItems(cartItems);
    }
    if (sessionStorage.getItem("cartQuantity") !== null) {
      setProductsQuantity(sessionStorage.getItem("cartQuantity"));
    }
  }, []);

  const handleRemoveProduct = (targetProduct, userSelectedAttributes) => {
    let updatedProductList;
    let repeatableProduct = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );

    if (repeatableProduct.quantity > 1) {
      updatedProductList = updateCartQuantity(
        "removeProduct",
        repeatableProduct,
        userSelectedAttributes
      );
    } else {
      const products = [...cartItems];
      const indexOfProduct = products.indexOf(repeatableProduct);
      products.splice(indexOfProduct, 1);
      updatedProductList = products;
    }

    setCartItems(updatedProductList);
    const jsonUser = JSON.stringify(updatedProductList);
    sessionStorage.setItem("cartItems", jsonUser);

    if (updatedProductList.length <= 1) {
      setProductsQuantity(updatedProductList[0]?.quantity || 0);
    } else {
      const productListArray = updatedProductList.map((item) => item.quantity);
      const sum = productListArray.reduce((a, b) => a + b, 0);
      sessionStorage.setItem("cartQuantity", sum);
      setProductsQuantity(sum);
    }

    if (updatedProductList.length === 0) {
      sessionStorage.setItem("cartQuantity", 0);
      setProductsQuantity(0);
    }
  };

  const handleAddNewProduct = (newProduct) => {
    changeCategory(newProduct.Category);
    const updatedProductList = [...allProductsData, newProduct];
    setAllProductsData(updatedProductList);
  };

  const handleUpdateProductStatus = (productId, newStatus) => {
    setAllProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              isStock: newStatus,
            }
          : product
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setProductsQuantity(0);
    setClearedCart(true);
    sessionStorage.removeItem("cartItems");
    sessionStorage.removeItem("cartQuantity");
    ResetLocation();
  };

  const getTotalPrice = (cartItems) => {
    let total = cartItems.reduce((prevState, currentItem) => {
      const singleItemQuantity = currentItem.GiaHienTai * currentItem.quantity;
      return prevState + singleItemQuantity;
    }, 0);
    setTotalPayment(total);
    setTaxes((total * 10) / 100);
  };

  const successMsg = () => {
    const alertMessage = document.querySelector(".success");
    alertMessage.classList.add("visible");
    setTimeout(() => {
      alertMessage.classList.remove("visible");
    }, 1000);
  };

  // Other
  /*******************************************************/
  const getProductsByCategory = (category) => {
    let separateCategoriesByname = [];
    //Separate arrays by category names
    const separateCategories = allProductsData.reduce(function (
      singleCategory,
      singleItem
    ) {
      separateCategoriesByname = Object.keys(singleCategory);

      if (!singleCategory[singleItem.Category])
        singleCategory[singleItem.Category] = singleItem;
      else
        singleCategory[singleItem.Category] = Array.isArray(
          singleCategory[singleItem.Category]
        )
          ? singleCategory[singleItem.Category].concat(singleItem)
          : [singleCategory[singleItem.Category]].concat(singleItem);
      return singleCategory;
    },
    {});

    const result = Object.keys(separateCategories).map(
      (e) => separateCategories[e]
    );

    let singleCategoryArray = [];
    result.map((categories) => {
      return singleCategoryArray.push(categories);
    });
    //Change products by category
    separateCategoriesByname.forEach((cate) => {
      if (cate === category) {
        return setAllProducts(separateCategories[category]);
      }
      if (category === "Menu") {
        return setAllProducts(allProductsData);
      }
    });
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getProductsByCategory(activeCategory);
    getTotalPrice(cartItems);
  }, [activeCategory, cartItems]);

  const changeCategory = (newCategory) => {
    setActiveCategory(newCategory);
    getProductsByCategory(newCategory);
  };

  return (
    <BrowserRouter>
      <Header
        loginModal={
          <LoginModal
            validLogin={validLogin}
            setValidLogin={setValidLogin}
            setLoginModalWindow={setLoginModalWindow}
            loginModalWindow={loginModalWindow}
            hideMenu={hideMenu}
            setCurrentUser={setCurrentUser}
          />
        }
        activateLoginModal={activateLoginModal}
        showModal={showModal}
        isModalActive={isModalActive}
        hideMenu={hideMenu}
        handleLogout={handleLogout}
        validLogin={validLogin}
        productsQuantity={productsQuantity}
        currentUser={currentUser}
      />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/cart"
          element={
            <Cart
              CartItem={
                <CartItem
                  clearCart={clearCart}
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  cartTotals={
                    <CartTotals
                      className="cart-totals"
                      totalPayment={totalPayment}
                      productsQuantity={productsQuantity}
                      taxes={taxes}
                      validLogin={validLogin}
                      showModal={showModal}
                      isModalActive={isModalActive}
                      activateLoginModal={activateLoginModal}
                    />
                  }
                />
              }
              cartItems={cartItems}
              clearedCart={clearedCart}
            />
          }
        />

        <Route
          exact
          path="/menu"
          element={
            <Menu
              findMenuItem={findMenuItem}
              allProducts={allProducts}
              allCategories={allCategories}
              changeCategory={changeCategory}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              activeCategory={activeCategory}
              handleAddNewProduct={handleAddNewProduct}
              handleUpdateProductStatus={handleUpdateProductStatus}
            />
          }
        />
        <Route
          path="/menu/:name"
          element={
            <SingleItem
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
            />
          }
        />
        <Route path="/branches" element={<Branch />} />
        <Route path="/review" element={<Review />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route path="/blog/:name" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/register"
          element={
            validLogin ? (
              <NotFound />
            ) : (
              <Register activateLoginModal={activateLoginModal} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            !validLogin ? (
              <NotFound />
            ) : (
              <Profile currentUser={currentUser} handleLogout={handleLogout} />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              // checkoutSummary={
              //   <CheckoutSummary
              //     cartItems={cartItems}
              //     handleAddProduct={handleAddProduct}
              //     handleRemoveProduct={handleRemoveProduct}
              //   />
              // }
              totalPayment={totalPayment}
              cartItems={cartItems}
              productsQuantity={productsQuantity}
              taxes={taxes}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment
              cartItems={cartItems}
              totalPayment={totalPayment}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/table-order"
          element={
            <TableOrder
              currentUser={currentUser}
              cartItems={cartItems}
              CartItem={
                <CartItem
                  clearCart={clearCart}
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  cartTotals={
                    <CartTotals
                      className="cart-totals"
                      totalPayment={totalPayment}
                      productsQuantity={productsQuantity}
                      taxes={taxes}
                      validLogin={validLogin}
                      showModal={showModal}
                      isModalActive={isModalActive}
                      activateLoginModal={activateLoginModal}
                    />
                  }
                />
              }
            />
          }
        />
        {currentUser.LoaiTaiKhoan !== "KH" && (
          <Route path="/statistics" element={<Statistics />} />
        )}
        {currentUser.LoaiTaiKhoan !== "KH" && (
          <Route path="/statistics/revenue" element={<RevenueStatistic />} />
        )}
        {currentUser.LoaiTaiKhoan !== "KH" && (
          <Route path="/statistics/dishes" element={<DishesStatistic />} />
        )}
        {currentUser.LoaiTaiKhoan !== "KH" && (
          <Route path="/statistics/customers" element={<Customers />} />
        )}
        {currentUser.LoaiTaiKhoan !== "KH" && (
          <Route path="/order-list" element={<OrderList />} />
        )}
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
