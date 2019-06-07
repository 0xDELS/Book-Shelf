export default function(state={}, action){
    switch(action.type){
        case 'GET_BOOKS':
            return { ...state, list:action.payload }
        case 'GET_BOOK':
            return { ...state, book: action.payload}
        case 'UPDATE_BOOK':
            return {
                ...state,
                updatedBook: action.payload.success,
                book: action.payload.doc
            }
        case 'GET_BOOK_WITH_REVIEWER':
            return { ...state, book:action.payload.book, reviewer:action.payload.reviewer }
        case 'CLEAR_BOOK_WITH_REVIEWER':
            return { ...state, book:action.payload.book, reviewer:action.payload.reviewer }
        case 'ADD_REVIEW':
            return { ...state, newReview: action.payload }
        case 'CLEAR_NEW_REVIEW':
            return { ...state, newReview: action.payload }
        default:
            return state;
    }
}