import axios from "axios";
import Api from "../Global";
import loginUser from "../reducer/index";

// CART
export const TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ONE_FROM_CART: "REMOVE_ONE_FROM_CART",
  REMOVE_ALL_FROM_CART: "REMOVE_ALL_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

// HOME
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const FILTER_BY_ALPHABET = "FILTER_BY_ALPHABET";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const FILTER_ALL = "FILTER_ALL";
// USUARIOS
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_USER = "GET_USER"
export const EDIT_USER = "EDIT_USER"
// DETAILS
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
// DASHBOARD
export const GET_ALL_BOOKS_DASHBOARD = "GET_ALL_BOOKS_DASHBOARD";
export const ADD_NEW_BOOK = "ADD_NEW_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const EMPTY_MESSAGE = "EMPTY_MESSAGE";
// DASHBOARD FILTERS
export const FILTER_BY_ALPHABET_DASH = "FILTER_BY_ALPHABET_DASH";
export const FILTER_BY_PRICE_DASH = "FILTER_BY_PRICE_DASH";
export const SEARCH_BY_NAME_DASH = "SEARCH_BY_NAME_DASH";
export const FILTER_ALL_DASH = "FILTER_ALL_DASH";
// OTHERS
export const GET_ALL_AUTHORS = "GET_ALL_AUTHORS";
export const SEARCH_BY_AUTHOR = "SEARCH_BY_AUTHOR";
export const ADD_REVIEW = "ADD_REVIEW";
export const PUT_TOKEN = "PUT_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";
export const REPORT_REVIEW = "REPORT_REVIEW";
// AUTH
export const ASYNC_REGISTER_AUTH0 = "ASYNC_REGISTER_AUTH0";
export const ASYNC_LOGIN_AUTH0 = "ASYNC_LOGIN_AUTH0";

const url = Api.Url;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOME
// Obtener Libros HOME
export const getAllBooks = () => {
  return async function(dispatch) {
    try {
      fetch(url + "/book")
        .then((data) => data.json())
        .then((data) => dispatch({ type: GET_ALL_BOOKS, payload: data.book }));
    } catch {
      console.log("error");
    }
  };
};

// Filtrar por nombre
export const findBook = (name) => {
  return { type: SEARCH_BY_NAME, payload: name };
};

// Filtrar por alfabeto
export const filterByAlphabet = (typeAlphabet) => {
  return { type: FILTER_BY_ALPHABET, payload: typeAlphabet };
};

// Filtrar por precio
export const filterByPrice = (typePrice) => {
  return { type: FILTER_BY_PRICE, payload: typePrice };
};

// Filtros
export const filterAll = (category, editorial, author) => {
  return {
    type: FILTER_ALL,
    payload: {
      category,
      editorial,
      author,
    },
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DASHBOARD
// Obtener Libros DASHBOARD
export const getAllBooksDashboard = () => {
  return async function(dispatch) {
    try {
      fetch(url + "/book")
        .then((data) => data.json())
        .then((data) =>
          dispatch({ type: GET_ALL_BOOKS_DASHBOARD, payload: data.book })
        );
    } catch {
      console.log("error");
    }
  };
};

// Crear nuevo libro
export const addNewBook = (payload) => {
  return async function(dispatch) {
    try {
      const response = await fetch(url + "/book", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return dispatch({
        type: ADD_NEW_BOOK,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Editar Libro
export const editBook = (id, input) => async (dispatch) => {
  try {
    const response = await fetch(url + `/book/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: UPDATE_BOOK, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_BOOK, payload: error });
  }
};

// Vacíar mensaje
export const emptyMessage = () => {
  return { type: EMPTY_MESSAGE };
};

// Filtrar por nombre
export const findBookDash = (name) => {
  return { type: SEARCH_BY_NAME_DASH, payload: name };
};

// Filtrar por alfabeto
export const filterByAlphabetDash = (typeAlphabet) => {
  return { type: FILTER_BY_ALPHABET_DASH, payload: typeAlphabet };
};

// Filtrar por precio
export const filterByPriceDash = (typePrice) => {
  return { type: FILTER_BY_PRICE_DASH, payload: typePrice };
};

// Filtros
export const filterAllDash = (category, editorial, author, status) => {
  return {
    type: FILTER_ALL_DASH,
    payload: {
      category,
      editorial,
      author,
      status,
    },
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOOK DETAILS
// Obtener Detalle de Libros
export const getBookDetail = (id) => (dispatch) =>
  fetch(url + `/book/${id}`)
    .then((data) => data.json())
    .then((data) => dispatch({ type: GET_BOOK_DETAIL, payload: data }));

// Limpiar detalle de libros
export const cleanDetail = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_DETAIL,
    });
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// REVIEWS
// Añadir Review
export const addReview = (objeto) => (dispatch) => {
  fetch(url + "/resena", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(objeto),
  }).then((data) => dispatch({ type: ADD_REVIEW }));
};
//
// Agregar denuncia Review
export const reportReview = (id) => (dispatch) => {
  fetch(url + "/resena" + "/denuncias", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(id),
  }).then((data) => dispatch({ type: REPORT_REVIEW }));
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// OTHERS
// Obtener todos los autores
export const getAllAuthors = () => (dispatch) =>
  fetch(url + `/autores`)
    .then((data) => data.json())
    .then((data) => dispatch({ type: GET_ALL_AUTHORS, payload: data }));

export const putToken = (token) => {
  return { type: PUT_TOKEN, payload: token };
};

export const deletToken = () => {
  return { type: DELETE_TOKEN };
};

///////////////////////////////////////////////////////////////////////////////////////////////////
//USUARIOS 
  export const getAllUsers = () => (dispatch) => {
    fetch(url + "/users")
      .then((data) => data.json())
      .then((data) => dispatch({
        type: GET_ALL_USERS,
        payload: data
      }))
  }

  export const getUser = (id) => async (dispatch) => {
    try {
      const usuarios = await axios.get(url + `/users/${id}`, {
        headers: { token: localStorage.token },
      });
  
      return dispatch({
        type: GET_USER,
        payload: usuarios.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const config = {
        headers: {
          token: localStorage.token,
        },
      };
  
      const usuarios = await axios.put(
        url + `/users/${id}`,
        data,
        config
      );
  
      return dispatch({
        type: EDIT_USER,
        payload: usuarios.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTH0
// Postear usuario desde Auth0

export const asyncRegisterAuth0 = (body) => async (dispatch) => {
  console.log(body);
  const respuesta = await axios.post(url + "/auth/signin", body).data;
  console.log(respuesta.token);

  localStorage.setItem("token", respuesta.token);
  dispatch(loginUser(respuesta.data));

  dispatch({ type: ASYNC_REGISTER_AUTH0, payload: respuesta.token });
  // .then(
  //   respuesta.data
  //     ? localStorage.setItem("token", respuesta.data.token)
  //     : dispatch(asyncLoginAuth0(body)).then(
  //         respuesta.data
  //           ? dispatch(loginUser(respuesta.data))
  //           : dispatch(asyncLoginAuth0(body))
  //       )
  //console.log(respuesta)
  //)
  // .then((response) =>
  //   dispatch({ type: ASYNC_REGISTER_AUTH0, payload: response.data.token })
  // );
  // const respuesta = await fetch(
  //   (url + "/auth/signin",
  //   {
  //     method: "POST",
  //     body: JSON.stringify(body),
  //     headers: { "Content-Type": "application/json" },
  //   })
  // )
  // .then(
  //   response.body
  //     ? localStorage.setItem("token", response.body.token)
  //     : dispatch(asyncLoginAuth0(body))
  // )
  // .then((response) =>
  //   dispatch({ type: ASYNC_REGISTER_AUTH0, payload: response.data.token })
  // );
  // .then(console.log(respuesta));
};

//export const asyncLoginAuth0 = (body) => async (dispatch) => {
// try {
//   const respuesta = await axios
//     .post((url + "/auth/signin", body.email))
//     .then(localStorage.setItem("token", respuesta.data.token))
//     .then((response) =>
//       dispatch({ type: ASYNC_LOGIN_AUTH0, payload: response.data.token })
//     );
// } catch (error) {
//   console.log(error);
// }
//console.log("llegue");
//};
