import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
} from "../Constants/productListConstant";
import axios from "axios";

const getListProduct = (a,b) => async (dispatch) => {
  try {
    console.log(a);
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products", {a,b});
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const getDetailProduct = (index) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const product = await axios.get("/api/products/" + index);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: product.data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

export { getListProduct, getDetailProduct };
