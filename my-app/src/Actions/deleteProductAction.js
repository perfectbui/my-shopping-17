import Axios from "axios";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
} from "../Constants/productListConstant";
const deleteProductAction = (id) => async (dispatch, getState) => {
  const {
    signin: { userInfo },
  } = getState();
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const { data } = await Axios.delete("/api/products/" + id, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { deleteProductAction };
