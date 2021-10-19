import { GET_COLLECTION, GET_SHOPPING_CART } from "../actions/types";

const initialState = {
    list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTION:
        return {
            ...state,
            list: action.payload
        }

    case GET_SHOPPING_CART:
        return {
            ...state,
            list: action.payload
        }

    default:
      return state;
  }
}
