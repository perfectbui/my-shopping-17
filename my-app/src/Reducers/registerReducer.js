import {
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../Constants/productListConstant";
const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case REGISTER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { registerReducer };
