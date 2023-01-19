import { GET_ALL_BOOKS, GET_BOOK_DETAIL, CLEAN_DETAIL, USER_LOGIN, SORT_OF_LIST, FILTER_BY_CATEGORY,  } from "../actions"


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

        default:
            return state;
    }


}



export default rootReducer;