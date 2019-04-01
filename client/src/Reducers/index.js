import { combineReducers } from 'redux';
import Books from './BooksReducer';
import Users from './UsersReducer';

const rootReducer = combineReducers({
    Books,
    Users
});

export default rootReducer;