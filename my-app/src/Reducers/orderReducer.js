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

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { loading: true };
    case ORDER_SUCCESS:
      return {
        successOrder: true,
        orderData: action.payload,
      };
    case ORDER_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

const detailOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_ORDER_REQUEST:
      return { loading: true };
    case DETAIL_ORDER_SUCCESS:
      return {
        successDetailOrder: true,
        detailOrderData: action.payload,
      };
    case DETAIL_ORDER_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export { orderReducer, detailOrderReducer };
