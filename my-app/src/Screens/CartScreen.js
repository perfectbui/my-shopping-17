import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, removeItem } from "../Actions/cartAction";

function CartScreen(props) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.signin);
  const handleProceedToCheckOut = () => {
    if (cartItems.length > 0) {
      if (userInfo) {
        props.history.push("/shipping");
      } else {
        props.history.push("/signin");
      }
    }
  };

  const handleRemoveItem = (e, id) => {
    e.preventDefault();
    dispatch(removeItem(id));
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <div className="header-cart">
          <div>
            <h1>SHOPPING CART</h1>
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
              <div className="img-qty">
                Quantity:
                <select
                  onChange={(event) =>
                    dispatch(cartAction(item._id, event.target.value))
                  }
                >
                  <option>{item.qty}</option>
                  {[...Array(parseInt(item.count)).keys()].map((x) =>
                    x + 1 !== item.qty ? (
                      <option key={x + 1}>{x + 1}</option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              </div>
              <div className="img-price">{item.price}đ</div>
              <button
                className="delete-but"
                onClick={(e) => handleRemoveItem(e, item._id)}
              ></button>
            </div>
          ))
        ) : (
          <div>EMPTYYYYYYYYYYYY</div>
        )}
      </div>

      <div className="cart-action">
        <div className="sub-total">
          Subtotal{" "}(
          {cartItems.reduce(
            (initialNum, item) => initialNum + Number(item.qty),
            0
          )}{" "}
          items) : 
          {cartItems.reduce(
            (initialNum, item) => initialNum + item.qty * item.price,
            0
          )}đ
        </div>
        <button className="proceed-but" onClick={handleProceedToCheckOut}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
