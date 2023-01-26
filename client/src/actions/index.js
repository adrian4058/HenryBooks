const axios = require('axios')
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS'
export const GET_BOOK_DETAIL = 'GET_BOOK_DETAIL'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const FILTER_BY_AUTHOR = 'FILTER_BY_AUTHOR'
export const FILTER_BY_ALPHABET = 'FILTER_BY_ALPHABET'
export const FILTER_BY_PRICE = 'FILTER_BY_PRICE'
export const FILTER_BY_EDITORIAL = 'FILTER_BY_EDITORIAL'
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'
export const SEARCH_BY_AUTHOR = 'SEARCH_BY_AUTHOR'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const ADD_SHOPPING_CART = 'ADD_SHOPPING_CART'
export const REMOVE_SHOPPING_CART = 'REMOVE_SHOPPING_CART'
export const ADD_NEW_BOOK = 'ADD_NEW_BOOK'
export const DELETE_BOOK = 'DELETE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const ADD_REVIEW = 'ADD_REVIEW'

const url = 'http://localhost:3001'

export const getAllBooks = () => dispatch => fetch(url + '/book').then(data => data.json())
    .then(data => dispatch({ type: GET_ALL_BOOKS, payload: data.book }))


export const getBookDetail = (id) => dispatch => fetch(url + `/book/orden/${id}`).then(data => data.json())
    .then(data => dispatch({ type: GET_BOOK_DETAIL, payload: data }))


export const getAllAuthors = () => dispatch => fetch(url + `/autores`).then(data => data.json())
    .then(data => dispatch({ type: GET_ALL_AUTHORS, payload: data }))


export const cleanDetail = () => { return { type: CLEAN_DETAIL } }


export const addNewBook = (input) => (dispatch) => {
    axios.post(url + '/book', input).then(results => results.data)
        .then(data => dispatch({ type: ADD_NEW_BOOK, payload: data }))
        .catch(e => dispatch({ type: ADD_NEW_BOOK, payload: e.response.data }))
}


export const updateBook = (id, input) => dispatch => {
    axios.put(url + `/${id}`, input).then(results => results.data)
        .then(data => dispatch({ type: UPDATE_BOOK, payload: data }))
        .catch(data => dispatch({ type: UPDATE_BOOK, payload: data }))
}


export const filterByAlphabet = (typeAlphabet) => {
    return { type: FILTER_BY_ALPHABET, payload: typeAlphabet }
}

export const filterByPrice = (typePrice) => {
    return { type: FILTER_BY_PRICE, payload: typePrice }
}


export const filterByCategory = (category) => {
    return { type: FILTER_BY_CATEGORY, payload: category }
}

export const filterByEditorial = (editorial) => {
    return { type: FILTER_BY_EDITORIAL, payload: editorial }
}

export const filterByAuthor = (author) => ({
    type: FILTER_BY_AUTHOR, payload: author,
});

export const findBook = (name) => {
    return {type: SEARCH_BY_NAME, payload: name}
}

export const addReview = objeto =>  (dispatch) =>{
    axios.post(url+'/resena', objeto).then(results=> results.data)
    .then(data=> dispatch({type: ADD_REVIEW}))
}