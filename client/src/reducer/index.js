import {
  PUT_TOKEN,
  DELETE_TOKEN,
  GET_ALL_BOOKS,
  GET_BOOK_DETAIL,
  CLEAN_DETAIL,
  FILTER_BY_PRICE,
  FILTER_BY_ALPHABET,
  SEARCH_BY_NAME,
  ADD_NEW_BOOK,
  UPDATE_BOOK,
  GET_ALL_AUTHORS,
  EMPTY_MESSAGE,
  GET_ALL_BOOKS_DASHBOARD,
  FILTER_ALL,
  FILTER_BY_ALPHABET_DASH,
  FILTER_BY_PRICE_DASH,
  SEARCH_BY_NAME_DASH,
  FILTER_ALL_DASH,
  TYPES,
  ASYNC_REGISTER_AUTH0,
  ASYNC_LOGIN_AUTH0,
  LLENAR_DATOS,
  VACIAR_DATOS,
  GET_ALL_USERS,
  GET_USER,
  EDIT_USER,
  REPORT_REVIEW,
  CLEAN_REVIEW,
} from "../actions";

const initialState = {
  books: [],
  cart: [],
  allBooks: [],
  allBooksSlider: [],
  booksDashboard: [],
  allBooksDashboard: [],
  allAuthors: [],
  author: [],
  detail: [],
  user: [],
  allUsers: [],
  message: "",
  token: "",
  reviews: {},

  userProfile: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //CART
    case TYPES.ADD_TO_CART: {
      let newItem = state.books.find((book) => book.id === action.payload); //por payload mando el id del libro
      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    // HOME
    // Obtener Libros HOME
    case GET_ALL_BOOKS:
      const allActiveBooks = action.payload.filter(
        (book) => book.estado === "activo"
      );
      return {
        ...state,
        books: allActiveBooks,
        allBooks: allActiveBooks,
      };

    // Filtros HOME
    case FILTER_ALL:
      let filteredBooks = state.allBooks;
      if (action.payload.category !== "All") {
        filteredBooks = filteredBooks.filter(
          (e) => e.genero === action.payload.category
        );
      }
      if (action.payload.editorial !== "All") {
        filteredBooks = filteredBooks.filter(
          (e) => e.editorial === action.payload.editorial
        );
      }
      if (action.payload.author !== "All") {
        filteredBooks = filteredBooks.filter(
          (e) => e.Autor.nombre === action.payload.author
        );
      }
      return {
        ...state,
        books: filteredBooks,
      };

    // Buscar por nombre de libro HOME
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

    // Filtrar por alfabeto en HOME
    case FILTER_BY_ALPHABET:
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
        default:
          return state;
      }

    // Filtrar por precio en HOME
    case FILTER_BY_PRICE:
      switch (action.payload) {
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BOOKS DETAILS
    // Obtener Detalles de Libros
    case GET_BOOK_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    // Limpiar el detalle
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: [],
      };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //colocar token
    case PUT_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    // quitar token
    case DELETE_TOKEN:
      return {
        ...state,
        token: "",
      };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // DASHBOARD
    // Obtener Libros Dashboard
    case GET_ALL_BOOKS_DASHBOARD: {
      return {
        ...state,
        booksDashboard: action.payload,
        allBooksDashboard: action.payload,
      };
    }

    // Añadir libro nuevo
    case ADD_NEW_BOOK:
      return {
        ...state,
        message: action.payload.message,
      };

    // Editar libros
    case UPDATE_BOOK: {
      return {
        ...state,
        message: action.payload.message,
        allBooks: state.allBooks.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    }

    // Vacíar array Message
    case EMPTY_MESSAGE: {
      return {
        ...state,
        message: "",
      };
    }

    // Filtros DASH
    case FILTER_ALL_DASH:
      let filteredBooksDash = state.allBooksDashboard;
      if (action.payload.category !== "All") {
        filteredBooksDash = filteredBooksDash.filter(
          (e) => e.genero === action.payload.category
        );
      }
      if (action.payload.editorial !== "All") {
        filteredBooksDash = filteredBooksDash.filter(
          (e) => e.editorial === action.payload.editorial
        );
      }
      if (action.payload.author !== "All") {
        filteredBooksDash = filteredBooksDash.filter(
          (e) => e.Autor.nombre === action.payload.author
        );
      }
      if (action.payload.status !== "All") {
        filteredBooksDash = filteredBooksDash.filter(
          (e) => e.estado === action.payload.status
        );
      }
      return {
        ...state,
        booksDashboard: filteredBooksDash,
      };

    // Buscar por nombre de libro DASH
    case SEARCH_BY_NAME_DASH:
      const nombreDash =
        action.payload === ""
          ? state.allBooksDashboard
          : state.allBooksDashboard.filter((e) =>
              e.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        booksDashboard: nombreDash,
      };

    // Filtrar por alfabeto en DASH
    case FILTER_BY_ALPHABET_DASH:
      switch (action.payload) {
        case "ASC":
          let dashSortASC = state.booksDashboard.sort((a, b) => {
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
            booksDashboard: dashSortASC,
          };
        case "DESC":
          let dashSortDESC = state.booksDashboard.sort((a, b) => {
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
            booksDashboard: dashSortDESC,
          };
        default:
          return state;
      }

    // Filtrar por precio en DASH
    case FILTER_BY_PRICE_DASH:
      switch (action.payload) {
        case "ASC_PRICE":
          let sortASC_PRICE = state.booksDashboard.sort(
            (a, b) => a.price - b.price
          );
          return {
            ...state,
            booksDashboard: sortASC_PRICE,
          };
        case "DESC_PRICE":
          let sortDESC_PRICE = state.booksDashboard.sort(
            (a, b) => b.price - a.price
          );
          return {
            ...state,
            booksDashboard: sortDESC_PRICE,
          };
        default:
          return state;
      }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Obtener lista de autores
    case GET_ALL_AUTHORS:
      return {
        ...state,
        allAuthors: action.payload,
      };

    //////////////////////////////////////////////////////////////////////////////////
    // USUARIOS

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.data, //fijar
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case EDIT_USER:
      return {
        ...state,
        userProfile: action.payload,
      };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Obtener auth de usuario
    case ASYNC_REGISTER_AUTH0 || ASYNC_LOGIN_AUTH0:
      return {
        ...state,
        userProfile: {
          nombre: action.payload.nombre || "matias",
          email: action.payload.email || "matiasacosta25@gmail.com",
          //rol: action.payload.rol || "user",
          //img: action.payload.profilePic,
          //authzero: action.payload.authzero,
        },
      };
    case REPORT_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };
    case CLEAN_REVIEW:
      return {
        ...state,
        reviews: {},
      };
    case LLENAR_DATOS:
      return {
        ...state,
        userProfile: action.payload,
      };
    case VACIAR_DATOS:
      return {
        ...state,
        userProfile: {},
      };
    default:
      return state;
  }
}

export default rootReducer;
