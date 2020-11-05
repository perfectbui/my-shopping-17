import React, { useState } from "react";
import CheckoutStep from "../Component/CheckoutStep";
import { useSelector, useDispatch } from "react-redux";
import { shippingAction, removeShippingInfo } from "../Actions/cartAction";
function ShippingScreen(props) {
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signin);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (address && city && postalCode && country && userInfo) {
      await dispatch(shippingAction({ address, city, postalCode, country }));
      props.history.push("/payment");
    }
  };

  return (
    <div>
      <CheckoutStep step1 step2 />
      <div className="form-container">
        <li>
          <h3>Shipping</h3>
        </li>
        <li>
          <label>Address:</label>
          <input onChange={(event) => setAddress(event.target.value)}></input>
        </li>
        <li>
          <label>City:</label>
          <input onChange={(event) => setCity(event.target.value)}></input>
        </li>
        <li>
          <label>Postal Code:</label>
          <input
            onChange={(event) => setPostalCode(event.target.value)}
          ></input>
        </li>
        <li>
          <label>Country:</label>
          <input onChange={(event) => setCountry(event.target.value)}></input>
        </li>
        <button className="sign-in-btn" onClick={(e) => submitHandler(e)}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default ShippingScreen;
