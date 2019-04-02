import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Layout from './HOC/Layout'
import BookView from './Components/Books'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/books/:id" exact component={BookView}/>
            </Switch>
        </Layout>
    );
};

export default Routes;