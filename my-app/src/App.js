import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import SignInScreen from "./Screens/SignInScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import FindScreen from "./Screens/FindScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "./Actions/logOutAction";
import {
  removePaymentInfo,
  removeShippingInfo,
  removeCartItems,
} from "./Actions/cartAction";
import { searchAction } from "./Actions/searchAction";

function App(props) {
  const { userInfo } = useSelector((state) => state.signin);
  const { cartItems } = useSelector((state) => state.cart);
  const { productSearch } = useSelector((state) => state.search);
  const [tableSearch, setTableSearch] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  const mainProduct=["Điện thoại","Laptop","Máy ảnh","Tivi","Máy giặt","Tủ lạnh","Máy lạnh","Nồi cơm điện","Xe máy","Tình dục"]
  const dispatch = useDispatch();

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setTableSearch(true);
    setItemSearch(e.target.value);
    dispatch(searchAction(e.target.value,0,50));
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
    dispatch(removePaymentInfo());
    dispatch(removeShippingInfo());
    dispatch(removeCartItems());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button className="btn-show-menu" onClick={openMenu}/>
            <Link to="/">Shopping</Link>
          </div>
          <div
            className="search-product"
            onClick={() => setTableSearch(true)}
            onMouseLeave={() => setTableSearch(false)}
          >
            <div className="result-search">
              <input
                type="text"
                placeholder="SEARCH YOUR PRODUCT"
                onChange={(e) => searchHandler(e)}
              />
              {productSearch && tableSearch === true ? (
                <div className="table-search">
                  {productSearch.map((item) => (
                    <li key={item._id}>
                      <Link to={"/product/" + item._id}>{item.name}</Link>
                    </li>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <Link
              className="button-to-search"
              to={"/find/" + itemSearch}
            ></Link>
          </div>
          <div className="header-links">
            {cartItems.length > 0 ? (
              <div className="num-item">{cartItems.length}</div>
            ) : (
              ""
            )}
            <Link to="/cart" className="cart-btn">
              Cart
            </Link>
            {userInfo ? (
              <div>
                <Link to={"/order/" + userInfo.email}>{userInfo.name}</Link>
                <button onClick={(e) => handleLogOut(e)}>
                  <Link to="/" className="btn-log-out">
                    Log Out
                  </Link>
                </button>
              </div>
            ) : (
              <div>
                <Link to="/signin">Sign in</Link>
              </div>
            )}
            {userInfo && userInfo.isAdmin ? (
              <div>
                <Link to="/products">ADMIN</Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping</h3>
          <button onClick={closeMenu} className="button-close-menu"/>
          <div className="main-product">
                {mainProduct.map(product=><Link onClick={closeMenu} to={"/find/"+product}>{product}</Link>)}
          </div>
        </aside>

        <div className="introduce">
          <div className="intro-img1"></div>
          <div className="intro-img2"></div>
          <div className="intro-img3"></div>
        </div>

        <main className="main">
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/order/:email" component={ProfileScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route path="/cart" component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/find/:character" component={FindScreen} />
        </main>

        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
