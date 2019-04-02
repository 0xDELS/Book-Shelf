import { combineReducers } from 'redux';
import books from './BooksReducer';
import user from './UsersReducer';

const rootReducer = combineReducers({
    books,
    user
});

export default rootReducer;