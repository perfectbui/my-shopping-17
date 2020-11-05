import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  LOG_OUT,
} from "../Constants/productListConstant";
const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {};
    case SIGN_IN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case SIGN_IN_FAIL:
      return {
        loading: true,
      };
    case LOG_OUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

export { signInReducer };
