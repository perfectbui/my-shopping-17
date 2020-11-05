import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
} from "../Constants/productListConstant";
import {
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_SUCCESS,
} from "../Constants/productListConstant";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  REVIEW_SUCCESS,
  REVIEW_FAIL,
  REVIEW_REQUEST,
} from "../Constants/productListConstant";
import {
  SEARCH_REQUEST,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
} from "../Constants/productListConstant";
const productListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const productDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const productSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        saveSuccess: true,
        product: action.payload,
      };
    case PRODUCT_SAVE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const saveReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_REQUEST:
      return { loading: true };
    case REVIEW_SUCCESS:
      return { successSaveReview: true };
    case REVIEW_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true,
        product: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        loading: false,
        searchSuccess: true,
        productSearch: action.payload,
      };
    case SEARCH_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {
  productListReducer,
  productDetailReducer,
  productSaveReducer,
  deleteProductReducer,
  saveReviewReducer,
  searchReducer,
};
