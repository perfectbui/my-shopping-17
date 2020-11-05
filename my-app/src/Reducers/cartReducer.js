import {
  REMOVE_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_ITEM,
  SHIPPING_INFO,
  PAYMENT_INFO,
  REMOVE_PAYMENT_INFO,
  REMOVE_SHIPPING_INFO,
} from "../Constants/productListConstant";
const cartReducer = (
  state = { cartItems: [], shippingInfo: {}, paymentInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find((x) => x._id === item._id);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x._id === product._id ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case SHIPPING_INFO:
      return { ...state, shippingInfo: action.payload };
    case PAYMENT_INFO:
      return { ...state, paymentInfo: action.payload };
    case REMOVE_PAYMENT_INFO:
      return { paymentInfo: null };
    case REMOVE_SHIPPING_INFO:
      return { shippingInfo: null };
    case REMOVE_CART_ITEMS:
      return { cartItems: [] };
    default:
      return state;
  }
};

export { cartReducer };
