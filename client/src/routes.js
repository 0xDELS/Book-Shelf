import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Layout from './HOC/Layout'
import BookView from './Components/Books'
import Login from './Containers/Admin/Login'
import Auth from './HOC/Auth'
import User  from './Components/Admin/User'
import AddReview from './Components/Admin/AddReview'
import UserReviews from './Components/Admin/UserReviews'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)}/>
                <Route path="/login" exact component={Auth(Login, false)}/>
                <Route path="/user" exact component={Auth(User, true)}/>
                <Route path="/user/add-review" exact component={Auth(AddReview, true)}/>
                <Route path="/books/:id" exact component={Auth(BookView)}/>
                <Route path="/user/user-reviews" exact component={Auth(UserReviews, true)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;