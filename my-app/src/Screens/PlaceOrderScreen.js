import CheckoutStep from "../Component/CheckoutStep";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from "../Actions/orderAction";
import { removeCartItems } from "../Actions/cartAction";

export default function PlaceOrder(props) {
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { paymentInfo } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.signin);
  const { orderData } = useSelector((state) => state.saveOrder);
  const dispatch = useDispatch();
  console.log(cartItems);
  const submitDoneHandler = (e) => {
    e.preventDefault();
    if (shippingInfo && cartItems && paymentInfo && userInfo) {
      const userInfor = { name: userInfo.name, email: userInfo.email };
      const cartItemsInfo = [];
      for (let i = 0; i < cartItems.length; i++) {
        let item = {
          name: cartItems[i].name,
          brand: cartItems[i].brand,
          price: cartItems[i].price,
          qty: cartItems[i].qty,
          image: cartItems[i].image,
        };
        cartItemsInfo.push(item);
      }
      const paymentInfor = { paymentMethod: paymentInfo };
      dispatch(
        orderAction({ shippingInfo, cartItemsInfo, paymentInfor, userInfor })
      );
      dispatch(removeCartItems());
      alert("Order successful!");
      props.history.push("/");
    }
  };

  console.log(shippingInfo);
  return (
    <div>
      {paymentInfo && shippingInfo && cartItems ? (
        <div className="place-order-container">
          <CheckoutStep step1 step2 step3 step4 />
          <div className="shipping-info">
            <h2>SHIPPING</h2>
            <p>
              {shippingInfo.address}, {shippingInfo.city},{" "}
              {shippingInfo.postalCode}, {shippingInfo.country}
            </p>
          </div>
          <div className="payment-info">
            <h2>PAYMENT</h2>
            <p>{paymentInfo}</p>
          </div>
          <div className="cart">
            <div className="cart-list">
              <div className="header-cart">
                <div>
                  <h1>YOUR CART</h1>
                </div>
              </div>
              {cartItems ? (
                cartItems.map((item) => (
                  <div className="item-detail" key={item._id}>
                    <div className="img-item">
                      <img src={item.image} alt="item" />
                    </div>
                    <div className="img-name">{item.name}</div>
                    <div className="img-brand">{item.brand}</div>
                    <div className="img-qty">Quantity:{item.qty}</div>
                    <div className="img-price">{item.price}đ</div>
                  </div>
                ))
              ) : (
                <div>EMPTYYYYYYYYYYYY</div>
              )}
            </div>

            <div className="cart-action">
              <div className="sub-total">
                Subtotal (
                {cartItems
                  ? cartItems.reduce(
                      (initialNum, item) => initialNum + Number(item.qty),
                      0
                    )
                  : "0"}{" "}
                items) : 
                {cartItems.reduce(
                  (initialNum, item) => initialNum + item.qty * item.price,
                  0
                )}đ
              </div>
              <button
                className="proceed-but"
                onClick={(e) => submitDoneHandler(e)}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
