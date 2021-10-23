import { GET_BOOK_DETAILS } from "../actions/types";

const initialState = {
    products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_DETAILS:
        return {
            ...state,
            products: action.payload
        }

    default:
      return state;
  }
}