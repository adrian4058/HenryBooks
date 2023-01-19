import { GET_ALL_BOOKS, GET_BOOK_DETAIL, CLEAN_DETAIL, SORT_OF_LIST, FILTER_BY_CATEGORY, SEARCH_BY_AUTHOR, SEARCH_BY_NAME, ADD_SHOPPING_CART,
REMOVE_SHOPPING_CART, ADD_NEW_BOOK, DELETE_BOOK, UPDATE_BOOK } from "../actions"


const initialState = {
    books: [],
    allBooks: [],
    allAuthors: [],
    author: [],
    detail: {}
};


function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_BOOKS:
            return{
                ...state,
                books: action.payload,
                allBooks: action.payload
            }

        case GET_BOOK_DETAIL:
            return{
                ...state,
                detail: action.payload
            }

        case CLEAN_DETAIL:
            return state

        case ADD_NEW_BOOK:  
            return {
                ...state,
            }
        
        case SORT_OF_LIST:
            let sort = action.payload === "AZ" ?
            state.books.sort(function (a,b) {
                if(a.name > b.name) {
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.books.sort(function (a,b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                books: sort
            }


        default:
            return state;
    }


}



export default rootReducer;