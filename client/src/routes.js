import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Layout from './HOC/Layout'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
            </Switch>
        </Layout>
    );
};

export default Routes;