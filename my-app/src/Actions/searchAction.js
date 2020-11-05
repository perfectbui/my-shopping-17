import Axios from "axios";
import {
  SEARCH_REQUEST,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
} from "../Constants/productListConstant";
const searchAction = (character,index,num) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_REQUEST });
    if(character==="")  {
       const { data } = await Axios.post("/api/products/search",{index,num});
       dispatch({ type: SEARCH_SUCCESS, payload: data });
    }
    else{
       const { data } = await Axios.post("/api/products/search/"+character,{index,num});
       dispatch({ type: SEARCH_SUCCESS, payload: data });
    }
  
  } catch (error) {
    dispatch({ type: SEARCH_FAIL, payload: error.message });
  }
};

export { searchAction };
