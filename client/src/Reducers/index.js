import { combineReducers } from 'redux';
import books from './BooksReducer';
import users from './UsersReducer';

const rootReducer = combineReducers({
    books,
    users
});

export default rootReducer;