import Axios from "axios";
import {
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_SUCCESS,
  REVIEW_SUCCESS,
  REVIEW_FAIL,
  REVIEW_REQUEST,
} from "../Constants/productListConstant.js";
const saveProductAction = (product) => async (dispatch, getState) => {
  const {
    signin: { userInfo },
  } = getState();
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { data } = await Axios.post("/api/products", product, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const saveReviewAction = (reviewData) => async (dispatch, getState) => {
  const {
    signin: { userInfo },
  } = getState();
  try {
    dispatch({ type: REVIEW_REQUEST });
    const url = "/api/products/" + reviewData._id + "/reviews";
    console.log(url);
    const { data } = await Axios.post(url, reviewData, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REVIEW_FAIL, payload: error.message });
  }
};

export { saveProductAction, saveReviewAction };
