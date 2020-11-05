import axios from "axios";
import {
  REMOVE_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_ITEM,
  SHIPPING_INFO,
  PAYMENT_INFO,
  REMOVE_SHIPPING_INFO,
  REMOVE_PAYMENT_INFO,
} from "../Constants/productListConstant";

const cartAction = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + id);
    await dispatch({
      type: ADD_TO_CART,
      payload: {
        _id: id,
        name: data.name,
        brand: data.brand,
        price: data.price,
        rating: data.rating,
        image: data.image,
        count: data.count,
        qty,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log("Get data from server failed");
  }
};

const removeItem = (id) => (dispatch, getState) => {
  console.log(id);
  try {
    dispatch({ type: REMOVE_ITEM, payload: id });
    const {
      cart: { cartItems },
    } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log("Remove item failed");
  }
};

const shippingAction = (shipInfo) => (dispatch, getState) => {
  try {
    dispatch({ type: SHIPPING_INFO, payload: shipInfo });
    const {
      cart: { shippingInfo },
    } = getState();
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
  } catch (error) {
    console.log("shipping action failed");
  }
};

const removeShippingInfo = () => (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_SHIPPING_INFO });
    const {
      cart: { shippingInfo },
    } = getState();
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
  } catch (error) {
    console.log("remove shipping info failed");
  }
};

const paymentAction = (paymentInf) => (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_INFO, payload: paymentInf });
    const {
      cart: { paymentInfo },
    } = getState();
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
  } catch (error) {
    console.log("payment action failed");
  }
};

const removePaymentInfo = () => (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_PAYMENT_INFO });
    const {
      cart: { paymentInfo },
    } = getState();
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
  } catch (error) {
    console.log("remove payment info failed");
  }
};

const removeCartItems = () => (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_CART_ITEMS });
    localStorage.setItem("cartItems", JSON.stringify(null));
  } catch (error) {
    console.log("Delete CartItems failed");
  }
};

export {
  cartAction,
  removeItem,
  shippingAction,
  removePaymentInfo,
  paymentAction,
  removeShippingInfo,
  removeCartItems,
};
