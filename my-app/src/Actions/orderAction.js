import Axios from "axios";

import {
  ORDER_REQUEST,
  ORDER_FAIL,
  ORDER_SUCCESS,
} from "../Constants/productListConstant";
import {
  DETAIL_ORDER_REQUEST,
  DETAIL_ORDER_SUCCESS,
  DETAIL_ORDER_FAIL,
} from "../Constants/productListConstant";

const orderAction = (dataOrder) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const { data } = await Axios.post("/api/users/order", dataOrder);
    dispatch({ type: ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.message });
    console.log("order action failed");
  }
};

const detaiOrderAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_ORDER_REQUEST });
    const { data } = await Axios.get("/api/order/" + email);
    dispatch({ type: DETAIL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_ORDER_FAIL, payload: error.message });
    console.log("detail order failed");
  }
};

export { orderAction, detaiOrderAction };
