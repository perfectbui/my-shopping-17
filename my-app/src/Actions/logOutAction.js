import { LOG_OUT } from "../Constants/productListConstant";

const logOutAction = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
  localStorage.setItem("userInfo", JSON.stringify(null));
};

export { logOutAction };
