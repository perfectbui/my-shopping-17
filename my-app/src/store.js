import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailReducer,
  searchReducer,
} from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { signInReducer } from "./Reducers/signInReducer";
import {
  productSaveReducer,
  deleteProductReducer,
  saveReviewReducer,
} from "./Reducers/productReducer";
import { registerReducer } from "./Reducers/registerReducer";
import { orderReducer, detailOrderReducer } from "./Reducers/orderReducer";
import thunk from "redux-thunk";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo")) || null;
const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || null;
const initialState = {
  cart: { cartItems, paymentInfo, shippingInfo },
  signin: { userInfo },
};
console.log(cartItems);

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  signin: signInReducer,
  register: registerReducer,
  productSave: productSaveReducer,
  deleteProduct: deleteProductReducer,
  saveReview: saveReviewReducer,
  saveOrder: orderReducer,
  detailOrder: detailOrderReducer,
  search: searchReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
