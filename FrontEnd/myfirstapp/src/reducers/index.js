import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import personReducer from "./personReducer";
import securityReducer from "./securityReducer";
import collectionsReducer from "./collectionsReducer";
import bookReducer from "./bookReducer";

export default combineReducers({
  errors: errorReducer,
  person: personReducer,
  security: securityReducer,
  book: bookReducer,
  collection: collectionsReducer
});

