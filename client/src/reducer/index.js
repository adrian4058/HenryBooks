import {
  GET_ALL_BOOKS,
  GET_BOOK_DETAIL,
  CLEAN_DETAIL,
  SORT_OF_LIST,
  FILTER_BY_CATEGORY,
  SEARCH_BY_AUTHOR,
  SEARCH_BY_NAME,
  ADD_SHOPPING_CART,
  REMOVE_SHOPPING_CART,
  ADD_NEW_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
} from "../actions";

const initialState = {
  books: [],
  allBooks: [],
  allAuthors: [],
  author: [],
  detail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        allBooks: action.payload,
      };

    case GET_BOOK_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
      };

    case ADD_NEW_BOOK:
      return {
        ...state,
      };

    case SORT_OF_LIST:
      switch (action.payload) {
        case "ASC":
          let sortASC = state.books.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return {
            ...state,
            books: sortASC,
          };
        case "DESC":
          let sortDESC = state.books.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
          return {
            ...state,
            books: sortDESC,
          };
        case "ASC_PRICE":
          let sortASC_PRICE = state.books.sort((a, b) => a.price - b.price);
          return {
            ...state,
            books: sortASC_PRICE,
          };
        case "DESC_PRICE":
          let sortDESC_PRICE = state.books.sort((a, b) => b.price - a.price);
          return {
            ...state,
            books: sortDESC_PRICE,
          };
        default:
          return state;
      }

    case FILTER_BY_CATEGORY:
      const allBooks = state.allBooks;
      const filterBooks =
        action.payload === "All"
          ? allBooks
          : allBooks.filter((e) => e.genero === action.payload);
      return {
        ...state,
        books: filterBooks,
      };

    case SEARCH_BY_NAME:
      const nombre =
        action.payload === ""
          ? state.allBooks
          : state.allBooks.filter((e) =>
              e.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        books: nombre,
      };

    default:
      return state;
  }
}

export default rootReducer;
