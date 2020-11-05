import React, { useEffect, useState } from "react";
import { detaiOrderAction } from "../Actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
export default function ProfileScreen(props) {
  const dispatch = useDispatch();
  const { detailOrderData } = useSelector((state) => state.detailOrder);
  useEffect(() => {
    const _email = props.match.params.email;
    console.log(_email);
    dispatch(detaiOrderAction(_email));
    return () => {};
  }, []);

  return (
    <div className="profile">
      <div className="header-profile">
        <h1>MY ORDER LIST</h1>
      </div>
      {detailOrderData
        ? detailOrderData.map((detailOrder, id) => (
            <li className="order-container" key={id}>
              <div className="time-order">
                <h3>TIME</h3>
                <p>{detailOrder.time}</p>
              </div>
              <div className="order-shipping">
                <h3>SHIPPING</h3>
                <p>
                  {detailOrder.shipping.address}, {detailOrder.shipping.city},{" "}
                  {detailOrder.shipping.postalCode},{" "}
                  {detailOrder.shipping.country}
                </p>
              </div>
              <div className="order-payment">
                <h3>PAYMENT</h3>
                <p>{detailOrder.payment.paymentMethod}</p>
              </div>
              <h3>PRODUCT</h3>
              {detailOrder
                ? detailOrder.item.map((item) => (
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
                : ""}
              <h3>SUBTOTAL</h3>
              <div className="order-subtotal">
                
                {detailOrder.item.reduce(
                  (initialNum, item) => initialNum + item.qty * item.price,
                  0
                )}đ
              </div>
            </li>
          ))
        : ""}
    </div>
  );
}
