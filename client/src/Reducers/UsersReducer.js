export default function(state={}, action){
    switch(action.type){
        case 'USER_LOGIN':
            return { ...state, login:action.payload }
        case 'USER_AUTH':
            return {  ...state, login:action.payload  }
        case 'GET_USER_REVIEWS':
            return { ...state, userReviews: action.payload}
        default:
            return state;
    }
}