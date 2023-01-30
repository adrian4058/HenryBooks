import {
    GET_ALL_BOOKS, GET_BOOK_DETAIL, CLEAN_DETAIL, FILTER_BY_PRICE, FILTER_BY_ALPHABET, FILTER_BY_CATEGORY, SEARCH_BY_AUTHOR, SEARCH_BY_NAME, ADD_SHOPPING_CART,
    REMOVE_SHOPPING_CART, ADD_NEW_BOOK, DELETE_BOOK, UPDATE_BOOK, FILTER_BY_EDITORIAL, GET_ALL_AUTHORS, FILTER_BY_AUTHOR, EMPTY_MESSAGE, GET_ALL_BOOKS_DASHBOARD
} from "../actions"


const initialState = {
    books: [],
    allBooks: [],
    booksDashboard: [],
    allBooksDashboard: [],
    allAuthors: [],
    author: [],
    detail: [],
    message: ""
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOOKS:
            const allActiveBooks = action.payload.filter(book => book.estado === "activo")
            return {
                ...state,
                books: allActiveBooks,
                allBooks: allActiveBooks
            }

        case GET_ALL_BOOKS_DASHBOARD: {
            return {
                ...state,
                booksDashboard: action.payload,
                allBooksDashboard: action.payload
            }
        }

        case GET_ALL_AUTHORS:
            return {
                ...state,
                allAuthors: action.payload
            }

        case GET_BOOK_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                detail: []
            }

        case ADD_NEW_BOOK:
            return {
                ...state,
                message: action.payload.message
            }

        case UPDATE_BOOK: {
            return {
                ...state,
                message: action.payload.message,
                allBooks: state.allBooks.map(book => (book.id === action.payload.id ? action.payload : book)),
            }
        }

        case EMPTY_MESSAGE: {
            return {
                ...state,
                message: ""
            }
        }

        case FILTER_BY_ALPHABET:
            switch (action.payload) {
                case "ASC":
                    let sortASC = state.books.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1
                        }
                        if (a.name > b.name) {
                            return 1
                        }
                        return 0
                    });
                    return {
                        ...state,
                        books: sortASC
                    }
                case "DESC":
                    let sortDESC = state.books.sort((a, b) => {
                        if (a.name < b.name) {
                            return 1
                        }
                        if (a.name > b.name) {
                            return -1
                        }
                        return 0
                    });
                    return {
                        ...state,
                        books: sortDESC
                    }
                default:
                    return state;
            }

        case FILTER_BY_PRICE:
            switch (action.payload) {
                case "ASC_PRICE":
                    let sortASC_PRICE = state.books.sort((a, b) => a.price - b.price);
                    return {
                        ...state,
                        books: sortASC_PRICE
                    }
                case "DESC_PRICE":
                    let sortDESC_PRICE = state.books.sort((a, b) => b.price - a.price);
                    return {
                        ...state,
                        books: sortDESC_PRICE
                    }
                default:
                    return state;
            }


        case FILTER_BY_CATEGORY:
            const allBooksCategory = state.books
            const filterBooksByCategory = action.payload === "All" ? allBooksCategory : allBooksCategory.filter(e => e.genero === action.payload)
            return {
                ...state,
                books: filterBooksByCategory
            }

        case FILTER_BY_EDITORIAL:
            const allBooksEditorial = state.books
            const filterBooksByEditorial = action.payload === "All" ? allBooksEditorial : allBooksEditorial.filter(e => e.editorial === action.payload)
            return {
                ...state,
                books: filterBooksByEditorial
            }

        case FILTER_BY_AUTHOR:
            const allBooksAuthor = state.books
            const filterBooksByAuthor = action.payload === "All" ? allBooksAuthor : allBooksAuthor.filter(e => e.Autor.nombre === action.payload)
            return {
                ...state,
                books: filterBooksByAuthor
            }

        case SEARCH_BY_NAME:
            const nombre = action.payload === "" ? state.allBooks :
                state.allBooks.filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                books: nombre
            }

        default:
            return state;
    }
}


export default rootReducer;

