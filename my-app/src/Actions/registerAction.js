import Axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../Constants/productListConstant";

const registerAction = (name, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.message });
  }
};

export { registerAction };
