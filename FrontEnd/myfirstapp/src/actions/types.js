export const CONN_BASE_URL = 'http://localhost:8080/api';
// real routes, but using later after everyting done
export const USER_CONN_BASE_URL = 'http://localhost:8080/api/users';
export const BOOK_CONN_BASE_URL = 'http://localhost:8081/api/books';
export const SHOP_CONN_BASE_URL = 'http://localhost:8082/api/shop';
export const MSGS_CONN_BASE_URL = 'http://localhost:8083/api/notifications';
export const COLL_CONN_BASE_URL = 'http://localhost:8084/api/collection';

// common
export const GET_ERRORS = "GET_ERRORS";
export const SUCCESS = 'SUCCESS';

// user
export const GET_USER = "GET_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// book
export const GET_BOOK_DETAILS = 'GET_BOOK_DETAILS';

// shop
export const GET_SHOP = "GET_SHOP";

// notification / msgs
export const GET_USER_NOTIFICATION = 'GET_USER_NOTIFICATION';
export const GET_UNREAD = 'GET_UNREAD';

// collections
export const GET_SHOPPING_CART = 'GET_SHOPPING_CART';
export const GET_COLLECTION = 'GET_COLLECTION';