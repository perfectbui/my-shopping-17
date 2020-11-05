import React, { useState, useEffect } from "react";
import CheckoutStep from "../Component/CheckoutStep";
import { paymentAction } from "../Actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Component/Rating";

export default function PaymentScreen(props) {
  const [methodPayment, setMethodPayment] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (methodPayment && shippingInfo) {
      dispatch(paymentAction(methodPayment));
      props.history.push("/placeorder");
    }
  };
  console.log(cartItems);
  return (
    <div>
      <CheckoutStep step1 step2 step3 />
      <div className="form-container payment">
        <li>
          <h3>PAYMENT</h3>
        </li>
        <li>
          <label>Paypal</label>
          <input
            type="radio"
            name="payment"
            value="paypal"
            onChange={(e) => setMethodPayment(e.target.value)}
          ></input>
        </li>
        <li>
          <label>Napas</label>
          <input
            type="radio"
            name="payment"
            value="napas"
            onChange={(e) => setMethodPayment(e.target.value)}
          ></input>
        </li>
        <li>
          <label>Momo</label>
          <input
            type="radio"
            name="payment"
            value="momo"
            onChange={(e) => setMethodPayment(e.target.value)}
          ></input>
        </li>
        <button className="sign-in-btn" onClick={(e) => submitHandler(e)}>
          Continue
        </button>
      </div>
    </div>
  );
}
