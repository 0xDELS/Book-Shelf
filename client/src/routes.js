import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Layout from './HOC/Layout'
import BookView from './Components/Books'
import Login from './Containers/Admin/Login'
import Auth from './HOC/Auth'
import User  from './Components/Admin/User'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)}/>
                <Route path="/books/:id" exact component={Auth(BookView)}/>
                <Route path="/user" exact component={Auth(User, true)}/>
                <Route path="/login" exact component={Auth(Login, false)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;