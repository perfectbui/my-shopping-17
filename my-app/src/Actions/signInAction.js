import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
} from "../Constants/productListConstant";

const signInAction = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGN_IN_REQUEST });
    const { data } = await axios.post("/api/users/signin", { email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: SIGN_IN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGN_IN_FAIL, payload: error });
  }
};

export { signInAction };
