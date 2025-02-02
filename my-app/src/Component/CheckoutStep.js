import React from "react";

export default function CheckoutStep(props) {
  return (
    <div className="checkout-step">
      <div className={props.step1 ? "active" : ""}>Sign In</div>
      <div className={props.step2 ? "active" : ""}>Shipping</div>
      <div className={props.step3 ? "active" : ""}>Payment</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}
